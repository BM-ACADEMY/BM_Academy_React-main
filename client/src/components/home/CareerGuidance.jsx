import React, { useEffect } from "react";
import { FiTarget, FiArrowRight } from "react-icons/fi";
import { FaFileAlt, FaCheckCircle, FaGraduationCap } from "react-icons/fa"; // Added FaGraduationCap
import { HiOutlineLightBulb } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

const SACTBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
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
              Not sure which career suits you best? Take our AI-powered SACT Test and get a personalized career report — 100% free.
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl">
              With <span className="font-bold text-black">SACT – Smart Aptitude & Career Test</span> you’ll receive guidance that helps you choose the right path confidently.
            </p>

            {/* --- NEW BENEFITS LIST --- */}

            {/* List Title */}
            <h4 className="text-xl font-extrabold text-[#111111] mb-5">
              What You Get:
            </h4>

            <ul className="space-y-4 mb-10">

              {/* Item 1 */}
              <li className="flex items-center gap-4">
                <div className="p-2 bg-yellow-50 rounded-full text-[#d4c300] shrink-0 flex items-center justify-center">
                  <FiTarget size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg leading-snug">
                  Know your interests, strengths & best-fit career paths
                </span>
              </li>

              {/* Item 2 */}
              <li className="flex items-center gap-4">
                <div className="p-2 bg-yellow-50 rounded-full text-[#d4c300] shrink-0 flex items-center justify-center">
                  <FaFileAlt size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg leading-snug">
                  Instant PDF career report with insights
                </span>
              </li>

              {/* Item 3 */}
              <li className="flex items-center gap-4">
                <div className="p-2 bg-yellow-50 rounded-full text-[#d4c300] shrink-0 flex items-center justify-center">
                  <FaGraduationCap size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg leading-snug">
                  Scholarship eligibility details included
                </span>
              </li>

              {/* Item 4 */}
              <li className="flex items-center gap-4">
                <div className="p-2 bg-green-50 rounded-full text-green-600 shrink-0 flex items-center justify-center">
                  <FaCheckCircle size={20} />
                </div>
                <span className="text-gray-700 font-medium text-lg leading-snug">
                  No selling — just clarity for your future
                </span>
              </li>

            </ul>

            {/* --- BUTTONS --- */}
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

              {/* Button 2: Secondary (Black) */}
              <a
                href="https://scat-topaz.vercel.app/Sact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded shadow-md border-2 border-[#111111] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <HiOutlineLightBulb className="text-xl group-hover:scale-110 transition-transform" />
                <span>How It Works</span>
              </a>

            </div>

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
