import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  FaAward,
  FaUserGraduate,
  FaFilePdf,
  FaDownload,
  FaTimes,
  FaSignature,
  FaCopy,
  FaHistory,
  FaTrash
} from "react-icons/fa";

import CertificatePreview from "../Pages/Certificatepreview";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [users, setUsers] = useState([]);

  // Auto Issue State
  const [formData, setFormData] = useState({ user: "", course: "" });
  const [loading, setLoading] = useState(false);

  // Manual Issue State
  const [manual, setManual] = useState({
    name: "",
    course: "",
    issued_date: "",
    certificate_type: "",
  });
  const [manualLoading, setManualLoading] = useState(false);

  // Preview State
  const certificateRef = useRef(null); // Ref for the certificate element
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates/");
      setCertificates(res.data.data || res.data);
    } catch (err) {
      toast.error("Failed to load certificates");
    }
  };

  const fetchUsersWithCourses = async () => {
    try {
      const res = await API.get("/users/list-with-courses/");
      setUsers(res.data.data || res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchUsersWithCourses();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleIssue = async () => {
    if (!formData.user || !formData.course) return toast.warn("Select user & course");
    setLoading(true);
    try {
      const res = await API.post("/certificates/", {
        user_id: formData.user,
        course_id: formData.course,
      });
      toast.success("Certificate issued successfully!");
      setCertificates((prev) => [res.data.data, ...prev]);
      setFormData({ user: "", course: "" });
    } catch {
      toast.error("Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleManualIssue = async () => {
    if (!manual.name || !manual.course) {
      toast.warn("Enter name & course");
      return;
    }
    setManualLoading(true);
    try {
      const res = await API.post("/certificates/manual/", manual);
      toast.success("Manual certificate created!");
      // Add the new cert to the list (adapting structure if needed)
      setCertificates((prev) => [
        {
          id: res.data.id || Date.now(), // Fallback if ID is missing in response
          certificate_id: res.data.certificate_id,
          user_name: res.data.name,
          course_name: res.data.course,
          certificate_type: res.data.certificate_type,
          issue_date: new Date(),
        },
        ...prev,
      ]);
      setManual({ name: "", course: "", issued_date: "", certificate_type: "" });
    } catch (err) {
      toast.error("Failed to create manual certificate");
    } finally {
      setManualLoading(false);
    }
  };

  // ✅ FIXED DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;

    try {
      // Using the database ID (integer) instead of the string ID
      await API.delete(`/certificates/${id}/`);

      setCertificates((prev) => prev.filter((c) => c.id !== id));
      toast.success("Certificate deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete certificate");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("ID Copied!", { autoClose: 1000 });
  };

  // ✅ NEW DOWNLOAD HANDLER (No child ref dependency)
  const handleDownloadPdf = async () => {
    const element = certificateRef.current;
    if (!element) return toast.error("Preview not loaded");

    setDownloading(true);
    try {
        // 1. Capture the element as a canvas
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Handle cross-origin images
            backgroundColor: "#ffffff"
        });

        // 2. Convert to PDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4"); // Landscape, mm, A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Certificate_${previewData.name.replace(/\s+/g, '_')}.pdf`);
        toast.success("Download started!");
    } catch (err) {
        console.error("PDF Error:", err);
        toast.error("Failed to generate PDF");
    } finally {
        setDownloading(false);
    }
  };

  const enrolledCourses = formData.user
    ? (users.find((u) => String(u.id) === String(formData.user))?.enrolled_courses || []).filter((c) => c.status === "Completed")
    : [];

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8 min-h-screen bg-gray-50 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6 px-1">
        <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Certificate Center</h2>
            <p className="text-gray-500 text-sm mt-1">Issue, manage, and verify student credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* --- 1. AUTO GENERATOR --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-black text-white rounded-lg"><FaUserGraduate /></div>
                <h3 className="font-bold text-gray-900">Auto Issue</h3>
            </div>

            <div className="p-6 space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Student</label>
                    <select
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value, course: "" })}
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                    >
                        <option value="">-- Choose User --</option>
                        {users.map((user) => (<option key={user.id} value={user.id}>{user.name || user.email}</option>))}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Completed Course</label>
                    <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                        disabled={!formData.user}
                    >
                        <option value="">{enrolledCourses.length === 0 ? "No completed courses found" : "-- Choose Course --"}</option>
                        {enrolledCourses.map((course) => (<option key={course.id} value={course.id}>{course.title}</option>))}
                    </select>
                </div>

                <button
                    onClick={handleIssue}
                    disabled={loading || !formData.course}
                    className="w-full bg-[#FFEA00] text-black font-bold uppercase text-sm py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {loading ? "Issuing..." : <><FaAward /> Issue Certificate</>}
                </button>
            </div>
        </div>

        {/* --- 2. MANUAL GENERATOR --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-black text-white rounded-lg"><FaSignature /></div>
                <h3 className="font-bold text-gray-900">Manual Generator</h3>
            </div>

            <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Recipient Name</label>
                        <input
                            type="text"
                            value={manual.name}
                            onChange={(e) => setManual({ ...manual, name: e.target.value })}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Type</label>
                        <select
                            value={manual.certificate_type}
                            onChange={(e) => setManual({ ...manual, certificate_type: e.target.value })}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                        >
                            <option value="">-- Select --</option>
                            <option value="Course">Course</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Issue Date</label>
                        <input
                            type="date"
                            value={manual.issued_date}
                            onChange={(e) => setManual({ ...manual, issued_date: e.target.value })}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Course Title</label>
                        <input
                            type="text"
                            value={manual.course}
                            onChange={(e) => setManual({ ...manual, course: e.target.value })}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                            placeholder="e.g. Advanced React Development"
                        />
                    </div>
                </div>

                <button
                    onClick={handleManualIssue}
                    disabled={manualLoading}
                    className="w-full bg-black text-white font-bold uppercase text-sm py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {manualLoading ? "Generating..." : <><FaAward /> Generate</>}
                </button>
            </div>
        </div>
      </div>

      {/* --- HISTORY TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaHistory className="text-[#FFEA00]" /> Issuance History
            </h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Total: {certificates.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Recipient</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Issued On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {certificates.map((cert, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer bg-gray-100 w-fit px-2 py-1 rounded border border-gray-200 hover:border-black transition-colors"
                        onClick={() => copyToClipboard(cert.certificate_id)}
                        title="Copy ID"
                    >
                        <span className="font-mono text-xs font-bold text-gray-600">{cert.certificate_id?.substring(0, 8)}...</span>
                        <FaCopy className="text-gray-400 text-xs" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">{cert.user_name || cert.manual_name}</td>
                  <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          (cert.certificate_type || "Course") === 'Internship'
                          ? 'bg-purple-50 text-purple-600 border-purple-100'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                          {cert.certificate_type || "Course"}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{cert.course_name || cert.manual_course}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-medium">{new Date(cert.issue_date).toLocaleDateString()}</td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        {/* View Button */}
                        <button
                            onClick={() => {
                                setPreviewData({
                                name: cert.user_name || cert.manual_name,
                                course: cert.course_name || cert.manual_course,
                                certificate_type: cert.certificate_type || "Course",
                                certificate_id: cert.certificate_id,
                                issued_date: new Date(cert.issue_date).toLocaleDateString(),
                                });
                                setPreviewOpen(true);
                            }}
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"
                            title="View Certificate"
                        >
                            <FaFilePdf size={16} />
                        </button>

                        {/* ✅ DELETE BUTTON */}
                        <button
                            onClick={() => handleDelete(cert.id)} // Using standard integer ID
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PREVIEW MODAL --- */}
      {previewOpen && previewData && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="bg-transparent w-full max-w-5xl h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white rounded-t-xl flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaFilePdf className="text-red-500" /> Certificate Preview
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  className="flex items-center gap-2 bg-[#FFEA00] text-black hover:bg-yellow-400 px-4 py-2 rounded-lg text-sm font-bold uppercase transition-colors disabled:opacity-50"
                >
                  {downloading ? "Generating..." : <><FaDownload /> Download PDF</>}
                </button>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Preview Body with REF */}
            <div className="flex-1 bg-gray-900 rounded-b-xl overflow-hidden flex justify-center items-center relative p-8">
               <div ref={certificateRef} className="shadow-2xl">
                   <CertificatePreview
                      name={previewData.name}
                      course={previewData.course}
                      issued_date={previewData.issued_date}
                      certificate_type={previewData.certificate_type}
                      certificate_id={previewData.certificate_id}
                   />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
