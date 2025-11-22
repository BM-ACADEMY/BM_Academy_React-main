import React from "react";
import { 
  FaBrain, FaLaptopCode, FaChartLine, FaCloud, FaStar, 
  FaCheckCircle, FaHeart, FaArrowUp, FaUsers, FaCommentDots, 
  FaPhone, FaGraduationCap, FaBullseye 
} from "react-icons/fa";

export default function CareerTestSection() {
  return (
    <section className="relative bg-gray-50 py-16 px-6 pt-28 border-b border-gray-200 overflow-hidden">
      
      {/* Floating Icons */}
      <FaBrain className="absolute top-10 left-5 text-yellow-300 text-4xl opacity-20 animate-bounce-slow" />
      <FaLaptopCode className="absolute top-1/3 right-10 text-yellow-400 text-5xl opacity-15 animate-bounce-slower" />
      <FaChartLine className="absolute bottom-20 left-10 text-yellow-300 text-5xl opacity-15 animate-bounce-slowest" />
      <FaCloud className="absolute bottom-10 right-20 text-yellow-200 text-6xl opacity-10 animate-bounce-slowest" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <FaStar className="text-yellow-400 text-6xl" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex justify-center items-center gap-2">
             SACT – Smart Aptitude & Career Test
          </h2>
          <p className="text-lg text-gray-600">
            100% FREE Career Clarity Tool for Students  
            <br className="hidden md:block" />
            Powered by BM Academy • Supported by BM Foundation
          </p>
        </div>

        {/* What You’ll Get */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4"><FaCheckCircle className="inline text-yellow-400 mr-2" /> What You’ll Get – For FREE</h3>
            <ul className="space-y-3 text-gray-700">
              <li>📄 Personalized Career Report (PDF) – With 3 top career paths</li>
              <li>🎓 Recommended BM Academy Courses – Based on your profile</li>
              <li>🏅 Scholarship Eligibility – Up to 85% fee waivers (SAT Exam)</li>
              <li>💬 Free Career Guidance Call – With our experts</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4"><FaHeart className="inline text-red-400 mr-2" /> How BM Foundation Supports Students</h3>
            <p className="text-gray-700 mb-3">
              Many students have talent but lack guidance. With BM Foundation, deserving students get:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li><FaCheckCircle className="inline text-yellow-400 mr-2" /> 100% Free Access to SACT & Career Guidance</li>
              <li><FaCheckCircle className="inline text-yellow-400 mr-2" /> Scholarships for Skills Courses</li>
              <li><FaCheckCircle className="inline text-yellow-400 mr-2" /> Mentorship from Career Coaches</li>
            </ul>
            <p className="mt-4 italic text-gray-600">
              “SACT is not just a test — it’s a social initiative. With BM Foundation, we ensure no student is left behind.”<br />
              — Founder, BM Academy
            </p>
          </div>
        </div>

        {/* How to Take the Test */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4"><FaArrowUp className="inline text-yellow-400 mr-2" /> How to Take the SACT Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill the Google Form – 20+ guided questions</li>
            <li>AI Analyzes Your Profile</li>
            <li>Get Report Instantly + Email PDF</li>
            <li>Optional Counseling with Career Experts</li>
          </ol>
          <p className="mt-3 text-gray-700">🕒 Duration: 15 minutes | 💯 Cost: ₹0 – Absolutely Free</p>
        </div>

        {/* Who Can Take This */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4"><FaUsers className="inline text-yellow-400 mr-2" /> Who Can Take This?</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li>📘 Class 9th to 12th Students</li>
            <li>🎓 Diploma & UG Students</li>
            <li>🎯 Graduates unsure about next steps</li>
            <li>🌍 Students from Tamil Nadu, Pondicherry & anywhere in India</li>
          </ul>
        </div>

        {/* Testimonials */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4"><FaCommentDots className="inline text-yellow-400 mr-2" /> Real Student Feedback</h3>
          <div className="space-y-4 text-gray-700">
            <p>“BM Foundation made it possible for me to get SACT results and a scholarship — I couldn't have joined otherwise.” – <span className="font-semibold">Aswin, Villupuram</span></p>
            <p>“SACT showed me my real strengths. I’m now studying Full Stack Development at BM Academy.” – <span className="font-semibold">Revathi, Cuddalore</span></p>
            <p>“I had no clue about career options. This test was free and gave me direction.” – <span className="font-semibold">Saravanan, 12th Bio Group</span></p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 py-10 px-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2"><FaBullseye className="inline text-yellow-400 mr-2" /> Take Your Free Career Test Now</h3>
          <p className="text-gray-800 mb-6">Discover Your Strengths. Choose the Right Path. Build a Bright Future.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
            >
              <FaBrain className="inline mr-2" /> Take Free SACT Test
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-900 rounded-xl shadow border hover:bg-gray-100 transition"
            >
              <FaPhone className="inline mr-2" /> Talk to a Career Expert
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow hover:bg-black transition"
            >
              <FaGraduationCap className="inline mr-2" /> View Courses Based on My Report
            </a>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes bounce-slower { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          @keyframes bounce-slowest { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

          .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
          .animate-bounce-slower { animation: bounce-slower 6s infinite ease-in-out; }
          .animate-bounce-slowest { animation: bounce-slowest 8s infinite ease-in-out; }
        `}
      </style>
    </section>
  );
}
