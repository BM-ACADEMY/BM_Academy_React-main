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
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="floating-shape bg-[#f7d5ce]/50 w-16 h-16 rounded-full top-[25%] left-[15%] blur-2xl"></div>
        <div className="floating-shape bg-[#f7b8ac]/30 w-10 h-10 rounded-full bottom-[20%] right-[20%] blur-xl"></div>
        <div className="floating-shape bg-[#fcdcd6]/40 w-20 h-20 rounded-full top-[55%] right-[5%] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-16">

          {/* LEFT CONTENT */}
          <div
            className="flex-1 flex flex-col justify-center 
                       space-y-6 px-2 md:px-0 
                       h-auto md:h-[430px]"
            data-aos="fade-right"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Full-Stack Development  
              <br />
              <span className="text-orange-700">Career</span>
              <br />
              with BM Academy
            </h2>

            <p className="text-gray-700 text-base md:text-lg max-w-lg leading-relaxed">
              Build modern, scalable web applications from the ground up. Our
              expert-led training gives you the skills to design, develop, and
              deploy full-stack applications confidently and professionally.
            </p>

            <a
              href="#register"
              className="inline-block mt-3 px-6 md:px-8 py-3 md:py-4 
                         bg-orange-600 text-white font-semibold 
                         rounded-xl shadow-md hover:bg-orange-700 
                         hover:scale-105 active:scale-95 transition-all 
                         text-sm md:text-base"
            >
              Start Learning Full-Stack Development
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="flex-1 flex justify-center relative"
            data-aos="zoom-in-up"
          >
            <img
              src={downloadImg}
              alt="Full-Stack Development"
              className="w-full max-w-sm md:max-w-md 
                         rounded-2xl md:rounded-3xl shadow-xl 
                         object-cover
                         h-auto md:h-[430px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default UnlockSection;
