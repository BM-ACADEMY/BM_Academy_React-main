import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaRobot,
  FaBriefcase,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const WhyChooseUs = () => {
  // BM Academy Brand Colors
  const BRAND_YELLOW = "#FFEA00";

  const features = [
    {
      id: 1,
      title: "1100+ Students Trained",
      description: "Proven success in coaching & career building across multiple disciplines.",
      icon: <FaUserGraduate size={24} />,
    },
    {
      id: 2,
      title: "Free AI Career Guider",
      description: "Personalized guidance with our AI-powered SACT tool to find your path.",
      icon: <FaRobot size={24} />,
    },
    {
      id: 3,
      title: "Job-Oriented Courses",
      description: "Hands-on practical learning designed to make you immediately career-ready.",
      icon: <FaBriefcase size={24} />,
    },
    {
      id: 4,
      title: "Scholarships Available",
      description: "Up to 85% off via our SAT scholarship program for deserving students.",
      icon: <FaGraduationCap size={24} />,
    },
  ];

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden font-sans">

      {/* Background Decoration (Subtle Static Glow) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFEA00]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#FFEA00]"></span>
            <span className="text-[#FFEA00] font-bold uppercase tracking-widest text-xs">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            We Are BM Academy Features
          </h2>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature) => {
            // Logic: Is this specific card being hovered?
            const isHovered = hoveredId === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                // STABLE LAYOUT: Fixed borders, no scaling.
                // Border Color Change: Slate-700 (Default) -> #FFEA00 (Hover)
                className={`relative pt-12 pb-16 px-6 text-center rounded-3xl border-2 cursor-default transition-colors duration-300
                  ${
                    isHovered
                      ? "bg-slate-800 border-[#FFEA00] z-10" // Hover: Dark bg, Yellow Border
                      : "bg-slate-800/40 border-slate-700" // Default: Transparent bg, Grey Border
                  }`}
              >
                {/* Title */}
                <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${isHovered ? "text-white" : "text-slate-200"}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isHovered ? "text-slate-300" : "text-slate-500"}`}>
                  {feature.description}
                </p>

                {/* --- ICON BUBBLE (Bottom Center) --- */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-20">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-xl transition-colors duration-300
                      ${
                        isHovered
                          ? "bg-[#FFEA00] text-black border-slate-900" // Hover: Yellow Bubble, Black Icon
                          : "bg-slate-700 text-slate-300 border-slate-900" // Default: Grey Bubble
                      }`}
                  >
                    {feature.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- CTA BUTTONS --- */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFEA00] text-black font-bold uppercase text-sm tracking-wider hover:bg-white transition-colors duration-300"
          >
            <FaRocket size={16} />
            Join Now
          </Link>

          <a
            href="tel:+918270652229"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-slate-600 text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-black hover:border-white transition-colors duration-300"
          >
            <IoIosCall size={18} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
