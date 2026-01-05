// src/Components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaSignOutAlt,
  FaCertificate,
  FaLayerGroup,
  FaNewspaper
} from "react-icons/fa";

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    navigate("/login");
  };

  const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2.5 mx-3 rounded-md transition-all duration-200 group font-medium text-sm
        ${
          isActive
            ? "bg-blue-50 text-blue-600" // Light Blue Active State
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      <Icon className={`text-lg ${collapsed ? "mx-auto" : ""} ${({ isActive }) => isActive ? "text-blue-600" : "text-slate-400"}`} />

      {!collapsed && <span>{label}</span>}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <span className="fixed left-14 ml-2 px-2 py-1 text-xs bg-slate-900 text-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top - Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-200">
            <FaLayerGroup />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-slate-800 tracking-tight">
              Bm_Admin
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        {!collapsed && (
           <div className="px-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
             Main Menu
           </div>
        )}
        <SidebarLink to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
        <SidebarLink to="/courses" icon={FaBook} label="Courses" />
        <SidebarLink to="/certificates" icon={FaCertificate} label="Certificates" />
        <SidebarLink to="/blogs" icon={FaNewspaper} label="Blogs" />


      </nav>

      {/* Bottom - User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${!collapsed ? "hover:bg-slate-50 cursor-pointer" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
            {email ? email.charAt(0).toUpperCase() : "A"}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Admin</p>
              <p className="text-xs text-slate-500 truncate">{email}</p>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          )}
        </div>

        {/* Logout button for collapsed state */}
        {collapsed && (
            <button
                onClick={handleLogout}
                className="w-full mt-2 flex justify-center text-slate-400 hover:text-red-500"
            >
                <FaSignOutAlt />
            </button>
        )}
      </div>
    </aside>
  );
}
