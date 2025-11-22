import React from "react";
import { FaCheck, FaGraduationCap, FaLocationDot, FaHandPointRight } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import HeroImg from "../../assets/img/hero-academy.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div data-aos="fade-right" data-aos-duration="1000">
          <div className="flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-yellow-500 text-4xl" />
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Empowering Futures with{" "}
              <span className="text-yellow-500">Skills & Scholarships!</span>
            </h1>
          </div>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Unlock your potential with BM Academy&apos;s SAT Program —
            Get up to{" "}
            <span className="font-semibold text-yellow-500">
              85% scholarship
            </span>{" "}
            on career-building courses! From government exam prep to
            in-demand tech skills, we guide you every step of the way.
          </p>

          <ul className="mt-6 space-y-3 text-gray-800">
            <li className="flex items-start gap-2">
              <FaCheck className="text-yellow-500 mt-1" size={18} />
              <span>Govt. Exam Coaching (TNPSC, SSC, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-yellow-500 mt-1" size={18} />
              <span>
                IT & Tech Courses (Web Development, Data Science & more)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-yellow-500 mt-1" size={18} />
              <span>Free Career Guidance via our SACT AI Career Test</span>
            </li>
          </ul>

          <p className="mt-6 text-sm text-gray-600 flex items-center gap-2">
            <FaLocationDot className="text-yellow-500" size={20} />
            Available in Pondicherry, Tamil Nadu, & Across India
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <a
              href="https://scat-topaz.vercel.app/Sact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FaHandPointRight size={18} />
              Try AI Career Test (SACT)
            </a>

            <Link
              to="/courses"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-yellow-500 text-gray-800 font-semibold hover:bg-yellow-50 transition-all"
            >
              <FiTarget size={18} />
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="hidden lg:flex justify-center"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <img
            src={HeroImg}
            alt="BM Academy Students"
            className="w-full h-auto max-w-[550px] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
          />
        </div>
      </div>
    </section>
  );
}
