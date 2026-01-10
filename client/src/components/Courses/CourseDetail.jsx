import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  LayoutGrid,
  CheckCircle,
  Phone,
  Monitor,
  Loader2,
  Share2,
  X,
  Plus,
  Minus,
  Tag // Added Tag icon for offers
} from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Accordion State
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);

  /* ---------------- HELPER: TRUNCATE TEXT ---------------- */
  const truncateWords = (str, numWords) => {
    if (!str) return "";
    const words = str.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return str;
  };

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URI}courses/${courseId}/`
        );
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Could not load course details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  /* ---------------- TOGGLE MODULE ---------------- */
  const toggleModule = (index) => {
    setActiveModuleIndex(activeModuleIndex === index ? null : index);
  };

  /* ---------------- LOADING ---------------- */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#FFEA00] h-10 w-10" />
      </div>
    );

  /* ---------------- ERROR ---------------- */
  if (error || !course)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Course
        </h2>
        <p className="text-gray-600 mb-6 font-medium">
          {error || "Course not found."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-[#FFEA00] hover:text-black transition-all"
        >
          Go Back
        </button>
      </div>
    );

  /* ---------------- DATA EXTRACTION ---------------- */
  const {
    title,
    description,
    image_url,
    mode = [],
    duration = "Short-term",
    modules = [],
    sub_category = {} // Get sub_category to access pricing
  } = course;

  // Pricing Logic from Sub-Category
  const {
    price: originalPrice,
    offer_percentage,
    is_free
  } = sub_category;

  // Calculate Discounted Price
  let finalPrice = originalPrice;
  if (originalPrice && offer_percentage) {
    finalPrice = Math.round(originalPrice - (originalPrice * (offer_percentage / 100)));
  }

  const displayMode = Array.isArray(mode) ? mode.join(" / ") : mode;
  const enrolled_status = course.enrolled_status || "Open";
  const isOpen = enrolled_status === "Open";

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-white font-sans pb-24">

      {/* 1. HERO SECTION */}
      <div className="relative bg-[#0a0a0a] pt-32 pb-40 px-4 md:px-8 border-b-8 border-[#FFEA00]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#FFEA00] transition-colors mb-8 text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 w-full">
                <span className={`inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-6 border-l-4 ${
                      enrolled_status === "Open" ? "bg-green-900/30 text-green-400 border-green-500" :
                      enrolled_status === "Coming Soon" ? "bg-yellow-900/30 text-yellow-400 border-yellow-500" :
                      "bg-red-900/30 text-red-400 border-red-500"
                }`}>
                  {enrolled_status === "Open" ? "Admissions Open" : enrolled_status}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase leading-none tracking-tight max-w-4xl">
                  {title}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-gray-800 pt-8 mt-8 max-w-3xl">
                  <div className="flex flex-col gap-1">
                     <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Duration</span>
                     <div className="flex items-center gap-2 text-white font-bold">
                        <Clock size={16} className="text-[#FFEA00]" />
                        {duration}
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Format</span>
                     <div className="flex items-center gap-2 text-white font-bold">
                        <Monitor size={16} className="text-[#FFEA00]" />
                        {displayMode}
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Curriculum</span>
                     <div className="flex items-center gap-2 text-white font-bold">
                        <LayoutGrid size={16} className="text-[#FFEA00]" />
                        {modules.length} Modules
                     </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: SYLLABUS & DETAILS */}
          <div className="lg:col-span-2 space-y-10">

            {/* About Section */}
            <div className="bg-white p-8 md:p-10 shadow-xl border-t-4 border-gray-900">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-3">
                 <div className="w-2 h-8 bg-[#FFEA00]"></div>
                 Course Overview
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {description}
              </p>
            </div>

            {/* Syllabus Section */}
            {modules.length > 0 && (
              <div className="bg-white p-8 md:p-10 shadow-xl border-t-4 border-gray-900">
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
                     <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wide flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#FFEA00]"></div>
                        Curriculum
                    </h2>
                </div>

                <div className="flex flex-col">
                  {modules.map((mod, index) => {
                    const isActive = activeModuleIndex === index;
                    const modTitle = typeof mod === "string" ? mod : mod.title || `Module ${index + 1}`;
                    const modContent = typeof mod === "object" ? (mod.description || mod.content || mod.summary) : null;
                    const paddedIndex = (index + 1).toString().padStart(2, '0');

                    return (
                      <div
                        key={index}
                        className={`border-b border-gray-100 last:border-0 transition-all duration-300 ${
                            isActive ? "bg-gray-50 border-l-4 border-l-[#FFEA00] pl-4 -ml-4" : "border-l-4 border-l-transparent"
                        }`}
                      >
                        <div
                            onClick={() => toggleModule(index)}
                            className="flex items-start gap-6 py-6 cursor-pointer group select-none"
                        >
                            <span className={`text-2xl font-bold transition-colors font-mono ${
                                isActive ? "text-[#FFEA00]" : "text-gray-200 group-hover:text-gray-400"
                            }`}>
                                {paddedIndex}
                            </span>

                            <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between gap-4">
                                    <h4 className={`text-lg font-bold leading-tight transition-colors ${
                                        isActive ? "text-gray-900" : "text-gray-700 group-hover:text-black"
                                    }`}>
                                        {isActive ? modTitle : truncateWords(modTitle, 4)}
                                    </h4>

                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                                        isActive ? "bg-black text-[#FFEA00]" : "bg-white border border-gray-200 text-gray-400 group-hover:border-black group-hover:text-black"
                                    }`}>
                                        {isActive ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </div>

                                {isActive && modContent && (
                                    <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-300">
                                        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line border-t border-gray-200 pt-4">
                                            {modContent}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: STICKY ENROLLMENT CARD (UPDATED WITH PRICING) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white shadow-2xl border border-gray-200">
              <div
                className="relative h-56 cursor-pointer group overflow-hidden"
                onClick={() => setShowPreview(true)}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                    <span className="bg-white/90 text-black text-xs font-bold px-4 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Preview
                    </span>
                </div>
                <img
                  src={image_url || "https://via.placeholder.com/400x300"}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-8 space-y-6">

                {/* --- PRICING SECTION --- */}
                <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Course Fee</p>

                    {is_free ? (
                        <div className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-lg text-2xl font-black uppercase tracking-wide border border-green-200">
                            Free Course
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            {/* Final Price */}
                            <div className="text-4xl font-black text-gray-900 leading-none">
                                {finalPrice ? `₹${finalPrice.toLocaleString()}` : "Contact Us"}
                            </div>

                            {/* Original Price & Offer */}
                            {offer_percentage > 0 && (
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-lg text-gray-400 line-through font-medium">
                                        ₹{originalPrice.toLocaleString()}
                                    </span>
                                    <span className="bg-[#FFEA00] text-black text-[10px] font-bold px-2 py-1 uppercase rounded flex items-center gap-1">
                                        <Tag size={10} /> {offer_percentage}% OFF
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full h-px bg-gray-100"></div>

                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle size={16} className="text-green-500" /> Certification upon completion
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle size={16} className="text-green-500" /> Access to study materials
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle size={16} className="text-green-500" /> Expert Mentor Support
                    </li>
                </ul>

                <button
                  onClick={() => isOpen && navigate("/contacts")}
                  disabled={!isOpen}
                  className={`w-full py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                    isOpen ? "bg-[#FFEA00] text-black hover:bg-black hover:text-[#FFEA00] shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isOpen ? <>Enquire Now <ArrowRight size={16} /></> : "Admissions Closed"}
                </button>

                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }}
                    className="w-full py-3 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                    <Share2 size={14} /> Share Course
                </button>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                 <Phone size={14} /> Need Help? +91 99449 40051
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODAL (Kept for preview) */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowPreview(false)} />
          <div className="relative bg-white max-w-2xl w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button className="absolute top-0 right-0 p-4 text-gray-400 hover:text-red-500 transition-colors" onClick={() => setShowPreview(false)}>
              <X size={24} />
            </button>
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wide">Course Syllabus</h3>
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {modules.map((m, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0">
                   <span className="text-gray-300 font-bold text-lg">{(i + 1).toString().padStart(2, '0')}</span>
                   <span className="text-gray-800 font-bold text-lg">
                      {typeof m === "string" ? m : m.title}
                   </span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button onClick={() => setShowPreview(false)} className="text-xs font-bold text-gray-500 uppercase hover:text-black">
                    Close Preview
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
