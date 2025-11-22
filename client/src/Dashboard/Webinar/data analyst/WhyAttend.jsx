import React, { useEffect } from "react";
import {
  BarChart,
  Database,
  LineChart,
  Award,
  MessageCircle,
  Briefcase,
  PieChart,
} from "lucide-react";
import { initAOS } from "../../../utils/aosConfig";

/* ---------------------------------------------------------
   WHY ATTEND SECTION (DATA ANALYST VERSION)
--------------------------------------------------------- */
const WhyAttend = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const whyAttendCards = [
    {
      icon: <BarChart className="w-6 h-6 text-[#f0806f]" />,
      title: "Beginner-Friendly",
      text: "Start even if you have zero technical or IT background.",
    },
    {
      icon: <Database className="w-6 h-6 text-[#f0806f]" />,
      title: "Learn Core Tools",
      text: "Understand Excel, SQL, Power BI & Python — step-by-step.",
    },
    {
      icon: <LineChart className="w-6 h-6 text-[#f0806f]" />,
      title: "Work on Real Data",
      text: "See how analysts solve real business problems with data.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#f0806f]" />,
      title: "Live Q&A",
      text: "Get your questions clarified directly by expert trainers.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#f0806f]" />,
      title: "Certificate Provided",
      text: "Showcase your learning on LinkedIn & your resume.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#f0806f]" />,
      title: "Career Roadmap",
      text: "Learn the exact steps to become a Data Analyst in 2025.",
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
          <span className="text-orange-700"> This Data Analyst Webinar?</span>
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

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#f7d5ce]/40 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f7d5ce]/20 blur-3xl -z-10"></div>
    </section>
  );
};


/* ---------------------------------------------------------
   DISCOVER SECTION (DATA ANALYST VERSION)
--------------------------------------------------------- */
const DiscoverSection = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const discoverItems = [
    {
      icon: <BarChart className="w-5 h-5 text-[#f0806f]" />,
      title: "The Role of a Data Analyst",
    },
    {
      icon: <Database className="w-5 h-5 text-[#f0806f]" />,
      title: "How SQL & Databases Work",
    },
    {
      icon: <LineChart className="w-5 h-5 text-[#f0806f]" />,
      title: "Understanding Dashboards & Power BI",
    },
    {
      icon: <PieChart className="w-5 h-5 text-[#f0806f]" />,
      title: "Data Visualization Techniques",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-[#f0806f]" />,
      title: "Career Opportunities in Data Analytics",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#f0806f]" />,
      title: "Live Q&A with Industry Experts",
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
            <p className="text-gray-800 font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { WhyAttend, DiscoverSection };
