import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { initAOS } from "../../../utils/aosConfig";
import {
  Code,
  Laptop,
  Server,
  Database,
  Award
} from "lucide-react";

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
      <main
        className="relative flex flex-col min-h-screen text-gray-900 px-4 md:px-0 
                   bg-gradient-to-b from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb]"
      >
        <Navbar />

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Code className="floating-icon left-[10%] top-[20%]" size={42} />
          <Laptop className="floating-icon right-[15%] top-[28%]" size={45} />
          <Server className="floating-icon left-[25%] bottom-[25%]" size={40} />
          <Database className="floating-icon right-[25%] bottom-[20%]" size={42} />
          <Award className="floating-icon left-[50%] top-[12%]" size={48} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="text-center max-w-3xl px-3" data-aos="fade-up">

            <p className="text-sm md:text-base uppercase tracking-widest text-yellow-600 font-semibold mb-3">
              Limited Seats — Join Now
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
              Become a{" "}
              <span className="text-yellow-600">Full-Stack Developer</span> in 2025+
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-5">
              Master Full-Stack Development — HTML, CSS, JavaScript, React, Node.js, MongoDB & Deployment
            </p>

            <p className="text-xl md:text-2xl font-semibold text-yellow-700 mb-2">
              Join the Live Workshop for Just{" "}
              <span className="underline underline-offset-4 decoration-yellow-600">
                ₹49 Only
              </span>
            </p>

            {/* Countdown */}
            <p className="text-lg md:text-xl font-bold text-red-600 mb-8">
              🔥 Offer ends in <span className="text-gray-900">{countdown}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="#register"
                className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-xl shadow-xl 
                           hover:bg-yellow-600 hover:scale-105 transition-all"
              >
                Register Now
              </a>

              <a
                href="#about"
                className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 font-semibold rounded-xl 
                           hover:bg-yellow-100 transition-all"
              >
                Learn More
              </a>
            </div>

            {/* Bottom Info */}
            <p className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-6">
              <span>⚡ Build Real-World Projects</span>
              <span>🎓 Certificate Included</span>
              <span>🚀 Hosting & Deployment Training</span>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
