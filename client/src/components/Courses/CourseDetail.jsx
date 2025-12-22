import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaGlobe,
  FaLayerGroup,
  FaClock,
  FaCheckCircle,
  FaShareAlt,
  FaArrowLeft,
  FaPhoneAlt,
  FaLaptopHouse,
  FaDoorOpen,
  FaBookOpen,  // New icon for Syllabus
  FaListUl     // New icon for List
} from "react-icons/fa";
import { IoIosInfinite } from "react-icons/io";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  // --- FETCH LOGIC ---
  const publicFetch = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await publicFetch(`${import.meta.env.VITE_BASE_URI}courses/${courseId}/`);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Could not load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  // --- LOADING / ERROR STATES ---
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFEA00]"></div>
      </div>
    );

  if (error || !course)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Course</h2>
        <p className="text-gray-600 mb-6">{error || "Course not found."}</p>
        <button onClick={() => navigate('/courses')} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
          Back to Courses
        </button>
      </div>
    );

  // --- DESTRUCTURE DATA ---
  const {
    title,
    description,
    price,
    image_url,
    mode = "Online",
    duration = "Short-term",
    enrollmentStatus = "Open",
    modules = []
  } = course;

  const displayStatus = course.enrollment_status || enrollmentStatus;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">

      {/* --- 1. DARK HERO HEADER --- */}
      <div className="bg-[#111111] text-white pt-28 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-gray-400 hover:text-[#FFEA00] transition-colors mb-6 text-sm font-bold uppercase tracking-wider"
          >
            <FaArrowLeft /> Back to Courses
          </button>

          <div className="max-w-3xl">
            <span className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded mb-4 ${
              displayStatus === "Open" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"
            }`}>
              {displayStatus} for Enrollment
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-lg mb-6 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <FaLaptopHouse className="text-[#FFEA00]" />
                <span>{mode} Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-[#FFEA00]" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLayerGroup className="text-[#FFEA00]" />
                <span>{modules.length} Topics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN LAYOUT (Grid) --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

        {/* === LEFT COLUMN (Content) === */}
        <div className="lg:col-span-2 space-y-8">

          {/* About Course */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-[#111111] mb-4">About This Course</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
               <FaLaptopHouse className="text-2xl text-[#FFEA00]" />
               <span className="font-bold text-sm">Mode</span>
               <span className="text-xs text-gray-500">{mode}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
               <FaClock className="text-2xl text-[#FFEA00]" />
               <span className="font-bold text-sm">Duration</span>
               <span className="text-xs text-gray-500">{duration}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
               <FaDoorOpen className="text-2xl text-[#FFEA00]" />
               <span className="font-bold text-sm">Status</span>
               <span className={`text-xs font-bold ${displayStatus === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                 {displayStatus}
               </span>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
               <IoIosInfinite className="text-2xl text-[#FFEA00]" />
               <span className="font-bold text-sm">Access</span>
               <span className="text-xs text-gray-500">Lifetime</span>
            </div>
          </div>

          {/* Curriculum / Syllabus (Text Only) */}
          {modules && modules.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-2">
                 <FaBookOpen className="text-[#FFEA00]" /> Course Syllabus
              </h2>

              <div className="space-y-3">
                {modules.map((mod, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#FFEA00] transition-colors"
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-[#FFEA00] flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    {/* Topic Name */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        {typeof mod === 'string' ? mod : mod.title || "Module Topic"}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === RIGHT COLUMN (Sticky Sidebar) === */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">

            {/* Inquiry Card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Image (Static, no play button) */}
              <div className="relative h-48 bg-gray-200 group cursor-pointer" onClick={() => setShowPreview(true)}>
                <img
                  src={image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold">
                  View Syllabus
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111111] mb-2 text-center">
                  Interested in this Course?
                </h3>
                <p className="text-gray-500 text-sm text-center mb-6">
                  {price ? `Course Fee: ₹${price}` : "Contact for Fee Details"}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider rounded shadow hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPhoneAlt /> Enquire Admission
                  </button>

                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-full py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded shadow hover:bg-gray-900 transition-colors"
                  >
                    View Topics
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                   <p className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> {mode} Learning</p>
                   <p className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> {duration} Program</p>
                   <p className="flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Certificate of Completion</p>
                </div>

                <button className="flex items-center justify-center gap-2 w-full mt-6 text-gray-500 text-sm font-bold hover:text-black transition-colors">
                   <FaShareAlt /> Share this course
                </button>
              </div>
            </div>

            <div className="bg-[#111111] text-white p-6 rounded-xl text-center">
              <h3 className="font-bold mb-2 text-[#FFEA00]">Need Counseling?</h3>
              <p className="text-sm text-gray-400 mb-4">Unsure if this course fits your career goals? Talk to our expert counselor for free.</p>
              <a href="tel:+919876543210" className="text-sm font-bold underline hover:text-[#FFEA00]">
                Call: +91 98765 43210
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* --- 3. SYLLABUS MODAL (No Video) --- */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          ></div>

          <div className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b bg-[#111111] text-white">
              <h3 className="font-bold text-lg">Course Syllabus Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white text-2xl">
                &times;
              </button>
            </div>

            <div className="grid md:grid-cols-2 h-[60vh] md:h-[500px]">
              {/* Left: Image Banner */}
              <div className="hidden md:block bg-gray-100 relative">
                 {image_url ? (
                   <img src={image_url} alt="Course" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                 )}
                 <div className="absolute inset-0 bg-black/20"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-white text-2xl font-bold drop-shadow-md mb-2">{title}</h2>
                    <p className="text-white/90 text-sm drop-shadow-md line-clamp-2">{description}</p>
                 </div>
              </div>

              {/* Right: Scrollable Syllabus List */}
              <div className="bg-white overflow-y-auto p-6">
                 <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-gray-500 border-b pb-2">
                   Topics Covered ({modules.length})
                 </h4>

                 <div className="space-y-1">
                   {modules && modules.map((mod, i) => (
                     <div key={i} className="flex items-start gap-3 p-3 rounded hover:bg-yellow-50 transition-colors">
                        <FaListUl className="text-[#FFEA00] mt-1 shrink-0" />
                        <span className="text-gray-700 font-medium text-sm">
                           {typeof mod === 'string' ? mod : mod.title || "Topic"}
                        </span>
                     </div>
                   ))}
                 </div>

                 <div className="mt-8 text-center">
                    <button
                      onClick={() => navigate('/contact')}
                      className="px-6 py-2 bg-black text-white text-sm font-bold rounded hover:bg-[#FFEA00] hover:text-black transition-colors"
                    >
                      Enquire for Full Details
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
