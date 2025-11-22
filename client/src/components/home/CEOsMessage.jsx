import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const CEOsMessage = () => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-20 px-6 lg:px-20">
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10">
          ✉️ CEO’s Message
        </h2>

        {/* Quote Block */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-yellow-200 relative">
          <FaQuoteLeft className="absolute -top-3 -left-3 text-yellow-400 text-3xl" />
          <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed">
            “At <span className="text-yellow-500 font-semibold">BM Academy</span>, 
            we don’t just teach — we guide futures.”
          </blockquote>
          <FaQuoteRight className="absolute -bottom-3 -right-3 text-yellow-400 text-3xl" />
        </div>

        {/* Message */}
        <p className="mt-8 text-gray-800 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Our mission is simple: to help every student discover the right path and 
          make career decisions with clarity and confidence. With tools like{" "}
          <span className="font-semibold text-yellow-500">SACT</span> and support from{" "}
          <span className="font-semibold text-yellow-500">BM Foundation</span>, 
          we aim to empower learners everywhere — especially those who need it most.
        </p>

        {/* Closing Statement */}
        <p className="mt-10 text-gray-900 font-semibold text-xl md:text-2xl italic">
          “Let’s build a future you’ll be proud of.”
        </p>

        {/* Signature */}
        <p className="mt-4 text-yellow-600 font-bold text-2xl">
          – [B.M.Kamarudeen], Founder & CEO
        </p>
      </div>
    </section>
  );
};
