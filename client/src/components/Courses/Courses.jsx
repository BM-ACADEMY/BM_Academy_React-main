import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function CoursesSection() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(location.state?.courseIndex || null); // only once

  const courses = [
    {
      title: "🎓 Government Exam Coaching",
      subtitle: "🏛️ TNPSC Group 2, 4, VAO, SSC, Bank & RRB Exams",
      overview:
        "Crack competitive government exams with expert coaching, current affairs updates, and mock test practice.",
      learn: [
        "Syllabus-wise coaching (Maths, GS, Tamil, GK)",
        "TNPSC Group 2, Group 4, VAO",
        "SSC CHSL, CGL, MTS",
        "Bank PO, Clerk (IBPS/SBI)",
        "RRB NTPC & Group D",
        "Daily Current Affairs + Test Series",
        "Exam Strategies + Time Management",
      ],
      duration: "6 Months (Fast-track: 3 Months)",
      outcomes: [
        "✅ Crack State & Central Govt. Exams",
        "✅ Expert Faculty Support",
        "✅ Daily/Weekly Tests",
        "✅ Free SACT Career Test & SAT Scholarship",
      ],
      faq: [
        {
          q: "Can I take this course online?",
          a: "Yes, both offline and live online batches are available.",
        },
      ],
    },
    {
      title: "🎯 Soft Skills & Interview Prep",
      subtitle: "Job readiness & communication mastery",
      overview:
        "Build confidence and communication skills for job readiness.",
      learn: [
        "Resume Writing",
        "Group Discussion Practice",
        "Interview Techniques (HR + Tech)",
        "Email, Workplace Etiquette",
        "English & Tamil Mixed Training",
      ],
      duration: "3 Weeks",
      outcomes: [
        "✅ Face job interviews confidently",
        "✅ Build strong resumes and LinkedIn profiles",
        "✅ Improve speaking skills",
      ],
      faq: [
        {
          q: "Is this useful for college students and job seekers?",
          a: "Yes, this course is ideal for freshers and working professionals.",
        },
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          📚 Our Popular Courses
        </h2>

        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {course.subtitle}
                </p>
              </div>
              {openIndex === i ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Content */}
            <div
              className={`px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === i ? "max-h-screen" : "max-h-0"
              }`}
            >
              {openIndex === i && (
                <>
                  <p className="mb-3">
                    <strong>Overview:</strong> {course.overview}
                  </p>

                  <div className="mb-3">
                    <strong>What You Will Learn:</strong>
                    <ul className="list-disc ml-5 sm:ml-6 mt-1 space-y-1">
                      {course.learn.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mb-3">
                    <strong>Duration:</strong> {course.duration}
                  </p>

                  <div className="mb-3">
                    <strong>Outcomes:</strong>
                    <ul className="list-disc ml-5 sm:ml-6 mt-1 space-y-1">
                      {course.outcomes.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <strong>FAQs:</strong>
                    {course.faq.map((f, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-base mb-1"
                      >
                        <b>Q:</b> {f.q} <br /> <b>A:</b> {f.a}
                      </p>
                    ))}
                  </div>

                  {/* CTA Button — only one now */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
                    <a href="tel:+919876543210" className="flex-1">
                      <button className="w-full px-5 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition text-center">
                        📞 Talk to a Counselor
                      </button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Career Test & Scholarship */}
        <div className="bg-yellow-100 rounded-2xl p-4 sm:p-6 mt-10 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            🔧 Career Test & Scholarship Tools (Free)
          </h3>
          <p className="mb-3 text-sm sm:text-base">
            ✅ SACT – Smart Aptitude & Career Test → Get instant report + best-fit course suggestions
          </p>
          <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-3 mt-2">
            <a
              href="https://scat-topaz.vercel.app/Sact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-800 transition flex-1 sm:flex-auto text-center"
            >
              Take Free Career Test
            </a>
            <a
              href="https://sample-sat.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition flex-1 sm:flex-auto text-center"
            >
              Apply for SAT Exam
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
