import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Bm Academy logo .png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // BM Academy Brand Colors
  const BRAND_YELLOW = "#FFEA00";
  const BRAND_BLACK = "#111111";

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "SACT Test", external: "https://scat-topaz.vercel.app/Sact.html" },
    { name: "SAT Exam", external: "https://sample-sat.vercel.app/" },
    { name: "About", path: "/about" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "Contact", path: "/contacts" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));

      fetch(`${import.meta.env.VITE_BASE_URI}users/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (contentType?.includes("application/json")) {
            if (!res.ok) throw await res.json();
            return res.json();
          } else {
            throw new Error("Non-JSON response");
          }
        })
        .then((data) => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md font-sans">
      <div className="flex justify-between items-center h-20">

        {/* --- LEFT SECTION: SKEWED BLACK BACKGROUND (Desktop) --- */}
        <div className="relative h-full flex items-center z-20">
          <div
            className="hidden md:block absolute top-0 left-0 h-full w-[120%] bg-[#111111] transform -skew-x-[20deg] origin-bottom-left border-r-8 border-[#FFEA00]"
            style={{ left: '-40px' }}
          ></div>

          <Link to="/" className="relative z-10 px-6 lg:px-12 flex items-center">
            <img
              src={Logo}
              alt="BM Academy"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* --- RIGHT SECTION: NAVIGATION --- */}
        <div className="flex-1 flex justify-end px-6 lg:px-12">

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-800 hover:text-[#FFEA00] font-bold uppercase text-sm tracking-wide transition duration-200 group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#FFEA00] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-gray-800 hover:text-[#FFEA00] font-bold uppercase text-sm tracking-wide transition duration-200 group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#FFEA00] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}

            {/* Desktop Webinar Dropdown */}
            <div className="relative group">
              <a
  href="https://webinar-lake.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="relative text-gray-800 hover:text-[#FFEA00] font-bold uppercase text-sm tracking-wide transition duration-200 group"
>
  Webinar
  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#FFEA00] transition-all duration-300 group-hover:w-full"></span>
</a>


              {/* FIX: Aligned right (right-0), wider (w-64), and auto height to remove scrollbar */}

            </div>

            {/* Profile Only (Login Removed) */}
            {isLoggedIn && (
              <div className="ml-6 relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center transition hover:scale-105"
                >
                  <FaUserCircle size={32} className="text-gray-800 hover:text-[#FFEA00] transition-colors" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white border-t-4 border-[#FFEA00] shadow-xl py-2 animate-fadeIn z-50 rounded-b-lg h-auto">
                    <Link
                      to="/dashboard/student"
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 font-medium transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 font-medium transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 hover:text-[#FFEA00] transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b-4 border-[#FFEA00]">
          <h2 className="text-xl font-bold text-gray-900">MENU</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-600 hover:text-[#FFEA00]" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-[#d4c300] font-bold text-lg border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-[#d4c300] font-bold text-lg border-b border-gray-100 pb-2"
              >
                {link.name}
              </Link>
            )
          )}

          {/* MOBILE WEBINAR SECTION (Flattened) */}
          <div className="flex flex-col pt-2 pb-2">
<a
  href="https://webinar-lake.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setIsOpen(false)}
  className="text-gray-800 hover:text-[#d4c300] font-bold text-lg border-b border-gray-100 pb-2"
>
  Webinar
</a>

          </div>
        </div>

        {/* Mobile Footer */}
        <div className="absolute bottom-0 w-full bg-gray-50 p-6 border-t border-gray-200">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-3">
              <Link
                to="/dashboard/student"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-gray-800 hover:text-[#d4c300] font-bold"
              >
                <FaUserCircle size={28} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-600 font-bold hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
             <div className="text-center">
                 <Link
                    to="/login"
                    className="block w-full bg-[#111111] text-[#FFEA00] font-bold py-3 rounded hover:bg-black transition"
                    onClick={() => setIsOpen(false)}
                 >
                     Login
                 </Link>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
}
