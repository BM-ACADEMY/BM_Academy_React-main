import React, { useEffect } from "react";
import { FiTarget, FiArrowRight } from "react-icons/fi";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi"; // Icon for How It Works
import AOS from "aos";
import "aos/dist/aos.css";

const SACTBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    // REMOVED: 'border-t-4 border-[#FFEA00]' class
    <section className="relative py-20 bg-gray-50 overflow-hidden">

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="md:w-3/5" data-aos="fade-right">

            {/* BRAND EYEBROW LABEL */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#FFEA00]"></div>
              <span className="text-[#111111] font-bold tracking-[0.2em] uppercase text-sm">
                AI Career Guidance
              </span>
            </div>

            {/* HEADLINE */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#111111] leading-tight">
              Free Career Guidance with{" "}
              <span className="relative inline-block">
                <span className="relative z-10">SACT</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFEA00] -z-0 opacity-60"></span>
              </span>
            </h2>

            {/* SUBHEADLINE & DESCRIPTION */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Not sure what career suits you? Try our AI-powered SACT Test!
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl">
              Take the <span className="font-bold text-black">SACT – Smart Aptitude & Career Test</span> and get your free personalized career report in minutes.
            </p>

            {/* BENEFITS LIST */}
            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-yellow-50 rounded-full text-[#d4c300] mt-1 shrink-0">
                  <FiTarget size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  Understand your interests, strengths & best-fit careers
                </span>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2 bg-yellow-50 rounded-full text-[#d4c300] mt-1 shrink-0">
                  <FaFileAlt size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  Get instant PDF report + scholarship info
                </span>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2 bg-green-50 rounded-full text-green-600 mt-1 shrink-0">
                  <FaCheckCircle size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  100% Free | No Course Selling | Just Career Clarity
                </span>
              </li>
            </ul>

            {/* --- UPDATED BUTTONS --- */}
            <div className="flex flex-col sm:flex-row gap-5">

              {/* Button 1: Primary (Yellow) */}
              <a
                href="https://scat-topaz.vercel.app/Sact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider rounded shadow-md hover:bg-black hover:text-[#FFEA00] transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span>Take Free Career Test</span>
                <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Button 2: Secondary (Black) - Matches CallToAction style */}
              <a
                href="/how-it-works"
                className="group px-8 py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded shadow-md border-2 border-[#111111] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <HiOutlineLightBulb className="text-xl group-hover:scale-110 transition-transform" />
                <span>How It Works</span>
              </a>

            </div>
            {/* --- END BUTTONS --- */}

          </div>

          {/* --- RIGHT COLUMN: IMAGE --- */}
          <div className="md:w-2/5 flex justify-center relative" data-aos="fade-left">
            <div className="absolute inset-0 bg-[#FFEA00] opacity-20 rounded-full blur-3xl transform translate-x-4 translate-y-4"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="SACT Career Guidance"
              className="relative z-10 w-full max-w-xs md:max-w-sm drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SACTBanner;
