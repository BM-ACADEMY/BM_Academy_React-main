// import React from "react";
// import { GraduationCap, Brain, Target, Smartphone, Users, FileText } from "lucide-react";

// export default function SACTBanner() {
//   return (
//     <div className="bg-white text-gray-800">
//       {/* 1. Hero Banner */}
//       <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-yellow-500 text-white py-20 px-6">
//         <div className="max-w-7xl mx-auto text-center space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             🧠 Confused About Your Future?
//           </h1>
//           <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//             <span className="text-yellow-300">Take the FREE SACT Test Today!</span>
//           </h2>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto">
//             Discover your strengths, get a career roadmap, and unlock up to{" "}
//             <span className="font-bold text-yellow-300">85% scholarships</span> —  
//             All for Free, thanks to BM Foundation.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <a href="#register" className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow hover:bg-yellow-300">
//               🔎 Take Free Test
//             </a>
//             <a href="#register" className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-xl shadow hover:bg-gray-100">
//               📞 Talk to Career Expert
//             </a>
//             <a href="#register" className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl shadow hover:bg-blue-700">
//               🎓 View Courses
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* 2. What is SACT? */}
//       <section className="max-w-6xl mx-auto py-16 px-6">
//         <h2 className="text-3xl font-bold text-center mb-8">📘 What is SACT?</h2>
//         <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
//           The <b>SACT (Smart Aptitude & Career Test)</b> is an AI-powered career assessment designed 
//           to help students & professionals discover their strengths, choose the right path, and 
//           access scholarships across various programs.
//         </p>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//           <div>
//             <Target className="mx-auto w-10 h-10 text-red-600" />
//             <p>🎯 Career Path Guidance</p>
//           </div>
//           <div>
//             <Brain className="mx-auto w-10 h-10 text-yellow-500" />
//             <p>🧠 Strengths Analysis</p>
//           </div>
//           <div>
//             <Smartphone className="mx-auto w-10 h-10 text-green-500" />
//             <p>📱 Online Test Anytime</p>
//           </div>
//           <div>
//             <Users className="mx-auto w-10 h-10 text-blue-700" />
//             <p>🤝 Supported by BM Foundation</p>
//           </div>
//         </div>
//       </section>

//       {/* 3. Who Can Take SACT? */}
//       <section className="bg-gray-50 py-16 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-3xl font-bold mb-4">👨‍🎓 Who Can Apply?</h2>
//             <ul className="space-y-3 text-lg">
//               <li>🏫 School Students (10th, 11th, 12th)</li>
//               <li>🎓 College Students</li>
//               <li>💼 Job Seekers & Career Switchers</li>
//             </ul>
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold mb-4">🎯 Why Take the SACT?</h2>
//             <ul className="space-y-3 text-lg">
//               <li>✅ Easy online test – anytime, anywhere</li>
//               <li>✅ Personalized career roadmap PDF</li>
//               <li>✅ Scholarships worth ₹5,000–₹15,000</li>
//               <li>✅ Guidance from career experts</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* 4. Register Now Form */}
//       <section id="register" className="bg-gradient-to-br from-blue-50 to-yellow-50 py-20 px-6">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-2xl p-10">
//             {/* Heading */}
//             <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
//               📥 Take Your Free Career Test Now
//             </h2>
//             <p className="text-center text-gray-600 mb-8">
//               Discover Your Strengths. Choose the Right Path. Build a Bright Future.
//             </p>

//             {/* Form */}
//             <form className="space-y-6">
//               {/* Name */}
//               <div className="relative">
//                 <input type="text" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="Name" />
//                 <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">Name</label>
//               </div>

//               {/* Email */}
//               <div className="relative">
//                 <input type="email" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="Email" />
//                 <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">Email</label>
//               </div>

//               {/* WhatsApp */}
//               <div className="relative">
//                 <input type="tel" required className="peer w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-transparent" placeholder="WhatsApp Number" />
//                 <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">WhatsApp Number</label>
//               </div>

//               {/* Submit */}
//               <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-semibold rounded-xl shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition">
//                 ✅ Submit & Get Test Link
//               </button>
//             </form>

//             {/* Instant Benefits */}
//             <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
//               <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 You’ll instantly receive:</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-start gap-2"><span className="text-green-600">✔</span> A test link by email & WhatsApp</li>
//                 <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Course brochure (PDF)</li>
//                 <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Result within 48 hours</li>
//                 <li className="flex items-start gap-2"><span className="text-green-600">✔</span> Scholarship confirmation if eligible</li>
//               </ul>
//             </div>

//             {/* Footer Note */}
//             <p className="text-center text-gray-500 text-sm mt-6">
//               ⚡ Start your career journey with BM Academy today!
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
