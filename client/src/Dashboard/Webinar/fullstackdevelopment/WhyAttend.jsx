import React, { useEffect } from "react";
import {
  Code,
  Laptop,
  Server,
  Database,
  Award,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import { initAOS } from "../../../utils/aosConfig";

/* ---------------------------------------------------------
   WHY ATTEND SECTION (FULL-STACK VERSION)
--------------------------------------------------------- */
const WhyAttend = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const whyAttendCards = [
    {
      icon: <Laptop className="w-6 h-6 text-[#f0806f]" />,
      title: "Beginner-Friendly",
      text: "Start even if you have zero coding or IT background.",
    },
    {
      icon: <Code className="w-6 h-6 text-[#f0806f]" />,
      title: "Master Full-Stack Skills",
      text: "Learn HTML, CSS, JavaScript, React, Node.js & MongoDB step-by-step.",
    },
    {
      icon: <Server className="w-6 h-6 text-[#f0806f]" />,
      title: "Build Real Applications",
      text: "Create full-stack web apps using modern industry tools.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#f0806f]" />,
      title: "Live Q&A",
      text: "Clear doubts directly with expert mentors during the live session.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#f0806f]" />,
      title: "Certificate Provided",
      text: "Use it to strengthen your resume & LinkedIn profile.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#f0806f]" />,
      title: "Career Roadmap",
      text: "Understand how to become a Full-Stack Developer in 2025.",
    },
  ];

  return (
    <section
      id="why-attend"
      className="relative w-full py-20 overflow-hidden 
                 bg-gradient-to-br from-[#fff7f6] via-[#ffefec] to-[#f7d5ce]"
    >
      <div className="max-w-6xl mx-auto text-center px-6 md:px-12 lg:px-20">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12"
          data-aos="fade-up"
        >
          Why Should You Attend  
          <span className="text-orange-700"> This Full-Stack Developer Webinar?</span>
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {whyAttendCards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 
                         flex flex-col items-center text-center hover:shadow-xl 
                         transform hover:scale-105 transition duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center 
                              bg-[#f0806f]/10 rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-[#f7d5ce]/40 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f7d5ce]/20 blur-3xl -z-10"></div>
    </section>
  );
};



/* ---------------------------------------------------------
   DISCOVER SECTION (FULL-STACK VERSION)
--------------------------------------------------------- */
const DiscoverSection = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const discoverItems = [
    {
      icon: <Code className="w-5 h-5 text-[#f0806f]" />,
      title: "Frontend Development: HTML, CSS & JavaScript",
    },
    {
      icon: <Laptop className="w-5 h-5 text-[#f0806f]" />,
      title: "Building Interactive UI with React.js",
    },
    {
      icon: <Server className="w-5 h-5 text-[#f0806f]" />,
      title: "Backend Development Using Node.js & Express",
    },
    {
      icon: <Database className="w-5 h-5 text-[#f0806f]" />,
      title: "Working with MongoDB & APIs",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-[#f0806f]" />,
      title: "Career Opportunities in Full-Stack Development",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#f0806f]" />,
      title: "Live Q&A with Industry Mentors",
    },
  ];

  return (
    <section
      id="discover"
      className="py-20 bg-gradient-to-br from-[#fff7f6] via-[#ffecea] to-[#f7d5ce]"
    >
      <div
        className="max-w-5xl mx-auto text-center mb-14 px-6 md:px-12 lg:px-20"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          What You Will <span className="text-orange-700">Discover</span>
        </h2>
      </div>

      <div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6 md:px-12 lg:px-20"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {discoverItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm 
                       flex items-center gap-4 hover:shadow-md transform 
                       hover:scale-105 transition duration-300"
          >
            <div className="bg-[#f0806f]/10 p-3 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>
            <p className="text-gray-800 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { WhyAttend, DiscoverSection };
