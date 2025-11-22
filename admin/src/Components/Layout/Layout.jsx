// src/Components/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar_collapsed")) || false
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setCollapsed(JSON.parse(localStorage.getItem("sidebar_collapsed")) || false);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? "80px" : "256px" }}
      >
        {children}
      </main>
    </div>
  );
}
