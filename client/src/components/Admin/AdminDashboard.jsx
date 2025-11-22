import React, { useState } from "react";
import { FaUsers, FaBook, FaBars, FaTimes, FaChartBar } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";

// New component for stats
function StudentStats() {
  // Dummy data for now
  const stats = [
    { title: "Total Students", value: 120 },
    { title: "Active Enrollments", value: 85 },
    { title: "Courses Completed", value: 40 },
    { title: "Pending Enrollments", value: 15 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white shadow rounded p-4 flex flex-col items-center justify-center"
        >
          <h3 className="text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { key: "courses", label: "Manage Courses", icon: <FaBook /> },
    { key: "users", label: "Manage Users", icon: <FaUsers /> },
    { key: "stats", label: "Enrollments Stats", icon: <FaChartBar /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && <h2 className="text-xl font-bold">Admin</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex items-center p-2 rounded cursor-pointer relative ${
                activePage === item.key
                  ? "bg-blue-600"
                  : "hover:bg-gray-700 transition"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          {activePage === "courses" && <ManageCourses />}
          {activePage === "users" && <ManageUsers />}
          {activePage === "stats" && <StudentStats />}
        </div>
      </div>
    </div>
  );
}
