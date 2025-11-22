// src/components/home/WelcomeBanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AcademyBanner from "../../../public/img/Academy-banner.jpg";

const WelcomeBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    // Fetch banners from API
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URI}banners/`);
        if (Array.isArray(res.data)) {
          setBanners(res.data);
        } else {
          console.warn("Banners response is not an array:", res.data);
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
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false,
  };

  // Fallback banners if API fails or is empty
  const fallbackBanners = [
    {
      title: "Discover Your Career Path",
      description:
        "SACT – Smart Aptitude & Career Test matches your skills with careers & courses. Your roadmap in minutes.",
      image: AcademyBanner,
    },
    {
      title: "Scholarships up to 85%",
      description:
        "Don’t let fees hold you back. At BM Academy, every deserving student gets access to quality education with massive scholarship support.",
      image: AcademyBanner,
    },
  ];

  const renderBanner = (banner, index) => (
    <div key={index}>
      <section className="relative w-full min-h-[700px] flex items-center justify-center text-white overflow-hidden">
        <img
          src={banner.image}
          alt={banner.title || "Banner"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30"></div>

        <div
          className="relative z-10 max-w-4xl text-center px-4 sm:px-6 md:px-8"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
            {banner.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200/90 mb-8 leading-relaxed px-3 py-2 rounded-xl">
            {banner.description}
          </p>
        </div>
      </section>
    </div>
  );

  return (
    <section className="relative w-full">
      <Slider {...settings}>
        {(banners.length > 0 ? banners : fallbackBanners).map(renderBanner)}
      </Slider>
    </section>
  );
};

export default WelcomeBanner;
