import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Quote, Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Testimonials() {
  const sliderRef = useRef(null);

  // Responsive settings
  const getSlides = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 4;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlides());

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const onResize = () => setSlidesToShow(getSlides());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --- UPDATED DATA WITH TAMIL NADU / INDIAN DEMOGRAPHICS ---
  const testimonials = [
    {
      quote: "Cleared TNPSC Group 2 with strong guidance.",
      name: "Lakshmi P.",
      role: "Govt Officer",
      // Image: Indian female in saree/formal
      avatar: "https://images.unsplash.com/photo-1653379671055-a20ff0f7ae12?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Web Dev course got me a job in Chennai!",
      name: "Karthik R.",
      role: "Software Engineer",
      // Image: Indian male professional
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote: "SACT Test found my true career path.",
      name: "Anitha S.",
      role: "UI/UX Designer",
      // Image: Indian female student/professional
      avatar: "https://images.unsplash.com/photo-1615022702095-ff2c036f3360?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote: "Best coaching for banking exams in TN.",
      name: "Surya G.",
      role: "Bank PO",
      // Image: Indian male student
      avatar: "https://images.unsplash.com/photo-1729824186684-eaff43f7d1d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Flexible online classes helped me a lot.",
      name: "Naresh",
      role: "Teacher",
      // Image: Indian female professional
      avatar: "https://images.unsplash.com/photo-1717672135036-e070da303832?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    // --- CUSTOM DOTS CONFIGURATION ---
    appendDots: dots => (
      <div style={{ bottom: "-50px" }}>
        <ul className="flex justify-center items-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      // Inactive State: Dark Black Circle
      <div className="w-3 h-3 rounded-full bg-[#111111] opacity-20 hover:opacity-100 transition-all duration-300 cursor-pointer custom-dot"></div>
    ),
  };

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">

        {/* --- HEADER --- */}
        <div className="text-center mb-24">
           <h2 className="text-4xl font-extrabold text-[#111111] mb-2">
             Student Success Stories
           </h2>
           <p className="text-gray-500">Real results from our 1100+ alumni network</p>
        </div>

        {/* --- CONNECTING DASHED LINE --- */}
        <div className="absolute top-[220px] left-0 w-full hidden lg:block z-0 pointer-events-none">
           <svg className="w-full h-24" preserveAspectRatio="none">
             <path
               d="M0,12 Q 300,50 600,12 T 1200,12"
               fill="none"
               stroke="#FFEA00"
               strokeWidth="2"
               strokeDasharray="8 8"
               className="opacity-60"
             />
           </svg>
        </div>

        {/* --- SLIDER --- */}
        <Slider ref={sliderRef} {...settings} className="testimonial-slider relative z-10 pb-12">
          {testimonials.map((t, index) => {
             return (
              <div key={index} className="px-4 pb-4 pt-4 text-center group cursor-default outline-none">

                {/* --- CIRCULAR AVATAR WRAPPER --- */}
                <div className="relative inline-block mb-8 transition-transform duration-300 transform group-hover:-translate-y-2">

                  {/* The Main Image */}
                  <div className="w-40 h-40 rounded-full p-2 bg-white shadow-xl mx-auto relative z-10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* --- FLOATING QUOTE BADGE --- */}
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-12 h-12 rounded-full
                                  bg-[#111111] group-hover:bg-[#FFEA00]
                                  flex items-center justify-center shadow-lg border-4 border-white z-20
                                  transition-colors duration-300">
                    <Quote size={14} className="text-white group-hover:text-black transition-colors duration-300 fill-current" />
                  </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="space-y-3 px-2">
                   <h3 className="text-xl font-bold text-[#111111]">
                     {t.name}
                   </h3>
                   <div className="flex justify-center gap-1 opacity-80">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={14} className="text-[#FFEA00] fill-current" />
                     ))}
                   </div>
                   <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                     "{t.quote}"
                   </p>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                     {t.role}
                   </p>
                </div>

              </div>
             );
          })}
        </Slider>
      </div>

      {/* --- CUSTOM CSS FOR ANIMATED PILL DOTS --- */}
      <style>{`
        /* Active State: Yellow Pill, Fully Opaque */
        .slick-dots li.slick-active .custom-dot {
          background-color: #FFEA00 !important;
          width: 30px;
          opacity: 1;
          border-radius: 9999px;
        }

        .slick-track {
          display: flex !important;
          align-items: center;
        }
      `}</style>
    </section>
  );
}
