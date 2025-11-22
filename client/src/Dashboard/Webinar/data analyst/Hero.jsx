import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { initAOS } from "../../../utils/aosConfig";
import {
  Megaphone,
  Laptop,
  GraduationCap,
  LineChart,
  Award,
} from "lucide-react";

// Countdown logic
const getRemainingTime = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(23, 59, 59, 999);

  const diff = target - now;
  if (diff <= 0) return "00:00:00";

  const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

const Hero = () => {
  const [countdown, setCountdown] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section className="relative overflow-hidden" id="home">
      {/* Background matching Courses page */}
      <main
        className="relative flex flex-col min-h-screen text-white px-4 md:px-0 
                   bg-gradient-to-b from-[#0f1625] via-[#0b111c] to-[#080c14]"
      >
        <Navbar />

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
          <Megaphone className="floating-icon left-[10%] top-[20%]" size={42} />
          <Laptop className="floating-icon right-[15%] top-[28%]" size={45} />
          <GraduationCap className="floating-icon left-[25%] bottom-[25%]" size={40} />
          <LineChart className="floating-icon right-[25%] bottom-[20%]" size={42} />
          <Award className="floating-icon left-[50%] top-[12%]" size={48} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="text-center max-w-3xl px-3" data-aos="fade-up">
            <p className="text-sm md:text-base uppercase tracking-widest text-yellow-300 font-semibold mb-3">
              Limited Seats — Join Now
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Become a <span className="text-yellow-400">Data Analyst</span> in 2025+
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-5">
              Master Data Analytics Skills — Excel, SQL, Power BI, Python & More
            </p>

            <p className="text-xl md:text-2xl font-semibold text-yellow-400 mb-2">
              Join the Webinar Now for Just{" "}
              <span className="underline underline-offset-4 decoration-yellow-400">
                ₹49 Only
              </span>
            </p>

            {/* Countdown */}
            <p className="text-lg md:text-xl font-bold text-red-400 mb-8">
              🔥 Offer ends in <span className="text-white">{countdown}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
  href="https://wa.me/919944940051?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Data%20Analyst%20Webinar"
  target="_blank"
  rel="noreferrer"
  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl shadow-xl 
             hover:bg-yellow-500 hover:scale-105 transition-all flex items-center gap-2"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
    alt="WhatsApp"
    className="w-5 h-5"
  />
  Register Now
</a>


              <a
                href="#about"
                className="px-8 py-4 border-2 border-yellow-400 text-yellow-300 font-semibold rounded-xl 
                           hover:bg-yellow-400/20 transition-all"
              >
                Learn More
              </a>
            </div>

            {/* Bottom Info */}
            <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-6">
              <span>🎥 Recording Provided</span>
              <span>🎓 Certificate Included</span>
              <span>📅 Live Webinar</span>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
