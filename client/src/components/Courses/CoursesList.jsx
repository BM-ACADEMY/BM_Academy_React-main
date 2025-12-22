import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLaptopCode, FaArrowRight, FaTag } from "react-icons/fa";

const CoursesList = () => {
  // --- 1. PRESERVED LOGIC ---
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

  const formatArrayField = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return "N/A";
  };

  // --- 2. LOADING ---
  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFEA00]"></div>
      </div>
    );

  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  // --- 3. ENHANCED "SMART REVEAL" LAYOUT ---
  return (
    <div className="container mx-auto px-4 py-16 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          const courseId = getCourseId(course);
          if (!courseId) return null;

          return (
            <div
              key={courseId}
              onClick={() => navigate(`/courses/${courseId}`)}
              className="group relative h-[420px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#FFEA00]"
            >

              {/* --- BACKGROUND IMAGE LAYER --- */}
              <div className="absolute inset-0 bg-gray-900">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <span className="text-white font-bold text-2xl tracking-widest">BM ACADEMY</span>
                  </div>
                )}
                {/* Default Dark Gradient (Bottom Up) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              {/* --- TOP BADGES (Always Visible) --- */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#FFEA00] text-black text-xs font-black px-3 py-1.5 rounded shadow-lg uppercase tracking-wider flex items-center gap-1">
                  <FaTag size={10} /> {course.price ? `₹${course.price}` : "Free"}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20">
                 <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {formatArrayField(course.mode).split(',')[0]}
                 </span>
              </div>

              {/* --- CONTENT LAYER (Slides Up) --- */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-[80px] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]">

                {/* Initial View: Title & Duration */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-[#FFEA00] text-xs font-bold uppercase mb-2">
                     <FaClock />
                     <span>{formatArrayField(course.duration)}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white leading-tight drop-shadow-md group-hover:text-[#FFEA00] transition-colors duration-300">
                    {course.title}
                  </h3>
                </div>

                {/* Revealed View: Description & Button */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <button className="w-full py-3.5 bg-[#FFEA00] text-black font-black uppercase text-xs tracking-[0.15em] rounded flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg">
                    View Course <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* --- DECORATIVE HOVER LINE --- */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFEA00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-30"></div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesList;
