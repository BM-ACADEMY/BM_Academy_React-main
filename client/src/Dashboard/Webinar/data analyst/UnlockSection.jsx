import React, { useEffect } from "react";
import downloadImg from "../../../assets/img/download (1).png";
import { initAOS } from "../../../utils/aosConfig";

const UnlockSection = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section
      id="unlock"
      className="relative w-full py-20 
                 bg-gradient-to-br from-[#fff7f6] via-[#ffece9] to-[#f7d5ce]
                 overflow-hidden"
    >
      {/* Floating shapes - warm soft tones */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="floating-shape bg-[#f7d5ce]/50 w-16 h-16 rounded-full top-[25%] left-[15%] blur-2xl"></div>
        <div className="floating-shape bg-[#f7b8ac]/30 w-10 h-10 rounded-full bottom-[20%] right-[20%] blur-xl"></div>
        <div className="floating-shape bg-[#fcdcd6]/40 w-20 h-20 rounded-full top-[55%] right-[5%] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* LEFT TEXT */}
          <div
            className="flex-1 space-y-6 text-left"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
              data-aos="zoom-in"
            >
              Unlock Your  
              <br />
              <span className="text-orange-700">Career in Data Analytics</span>
              <br />
              with BM Academy
            </h2>

            <p
              className="text-gray-700 text-lg max-w-lg leading-relaxed"
              data-aos="fade-up"
            >
              Start your journey into **Data Analytics** with our
              beginner-friendly, expert-led session. 
              Learn the essential tools used by top companies to analyze
              data, build dashboards, and drive business decisions.
            </p>

            {/* Data Analytics Points */}
            <ul
              className="space-y-3 text-gray-800 text-md font-medium"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <li> Excel for Data Cleaning & Analytics</li>
              <li> SQL Queries & Database Fundamentals</li>
              <li> Power BI Dashboard Building</li>
              <li> Python for Data Science (Beginner Level)</li>
              <li> Real-World Data Projects</li>
              <li> Build a Portfolio with Case Studies</li>
            </ul>

            <a
              href="#register"
              data-aos="fade-up"
              data-aos-delay="350"
              className="inline-block mt-4 px-8 py-4 bg-orange-600 text-white font-semibold 
                         rounded-xl shadow-lg hover:bg-orange-700 hover:scale-105 
                         active:scale-95 transition-all"
            >
              Start Learning Data Analytics
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="flex-1 flex justify-center relative"
            data-aos="zoom-in-up"
          >
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#f7d5ce]/40 rounded-full blur-3xl -z-10"></div>

            <img
              src={downloadImg}
              alt="Data Analytics Learning"
              className="w-full max-w-md rounded-3xl shadow-xl transition-transform hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default UnlockSection;
