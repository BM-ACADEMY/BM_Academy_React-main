import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBrain, FaInfoCircle, FaStar } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";


export default function SACTHeroSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

return (
    <section className="relative bg-gray-50 py-20 px-6 pt-28">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Top Icon */}
        <div data-aos="zoom-in" className="flex justify-center">
          
        </div>

        <h2 data-aos="zoom-in" className="text-4xl md:text-5xl font-bold text-gray-900">
          SACT – Smart Aptitude & Career Test
        </h2>

        <p data-aos="fade-up" className="text-lg text-gray-700">
          100% FREE Career Clarity Tool for Students<br className="hidden md:block" />
          Powered by BM Academy • Supported by BM Foundation
        </p>

        <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 leading-relaxed">
          Choosing the right career after 10th, 12th, or college can be tough — especially if you're unsure of your strengths
          or interests. That’s why we created SACT, a completely FREE AI-based career test that helps you discover your best-fit
          career — backed by BM Academy and supported by BM Foundation.
        </p>

        {/* Buttons */}
        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="/sact"
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold shadow hover:bg-yellow-600 hover:scale-105 transition flex items-center gap-2"
          >
            <IoRocketOutline className="text-xl" />
            Take the Free Career Test
          </a>
          <a
            href="/apply"
            className="px-6 py-3 bg-black text-yellow-400 rounded-lg font-semibold shadow hover:bg-gray-800 hover:scale-105 transition flex items-center gap-2"
          >
            <FaInfoCircle className="text-yellow-400" />
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}