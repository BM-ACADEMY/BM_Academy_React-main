// src/Components/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBook,
  FaCertificate,
  FaArrowRight,
  FaChartLine,
  FaEllipsisH
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Use Link for faster navigation

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    certificates: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersRes, coursesRes, certificatesRes] = await Promise.all([
          API.get("/users/list-with-courses/"),
          API.get("/courses/"),
          API.get("/certificates/"),
        ]);

        const usersCount = Array.isArray(usersRes.data) ? usersRes.data.length : 0;
        const coursesCount = Array.isArray(coursesRes.data) ? coursesRes.data.length : 0;
        const certificatesCount = Array.isArray(certificatesRes.data?.data)
          ? certificatesRes.data.data.length
          : 0;

        setStats({
          users: usersCount,
          courses: coursesCount,
          certificates: certificatesCount,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
            <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                Last 30 Days
            </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FaUsers}
          label="Total Users"
          value={stats.users}
          color="blue"
          trend="+12% vs last month"
        />

        <StatCard
          icon={FaBook}
          label="Active Courses"
          value={stats.courses}
          color="indigo"
          trend="+5 new this week"
        />

        <StatCard
          icon={FaCertificate}
          label="Certificates Issued"
          value={stats.certificates}
          color="emerald"
          trend="Automated & Manual"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content Area - Placeholder for Chart/Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800">Enrollment Activity</h3>
                 <button className="text-slate-400 hover:text-slate-600"><FaEllipsisH/></button>
             </div>

             {/* Fake Chart Placeholder */}
             <div className="h-64 flex items-end justify-between gap-2 px-2 pb-2 border-b border-slate-100">
                {[40, 65, 45, 80, 55, 70, 40, 60, 50, 75, 60, 85].map((h, i) => (
                    <div key={i} className="w-full bg-blue-50 hover:bg-blue-100 rounded-t-sm transition-colors relative group" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}
                        </div>
                    </div>
                ))}
             </div>
             <div className="flex justify-between text-xs text-slate-400 mt-2">
                 <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                 <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <QuickLink
                to="/users"
                title="Manage Users"
                desc="View details & progress"
                color="bg-blue-50 text-blue-600"
              />
              <QuickLink
                to="/courses"
                title="Manage Courses"
                desc="Create or edit content"
                color="bg-indigo-50 text-indigo-600"
              />
              <QuickLink
                to="/certificates"
                title="Certificates"
                desc="Issue & download PDFs"
                color="bg-emerald-50 text-emerald-600"
              />
            </div>

            {/* Mini Stat */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase">System Status</p>
                        <p className="text-emerald-600 font-bold text-sm flex items-center gap-1 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                        </p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-slate-500 font-semibold uppercase">Version</p>
                         <p className="text-slate-700 font-bold text-sm mt-1">v1.2.0</p>
                    </div>
                </div>
            </div>
          </div>

      </div>
    </div>
  );
}

/* --- Sub Components --- */

function StatCard({ icon: Icon, label, value, color, trend }) {
  // Color mapping for backgrounds
  const bgColors = {
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
  };
  const bgLightColors = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgLightColors[color]} group-hover:scale-110 transition-transform`}>
           <Icon size={24} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
         <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <FaChartLine /> {trend}
         </span>
      </div>

      {/* Decorative colored bar at bottom */}
      <div className={`absolute bottom-0 left-0 w-full h-1 ${bgColors[color]}`}></div>
    </div>
  );
}

function QuickLink({ to, title, desc, color }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group bg-slate-50/50 hover:bg-white"
        >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
                <h4 className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{title}</h4>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
        </Link>
    );
}
