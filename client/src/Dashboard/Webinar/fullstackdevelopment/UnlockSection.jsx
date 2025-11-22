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
              <span className="text-orange-700">Full-Stack Development Career</span>
              <br />
              with BM Academy
            </h2>

            <p
              className="text-gray-700 text-lg max-w-lg leading-relaxed"
              data-aos="fade-up"
            >
              Kickstart your journey into **Full-Stack Web Development** with our 
              beginner-friendly, expert-led training.  
              Learn how to build modern, scalable applications from **frontend to backend**
              using the technologies top companies trust.
            </p>

            {/* Full-Stack Points */}
            <ul
              className="space-y-3 text-gray-800 text-md font-medium"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <li> HTML, CSS & Responsive Web Design</li>
              <li> JavaScript Essentials for Development</li>
              <li> React.js Frontend Development</li>
              <li> Node.js & Express.js Backend APIs</li>
              <li> MongoDB Database Integration</li>
              <li> Deploy Full-Stack Apps to Cloud</li>
            </ul>

            <a
              href="#register"
              data-aos="fade-up"
              data-aos-delay="350"
              className="inline-block mt-4 px-8 py-4 bg-orange-600 text-white font-semibold 
                         rounded-xl shadow-lg hover:bg-orange-700 hover:scale-105 
                         active:scale-95 transition-all"
            >
              Start Learning Full-Stack Development
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
              alt="Full-Stack Web Development"
              className="w-full max-w-md rounded-3xl shadow-xl transition-transform hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default UnlockSection;
