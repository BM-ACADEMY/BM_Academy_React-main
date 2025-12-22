// src/Components/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaSearch } from "react-icons/fa";

// --- Top Header Component ---
const TopHeader = ({ collapsed, setCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between border-b border-slate-200 transition-colors duration-300">

      {/* Left Side: Toggle & Search */}
      <div className="flex items-center gap-4 w-full">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <FaBars />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-slate-100/50 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all rounded-lg px-3 py-2 w-64">
          <FaSearch className="text-slate-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder-slate-400"
          />
        </form>
      </div>

      {/* Right Side removed completely */}

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
