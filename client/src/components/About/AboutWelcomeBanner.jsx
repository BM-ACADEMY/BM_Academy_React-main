import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// Importing professional icons instead of emojis
import { FaBullseye, FaPhoneAlt } from "react-icons/fa";

export default function AboutWelcomeBanner() {
  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* --- BACKGROUND SKEW EFFECT --- */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[#111111] transform -skew-x-12 translate-x-20 md:translate-x-32 z-0"></div>
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[#111111] transform -skew-x-12 translate-x-24 md:translate-x-40 opacity-50 z-0 border-l-8 border-[#FFEA00]"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row items-center">

        {/* --- LEFT CONTENT --- */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12" data-aos="fade-right">

          {/* Skewed Label */}
          <div className="inline-block px-3 py-1 bg-[#FFEA00] text-black font-bold uppercase tracking-widest text-xs mb-4 skew-x-[-10deg]">
              <span className="block skew-x-[10deg]">About Us</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] leading-none mb-6">
            More Than Just <br /> Courses — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA00] to-yellow-600">
              We Build Futures
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
            Empowering students with career clarity, real-world skills & scholarships
            across Tamil Nadu and India.
          </p>
        </div>

        {/* --- RIGHT CONTENT (Buttons) --- */}
        <div className="w-full md:w-1/2 flex flex-wrap justify-center md:justify-start gap-6 md:pl-10" data-aos="fade-left">

          {/* Button 1: Career Test */}
          <a
            href="/sact"
            className="flex items-center gap-3 px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider rounded shadow-xl hover:bg-white hover:scale-105 transform transition-all duration-300 group"
          >
            <FaBullseye className="text-xl group-hover:rotate-12 transition-transform" />
            <span>Try Career Test</span>
          </a>

          {/* Button 2: Contact Us */}
          <a
            href="/contact"
            className="flex items-center gap-3 px-8 py-4 bg-[#111111] border-2 border-[#FFEA00] text-[#FFEA00] font-bold uppercase tracking-wider rounded shadow-xl hover:bg-[#FFEA00] hover:text-black hover:scale-105 transform transition-all duration-300 group"
          >
            <FaPhoneAlt className="text-lg group-hover:shake" />
            <span>Contact Us</span>
          </a>

        </div>

      </div>
    </section>
  );
}
