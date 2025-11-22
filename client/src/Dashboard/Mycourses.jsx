import React, { useEffect, useState } from "react";
import API from "../api";

export default function MyCourses() {
  const [courses, setCourses] = useState(() => {
    // ✅ Load from localStorage if available (so progress isn't lost on reload)
    const saved = localStorage.getItem("student_courses");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("my-courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const serverCourses = Array.isArray(res.data) ? res.data : [];

        setCourses((prevCourses) => {
          // 🧠 Merge backend data with locally cached progress
          const merged = serverCourses.map((serverCourse) => {
            const existing = prevCourses.find((c) => c.id === serverCourse.id);

            if (existing) {
              // ✅ If backend reset but student had progress — keep local data
              if (
                serverCourse.status === "Not Started" &&
                existing.progress > 0
              ) {
                return { ...existing };
              }

              // ✅ Otherwise, prefer latest backend data
              return { ...serverCourse, progress: serverCourse.progress || existing.progress || 0 };
            }

            // ✅ New course — add as is
            return serverCourse;
          });

          // ✅ Save to localStorage for persistence
          localStorage.setItem("student_courses", JSON.stringify(merged));

          return merged;
        });
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        alert("Failed to load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Keep localStorage in sync when progress updates
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("student_courses", JSON.stringify(courses));
    }
  }, [courses]);

  // ✅ Loading and Empty States
  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading your courses...</p>;

  if (!courses.length)
    return (
      <p className="text-center mt-10 text-gray-600">
        You have not enrolled in any courses yet.
      </p>
    );

  // ✅ Main Render
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* 🖼 Course Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={course.image_url || "/logo.png"}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    course.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : course.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {course.status}
              </span>
            </div>

            {/* 📘 Course Details */}
            <div className="p-4 flex flex-col justify-between h-72">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-green-600 font-bold mb-1">₹{course.price}</p>
                <p className="text-gray-500 text-sm mb-1">
                  Duration: {course.duration}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Modules: {(course.modules || []).join(", ")}
                </p>

                {/* 📊 Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div
                    className={`h-3 rounded-full ${
                      course.progress >= 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${course.progress || 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  {course.progress || 0}% completed
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
