import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutWelcomeBanner() {
  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 800,   // animation duration
      once: true,      // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      id="about-welcome"
      className="relative bg-black pt-32 pb-20 px-6 overflow-hidden border border-gray-300"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-4xl font-bold text-white mb-4 relative z-10"
        >
          More Than Just Courses — We Build Futures
        </h1>

        {/* Subtext */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg text-white mb-6 relative z-10 max-w-3xl mx-auto"
        >
          Empowering students with career clarity, real-world skills & scholarships 
          across Tamil Nadu and India.
        </p>

        {/* Buttons */}
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="flex flex-wrap justify-center gap-4 relative z-10"
        >
          <a
            href="/sact"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            🎯 Try Career Test
          </a>
          <a
            href="/contact"
            className="bg-black text-yellow-400 px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
          >
            📞 Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
