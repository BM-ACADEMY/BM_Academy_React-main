import React from "react";
import { Phone } from "lucide-react";
import logo from "../../../assets/img/logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-4 md:px-16 lg:px-24 xl:px-32 py-6 relative z-10">
      <a href="#">
        <img src={logo} alt="BM Academy Logo" className="h-12 md:h-14 w-auto" />
      </a>
      <a
        href="tel:+919944940051"
        className="flex items-center gap-2 text-white font-medium hover:text-[#facc15] transition-colors text-base md:text-lg"
      >
        <Phone className="text-[#facc15]" size={20} />
        <span>+91 99449 40051</span>
      </a>
    </nav>
  );
};

export default Navbar;
