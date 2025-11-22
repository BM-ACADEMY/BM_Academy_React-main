import React, { useEffect } from "react";
import background from "../../../assets/img/background.png";
import Navbar from "./Navbar";
import { initAOS } from "../../../utils/aosConfig";
import {
  Megaphone,
  Laptop,
  GraduationCap,
  LineChart,
  Award,
} from "lucide-react"; // ✅ icons

const Hero = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section className="bg-gray-900 relative overflow-hidden" id="home">
      <main
        className="flex flex-col bg-cover bg-center bg-no-repeat text-white min-h-screen md:min-h-[90vh] px-4 md:px-0 relative"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Navbar />

        {/* 🌟 Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Megaphone className="floating-icon left-[10%] top-[20%]" size={40} />
          <Laptop className="floating-icon right-[15%] top-[30%]" size={42} />
          <GraduationCap className="floating-icon left-[25%] bottom-[25%]" size={38} />
          <LineChart className="floating-icon right-[25%] bottom-[20%]" size={40} />
          <Award className="floating-icon left-[50%] top-[10%]" size={44} />
        </div>

        {/* ✨ Hero Text */}
        <div className="flex flex-1 items-center justify-center w-full px-4 md:px-0 relative z-10">
          <div
            className="text-center max-w-4xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              Join Our{" "}
              <span className="text-[#facc15]">Digital Marketing</span> Webinar
            </h1>

            <p
              className="text-lg md:text-xl text-gray-200 mb-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              (Now Just @{" "}
              <span className="underline decoration-[#facc15]">₹49</span> !!)
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
