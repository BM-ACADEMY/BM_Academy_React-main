import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { FaUniversity, FaUserTie, FaCheckCircle, FaQuestionCircle, FaArrowRight } from "react-icons/fa";

export default function CoursesSection() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(location.state?.courseIndex || null);

  const courses = [
    {
      icon: <FaUniversity size={24} />,
      title: "Government Exam Coaching",
      subtitle: "TNPSC Group 2, 4, VAO, SSC, Bank & RRB Exams",
      overview: "Crack competitive government exams with expert coaching, current affairs updates, and mock test practice.",
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
        "Crack State & Central Govt. Exams",
        "Expert Faculty Support",
        "Daily/Weekly Tests",
        "Free SACT Career Test & SAT Scholarship",
      ],
      faq: [
        {
          q: "Can I take this course online?",
          a: "Yes, both offline and live online batches are available.",
        },
      ],
    },
    {
      icon: <FaUserTie size={24} />,
      title: "Soft Skills & Interview Prep",
      subtitle: "Job readiness & communication mastery",
      overview: "Build confidence and communication skills for job readiness.",
      learn: [
        "Resume Writing",
        "Group Discussion Practice",
        "Interview Techniques (HR + Tech)",
        "Email, Workplace Etiquette",
        "English & Tamil Mixed Training",
      ],
      duration: "3 Weeks",
      outcomes: [
        "Face job interviews confidently",
        "Build strong resumes and LinkedIn profiles",
        "Improve speaking skills",
      ],
      faq: [
        {
          q: "Is this useful for college students?",
          a: "Yes, this course is ideal for freshers and working professionals.",
        },
      ],
    },
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-12 font-sans border-t border-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-[#FFEA00]"></div>
            <span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs">
              Curriculum Details
            </span>
            <div className="h-[2px] w-10 bg-[#FFEA00]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111]">
            Our Popular <span className="text-[#d4c300] bg-[#FFEA00]/10 px-2 rounded">Courses</span>
          </h2>
        </div>

        {/* --- ACCORDION LIST --- */}
        <div className="space-y-6">
          {courses.map((course, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                  isOpen ? "border-[#111111] shadow-2xl" : "border-gray-100 shadow-md hover:border-[#FFEA00]"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full flex justify-between items-center p-6 text-left transition-colors duration-300 ${
                    isOpen ? "bg-[#111111] text-white" : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Icon Box */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-[#FFEA00] text-black" : "bg-gray-100 text-gray-600"
                    }`}>
                      {course.icon}
                    </div>

                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${isOpen ? "text-[#FFEA00]" : "text-[#111111]"}`}>
                        {course.title}
                      </h3>
                      <p className={`text-sm sm:text-base mt-1 ${isOpen ? "text-gray-400" : "text-gray-500"}`}>
                        {course.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className={`ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FFEA00]" : "text-gray-400"}`}>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden bg-white ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 sm:p-8 border-t border-gray-100">

                    <p className="text-gray-700 leading-relaxed text-lg mb-8 border-l-4 border-[#FFEA00] pl-4">
                      {course.overview}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Left Column: What you'll learn */}
                      <div>
                        <h4 className="font-bold text-[#111111] uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                           <FaCheckCircle className="text-[#FFEA00]" /> What You Will Learn
                        </h4>
                        <ul className="space-y-3">
                          {course.learn.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Outcomes & FAQ */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-bold text-[#111111] uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                             <FaCheckCircle className="text-[#FFEA00]" /> Key Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {course.outcomes.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                           <h4 className="font-bold text-[#111111] text-sm mb-2 flex items-center gap-2">
                             <FaQuestionCircle className="text-gray-400" /> FAQ
                           </h4>
                           {course.faq.map((f, idx) => (
                              <div key={idx} className="text-sm">
                                <span className="font-bold text-gray-800">{f.q}</span>
                                <p className="text-gray-600 mt-1">{f.a}</p>
                              </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer / Duration */}
                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-4">
                       <div className="text-sm font-medium text-gray-500">
                          <span className="text-[#111111] font-bold">Duration:</span> {course.duration}
                       </div>

                       <a href="tel:+919876543210" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#FFEA00] text-black font-bold uppercase text-xs tracking-wider shadow-md hover:bg-black hover:text-[#FFEA00] transition-all duration-300">
                           Talk to a Counselor
                        </button>
                       </a>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- BOTTOM PROMO CARD (Dark Theme) --- */}
        <div className="mt-16 bg-[#111111] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEA00] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 relative z-10">
            Not sure which path to take?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">
             Take our <span className="text-[#FFEA00] font-bold">SACT (Smart Aptitude & Career Test)</span> to get a personalized report and unlock scholarship opportunities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a
              href="https://scat-topaz.vercel.app/Sact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider rounded shadow hover:bg-white transition-colors duration-300"
            >
              Take Free Career Test
            </a>
            <a
              href="https://sample-sat.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider rounded hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Apply for SAT Exam <FaArrowRight />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
