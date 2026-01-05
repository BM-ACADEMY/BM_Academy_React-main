import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure AOS CSS is imported
import {
  FaGraduationCap,
  FaLaptopCode,
  FaRobot,
  FaArrowRight
} from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("tech");
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Smooth fade effect when switching tabs
  const handleTabChange = (tab) => {
    if (activeTab === tab) return;
    setIsAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setIsAnimating(false), 300); // Remove animation class after duration
  };

  const tabContent = {
    tech: {
      title: "IT & Tech Courses",
      icon: <FaLaptopCode className="text-xl" />,
      text: "Master in-demand skills like Web Development, Data Science, and Full Stack Engineering to land high-paying tech jobs."
    },
    guidance: {
      title: "AI Career Guidance",
      icon: <FaRobot className="text-xl" />,
      text: "Get free career guidance with our SACT AI Career Test to uncover your true potential and ideal career path.",
    },
    coaching: {
      title: "Govt. Exam Coaching",
      icon: <FaGraduationCap className="text-xl" />,
      text: "Prepare for TNPSC, SSC, and other government exams with expert faculty and proven study materials for success.",
    },
  };

  return (
    <section className="py-20 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* --- LEFT COLUMN: IMAGE COLLAGE --- */}
          <div className="relative" data-aos="fade-right">



            {/* Main Image */}
            <div className="relative z-10 w-[85%] transform transition-transform hover:scale-[1.02] duration-500">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="BM Academy Students"
                className="rounded-lg shadow-2xl w-full object-cover h-[320px] lg:h-[400px]"
              />
            </div>

            {/* Secondary Image (Floating) */}
            <div className="absolute -bottom-10 right-0 w-[55%] z-20 border-8 border-white rounded-lg shadow-xl animate-float-delayed">
              <img
                src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Learning"
                className="w-full object-cover h-[200px]"
              />
            </div>

            {/* Scholarship Badge (Pulse & Float) */}
            <div className="absolute top-[15%] right-0 lg:-right-8 z-30 bg-[#FFEA00] py-4 px-5 shadow-lg text-center animate-float"
                 style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)" }}>
              <span className="block text-3xl font-extrabold text-black leading-none">85%</span>
              <span className="block text-xs font-bold text-black uppercase mt-1">Scholarship<br/>Available</span>
            </div>
          </div>


          {/* --- RIGHT COLUMN: CONTENT --- */}
          <div className="mt-12 lg:mt-0" data-aos="fade-left">



            {/* Main Headline */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight mb-6">
              Launch Your Career with  <br />
              <span className="text-[#d4c300] relative inline-block">
                Top IT Skills & Scholarships!
                {/* Animated Underline */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFEA00] opacity-60" viewBox="0 0 200 9" fill="none">
                  <path d="M2.00025 6.99997C25.7501 2.49994 132.5 -6.49991 198 3.99996" stroke="currentColor" strokeWidth="3" strokeDasharray="200" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
                  </path>
                </svg>
              </span>
            </h1>

            {/* --- UPDATED TEXT CONTENT --- */}
            <p
  className="text-gray-600 text-lg leading-relaxed mb-8"
  data-aos="fade-up"
  data-aos-delay="200"
>
  Jumpstart your career with BM Academy’s SAT Program and unlock
  <span className="font-bold text-black"> high-growth IT opportunities</span>.
  Build <span className="font-bold text-black">future-ready digital skills</span> and secure up to
  <span className="font-bold text-black"> 85% scholarship</span>.
  Excel in exams with expert-led government coaching and step confidently into your dream career.
</p>


            {/* --- INTERACTIVE TABS --- */}
            <div className="mb-8" data-aos="fade-up" data-aos-delay="400">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-1">
                {Object.keys(tabContent).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex items-center gap-2 px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-300 rounded-t-md relative overflow-hidden
                      ${activeTab === key
                        ? "text-black translate-y-[1px]"
                        : "text-gray-400 hover:text-gray-800"
                      }`}
                  >
                    {/* Background slide animation for active tab */}
                    {activeTab === key && (
                      <span className="absolute inset-0 bg-[#FFEA00] -z-10 animate-slide-up"></span>
                    )}

                    {tabContent[key].icon}
                    <span className="hidden sm:inline">{tabContent[key].title}</span>
                  </button>
                ))}
              </div>

              {/* Active Content Area */}
              <div className={`bg-gray-50 p-6 border-l-4 border-[#FFEA00] rounded-r-lg shadow-sm transition-all duration-300 min-h-[120px] ${isAnimating ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
                 <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                   {tabContent[activeTab].title}
                 </h3>
                 <p className="text-gray-600">
                   {tabContent[activeTab].text}
                 </p>
              </div>
            </div>

            {/* Location Text */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
               Available in Pondicherry, Tamil Nadu, & Across India
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="600">
              <a
                href="https://scat-topaz.vercel.app/Sact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#FFEA00] text-black font-bold rounded shadow-lg hover:shadow-xl hover:bg-[#ffe600] transition-all flex items-center justify-center gap-3 group transform hover:-translate-y-1"
              >
                Try AI Career Test
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/courses"
                className="px-8 py-4 border-2 border-gray-200 text-gray-800 font-bold rounded hover:border-[#FFEA00] hover:text-[#d4c300] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                <FiTarget size={20} />
                Explore Courses
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translate(-50%, -50%); }
          50% { transform: translateY(-10px) translate(-50%, -50%); }
        }
        @keyframes float-simple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        /* Uses simple float for items not centered with translate(-50%,-50%) */
        .animate-float-delayed {
          animation: float-simple 3.5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
