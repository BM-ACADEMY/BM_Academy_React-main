import React, { useEffect } from "react";
import { Quote } from "lucide-react";
import image1 from "../../assets/kamar1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

export const CEOsMessage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
  }, []);

  return (
    <section className="relative w-full py-16 lg:py-28 bg-white overflow-hidden font-sans">

      {/* --- BACKGROUND: DARK CURVE ON THE LEFT (Behind Image) --- */}
      {/* Moved to left-0 and flipped horizontally using -scale-x-100 to mirror the design */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full z-0 hidden lg:block pointer-events-none transform -scale-x-100">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#111111]"
        >
          <path d="M 100 0 L 100 100 L 40 100 C -10 50 40 0 40 0 Z" />
        </svg>

        {/* Decorative Dots */}
        <div className="absolute top-12 right-12 opacity-30">
          <svg width="60" height="60" fill="gray">
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" />
            </pattern>
            <rect width="60" height="60" fill="url(#dots)" />
          </svg>
        </div>

        {/* Animated Yellow Circle */}
        <div className="absolute top-[40%] -right-20 transform -translate-y-1/2 z-0">
           <div className="w-[300px] h-[300px] border-[1px] border-[#FFEA00] rounded-full opacity-30 animate-spin-slow"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* GRID LAYOUT:
            Since Image is the first child, it will be:
            - Top on Mobile (col-span-1)
            - Left on Desktop (grid-cols-2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* --- COLUMN 1: IMAGE (Top on Mobile, Left on Desktop) --- */}
          <div className="relative flex justify-center lg:justify-center" data-aos="zoom-in" data-aos-delay="100">

             {/* Floating Circular Image Container */}
             <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border-[8px] lg:border-[12px] border-white shadow-2xl overflow-hidden z-20 bg-gray-200 animate-float">
                <img
                   src={image1}
                   alt="CEO B.Kamarudeen"
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
             </div>

             {/* Bouncing Quote Bubble (Positioned on Right for this layout) */}
             <div className="absolute bottom-0 right-6 lg:right-0 z-30 animate-bounce-gentle">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#FFEA00] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Quote className="text-black w-5 h-5 lg:w-6 lg:h-6 fill-current" />
                </div>
             </div>
          </div>

          {/* --- COLUMN 2: TEXT (Bottom on Mobile, Right on Desktop) --- */}
          <div className="pl-0 lg:pl-12 text-center lg:text-left">

            {/* Tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4" data-aos="fade-left">
               <span className="h-2 w-2 rounded-full bg-[#FFEA00]"></span>
               <span className="text-[#111111] font-bold uppercase tracking-widest text-sm">
                 Visionary Leadership
               </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#111111] leading-tight mb-6" data-aos="fade-left" data-aos-delay="100">
              A Message From Our CEO
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8" data-aos="fade-left" data-aos-delay="200">
              Our mission is simple: help every student discover the right path and make career decisions with clarity and confidence—supported by tools like <strong className="text-black">SACT</strong> and the <strong className="text-black">BM Foundation</strong>.
            </p>

            {/* Quote Box with Integrated Signature */}
            <div className="relative bg-gray-50 border-l-4 border-[#FFEA00] p-6 lg:p-8 rounded shadow-sm text-left" data-aos="fade-up" data-aos-delay="300">
               <Quote className="text-[#FFEA00] w-8 h-8 mb-4 fill-current opacity-80" />

               <p className="text-gray-800 font-medium text-lg italic leading-relaxed mb-6">
                 "At BM Academy, we don’t just teach — we guide futures. Let’s build a future you’ll be proud of."
               </p>

               {/* Signature */}
               <div className="flex items-center gap-3">
                 <div className="h-[2px] w-8 bg-[#FFEA00]"></div>
                 <div>
                    <span className="block text-[#111111] font-bold font-serif text-lg">B. Kamarudeen</span>
                    <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider">Founder & CEO</span>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </div>

      {/* --- CSS ANIMATIONS --- */}
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
         .animate-float { animation: float 4s ease-in-out infinite; }
         .animate-spin-slow { animation: spin-slow 30s linear infinite; }
         .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};
