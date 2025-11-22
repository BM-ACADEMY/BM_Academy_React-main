import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const publicFetch = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await publicFetch(`${import.meta.env.VITE_BASE_URI}courses/`);
        if (!Array.isArray(data)) throw new Error("Courses response is not an array");
        setCourses(data);
      } catch (err) {
        console.error("Courses fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCourseId = (course) => {
    if (course._id?.$oid) return course._id.$oid;
    if (course.id) return course.id;
    if (course._id) return course._id;
    return null;
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading courses...</p>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
        <p>Could not load courses. Please try again later.</p>
      </div>
    );

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {courses.map((course) => {
        const courseId = getCourseId(course);
        if (!courseId) return null;

        return (
          <div
            key={courseId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-64 flex flex-col overflow-hidden"
          >
            {/* Course Image */}
            {course.image_url && (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
            )}

            {/* Course Info */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

              <div className="flex justify-between text-gray-700 text-sm mb-3">
                <p>
                  <strong>Mode:</strong> {course.mode || "Self-Paced"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{course.price || "Free"}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
