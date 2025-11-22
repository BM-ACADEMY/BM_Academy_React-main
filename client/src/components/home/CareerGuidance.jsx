import React from "react";
import { FiTarget } from "react-icons/fi";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";

const SACTBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 py-16 px-4 md:px-16 rounded-2xl mt-12 shadow-lg overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="md:w-2/3" data-aos="fade-right">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
            Free Career Guidance with{" "}
            <span className="text-yellow-500">SACT</span>
          </h2>
          <p className="text-gray-700 mb-6 text-lg md:text-xl leading-relaxed">
            Not sure what career suits you? Try our AI-powered{" "}
            <span className="font-semibold text-yellow-600">SACT Test</span> and
            discover your perfect path!
          </p>

          <ul className="space-y-3 mb-8 text-gray-700">
            <li className="flex items-center gap-3">
              <FiTarget className="text-yellow-600" size={20} />
              <span>Understand your interests, strengths & best-fit careers</span>
            </li>
            <li className="flex items-center gap-3">
              <FaFileAlt className="text-yellow-600" size={20} />
              <span>Get instant PDF report + scholarship info</span>
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600" size={20} />
              <span>100% Free | No Course Selling | Just Career Clarity</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://scat-topaz.vercel.app/Sact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-yellow-400 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Take SACT Test Now
            </a>

            <a
              href="/how-it-works"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/3 flex justify-center items-center" data-aos="fade-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Career Guidance Illustration"
            className="w-64 md:w-80 h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default SACTBanner;
