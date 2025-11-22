import React from "react";
import bm from "../../../assets/img/bm.png";
import { Instagram, Facebook, Youtube } from "lucide-react"; // ✅ Lucide icons

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-[#faeae6]/40 backdrop-blur-sm" id="contact">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10 py-12 border-b border-gray-300 text-gray-600">
        {/* Logo + About */}
        <div className="max-w-sm">
          <img src={bm} alt="BM Academy" className="h-14 w-auto" />
          <p className="mt-6 text-sm leading-relaxed">
            BM Academy offers hands-on training in{" "}
            <span className="font-semibold text-gray-800">Digital Marketing</span>,{" "}
            <span className="font-semibold text-gray-800">Web Development</span>, and{" "}
            <span className="font-semibold text-gray-800">Cloud Computing</span> — helping you unlock your potential and achieve professional growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 text-base">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a href="#home" className="hover:text-[#cb2800] transition">Home</a></li>
            <li><a href="#gallery" className="hover:text-[#cb2800] transition">Gallery</a></li>
            <li><a href="#testimonials" className="hover:text-[#cb2800] transition">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-[#cb2800] transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 text-base">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/bmacademypondy/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#cb2800]/10 transition-all duration-300"
            >
              <Instagram className="w-5 h-5 text-[#cb2800]" />
            </a>
            <a
              href="https://www.facebook.com/people/BM-Academy/61566753898165/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#cb2800]/10 transition-all duration-300"
            >
              <Facebook className="w-5 h-5 text-[#cb2800]" />
            </a>
            <a
              href="https://www.youtube.com/@bmacademypondy"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#cb2800]/10 transition-all duration-300"
            >
              <Youtube className="w-5 h-5 text-[#cb2800]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="py-6 text-center text-sm text-gray-500">
        © {year}{" "}
        <a href="https://bmtechx.in/" className="text-[#cb2800] hover:underline font-medium">
          BMTechx.in
        </a>{" "}
        — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
