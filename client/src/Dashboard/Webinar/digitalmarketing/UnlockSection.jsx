import React, { useEffect } from "react";
import downloadImg from "../../../assets/img/download (1).png";
import { initAOS } from "../../../utils/aosConfig";

const UnlockSection = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section
      className="relative w-full bg-gradient-to-br from-white via-[#fff5f3] to-[#ffe9e4] py-20 overflow-hidden"
      id="unlock"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape bg-[#ff6a3d]/30 w-10 h-10 rounded-full top-[30%] right-[10%]"></div>
        <div className="floating-shape bg-[#cb2800]/10 w-10 h-10 rounded-full bottom-[15%] left-[20%]"></div>
        <div className="floating-shape bg-[#ff6a3d]/15 w-14 h-14 rounded-full bottom-[25%] right-[25%]"></div>
        <div className="floating-shape bg-[#cb2800]/25 w-10 h-10 rounded-full top-[60%] left-[5%]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* LEFT SECTION */}
        <div
          className="flex-1 text-center space-y-6"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Unlock Your <br className="hidden md:block" />

            <span className="bg-gradient-to-r from-[#cb2800] to-[#ff6a3d] bg-clip-text text-transparent inline-block">
              Digital Future
            </span>
            <br className="hidden md:block" />

            with <span className="text-gray-900">BM Academy</span>
          </h2>

          <p
            className="text-gray-700 text-lg leading-relaxed max-w-lg mx-auto"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            No age limit. No experience required. <br />
            Learn the secrets of digital marketing from real success stories
            across{" "}
            <span className="font-semibold text-[#cb2800]">Tamil Nadu</span> — 
            guided by BM Academy’s expert trainers.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="flex-1 flex justify-center relative"
          data-aos="zoom-in-up"
          data-aos-delay="500"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#cb2800]/10 rounded-full blur-3xl -z-10"></div>
          <img
            src={downloadImg}
            alt="Digital Future"
            className="w-full max-w-md rounded-3xl shadow-2xl transition-transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default UnlockSection;
