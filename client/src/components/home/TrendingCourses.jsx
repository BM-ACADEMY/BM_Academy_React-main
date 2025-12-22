// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function TrendingCourses() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BASE_URI}courses/`);
//         if (!res.ok) throw new Error("Failed to fetch courses");
//         const data = await res.json();

//         const courseList = Array.isArray(data) ? data.slice(0, 6) : [];
//         setCourses(courseList);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//         setError("Could not load courses");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const getCourseId = (c) => c._id?.$oid || c.id || c._id || null;

//   if (loading)
//     return (
//       <div className="text-center py-20 text-gray-500 text-lg">
//         Loading courses...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-red-400">
//         <p>{error}</p>
//       </div>
//     );

//   return (
//     <section className="bg-white py-20 px-6 md:px-16">
//       {/* Header */}
//       <div className="text-center mb-14">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//           Top-Rated Courses For Your Success!
//         </h2>
//         <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
//           Learn from industry experts and gain the skills you need to succeed in your career.
//         </p>
//       </div>

//       {/* Courses Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {courses.length > 0 ? (
//           courses.map((course) => {
//             const id = getCourseId(course);
//             if (!id) return null;

//             return (
//               <div
//                 key={id}
//                 className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
//               >
//                 {course.image_url && (
//                   <img
//                     src={course.image_url}
//                     alt={course.title}
//                     className="w-full h-48 object-cover rounded-t-xl"
//                   />
//                 )}
//                 <div className="p-6 text-left">
//                   <p className="text-xs text-gray-500 mb-2">
//                     ⏱️ Duration: {course.duration || "Flexible"} |{" "}
//                     {course.type || "Certificate Included"}
//                   </p>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {course.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 line-clamp-3 mb-4">
//                     {course.description}
//                   </p>
//                   <button
//                     onClick={() => navigate(`/courses/${id}`)}
//                     className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1"
//                   >
//                     Enquire →
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center col-span-3 text-gray-500">
//             No courses available right now.
//           </p>
//         )}
//       </div>

//       {/* Why Choose Section */}
//       <div className="mt-24 text-center max-w-6xl mx-auto">
//         <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
//           Why Choose Our Courses?
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {[
//             {
//               icon: "🚀",
//               title: "Learn In-Demand Skills",
//               desc: "Stay ahead of the competition with the latest technologies.",
//             },
//             {
//               icon: "🎓",
//               title: "Expert Instructors",
//               desc: "Learn from certified and experienced professionals.",
//             },
//             {
//               icon: "💼",
//               title: "Career Support",
//               desc: "Get guidance to land your dream job after the course.",
//             },
//             {
//               icon: "🏆",
//               title: "Recognized Certificates",
//               desc: "Showcase your achievement with industry-recognized credentials.",
//             },
//           ].map((f, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <div className="text-4xl mb-4">{f.icon}</div>
//               <h4 className="font-semibold text-lg text-gray-900 mb-2">
//                 {f.title}
//               </h4>
//               <p className="text-gray-600 text-sm">{f.desc}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-14">
//           <Link
//             to="/courses"
//             className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-all duration-300"
//           >
//             Explore All Courses
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Star, ArrowRight, BarChart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TrendingCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- CONFIGURATION ---
  const THEME = {
    bg: "#0B1120",        // Deep Navy Background
    cardBg: "#151F32",    // Slightly Lighter Navy for Cards
    yellow: "#FFEA00",    // Brand Yellow
    textMain: "#FFFFFF",
    textMuted: "#94A3B8"  // Slate-400
  };

  useEffect(() => {
    // Initialize Scroll Animations
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });

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
        // Refresh AOS after data loads to ensure positions are correct
        setTimeout(() => AOS.refresh(), 100);
      }
    };
    fetchCourses();
  }, []);

  const getCourseId = (c) => c._id?.$oid || c.id || c._id || null;

  // --- LOADING SKELETON ---
  if (loading) return (
    <div className="py-24 px-6" style={{ backgroundColor: THEME.bg }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl h-96 animate-pulse opacity-50" style={{ backgroundColor: THEME.cardBg }}></div>
        ))}
      </div>
    </div>
  );

  if (error) return <div className="text-center py-24 text-red-400" style={{ backgroundColor: THEME.bg }}>{error}</div>;

  return (
    <section className="relative py-24 px-6 md:px-12 font-sans overflow-hidden" style={{ backgroundColor: THEME.bg }}>

      {/* --- BACKGROUND GLOW --- */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"
        data-aos="fade"
        data-aos-duration="1500"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-16" data-aos="fade-down">
  <div className="inline-block px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6 backdrop-blur-sm">
    <span
      className="text-sm font-bold tracking-widest uppercase"
      style={{ color: THEME.yellow }}
    >
      Top Trending
    </span>
  </div>

  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
    Top <span style={{ color: THEME.yellow }}>Trending Courses</span> for{" "}
    <span className="whitespace-nowrap">Students & Job Seekers</span>
  </h1>

  <p
    className="max-w-2xl mx-auto text-lg leading-relaxed"
    style={{ color: THEME.textMuted }}
  >
    Highlighting our most in-demand courses with quick navigation to help you
    choose the right path faster.
  </p>
</div>


        {/* --- COURSES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const id = getCourseId(course);
            if (!id) return null;

            return (
              <div
                key={id}
                onClick={() => navigate(`/courses/${id}`)}
                // Staggered Animation Delay based on index
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer flex flex-col border border-white/5 hover:border-[#FFEA00] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,234,0,0.15)]"
                style={{ backgroundColor: THEME.cardBg }}
              >

                {/* --- IMAGE HEADER --- */}
                <div className="relative h-52 overflow-hidden">
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <BookOpen size={40} className="text-slate-600" />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151F32] to-transparent opacity-90"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
                    {course.category || "Development"}
                  </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="p-8 pt-2 flex flex-col flex-grow relative">

                  {/* Floating Icon */}
                  <div
                    className="absolute -top-8 right-6 w-14 h-14 rounded-full bg-[#1F2937] border-4 border-[#151F32] flex items-center justify-center group-hover:border-[#FFEA00] transition-colors duration-300 shadow-xl z-20"
                  >
                     <BarChart size={24} style={{ color: THEME.yellow }} />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="fill-current" style={{ color: THEME.yellow }} />
                    <span className="text-white font-bold text-sm">4.9</span>
                    <span className="text-xs" style={{ color: THEME.textMuted }}>(120 Reviews)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#FFEA00] transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed line-clamp-2 mb-6 flex-grow" style={{ color: THEME.textMuted }}>
                    {course.description}
                  </p>

                  {/* Info Row */}
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                      <Clock size={16} style={{ color: THEME.yellow }} />
                      <span>{course.duration || "Flexible"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                      <BookOpen size={16} style={{ color: THEME.yellow }} />
                      <span>{course.level || "Beginner"}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 bg-white/5 text-white border border-transparent group-hover:bg-[#FFEA00] group-hover:text-black group-hover:border-[#FFEA00] overflow-hidden relative">
                    <span className="relative z-10">View Course</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <button
             onClick={() => navigate('/courses')}
             className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,234,0,0.4)]"
             style={{ backgroundColor: THEME.yellow }}
          >
            Explore All Courses
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
