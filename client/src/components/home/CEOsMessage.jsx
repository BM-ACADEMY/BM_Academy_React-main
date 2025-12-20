import React, { useEffect } from "react";
import { Quote } from "lucide-react";
import image1 from "../../assets/kamar1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

export const CEOsMessage = () => {
  // Initialize Animate on Scroll correctly
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
  }, []);

  return (
    <section className="relative w-full py-20 lg:py-28 bg-white overflow-hidden font-sans">

      {/* --- BACKGROUND: DARK CURVE ON THE RIGHT --- */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 hidden lg:block pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#111111]"
        >
          <path d="M 100 0 L 100 100 L 40 100 C -10 50 40 0 40 0 Z" />
        </svg>

        {/* --- DECORATIVE PATTERNS --- */}
        <div className="absolute top-12 right-12 opacity-30" data-aos="fade-in" data-aos-delay="500">
          <svg width="60" height="60" fill="gray">
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" />
            </pattern>
            <rect width="60" height="60" fill="url(#dots)" />
          </svg>
        </div>

        {/* --- ANIMATED YELLOW ACCENTS --- */}
        {/* Rotating large circle outline */}
        <div className="absolute top-[40%] -right-20 transform -translate-y-1/2 z-0">
           <div className="w-[300px] h-[300px] border-[1px] border-[#FFEA00] rounded-full opacity-30 animate-spin-slow"></div>
        </div>

        {/* Sliding yellow lines */}
        <div className="absolute bottom-1/3 right-20 flex flex-col gap-2" data-aos="fade-left" data-aos-delay="700">
           <div className="w-8 h-1 bg-[#FFEA00] -rotate-45"></div>
           <div className="w-8 h-1 bg-[#FFEA00] -rotate-45"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* --- LEFT CONTENT (Staggered Animation) --- */}
          <div className="pr-0 lg:pr-12">
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4" data-aos="fade-right">
               <span className="h-2 w-2 rounded-full bg-[#FFEA00]"></span>
               <span className="text-[#FFEA00] font-bold uppercase tracking-widest text-sm">
                 Visionary Leadership
               </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight mb-6" data-aos="fade-right" data-aos-delay="100">
              A Message From <br/>
              Our CEO
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8" data-aos="fade-right" data-aos-delay="200">
              Our mission is simple: to help every student discover the right path and make career decisions with clarity and confidence. With tools like <strong className="text-black">SACT</strong> and support from the <strong className="text-black">BM Foundation</strong>.
            </p>

            {/* Quote Box */}
            <div className="relative bg-gray-50 border-l-4 border-[#FFEA00] p-6 mb-8 rounded shadow-sm" data-aos="fade-up" data-aos-delay="300">
               <Quote className="text-[#FFEA00] w-8 h-8 mb-3 fill-current opacity-80" />
               <p className="text-gray-700 font-medium text-lg italic leading-relaxed">
                 "At BM Academy, we don’t just teach — we guide futures. Let’s build a future you’ll be proud of."
               </p>
            </div>

            {/* Signature Block */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4" data-aos="fade-up" data-aos-delay="400">
               <div className="w-12 h-1 bg-[#FFEA00]"></div>
               <div>
                 <h3 className="text-xl font-bold text-[#111111] font-serif">B.Kamarudeen</h3>
                 <p className="text-gray-500 font-bold uppercase text-xs tracking-wide">Founder & CEO</p>
               </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT (Animated Image Area) --- */}
          <div className="relative flex justify-center lg:justify-center" data-aos="zoom-in" data-aos-delay="200">

             {/* Floating Circular Image Container */}
             <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border-[12px] border-white shadow-2xl overflow-hidden z-20 bg-gray-200 animate-float">
                <img
                   src={image1}
                   alt="CEO B.Kamarudeen"
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
             </div>

             {/* Bouncing Quote Accent Bubble */}
             <div className="absolute bottom-0 left-10 lg:left-0 z-30 animate-bounce-gentle">
                <div className="w-16 h-16 bg-[#FFEA00] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Quote className="text-black w-6 h-6 fill-current" />
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style>{`
         @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
         }
         @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
         @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
         }

         .animate-float {
            animation: float 4s ease-in-out infinite;
         }
         .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
         }
         .animate-bounce-gentle {
            animation: bounce-gentle 3s ease-in-out infinite;
         }
      `}</style>
    </section>
  );
};
