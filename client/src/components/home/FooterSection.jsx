import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import Logo from "../../assets/img/Bm Academy logo .png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // REMOVED: 'border-t-4 border-[#FFEA00]' class
    <footer className="bg-[#050505] text-white pt-16 pb-8 font-sans relative overflow-hidden">

      {/* Decorative Yellow Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FFEA00] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* --- COLUMN 1: BRAND & LOGO --- */}
          <div className="space-y-6">
            <a href="/" className="inline-block">
              <img
                src={Logo}
                alt="BM Academy"
                className="h-16 w-auto object-contain"
              />
            </a>

            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students with future-ready skills, career clarity, and massive scholarship support across Tamil Nadu and Pondicherry.
            </p>

            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-[#FFEA00] hover:text-black transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- COLUMN 2: QUICK LINKS --- */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-gray-800 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Verify Certificate", link: "/verify" },
                { name: "Contact Support", link: "/contacts" }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-[#FFEA00] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <HiArrowRight className="text-[#FFEA00] opacity-0 hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 3: POPULAR COURSES --- */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-gray-800 pb-2 inline-block">
              Our Courses
            </h3>
            <ul className="space-y-3">
              {[
                "Full Stack Development",
                "Data Science & AI",
                "Digital Marketing",
                "TNPSC Coaching",
                "Banking & SSC Exams"
              ].map((course, index) => (
                <li key={index}>
                  <a
                    href="/courses"
                    className="text-gray-400 hover:text-[#FFEA00] transition-colors duration-300 text-sm block"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 4: CONTACT INFO --- */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-gray-800 pb-2 inline-block">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 text-[#FFEA00]">
                  <FaMapMarkerAlt size={18} />
                </div>
                <span className="text-gray-400 text-sm">
                  No. 123, Main Road, Kottakuppam,<br/> Pondicherry - 605104
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-[#FFEA00]">
                  <FaPhoneAlt size={18} />
                </div>
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-[#FFEA00]">
                  <FaEnvelope size={18} />
                </div>
                <a href="mailto:info@bmacademy.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@bmacademy.in
                </a>
              </li>

              <li className="pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-500 transition-colors shadow-lg"
                >
                  <FaWhatsapp size={18} />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} BM Academy. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
          <p className="mt-4 md:mt-0 opacity-70">
            Powered by <span className="text-[#FFEA00] font-bold">ABM GROUPS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
