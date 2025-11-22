import React from "react";
import { GraduationCap, Brain, Target, Smartphone, Wallet } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa6";

export default function SatScholarshipPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white py-24 px-6 overflow-hidden">
        {/* Floating Icons */}
        <Brain className="absolute top-10 left-5 text-yellow-400 text-4xl opacity-20 animate-bounce-slow" />
        <Target className="absolute top-1/3 right-10 text-yellow-300 text-5xl opacity-15 animate-bounce-slower" />

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/10 via-black/20 to-gray-900/10 -z-10"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <FaGraduationCap className="text-yellow-400" />
            SAT by BM Academy –
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-yellow-300">Unlock Your Scholarship Today!</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Take our FREE online aptitude test & earn up to{" "}
            <span className="font-bold text-yellow-300">80% discount</span> on your course fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a
              href="#register"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-300 hover:scale-105 transition flex items-center gap-2"
            >
              📋 Register for SAT Now
            </a>
            <a
              href="#register"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow hover:bg-gray-100 hover:scale-105 transition flex items-center gap-2"
            >
              🎯 Take the Test – 24x7 Online Access
            </a>
          </div>
        </div>

        <style>
          {`
            @keyframes bounce-slow { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
            @keyframes bounce-slower { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }

            .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
            .animate-bounce-slower { animation: bounce-slower 6s infinite ease-in-out; }
          `}
        </style>
      </section>

      {/* 2. What is SAT? */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">🧾 What is SAT?</h2>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          The BM Academy SAT (Scholarship Assessment Test) is an exclusive online aptitude-based scholarship exam designed to help you earn scholarships across IT, Bank, and Career Courses.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <Target className="mx-auto w-10 h-10 text-blue-700" />
            <p> Aptitude</p>
          </div>
          <div>
            <Brain className="mx-auto w-10 h-10 text-yellow-500" />
            <p> Reasoning</p>
          </div>
          <div>
            <Smartphone className="mx-auto w-10 h-10 text-green-500" />
            <p> Online Test</p>
          </div>
          <div>
            <Wallet className="mx-auto w-10 h-10 text-red-500" />
            <p> Fee Waiver</p>
          </div>
        </div>
        <p className="mt-6 text-center text-gray-400">
          ⏱️ Duration: 25–30 minutes | 📌 Mode: Google Form + Timer | 📧 Result within 48 hrs (Email + WhatsApp PDF)
        </p>
      </section>

      {/* 3. Who Can Apply + Why Take It */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">👨‍🎓 Who Can Apply?</h2>
            <ul className="space-y-3 text-lg">
              <li>🏫 School Students (10th, 11th, 12th)</li>
              <li>🎓 College Students</li>
              <li>💼 Job Seekers & Career Switchers</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">🎯 Why Take the SAT?</h2>
            <ul className="space-y-3 text-lg">
              <li>✅ Easy online test you can take anytime</li>
              <li>✅ Scholarships worth ₹5,000–₹15,000</li>
              <li>✅ Save money on career-changing courses</li>
              <li>✅ Get personalized report with course suggestions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Upcoming SAT Details */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">📅 Upcoming SAT Details</h2>
          <table className="w-full border border-gray-300 text-left text-lg">
            <tbody>
              <tr className="border-b"><td className="p-3 font-semibold">Next Test Date</td><td className="p-3">Available Everyday (24x7 Access)</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">Mode</td><td className="p-3">Online (Google Form + Timer)</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">Duration</td><td className="p-3">25–30 minutes</td></tr>
              <tr><td className="p-3 font-semibold">Result Delivery</td><td className="p-3">Within 48 hrs (Email + WhatsApp)</td></tr>
            </tbody>
          </table>
          <a href="#register" className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-300 transition">
            📋 Register for SAT Now
          </a>
        </div>
      </section>

      {/* 5. Scholarship Slabs */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">💰 Scholarship Slabs at BM Academy</h2>
        <table className="max-w-4xl mx-auto w-full border border-gray-300 text-center">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Your Score (SAT)</th>
              <th className="p-3">Scholarship Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-3">85% and above</td><td className="p-3">80% OFF</td></tr>
            <tr className="border-b"><td className="p-3">70% – 84%</td><td className="p-3">50% OFF</td></tr>
            <tr className="border-b"><td className="p-3">50% – 69%</td><td className="p-3">25% OFF</td></tr>
            <tr><td className="p-3">Below 50%</td><td className="p-3">Minimum Base Discount</td></tr>
          </tbody>
        </table>
        <p className="mt-6 text-center">
          🎉 Apply your scholarship on programs like <b>Digital Marketing, Python & Data Science, Full Stack Development, Bank Coaching</b> & more!
        </p>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">👨‍🎓 Student Testimonials & Results</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <blockquote className="p-6 bg-gray-100 rounded-xl shadow">
            “I scored 78% on the SAT and received 50% off my Digital Marketing course at BM Academy. It was so easy!” <br />
            <span className="font-semibold">– Priya, College Student</span>
          </blockquote>
          <blockquote className="p-6 bg-gray-100 rounded-xl shadow">
            “As a working professional, I loved how simple and quick the SAT was. I got 25% off the Power BI course!” <br />
            <span className="font-semibold">– Sundar, MBA Graduate</span>
          </blockquote>
        </div>
      </section>

      {/* 7. Register Now Form */}
      <section id="register" className="bg-gradient-to-br from-blue-50 to-yellow-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">📥 Register Now</h2>
            <p className="text-center text-gray-600 mb-8">
              Fill the form below & get your SAT Test Link instantly on Email & WhatsApp.
            </p>

            <form className="space-y-6">
              {/* Name */}
              <div className="relative">
                <input type="text" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="Name" />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input type="email" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="Email" />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  Email
                </label>
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <input type="tel" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="WhatsApp Number" />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  WhatsApp Number
                </label>
              </div>

              {/* Course Dropdown */}
              <div className="relative">
                <select required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900">
                  <option value="">Choose Your Course</option>
                  <option>Digital Marketing</option>
                  <option>Python & Data Science</option>
                  <option>Web & Full Stack Dev</option>
                  <option>Bank Exam Coaching</option>
                  <option>Soft Skills</option>
                </select>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-semibold rounded-xl shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition">
                ✅ Submit & Get Test Link
              </button>
            </form>

            {/* Instant Benefits */}
            <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 You’ll instantly receive:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> A test link by email & WhatsApp</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Course brochure (PDF)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Result within 48 hours</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Scholarship confirmation if eligible</li>
              </ul>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              ⚡ Start your scholarship journey with BM Academy today!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
