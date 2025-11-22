import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Fake notifications (replace with API later)
  const notifications = [
    { id: 1, message: "New user registered", time: "2 min ago" },
    { id: 2, message: "New course added", time: "10 min ago" },
    { id: 3, message: "Payment received", time: "1 hr ago" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <MdDashboard className="text-yellow-500 text-2xl" />
        <h1 className="text-xl font-bold text-gray-800">
          BM Academy <span className="text-yellow-500">Admin</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/dashboard/admin/courses"
          className="flex items-center text-gray-700 font-medium hover:text-yellow-500 transition"
        >
          <FaChalkboardTeacher className="mr-2" /> Courses
        </Link>
        <Link
          to="/dashboard/admin/users"
          className="flex items-center text-gray-700 font-medium hover:text-yellow-500 transition"
        >
          <FaUsers className="mr-2" /> Users
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative text-2xl text-gray-700 hover:text-yellow-500 transition focus:outline-none"
          >
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-3 border-b font-semibold text-gray-700">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <p>{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center py-2 border-t">
                <Link
                  to="/dashboard/admin/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="text-yellow-500 text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-3xl text-gray-700 hover:text-yellow-500 transition" />
            <span className="text-gray-700 font-medium">Admin</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <Link
                to="/dashboard/admin/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-2" /> Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setProfileOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg flex flex-col items-start p-4 space-y-4 md:hidden z-50">
          <Link
            to="/dashboard/admin/courses"
            onClick={() => setMenuOpen(false)}
            className="flex items-center text-gray-700 font-medium hover:text-yellow-500 transition"
          >
            <FaChalkboardTeacher className="mr-2" /> Courses
          </Link>
          <Link
            to="/dashboard/admin/users"
            onClick={() => setMenuOpen(false)}
            className="flex items-center text-gray-700 font-medium hover:text-yellow-500 transition"
          >
            <FaUsers className="mr-2" /> Users
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center w-full bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
