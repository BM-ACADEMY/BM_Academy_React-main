// src/components/home/WelcomeBanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import AOS from "aos";
import { ArrowRight, ChevronRight } from "lucide-react";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WelcomeBanner = () => {
  const [banners, setBanners] = useState([]);

  // BM Academy Brand Colors
  const BRAND_YELLOW = "#FFEA00";

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-quart",
    });

    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}banners/`);
        if (Array.isArray(res.data)) {
          setBanners(res.data);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setBanners([]);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "40px", left: "5%", width: "auto" }}>
        <ul className="flex gap-2 m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-all duration-300 cursor-pointer ft-slick-dot" />
    ),
  };

  // --- UPDATED FALLBACK BANNERS WITH INDIAN PEOPLE IMAGES ---
  const fallbackBanners = [
    {
      title: "Shape Your Future With Excellence",
      description:
        "SACT – Smart Aptitude & Career Test matches your skills with careers & courses. Your roadmap in minutes.",
      // Image: Group of Indian students collaborating
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Scholarships up to 85%",
      description:
        "Access quality education without barriers. BM Academy supports deserving students with massive scholarship opportunities.",
      // Image: Indian female student holding books in a campus setting
      image: "https://images.unsplash.com/photo-1629904853026-234541317275?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const renderBanner = (banner, index) => (
    <div key={index} className="outline-none">
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">

        {/* --- BACKGROUND IMAGE & OVERLAY --- */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner.image}
            alt={banner.title || "Banner"}
            className="w-full h-full object-cover transform scale-105 animate-slowZoom"
            // Added grayscale filter slightly to make text pop and blend better, remove if unwanted:
            // style={{ filter: 'grayscale(30%)' }}
          />

          {/* Gradient Overlay: Black fading to transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="relative z-20 container mx-auto px-6 lg:px-12 flex items-center h-full">
          <div className="max-w-3xl">

            {/* Top Label */}
            <div
              className="flex items-center gap-3 mb-6"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="h-[2px] w-12 bg-[#FFEA00]"></div>
              <span className="text-[#FFEA00] font-bold tracking-[0.2em] uppercase text-sm">
                Welcome to BM Academy
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {banner.title}
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light border-l-4 border-gray-700 pl-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {banner.description}
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-5"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a
                href="/courses"
                className="px-8 py-4 bg-[#FFEA00] text-black font-bold text-base uppercase tracking-wider rounded hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </a>

              <a
                href="/about"
                className="px-8 py-4 border border-white text-white font-bold text-base uppercase tracking-wider rounded hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Learn More <ChevronRight size={20} />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );

  return (
    <section className="relative w-full bg-black">
      <style>{`
        .slick-dots li.slick-active .ft-slick-dot {
          background-color: ${BRAND_YELLOW} !important;
          transform: scale(1.3);
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slowZoom {
          animation: slowZoom 20s linear infinite alternate;
        }
      `}</style>
      <Slider {...settings}>
        {(banners.length > 0 ? banners : fallbackBanners).map(renderBanner)}
      </Slider>
    </section>
  );
};

export default WelcomeBanner;
