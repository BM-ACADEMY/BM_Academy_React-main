import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TrendingCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URI}courses/`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        const courseList = Array.isArray(data) ? data.slice(0, 6) : [];
        setCourses(courseList);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Could not load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const getCourseId = (c) => c._id?.$oid || c.id || c._id || null;

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
      </div>
    );

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Top-Rated Courses For Your Success!
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Learn from industry experts and gain the skills you need to succeed in your career.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.length > 0 ? (
          courses.map((course) => {
            const id = getCourseId(course);
            if (!id) return null;

            return (
              <div
                key={id}
                className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-6 text-left">
                  <p className="text-xs text-gray-500 mb-2">
                    ⏱️ Duration: {course.duration || "Flexible"} |{" "}
                    {course.type || "Certificate Included"}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {course.description}
                  </p>
                  <button
                    onClick={() => navigate(`/courses/${id}`)}
                    className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1"
                  >
                    Enquire →
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No courses available right now.
          </p>
        )}
      </div>

      {/* Why Choose Section */}
      <div className="mt-24 text-center max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why Choose Our Courses?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: "🚀",
              title: "Learn In-Demand Skills",
              desc: "Stay ahead of the competition with the latest technologies.",
            },
            {
              icon: "🎓",
              title: "Expert Instructors",
              desc: "Learn from certified and experienced professionals.",
            },
            {
              icon: "💼",
              title: "Career Support",
              desc: "Get guidance to land your dream job after the course.",
            },
            {
              icon: "🏆",
              title: "Recognized Certificates",
              desc: "Showcase your achievement with industry-recognized credentials.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {f.title}
              </h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/courses"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-all duration-300"
          >
            Explore All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
