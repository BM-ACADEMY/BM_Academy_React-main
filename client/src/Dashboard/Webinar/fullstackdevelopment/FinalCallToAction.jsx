import React, { useEffect } from "react";
import { initAOS } from "../../../utils/aosConfig";

const FinalCallToAction = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#cb2800] via-[#e63b00] to-[#cb2800] text-white text-center py-20 relative overflow-hidden">
      
      {/* Decorative blur circle */}
      <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-80 h-80 bg-white/30 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h2
        className="text-3xl md:text-4xl font-extrabold mb-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        🚀 Final Call to Join the Full-Stack Developer Workshop
      </h2>

      {/* Description */}
      <p
        className="text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Seats are filling fast! Register now for just{" "}
        <strong>₹49</strong> and begin your journey to becoming a{" "}
        <span className="font-semibold">Full-Stack Developer</span> with hands-on training at{" "}
        <span className="font-semibold">BM Academy</span>.
      </p>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919944940051?text=Hi%20BM%20Academy!%20I%20want%20to%20register%20for%20the%20Full-Stack%20Developer%20Workshop%20(₹49)."
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 bg-white text-[#cb2800] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        data-aos="zoom-in"
        data-aos-delay="500"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-6 h-6"
        />
        Register Now
      </a>
    </section>
  );
};

export default FinalCallToAction;
