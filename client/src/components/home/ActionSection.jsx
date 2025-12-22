import React from "react";
import { IoIosCall } from "react-icons/io";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const CallToAction = () => {
  return (
    // REMOVED: 'border-t-4 border-[#FFEA00]' class
    <section className="bg-white py-12 px-6 rounded-xl shadow-md mt-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading with Icon */}
        <h2 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          <HiArrowRightStartOnRectangle className="text-[#FFEA00] w-8 h-8 md:w-10 md:h-10" />
          Ready to Start Your Career Journey?
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700">
          Join 1000+ students who chose BM Academy for skills, scholarships, and success.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">

          {/* Primary Button: Join Now (Yellow) */}
          <a
            href="/apply"
            className="group px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider rounded shadow-md hover:bg-black hover:text-[#FFEA00] transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
          >
            <span>Join Now</span>
            <HiArrowRightStartOnRectangle className="text-xl group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Button: Call Us (Black) */}
          <a
            href="tel:+918270652229"
            className="group px-8 py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded shadow-md border-2 border-[#111111] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
          >
            <IoIosCall className="text-xl group-hover:scale-110 transition-transform" />
            <span>Call Us</span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default CallToAction;
