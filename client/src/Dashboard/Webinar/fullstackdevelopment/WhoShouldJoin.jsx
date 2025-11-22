import React, { useEffect } from "react";
import { GraduationCap, Briefcase, Laptop, Code } from "lucide-react";
import { initAOS } from "../../../utils/aosConfig";

const people = [
  {
    icon: <GraduationCap />,
    title: "Students & Freshers",
    text: "Start your coding journey early and build in-demand development skills.",
  },
  {
    icon: <Briefcase />,
    title: "Job Seekers",
    text: "Strengthen your resume with full-stack skills and boost your job chances.",
  },
  {
    icon: <Laptop />,
    title: "Working Professionals",
    text: "Switch to a high-paying tech career by learning modern development tools.",
  },
  {
    icon: <Code />,
    title: "Curious Learners",
    text: "Understand how websites, apps, and backend systems are built from scratch.",
  },
];

const WhoShouldJoin = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <section className="py-20 bg-white relative" id="who-should-join">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Title Section */}
        <div
          className="max-w-3xl mx-auto text-center mb-14"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Who Should <span className="text-[#cb2800]">Join?</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {people.map((p, i) => (
            <div
              key={i}
              className="bg-[#faeae6] border border-[#cb2800]/20 rounded-2xl p-8 text-center 
                         hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              data-aos="zoom-in"
              data-aos-delay={i * 150 + 300}
            >
              <div className="bg-[#cb2800]/10 text-[#cb2800] w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4">
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#cb2800]/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#facc15]/10 blur-3xl -z-10"></div>
    </section>
  );
};

export default WhoShouldJoin;
