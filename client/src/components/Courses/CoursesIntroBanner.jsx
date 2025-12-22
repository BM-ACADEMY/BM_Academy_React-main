import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBookOpen, FaChalkboardTeacher, FaArrowRight } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CoursesIntroBannerV4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleCardClick = (index) => {
    navigate("/courses", { state: { courseIndex: index } });
  };

  // --- UPDATED CARD ORDER ---
  const cards = [
    {
      icon: <FaChalkboardTeacher size={24} />,
      title: "IT Career Skills",
      desc: "Full Stack, AI, Data Science",
      index: 1 // Keeps original routing index if needed, or change to 0 if your backend expects 0
    },
    {
      icon: <IoIosRocket size={24} />,
      title: "Career Guidance",
      desc: "AI Tests & Mentorship",
      index: 2
    },
    {
      icon: <FaBookOpen size={24} />,
      title: "Govt Exam Prep",
      desc: "TNPSC, SSC, Banking",
      index: 0
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* --- BACKGROUND SKEW EFFECT --- */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[#111111] transform -skew-x-12 translate-x-20 md:translate-x-32 z-0"></div>
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[#111111] transform -skew-x-12 translate-x-24 md:translate-x-40 opacity-50 z-0 border-l-8 border-[#FFEA00]"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row items-center">

        {/* --- LEFT CONTENT (Text) --- */}
        <div className="w-full md:w-1/3 mb-12 md:mb-0 md:pr-10" data-aos="fade-right">
          <div className="inline-block px-3 py-1 bg-[#FFEA00] text-black font-bold uppercase tracking-widest text-xs mb-4 skew-x-[-10deg]">
             <span className="block skew-x-[10deg]">Why Choose Us?</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] leading-none mb-6">
            EMPOWER <br />
            YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA00] to-yellow-600">
              FUTURE
            </span>
          </h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
            Expert-led courses designed to take you from <span className="text-black font-bold">beginner</span> to <span className="text-black font-bold">hired professional</span>.
          </p>

          <button
             onClick={() => navigate('/courses')}
             className="hidden md:inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white font-bold uppercase tracking-wider hover:bg-[#FFEA00] hover:text-black transition-all duration-300 shadow-xl"
          >
            View All Courses <FaArrowRight />
          </button>
        </div>

        {/* --- RIGHT CONTENT (Cards) --- */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(card.index)}
              className="group cursor-pointer relative bg-[#1a1a1a] p-8 hover:bg-[#FFEA00] transition-colors duration-300 shadow-2xl border-b-4 border-[#FFEA00]"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-black/50 rounded-full text-[#FFEA00] group-hover:bg-black group-hover:text-white transition-all duration-300">
                {card.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-black transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-900 transition-colors font-medium">
                {card.desc}
              </p>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 text-gray-700 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-[-45deg]">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button (Visible only on small screens) */}
        <div className="w-full mt-12 md:hidden">
           <button
             onClick={() => navigate('/courses')}
             className="w-full flex justify-center items-center gap-3 px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider shadow-xl"
          >
            View All Courses <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CoursesIntroBannerV4;
