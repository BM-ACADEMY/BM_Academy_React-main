// client/src/Dashboard/Sidebar.jsx
import React from "react";
import { FaHome, FaBook, FaUser } from "react-icons/fa";

export default function  Sidebar({ onNavigate, current }) {
  const navItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "My Courses", icon: <FaBook /> }, // <-- added
    // you can add more items here
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col py-6 px-4 shadow-lg">
      <h1 className="pt-16 text-2xl font-bold mb-8 text-yellow-400 text-center">
        BM Academy
      </h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              current === item.name
                ? "bg-yellow-500 text-black"
                : "hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
