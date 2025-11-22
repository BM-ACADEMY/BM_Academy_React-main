import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import webinarImg from "../../../assets/img/webinar.jpg";
import { initAOS } from "../../../utils/aosConfig";
import { FaWhatsapp } from "react-icons/fa";

const steps = [
  { num: 1, text: "Click the Register Now button below." },
  { num: 2, text: "Pay just ₹49 (original price ₹199)." },
  { num: 3, text: "Receive the webinar link instantly on WhatsApp." },
  { num: 4, text: "Join the Live Data Analyst Session!" },
];

const HowToRegister = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section
      className="relative py-20 
                 bg-gradient-to-br from-[#fff7f6] via-[#ffede9] to-[#f7d5ce]"
      id="how-to-register"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-20">
        
        {/* LEFT SIDE CONTENT */}
        <div data-aos="fade-right" data-aos-delay="200">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            How to <span className="text-[#f0806f]">Register</span>
          </h2>

          <ul className="space-y-5 text-lg text-gray-700">
            {steps.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay={400 + i * 150}
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#f0806f]/10 text-[#f0806f] font-bold rounded-full">
                  {s.num}
                </div>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>

          {/* WHATSAPP CTA BUTTON */}
          <a
            href="https://wa.me/919944940051?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Data%20Analyst%20Webinar"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-[#25D366] text-white 
                       font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#1fb85c] 
                       transition-all duration-300 active:scale-95"
            data-aos="zoom-in"
            data-aos-delay="900"
          >
            <FaWhatsapp className="text-white w-5 h-5" />
            Register Now on WhatsApp
          </a>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img
            src={webinarImg}
            alt="Data Analyst Webinar"
            className="w-full max-w-md rounded-3xl shadow-lg border border-[#f0806f]/15 
                       hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* DECOR SHAPES */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#f7d5ce]/40 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f7d5ce]/25 blur-3xl -z-10"></div>
    </section>
  );
};

export default HowToRegister;
