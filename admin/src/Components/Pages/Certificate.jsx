import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaAward,
  FaUserGraduate,
  FaFilePdf,
  FaDownload,
  FaTimes,
  FaCalendarAlt,
  FaSignature,
  FaBookOpen,
  FaCopy
} from "react-icons/fa";

import CertificatePreview from "../Pages/Certificatepreview"; // Adjust path as needed

// API Configuration (Kept same as your code)
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
  const [formData, setFormData] = useState({ user: "", course: "" });
  const [manual, setManual] = useState({
    name: "",
    course: "",
    issued_date: "",
    certificate_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);

  // Preview states
  const previewRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // --- EFFECTS (Kept same) ---
  useEffect(() => {
    fetchCertificates();
    fetchUsersWithCourses();
  }, []);

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

  // --- HANDLERS (Kept same) ---
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
      setCertificates((prev) => [
        {
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("ID Copied to clipboard!", { autoClose: 2000 });
  };

  // Helper to trigger download from parent
  const handleDownload = () => {
    if (previewRef.current) {
        console.log("Calling child download function...");
        previewRef.current.downloadPdf();
    } else {
        console.error("Preview Ref is null. Component might not be mounted.");
        toast.error("Error: Player not ready. Try closing and reopening the preview.");
    }
  };

  const enrolledCourses = formData.user
    ? (users.find((u) => String(u.id) === String(formData.user))?.enrolled_courses || []).filter((c) => c.status === "Completed")
    : [];

  const cardClass = "bg-white border border-slate-200 rounded-xl shadow-sm p-6";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors";
  const buttonClass = "w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex justify-center items-center gap-2";

  return (
    <div className="space-y-6 relative">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header & Forms (Existing Code kept concise for brevity, logic unchanged) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certificate Management</h2>
          <p className="text-slate-500 text-sm mt-1">Issue and Manage Course Completion Certificates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Auto Issue Form */}
        <div className={cardClass}>
           <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FaUserGraduate /></div>
             <div><h3 className="font-bold text-slate-800">Auto Issue</h3></div>
           </div>
           <div className="space-y-4">
              <div>
                <label className={labelClass}>Select User</label>
                <select value={formData.user} onChange={(e) => setFormData({ ...formData, user: e.target.value, course: "" })} className={inputClass}>
                  <option value="">-- Choose User --</option>
                  {users.map((user) => (<option key={user.id} value={user.id}>{user.name || user.email}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Select Course</label>
                <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={inputClass}>
                  <option value="">{enrolledCourses.length === 0 ? "No completed courses found" : "-- Choose Course --"}</option>
                  {enrolledCourses.map((course) => (<option key={course.id} value={course.id}>{course.title}</option>))}
                </select>
              </div>
              <div className="pt-2">
                <button onClick={handleIssue} disabled={loading} className={buttonClass}><FaAward /> {loading ? "Issuing..." : "Issue Certificate"}</button>
              </div>
           </div>
        </div>

        {/* Manual Issue Form */}
        <div className={cardClass}>
           <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
             <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><FaSignature /></div>
             <div><h3 className="font-bold text-slate-800">Manual Generator</h3></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="md:col-span-2">
               <label className={labelClass}>Student Name</label>
               <input type="text" value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} className={inputClass} placeholder="Ex. John Doe" />
             </div>
             <div>
               <label className={labelClass}>Type</label>
               <select value={manual.certificate_type} onChange={(e) => setManual({ ...manual, certificate_type: e.target.value })} className={inputClass}>
                 <option value="">-- Select --</option>
                 <option value="Course">Course</option>
                 <option value="Internship">Internship</option>
               </select>
             </div>
             <div>
               <label className={labelClass}>Issued Date</label>
               <input type="date" value={manual.issued_date} onChange={(e) => setManual({ ...manual, issued_date: e.target.value })} className={inputClass} />
             </div>
             <div className="md:col-span-2">
                <label className={labelClass}>Course / Internship Title</label>
                <input type="text" value={manual.course} onChange={(e) => setManual({ ...manual, course: e.target.value })} className={inputClass} placeholder="Ex. Advanced Python" />
             </div>
             <div className="md:col-span-2 pt-2">
               <button onClick={handleManualIssue} disabled={manualLoading} className={`${buttonClass} bg-emerald-600 hover:bg-emerald-700`}>
                 <FaAward /> {manualLoading ? "Creating..." : "Generate Manual Certificate"}
               </button>
             </div>
           </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">History</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">Total: {certificates.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Certificate ID</th>
                <th className="px-6 py-4">Recipient</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {certificates.map((cert, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 group cursor-pointer max-w-[200px]" onClick={() => copyToClipboard(cert.certificate_id)} title="Click to Copy ID">
                         <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors truncate">
                            {cert.certificate_id}
                         </span>
                         <FaCopy className="text-slate-300 group-hover:text-blue-500 text-xs transition-colors shrink-0" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{cert.user_name || cert.manual_name}</td>
                  <td className="px-6 py-4">{cert.certificate_type || "Course"}</td>
                  <td className="px-6 py-4">{cert.course_name || cert.manual_course}</td>
                  <td className="px-6 py-4">{new Date(cert.issue_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
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
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <FaFilePdf /> View / Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FIX: MODAL PREVIEW --- */}
      {previewOpen && previewData && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]"
          onClick={() => setPreviewOpen(false)} // Fix: clicking background closes modal
        >
          {/* Modal Content Wrapper */}
          <div
            className="bg-transparent w-full max-w-6xl h-full max-h-screen flex flex-col p-4"
            onClick={(e) => e.stopPropagation()} // Stop closing when clicking inside
          >
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg flex justify-between items-center p-4 mb-4 shrink-0">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <FaFilePdf className="text-red-500" /> Certificate Preview
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <FaDownload /> Download PDF
                </button>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Preview Area (Fix: Flex grow to fill space, hidden overflow to prevent scroll) */}
            <div className="flex-1 flex justify-center items-center overflow-hidden bg-slate-800/50 rounded-xl border border-white/10 relative">
               <CertificatePreview
                  ref={previewRef}
                  name={previewData.name}
                  course={previewData.course}
                  issued_date={previewData.issued_date}
                  certificate_type={previewData.certificate_type}
                  certificate_id={previewData.certificate_id}
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
