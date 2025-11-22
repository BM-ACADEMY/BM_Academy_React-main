import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaSignOutAlt,
  FaBars,
  FaCertificate,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");

  // Collapsed state persists in localStorage
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar_collapsed")) || false
  );

  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Only collapse automatically on mobile (<768px) initially
  useEffect(() => {
    if (window.innerWidth < 768 && !collapsed) {
      setCollapsed(true);
    }
  }, []); // run once on mount

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  // Sidebar Link Component
  const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group
        ${
          isActive
            ? "bg-yellow-500/20 text-yellow-400 font-semibold shadow-sm"
            : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
        }`
      }
    >
      <Icon className="text-lg" />
      {!collapsed && <span>{label}</span>}
      {collapsed && (
        <span
          className="absolute left-14 px-2 py-1 text-xs bg-gray-900 text-white rounded-md shadow-lg
                     opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                     transition-all duration-200"
        >
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col transition-all duration-300 shadow-lg border-r border-gray-700 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{ backgroundColor: "rgb(30, 41, 57)" }}
    >
      {/* Top - Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white tracking-wide">
            BM <span className="text-yellow-400">Admin</span>
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        <SidebarLink to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
        <SidebarLink to="/courses" icon={FaBook} label="Courses" />
        <SidebarLink to="/users" icon={FaUsers} label="Users" />
        <SidebarLink to="/certificates" icon={FaCertificate} label="Certificates" />
      </nav>

      {/* Bottom - User + Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        {!collapsed && (
          <span className="block text-gray-400 text-sm mb-3 truncate">
            {email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-2 px-4 py-2 text-red-400 rounded-lg hover:bg-red-500/10 transition-all group"
        >
          <FaSignOutAlt className="text-lg" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <span
              className="absolute left-14 px-2 py-1 text-xs bg-gray-900 text-white rounded-md shadow-lg
                         opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                         transition-all duration-200"
            >
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
