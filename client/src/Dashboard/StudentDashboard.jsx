import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../api";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

export default function StudentDashboard() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem("student_courses");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  // ✅ Add new course from Payments.jsx navigation state
  useEffect(() => {
    if (location.state?.newCourse) {
      setEnrolledCourses((prev) => {
        const exists = prev.some((c) => c.id === location.state.newCourse.id);
        const updated = exists ? prev : [...prev, location.state.newCourse];
        localStorage.setItem("student_courses", JSON.stringify(updated));
        return updated;
      });
    }
  }, [location.state]);

  // ✅ Fetch enrolled courses from backend (backend always wins)
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const res = await API.get("my-courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const serverCourses = Array.isArray(res.data) ? res.data : [];

        // 🧠 Always trust backend data (no local override)
        setEnrolledCourses(serverCourses);
        localStorage.setItem("student_courses", JSON.stringify(serverCourses));
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
        alert("Failed to load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  // ✅ Keep localStorage synced
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      localStorage.setItem("student_courses", JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses]);

  // ✅ Dashboard summary calculations
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(
    (c) => c.status === "Completed"
  ).length;
  const inProgressCourses = enrolledCourses.filter(
    (c) => c.status === "In Progress"
  ).length;
  const notStartedCourses =
    totalCourses - completedCourses - inProgressCourses;
  const avgProgress = totalCourses
    ? Math.round(
        enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) /
          totalCourses
      )
    : 0;

  const breadcrumb = ["Dashboard"];
  if (currentPage !== "Dashboard") breadcrumb.push(currentPage);

  return (
    <div className="mt-18 flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} current={currentPage} />

      <main className="flex-1 p-8">
        <Breadcrumbs items={breadcrumb} />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentPage}</h2>

        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : currentPage === "My Courses" ? (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              My Enrolled Courses
            </h3>
            {enrolledCourses.length === 0 ? (
              <p className="text-gray-600">
                You have not enrolled in any courses yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <img
                      src={course.image_url || "/logo.png"}
                      alt={course.title}
                      className="h-40 w-full object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-3">
                      {course.description}
                    </p>
                    <p className="text-green-600 font-semibold mb-2">
                      ₹{course.price}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Duration: {course.duration}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Enrolled At:{" "}
                      {new Date(course.enrolled_at).toLocaleDateString()}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          course.status === "Completed"
                            ? "bg-green-500"
                            : course.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.progress || 0}% complete
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : currentPage === "Dashboard" ? (
          <div className="space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-100 text-blue-800 p-5 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">Total Courses</h3>
                <p className="text-3xl font-bold">{totalCourses}</p>
              </div>
              <div className="bg-green-100 text-green-800 p-5 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">Completed</h3>
                <p className="text-3xl font-bold">{completedCourses}</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 p-5 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">In Progress</h3>
                <p className="text-3xl font-bold">{inProgressCourses}</p>
              </div>
              <div className="bg-gray-100 text-gray-800 p-5 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">Not Started</h3>
                <p className="text-3xl font-bold">{notStartedCourses}</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Overall Progress
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${avgProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">
                {avgProgress}% completed on average
              </p>
            </div>

            {/* Recent Courses */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Recent Courses
              </h3>
              {enrolledCourses.length === 0 ? (
                <p className="text-gray-600">No courses to display yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="bg-white shadow-md rounded-xl overflow-hidden"
                    >
                      <img
                        src={course.image_url || "/logo.png"}
                        alt={course.title}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              course.status === "Completed"
                                ? "text-green-600"
                                : course.status === "In Progress"
                                ? "text-yellow-600"
                                : "text-gray-600"
                            }`}
                          >
                            {course.status}
                          </span>
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              course.status === "Completed"
                                ? "bg-green-500"
                                : course.status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            }`}
                            style={{
                              width: `${course.progress || 0}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {course.progress || 0}% complete
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : currentPage === "Profile" ? (
          <div>
            <p className="text-gray-600">Profile section coming soon...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">Page not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
