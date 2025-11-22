import React from "react";

const Testimonials = () => {
  const cardsData = [
    {
      name: "Priya, Coimbatore",
      handle: "College Student",
      text: "The webinar was amazing! I learned practical digital marketing skills that I now use for my family business.",
    },
    {
      name: "Sundar",
      handle: "MBA Graduate",
      text: "As a working professional, I found the webinar concise and impactful. It helped me upskill quickly and confidently.",
    },
    {
      name: "Aarav",
      handle: "12th Std Student",
      text: "The webinar was super engaging and easy to follow. I even built my first web project by the end of it!",
    },
    {
      name: "Meera",
      handle: "Job Seeker",
      text: "After completing the webinar, I gained hands-on UI/UX experience and landed a freelance design project. Totally worth it!",
    },
    {
      name: "Rahul",
      handle: "B.Com Graduate",
      text: "The webinar was a great learning experience. It gave me clarity and confidence to start my career in data analytics.",
    },
  ];

  const TestimonialCard = ({ card }) => (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-2xl w-80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#cb2800]/10 flex items-center justify-center text-[#cb2800] font-bold text-lg">
          {card.name[0]}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">{card.name}</h4>
          <p className="text-sm text-gray-500">{card.handle}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed italic">
        <i className="fas fa-quote-left text-[#cb2800] mr-2"></i>
        {card.text}
      </p>
    </div>
  );

  return (
    <section id="testimonials" className="relative py-20 bg-gradient-to-br from-white via-[#fff5f3] to-[#ffe9e4] overflow-hidden">
      {/* Background pattern effect */}

      {/* Section Header */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold  mb-3 flex justify-center items-center gap-2">
          {/* <i className="fas fa-comment-dots text-[#cb2800]"></i> */}
          Student <span className="text-[#cb2800]">Testimonials</span> 
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hear from our students who transformed their learning journey through our webinars.
        </p>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 35s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      {/* Row 1 */}
      <div className="relative overflow-hidden max-w-7xl mx-auto">
        <div className="flex marquee-inner min-w-[200%] gap-8 py-10">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative overflow-hidden max-w-7xl mx-auto mt-4">
        <div className="flex marquee-inner marquee-reverse min-w-[200%] gap-8 py-10">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
