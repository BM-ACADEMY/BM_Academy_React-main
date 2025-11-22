// client/src/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import MyCourses from "../Dashboard/Mycourses";
import StudentDashboard from "../Dashboard/StudentDashboard";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <StudentDashboard />;
      case "My Courses":
        return <MyCourses />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNavigate={setCurrentPage} current={currentPage} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}
