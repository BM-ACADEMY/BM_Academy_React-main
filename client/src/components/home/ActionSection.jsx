import React from "react";
import { IoIosCall } from "react-icons/io";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const CallToAction = () => {
  return (
    <section className="bg-white py-12 px-6 rounded-xl shadow-md mt-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading with Icon */}
        <h2 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          <HiArrowRightStartOnRectangle className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" />
          Ready to Start Your Career Journey?
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-700">
          Join 1000+ students who chose BM Academy for skills, scholarships, and success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="tel:+918270652229"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-md active:scale-95"
          >
            <IoIosCall size={20} />
            Call Us
          </a>

          <a
            href="/apply"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors shadow-md active:scale-95"
          >
            📝 Join Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
