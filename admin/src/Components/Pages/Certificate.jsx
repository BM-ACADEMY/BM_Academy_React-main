import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Import preview component
import CertificatePreview from "../../Components/Pages/Certificatepreview";
// ⬆ If your file name is CertificatePreview.jsx, use: "./CertificatePreview"

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

  // Auto issue
  const handleIssue = async () => {
    if (!formData.user || !formData.course)
      return toast.warn("Select user & course");

    setLoading(true);

    try {
      const res = await API.post("/certificates/", {
        user_id: formData.user,
        course_id: formData.course,
      });

      toast.success("Certificate issued!");
      setCertificates((prev) => [res.data.data, ...prev]);

      setFormData({ user: "", course: "" });
    } catch {
      toast.error("Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };

  // Manual issue
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

      setManual({
        name: "",
        course: "",
        issued_date: "",
        certificate_type: "",
      });

    } catch (err) {
      toast.error("Failed to create manual certificate");
    } finally {
      setManualLoading(false);
    }
  };

  // Filter completed courses
  const enrolledCourses = formData.user
    ? (
        users.find((u) => String(u.id) === String(formData.user))
          ?.enrolled_courses || []
      ).filter((c) => c.status === "Completed")
    : [];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🎓 Issue Certificates
      </h2>

      {/* AUTO ISSUE */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Auto Certificate (Based on User + Completed Course)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* User */}
          <div>
            <label className="block text-sm font-medium mb-2">Select User</label>
            <select
              value={formData.user}
              onChange={(e) =>
                setFormData({ ...formData, user: e.target.value, course: "" })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Course</label>
            <select
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="">
                {enrolledCourses.length === 0
                  ? "No completed courses"
                  : "-- Select Course --"}
              </option>
              {enrolledCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Issue */}
          <div className="flex items-end">
            <button
              onClick={handleIssue}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow"
            >
              {loading ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>

        </div>
      </div>

      {/* MANUAL ISSUE */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">✍️ Manual Certificate Generator</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Student Name</label>
            <input
              type="text"
              value={manual.name}
              onChange={(e) => setManual({ ...manual, name: e.target.value })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter student name"
            />
          </div>

          {/* Certificate Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Certificate Type</label>
            <select
              value={manual.certificate_type}
              onChange={(e) =>
                setManual({ ...manual, certificate_type: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select Type --</option>
              <option value="Course">Course</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Name</label>
            <input
              type="text"
              value={manual.course}
              onChange={(e) => setManual({ ...manual, course: e.target.value })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter course name"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Issued Date</label>
            <input
              type="date"
              value={manual.issued_date}
              onChange={(e) =>
                setManual({ ...manual, issued_date: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Issue */}
          <div className="flex items-end">
            <button
              onClick={handleManualIssue}
              disabled={manualLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              {manualLoading ? "Creating..." : "Create Manual Certificate"}
            </button>
          </div>
        </div>
      </div>

      {/* CERTIFICATE TABLE */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <h3 className="text-xl font-semibold mb-4">Issued Certificates</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Certificate ID</th>
                <th className="p-2 border">Issued On</th>
                <th className="p-2 border">Download</th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((cert, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{cert.user_name || cert.manual_name}</td>
                  <td className="p-2 border">{cert.certificate_type || "Course"}</td>
                  <td className="p-2 border">{cert.course_name || cert.manual_course}</td>
                  <td className="p-2 border text-center">{cert.certificate_id}</td>
                  <td className="p-2 border text-center">
                    {new Date(cert.issue_date).toLocaleDateString()}
                  </td>

                  {/* PREVIEW / DOWNLOAD BUTTON */}
                  <td className="p-2 border text-center">
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
                      className="text-blue-600 underline"
                    >
                      Preview / Download
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------- */}
      {/* PREVIEW MODAL POPUP     */}
      {/* ---------------------- */}
      {previewOpen && previewData && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

    <div className="relative bg-white p-4 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">


      {/* Close X Button */}
      <button
        onClick={() => setPreviewOpen(false)}
        className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex justify-center items-center rounded-full shadow-lg hover:bg-red-600"
      >
        ✕
      </button>

      {/* Download Button */}
      <button
        onClick={() => previewRef.current.downloadPdf()}
        className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded shadow hover:bg-yellow-600"
      >
        Download PDF
      </button>

      {/* Certificate Preview */}
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
)}



    </div>
  );
}
