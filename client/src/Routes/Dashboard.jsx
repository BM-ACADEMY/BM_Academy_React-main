import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import Breadcrumbs from "../Dashboard/Breadcrumbs";
import StudentDashboard from "../Dashboard/StudentDashboard";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumbs at top */}
        <div className="p-4 bg-white shadow sticky top-0 z-10">
          <Breadcrumbs />
        </div>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <StudentDashboard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
