import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const highlights = [
    {
      title: "1100+ Students Trained",
      desc: "Proven success in coaching & career building.",
    },
    {
      title: "Free AI Career Guider",
      desc: "Personalized guidance with our AI-powered SACT tool.",
    },
    {
      title: "Practical, Job-Oriented Courses",
      desc: "Hands-on learning to make you career-ready.",
    },
    {
      title: "Scholarships for Deserving Students",
      desc: "Up to 85% off via our SAT scholarship program.",
    },
    {
      title: "Flexible Learning",
      desc: "Offline classes + Online live sessions for all learners.",
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section
      className="relative py-20 px-6 sm:px-10 lg:px-20 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #050b1d 0%, #081229 40%, #0a183a 100%)",
      }}
    >
      {/* Optional glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/5 via-transparent to-transparent blur-3xl opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
          <span className="text-yellow-400">Why Choose</span>{" "}
          <span className="text-white">BM Academy?</span>
        </h2>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`relative p-6 sm:p-8 rounded-2xl bg-[#0b1735]/90 border border-transparent shadow-md backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                hoverIndex === index
                  ? "shadow-[0_0_25px_#FFD70060] border-yellow-400"
                  : "shadow-[0_0_15px_#00000060]"
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <h3
                className={`text-lg sm:text-xl font-semibold inline-flex items-center gap-2 transition-colors ${
                  hoverIndex === index ? "text-yellow-400" : "text-yellow-300"
                }`}
              >
                <FaCheck size={20} /> {item.title}
              </h3>
              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                  hoverIndex === index ? "text-gray-200" : "text-gray-400"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 text-black font-semibold shadow-[0_0_20px_#FFD70060] hover:bg-yellow-500 hover:shadow-[0_0_30px_#FFD70080] transition transform active:scale-95"
          >
            <FaRocket size={20} />
            Join Now
          </Link>

          <a
            href="tel:+918270652229"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 text-black font-semibold shadow-[0_0_20px_#FFD70060] hover:bg-yellow-500 hover:shadow-[0_0_30px_#FFD70080] transition transform active:scale-95"
          >
            <IoIosCall size={20} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
