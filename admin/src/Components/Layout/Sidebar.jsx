// src/Components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaSignOutAlt,
  FaCertificate,
  FaLayerGroup,
  FaListAlt
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
        `relative flex items-center gap-3 px-3 py-3 mx-3 rounded-lg transition-all duration-200 group font-bold text-sm
        ${
          isActive
            ? "bg-[#FFEA00] text-black shadow-sm" // Active: Brand Yellow & Black
            : "text-gray-500 hover:bg-gray-50 hover:text-black" // Inactive: Clean Gray
        }`
      }
    >
      {/* Icon */}
      <Icon
        className={`text-lg transition-colors duration-200
        ${collapsed ? "mx-auto" : ""}
        ${({ isActive }) => isActive ? "text-black" : "text-gray-400 group-hover:text-black"}`}
      />

      {/* Label */}
      {!collapsed && <span>{label}</span>}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <span className="fixed left-16 ml-2 px-3 py-1.5 text-xs font-bold bg-black text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* --- Top: Logo --- */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>

          {/* Logo Icon */}
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-[#FFEA00] shrink-0 shadow-lg shadow-gray-200">
            <FaLayerGroup size={18} />
          </div>

          {/* Logo Text */}
          {!collapsed && (
            <div className="flex flex-col">
                <span className="text-lg font-black text-gray-900 tracking-tight leading-none">
                BM Admin
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Panel
                </span>
            </div>
          )}
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 py-8 space-y-1.5 overflow-y-auto">
        {!collapsed && (
           <div className="px-6 mb-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
             Overview
           </div>
        )}
        <SidebarLink to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />

        {!collapsed && (
           <div className="px-6 mt-8 mb-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
             Management
           </div>
        )}
        <SidebarLink to="/courses" icon={FaBook} label="Courses" />

        <SidebarLink to="/certificates" icon={FaCertificate} label="Certificates" />
      </nav>

      {/* --- Bottom: Profile --- */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className={`flex items-center gap-3 p-2 rounded-xl transition-all ${!collapsed ? "hover:bg-white hover:shadow-sm cursor-pointer border border-transparent hover:border-gray-200" : "justify-center"}`}>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
            {email ? email.charAt(0).toUpperCase() : "A"}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">Administrator</p>
              <p className="text-xs font-medium text-gray-500 truncate">{email}</p>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          )}
        </div>

        {/* Collapsed Logout */}
        {collapsed && (
            <button
                onClick={handleLogout}
                className="w-full mt-3 flex justify-center text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Logout"
            >
                <FaSignOutAlt size={18} />
            </button>
        )}
      </div>
    </aside>
  );
}
