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
  const [webinarOpen, setWebinarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center h-20 px-6 lg:px-12">
        <Link to="/">
          <img
            src={Logo}
            alt="BM Academy"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.external}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-800 hover:text-yellow-600 font-medium transition duration-200 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-gray-800 hover:text-yellow-600 font-medium transition duration-200 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}

          {/* Desktop Webinar Dropdown */}
          <div className="relative group">
            <Link
    to="/webinar"
    className="relative text-gray-800 hover:text-yellow-600 font-medium transition duration-200 group"
  >
    Webinar
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>

            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 py-2 z-50 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
              transition-all duration-200">
              <Link
                to="/webinar/digital-marketing"
                className="block px-4 py-2 hover:bg-yellow-50 text-gray-700"
              >
                Digital Marketing
              </Link>
              <Link
                to="/webinar/data-analyst"
                className="block px-4 py-2 hover:bg-yellow-50 text-gray-700"
              >
                Data Analyst
              </Link>
              <Link
                to="/webinar/fullstack-development"
                className="block px-4 py-2 hover:bg-yellow-50 text-gray-700"
              >
                FullStack Development
              </Link>
            </div>
          </div>

          {/* Profile Only (Login Removed) */}
          {isLoggedIn && (
            <div className="ml-8 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center transition hover:scale-105"
              >
                <FaUserCircle
                  size={30}
                  className="text-gray-700 hover:text-yellow-500 transition-colors"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2 animate-fadeIn">
                  <Link
                    to="/dashboard/student"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
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
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} className="text-gray-600 hover:text-yellow-600" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-5">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-yellow-600 font-medium"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-yellow-600 font-medium"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Mobile Webinar */}
          <div className="flex flex-col">
            <button
              onClick={() => setWebinarOpen(!webinarOpen)}
              className="text-gray-700 font-medium flex justify-between items-center"
            >
              Webinar
              <span>{webinarOpen ? "-" : "+"}</span>
            </button>

            {webinarOpen && (
              <div className="flex flex-col pl-4 mt-2 space-y-2">
                <Link
                  to="/webinar/digital-marketing"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-yellow-600"
                >
                  Digital Marketing
                </Link>

                <Link
                  to="/webinar/data-analyst"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-yellow-600"
                >
                  Data Analyst
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Footer - Only Show Profile If Logged In */}
        <div className="border-t border-gray-100 mt-4 p-5 bg-white">
          {isLoggedIn && (
            <div className="flex flex-col space-y-3">
              <Link
                to="/dashboard/student"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600"
              >
                <FaUserCircle size={26} />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
