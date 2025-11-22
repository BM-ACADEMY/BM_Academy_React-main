import React from "react";
import { Link } from "react-router-dom";

const AboutBanner = () => {
  return (
    <section className="bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          🧠 What Makes Us Different?
        </h2>

        {/* Key Points */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="p-6 hover:bg-yellow-400 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">✅ AI-Driven Career Support</h3>
            <p className="text-gray-700">
              Our exclusive <b>SACT (Smart Aptitude & Career Test)</b> helps students
              find the right path based on interest, personality, and aptitude — no
              guesswork, only clarity.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:bg-yellow-400 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">✅ Scholarships for All</h3>
            <p className="text-gray-700">
              With our <b>SAT Entrance Exam</b>, deserving students get up to 85% fee
              waivers — making career education affordable and inclusive.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:bg-yellow-400 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">✅ Job-Focused Courses</h3>
            <p className="text-gray-700">
              From <b>Government Job Coaching</b> to Web Development, AI, Digital
              Marketing, and more — our curriculum is industry-relevant and
              placement-driven.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:bg-yellow-400 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">✅ Support from BM Foundation</h3>
            <p className="text-gray-700">
              We are committed to social impact. Through BM Foundation, we support
              underprivileged students with free guidance, resources, and mentorship.
            </p>
          </div>
        </div>

        {/* Founder Message */}
        <div className="mt-16 max-w-4xl mx-auto bg-yellow-100 rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold mb-4">💬 A Message from Our Founder & CEO</h3>
          <p className="text-gray-800 italic mb-4">
            "BM Academy is more than an institute — it’s a commitment to every
            learner’s future. We believe no student should be left behind due to lack
            of guidance or financial limits. With the help of AI tools like SACT and
            scholarship programs via SAT, we want to be the bridge between ambition
            and achievement."
          </p>
          <p className="font-semibold">– [B.M.Kamarudeen], CEO & Founder, BM Academy</p>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-6">🏆 Our Achievements</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-lg">
            <li>🎓 1100+ Students Trained</li>
            <li>📍 Reach Across Tamil Nadu, Pondicherry & India</li>
            <li>💡 Launched SACT Test – First of its kind AI Career Tool</li>
            <li>💰 Facilitated ₹ Lakhs in Scholarships through SAT</li>
            <li>🤝 Collaborated with industry experts for live training modules</li>
          </ul>
        </div>

        {/* Who We Serve */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-6">🌐 Who We Serve</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-lg">
            <li>🎓 School & College Students</li>
            <li>💼 Job Seekers & Working Professionals</li>
            <li>🔁 Career Changers</li>
            <li>🧭 Anyone Seeking Career Clarity or Skill Growth</li>
          </ul>
        </div>

        {/* Explore More */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-6">🔗 Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
            >
              📘 Browse Our Courses
            </Link>

            {/* ✅ Use external links for SACT and SAT (same as Navbar) */}
            <a
  href="https://scat-topaz.vercel.app/Sact.html"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800"
>
  🎯 Try Free Career Test – SACT
</a>

<a
  href="https://sample-sat.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
>
  📝 Apply for Scholarship (SAT)
</a>


            <Link
              to="/contacts"
              className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800"
            >
              📞 Contact Our Team
            </Link>
          </div>
        </div>

        {/* Join Our Mission */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">👣 Join Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you’re a student, parent, or educator — BM Academy welcomes you
            to be part of a future-focused education movement. Let’s build a stronger,
            skilled India — one student at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
