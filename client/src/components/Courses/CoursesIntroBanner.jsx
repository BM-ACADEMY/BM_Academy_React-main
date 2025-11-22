import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CoursesIntroBanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  const handleCardClick = (index) => {
    navigate("/courses", { state: { courseIndex: index } });
  };

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-95"></div>

      <div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 text-center"
        data-aos="fade-up"
      >
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
          <span className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <IoIosRocket className="text-yellow-400" />
            Explore Our{" "}
            <span className="text-yellow-400 drop-shadow-md">Courses</span>
          </span>
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-400 animate-text-shimmer text-xl sm:text-2xl md:text-3xl">
            Build Skills. Crack Exams. Shape Your Future.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Whether it’s{" "}
          <span className="text-yellow-400">Govt Exams</span> or{" "}
          <span className="text-yellow-400">IT Career Skills</span>, our programs
          are designed to help you succeed with guidance from{" "}
          <b className="text-yellow-400">expert mentors</b>.
        </p>

        {/* Course Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            onClick={() => handleCardClick(0)}
            className="cursor-pointer p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-md hover:scale-105 transition"
          >
            <FaBookOpen className="text-yellow-400 text-3xl mb-3 mx-auto" />
            <h3 className="text-yellow-400 font-bold text-lg">
              Govt Exam Prep
            </h3>
            <p className="text-gray-200 text-sm mt-2 text-center">
              TNPSC, SSC, Banking & more.
            </p>
          </div>

          <div
            onClick={() => handleCardClick(1)}
            className="cursor-pointer p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-md hover:scale-105 transition"
          >
            <FaChalkboardTeacher className="text-yellow-400 text-3xl mb-3 mx-auto" />
            <h3 className="text-yellow-400 font-bold text-lg">
              IT Career Courses
            </h3>
            <p className="text-gray-200 text-sm mt-2 text-center">
              Full Stack, Data Science, Cloud, AI.
            </p>
          </div>

          <div
            onClick={() => handleCardClick(2)}
            className="cursor-pointer p-6 bg-yellow-400/10 border border-yellow-400 rounded-xl shadow-md hover:scale-105 transition"
          >
            <IoIosRocket className="text-yellow-400 text-3xl mb-3 mx-auto" />
            <h3 className="text-yellow-400 font-bold text-lg">
              Career Guidance
            </h3>
            <p className="text-gray-200 text-sm mt-2 text-center">
              AI-powered tests & mentorship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesIntroBanner;
