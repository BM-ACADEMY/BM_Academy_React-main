import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// 1. Updated Icons Import
import {
  FaRobot,          // For AI Support
  FaCertificate,    // For Scholarships
  FaLaptopCode,     // For Job Courses
  FaHandsHelping,   // For Foundation
  FaQuoteLeft,
  FaTrophy,         // For Achievements
  FaStar,           // For List Bullets
  FaUserFriends,    // For "Who We Serve" Header
  FaUserGraduate,
  FaUserTie,        // For Professionals
  FaExchangeAlt,    // For Career Changers
  FaCompass,        // For Career Clarity
  // --- NEW ICONS FOR CTA BUTTONS ---
  FaSearch,         // For Browse Courses
  FaBullseye,       // For Career Test
  FaGraduationCap,  // For Scholarship
  FaWalking         // For "Join Our Mission" (Replacing Footprints)
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out-cubic',
      offset: 100,
    });
  }, []);

  return (
    <div className="font-sans text-[#111111] overflow-hidden">

      {/* --- 1. WHAT MAKES US DIFFERENT --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              What Makes Us <span className="text-[#FFEA00] bg-black px-2">Different?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We Combine Technology, Affordability, and Expert Mentorship to Deliver Education That Truly Works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaRobot size={32} />,
                title: "AI-Driven Career Support",
                desc: "Our exclusive SACT (Smart Aptitude & Career Test) helps students find the right path based on interest and personality — no guesswork.",
                bg: "bg-white",
                border: "border-l-4 border-[#FFEA00]"
              },
              {
                icon: <FaCertificate size={32} />,
                title: "Scholarships for All",
                desc: "With our SAT Entrance Exam, deserving students get up to 85% fee waivers — making career education affordable and inclusive.",
                bg: "bg-white",
                border: "border-l-4 border-black"
              },
              {
                icon: <FaLaptopCode size={32} />,
                title: "Job-Focused Courses",
                desc: "From Government Job Coaching to Web Development & AI — our curriculum is industry-relevant and placement-driven.",
                bg: "bg-white",
                border: "border-l-4 border-[#FFEA00]"
              },
              {
                icon: <FaHandsHelping size={32} />,
                title: "Support from BM Foundation",
                desc: "We are committed to social impact. Through BM Foundation, we support underprivileged students with free guidance and resources.",
                bg: "bg-white",
                border: "border-l-4 border-black"
              }
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className={`${item.bg} p-8 shadow-md rounded-r-xl ${item.border} hover:shadow-xl transition-shadow duration-300 flex items-start gap-6`}
              >
                <div className="text-[#FFEA00] bg-black p-3 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 2. FOUNDER MESSAGE --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className="max-w-4xl mx-auto bg-[#111111] text-white p-10 md:p-14 rounded-2xl relative shadow-2xl"
            data-aos="zoom-in-up"
          >
            <FaQuoteLeft
              className="text-[#FFEA00] text-5xl absolute -top-6 -left-4 md:-left-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            />

            <h3 className="text-2xl font-bold mb-6 text-[#FFEA00] uppercase tracking-widest text-sm">
              Message from the CEO
            </h3>

            <p className="text-lg md:text-2xl font-serif italic leading-relaxed mb-8 text-gray-200">
              "BM Academy is more than an institute — it’s a commitment to every learner’s future. We believe no student should be left behind due to lack of guidance or financial limits. We want to be the bridge between ambition and achievement."
            </p>

            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#FFEA00]"></div>
              <div>
                <p className="font-bold text-lg">B.M. Kamarudeen</p>
                <p className="text-gray-400 text-sm">CEO & Founder, BM Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. ACHIEVEMENTS & AUDIENCE --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Achievements Column */}
            <div data-aos="fade-right">
              <h3 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
                <FaTrophy className="text-[#FFEA00]" /> Our Achievements
              </h3>
              <ul className="space-y-4">
                {[
                  "1100+ Students Trained",
                  "Reach Across Tamil Nadu, Pondicherry & India",
                  "Launched SACT Test – First AI Career Tool",
                  "Facilitated Lakhs in Scholarships (SAT)",
                  "Collaborated with Industry Experts"
                ].map((item, i) => (
                  <li
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <FaStar className="text-yellow-500 shrink-0 text-sm" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who We Serve Column */}
            <div data-aos="fade-left">
              <h3 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
                <FaUserFriends className="text-[#FFEA00]" /> Who We Serve
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { text: "School & College Students", icon: <FaUserGraduate /> },
                  { text: "Job Seekers & Professionals", icon: <FaUserTie /> },
                  { text: "Career Changers", icon: <FaExchangeAlt /> },
                  { text: "Seekers of Career Clarity", icon: <FaCompass /> }
                ].map((item, i) => (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="flex items-center gap-4 bg-black text-white p-4 rounded-lg shadow-md hover:bg-[#FFEA00] hover:text-black transition-colors duration-300"
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span className="font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. CTA / EXPLORE MORE --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8" data-aos="fade-up">
            Ready to Explore More?
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-16" data-aos="fade-up" data-aos-delay="200">
            {/* Button 1: Browse Courses */}
            <Link to="/courses" className="px-8 py-4 bg-[#111111] text-white font-bold uppercase rounded hover:bg-[#FFEA00] hover:text-black transition-all shadow-lg flex items-center gap-2">
              <FaSearch className="text-lg" />
              <span>Browse Courses</span>
            </Link>

            {/* Button 2: Career Test */}
            <a href="https://scat-topaz.vercel.app/Sact.html" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase rounded hover:bg-black hover:text-white transition-all shadow-lg flex items-center gap-2">
              <FaBullseye className="text-lg" />
              <span>Try Free Career Test</span>
            </a>

            {/* Button 3: Apply Scholarship */}
            <a href="https://sample-sat.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white border-2 border-[#111111] text-[#111111] font-bold uppercase rounded hover:bg-[#111111] hover:text-white transition-all shadow-lg flex items-center gap-2">
              <FaGraduationCap className="text-lg" />
              <span>Apply Scholarship</span>
            </a>
          </div>

          <div className="max-w-3xl mx-auto border-t border-gray-200 pt-10" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
              <FaWalking className="text-3xl text-purple-900" /> Join Our Mission
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you’re a student, parent, or educator — BM Academy welcomes you to be part of a future-focused education movement. Let’s build a stronger, skilled India — one student at a time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutFeatures;
