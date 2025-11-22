import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ user: "", course: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCertificates();
    fetchUsersWithCourses();
  }, []);

  // ✅ Fetch all certificates
  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates/");
      setCertificates(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Error fetching certificates:", err);
      toast.error(
        err.response?.status === 403
          ? "Access denied. Admin token required."
          : "Failed to fetch certificates"
      );
    }
  };

  // ✅ Fetch users with their enrolled courses
  const fetchUsersWithCourses = async () => {
    try {
      const res = await API.get("/users/list-with-courses/");
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      toast.error("Failed to fetch users list");
    }
  };

  // ✅ Issue Certificate
  const handleIssue = async () => {
    if (!formData.user || !formData.course) {
      toast.warn("Please select both user and course");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_id: formData.user,
        course_id: formData.course,
      };

      const res = await API.post("/certificates/", payload);
      const newCert = res.data.data;

      toast.success(res.data.message || "Certificate issued successfully!");

      // ✅ Instantly update certificate table without refetch
      setCertificates((prev) => [newCert, ...prev]);

      // Reset form
      setFormData({ user: "", course: "" });
    } catch (err) {
      console.error("❌ Error issuing certificate:", err);
      toast.error(
        err.response?.data?.message || "Failed to issue certificate"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter only completed courses for selected user
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

      {/* Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select User
            </label>
            <select
              value={formData.user}
              onChange={(e) =>
                setFormData({ ...formData, user: e.target.value, course: "" })
              }
              className="w-full border rounded-lg p-2 focus:ring focus:ring-yellow-300"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Course select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Course
            </label>
            <select
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full border rounded-lg p-2 focus:ring focus:ring-yellow-300"
              disabled={!formData.user || enrolledCourses.length === 0}
            >
              <option value="">
                {enrolledCourses.length === 0
                  ? "No completed courses"
                  : "-- Select Completed Course --"}
              </option>
              {enrolledCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Issue button */}
          <div className="flex items-end">
            <button
              onClick={handleIssue}
              disabled={loading || !formData.user || !formData.course}
              className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Issued Certificates
        </h3>

        {certificates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No certificates issued yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border text-left">User</th>
                  <th className="py-2 px-4 border text-left">Course</th>
                  <th className="py-2 px-4 border text-left">Certificate ID</th>
                  <th className="py-2 px-4 border">Issued On</th>
                  <th className="py-2 px-4 border">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr
                    key={cert.id || index}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border">{cert.user_name}</td>
                    <td className="py-2 px-4 border">{cert.course_name}</td>
                    <td className="py-2 px-4 border">
                      {cert.certificate_id}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {new Date(cert.issue_date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {cert.file ? (
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
