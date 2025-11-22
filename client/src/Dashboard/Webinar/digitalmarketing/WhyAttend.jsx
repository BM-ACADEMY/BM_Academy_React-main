import React, { useEffect } from "react";
import {
  GraduationCap,
  Presentation,
  Briefcase,
  MessageCircle,
  Award,
  Megaphone,
  Facebook,
  Users,
  PenTool,
  Rocket,
} from "lucide-react";
import { initAOS } from "../../../utils/aosConfig";

const WhyAttend = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const whyAttendCards = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#cb2800]" />,
      title: "Beginner-Friendly",
      text: "No prior experience needed — anyone can join!",
    },
    {
      icon: <Presentation className="w-6 h-6 text-[#cb2800]" />,
      title: "Learn From Experts",
      text: "Get practical tips and strategies from top trainers.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#cb2800]" />,
      title: "Real Success Stories",
      text: "Hear how students from Tamil Nadu launched their careers.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#cb2800]" />,
      title: "Live Q&A",
      text: "Get your questions answered in real time.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#cb2800]" />,
      title: "Certificate of Participation",
      text: "Boost your resume and LinkedIn profile.",
    },
  ];

  return (
    <section
      id="why-attend"
      className="relative w-full py-20 overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto text-center px-6 md:px-12 lg:px-20">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-black mb-12"
          data-aos="fade-up"
        >
          Why should you Attend <span className="text-[#cb2800]">This Webinar?</span>
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {whyAttendCards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transform hover:scale-105 transition duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 150 + 300}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#cb2800]/10 rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Backgrounds */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#facc15]/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#facc15]/5 blur-3xl -z-10"></div>
    </section>
  );
};

const DiscoverSection = () => {
  useEffect(() => {
    initAOS();
  }, []);

  const discoverItems = [
    {
      icon: <Megaphone className="w-5 h-5 text-[#cb2800]" />,
      title: "Social Media Marketing Basics",
    },
    {
      icon: <Facebook className="w-5 h-5 text-[#cb2800]" />,
      title: "How to Run Facebook & Instagram Ads",
    },
    {
      icon: <Users className="w-5 h-5 text-[#cb2800]" />,
      title: "Secrets to Growing Your Followers",
    },
    {
      icon: <PenTool className="w-5 h-5 text-[#cb2800]" />,
      title: "Content Creation Tips & Tools",
    },
    {
      icon: <Rocket className="w-5 h-5 text-[#cb2800]" />,
      title: "Simple Steps to Start a Digital Marketing Career",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#cb2800]" />,
      title: "Q&A with Industry Experts",
    },
  ];

  return (
    <section className="py-20 bg-[#faeae6]" id="discover">
      <div
        className="max-w-5xl mx-auto text-center mb-14 px-6 md:px-12 lg:px-20"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          What You’ll <span className="text-[#cb2800]">Discover</span>
        </h2>
      </div>

      <div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6 md:px-12 lg:px-20"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {discoverItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-4 hover:shadow-md transform hover:scale-105 transition duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 150 + 400}
          >
            <div className="bg-[#cb2800]/10 p-3 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>
            <p className="text-gray-800 font-medium">
              <span className="font-semibold">{item.title}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { WhyAttend, DiscoverSection };
