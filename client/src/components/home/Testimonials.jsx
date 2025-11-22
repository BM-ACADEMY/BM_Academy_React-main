// src/components/Testimonials.jsx
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const sliderRef = useRef(null);

  const getSlides = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlides());

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlides());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const testimonials = [
    {
      quote: "BM Academy’s TNPSC classes were life-changing! I cleared Group 2 with strong fundamentals and guidance.",
      name: "Priya S., Madurai",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&q=80", // Indian woman smiling
    },
    {
      quote: "The Web Development course gave me the skills to become a frontend developer in Bangalore!",
      name: "Rahul V., Chennai",
      avatar: "https://images.unsplash.com/photo-1628890923661-7c9c64145c0f?w=300&q=80", // Indian man with laptop
    },
    {
      quote: "The SACT Test helped me discover my interest in design. BM Academy guided me to the right career.",
      name: "Aditi K., Coimbatore",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&q=80", // Indian young woman smiling
    },
    {
      quote: "Excellent teachers and personalized attention — BM Academy motivated me throughout my preparation.",
      name: "Sanjay M., Trichy",
      avatar: "https://images.unsplash.com/photo-1601582588203-96d58c86cf5c?w=300&q=80", // Indian male student
    },
    {
      quote: "Their online classes were flexible and easy to follow. I could balance work and study perfectly.",
      name: "Meena L., Salem",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80", // Indian female portrait
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    cssEase: "ease-in-out",
    slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center min-w-0">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-700 mb-12 flex items-center justify-center gap-2">
          <span role="img" aria-label="chat">💬</span>
          Student Testimonials
        </h2>

        <Slider ref={sliderRef} {...settings} key={slidesToShow} className="!overflow-visible">
          {testimonials.map((t, index) => (
            <div key={index} className="px-2 sm:px-4 !flex !justify-center">
              <article className="w-full max-w-md p-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400 mb-4 object-cover"
                  loading="lazy"
                />
                <p className="text-gray-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <h4 className="mt-4 font-semibold text-yellow-700">— {t.name}</h4>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
