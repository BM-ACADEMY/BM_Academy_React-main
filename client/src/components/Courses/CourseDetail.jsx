// src/components/Courses/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;

  // ------------------ Public fetch ------------------
  const publicFetch = async (url, options = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  };

  // ------------------ Fetch course details ------------------
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await publicFetch(`${import.meta.env.VITE_BASE_URI}courses/${courseId}/`);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading course details...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!course) return <div className="text-center py-20 text-gray-500">No course found.</div>;

  const {
    title,
    description,
    price,
    original_price,
    rating,
    learners,
    language,
    duration,
    modules,
    image_url,
  } = course;

  const modulesCount = modules?.length || 0;
  const currentPrice = price ?? 0;
  const originalPrice = original_price ?? currentPrice;
  const savings = originalPrice - currentPrice;

  const renderStars = (rate) => {
    const stars = [];
    const rounded = Math.round(rate || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rounded ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // ------------------ JSX ------------------
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
            {image_url && (
              <img
                src={image_url}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-700 mb-4">{description}</p>

            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-gray-600 ml-2">{learners || 0} learners</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {originalPrice !== currentPrice && (
                <span className="line-through text-gray-400 text-lg">₹{originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-green-600">₹{currentPrice}</span>
              {savings > 0 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{savings}!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{modulesCount}</div>
                <div className="text-sm">Modules</div>
              </div>
              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{duration || "N/A"}</div>
                <div className="text-sm">Duration</div>
              </div>
              <div className="bg-purple-50 text-purple-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{language || "N/A"}</div>
                <div className="text-sm">Language</div>
              </div>
              <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{rating || "0"}</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* ✅ Modules List */}
          {modules?.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">📘 View Modules</h2>
              <ol className="list-decimal list-inside space-y-3">
                {modules.map((mod, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition text-gray-700"
                  >
                    {mod}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-28">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
            {user ? (
              <button
                onClick={() => navigate("/payments", { state: { course } })}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
              >
                Enroll Now
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold shadow cursor-not-allowed"
              >
                Login to Enroll
              </button>
            )}
            <button
              onClick={() => setShowPreview(true)}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
            >
              Preview Course
            </button>
          </div>
        </div>
      </div>

      {/* ------------------ Modal ------------------ */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-2xl shadow-lg overflow-hidden animate-fadeIn relative">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Course Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              {image_url && (
                <img
                  src={image_url}
                  alt={title}
                  className="w-full h-60 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-gray-700">{description}</p>

              {modules?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Modules Overview</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {modules.slice(0, 3).map((mod, i) => (
                      <li key={i} className="p-3 bg-gray-100 rounded-lg">
                        {mod}
                      </li>
                    ))}
                  </ol>
                  {modules.length > 3 && (
                    <p className="text-sm text-gray-500 mt-2">
                      + {modules.length - 3} more modules...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
