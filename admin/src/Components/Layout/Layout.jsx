// src/Components/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa"; // Removed FaSearch

// --- Top Header Component ---
const TopHeader = ({ collapsed, setCollapsed }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between border-b border-slate-200 transition-colors duration-300">

      {/* Left Side: Toggle Only */}
      <div className="flex items-center gap-4 w-full">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <FaBars />
        </button>
      </div>

    </header>
  );
};

// --- Main Layout Component ---
export default function Layout({ children }) {
  // Sidebar State
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar_collapsed")) || false
  );

  // Sync Sidebar State
  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Auto-collapse on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Sidebar collapsed={collapsed} />

      {/* Main Content Wrapper */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: collapsed ? "80px" : "256px" }}
      >
        <TopHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
