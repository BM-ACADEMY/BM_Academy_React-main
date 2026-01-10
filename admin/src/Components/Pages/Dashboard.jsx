// src/Components/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBook,
  FaCertificate,
  FaArrowRight,
  FaChartLine,
  FaEllipsisH,
  FaLayerGroup,
  FaListAlt,
  FaCalendarAlt,
  FaPlus,
  FaFilter,
  FaGraduationCap
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

/* ---------------- API SETUP ---------------- */
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
  const [rawData, setRawData] = useState({
    categories: [],
    subCategories: [],
    courses: [],
    users: [],
    certificates: [],
  });

  const [stats, setStats] = useState({
    categories: 0,
    subCategories: 0,
    courses: 0,
    users: 0,
    certificates: 0,
  });

  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, subRes, couRes, useRes, cerRes] = await Promise.all([
          API.get("/public/categories/"),
          API.get("/sub-categories/"),
          API.get("/courses/"),
          API.get("/users/list-with-courses/"),
          API.get("/certificates/"),
        ]);

        const data = {
          categories: Array.isArray(catRes.data) ? catRes.data : [],
          subCategories: Array.isArray(subRes.data) ? subRes.data : [],
          courses: Array.isArray(couRes.data) ? couRes.data : [],
          users: Array.isArray(useRes.data) ? useRes.data : [],
          certificates: Array.isArray(cerRes.data?.data) ? cerRes.data.data : [],
        };

        setRawData(data);
        setStats({
          categories: data.categories.length,
          subCategories: data.subCategories.length,
          courses: data.courses.length,
          users: data.users.length,
          certificates: data.certificates.length,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  useEffect(() => {
    if (loading) return;

    const filterByDate = (items) => {
      if (filterType === "all") return items.length;
      const now = new Date();
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      let startDate, endDate;

      if (filterType === "today") {
        startDate = startOfDay;
        endDate = new Date(now.setHours(23, 59, 59, 999));
      } else if (filterType === "yesterday") {
        startDate = new Date(startOfDay);
        startDate.setDate(startDate.getDate() - 1);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
      } else if (filterType === "7days") {
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        endDate = new Date();
      } else if (filterType === "30days") {
        startDate = new Date();
        startDate.setDate(now.getDate() - 30);
        endDate = new Date();
      } else if (filterType === "custom") {
        if (!customStartDate || !customEndDate) return items.length;
        startDate = new Date(customStartDate);
        endDate = new Date(customEndDate);
        endDate.setHours(23, 59, 59, 999);
      }

      return items.filter((item) => {
        const dateStr = item.createdAt || item.date || item.created_at;
        if (!dateStr) return false;
        const itemDate = new Date(dateStr);
        return itemDate >= startDate && itemDate <= endDate;
      }).length;
    };

    setStats({
      categories: filterByDate(rawData.categories),
      subCategories: filterByDate(rawData.subCategories),
      courses: filterByDate(rawData.courses),
      users: filterByDate(rawData.users),
      certificates: filterByDate(rawData.certificates),
    });
  }, [filterType, customStartDate, customEndDate, rawData, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#FFEA00] border-b-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- 1. HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">

        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEA00]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
             Dashboard Overview
          </h2>
          <p className="text-gray-500 font-medium mt-2 max-w-lg">
            Track your platform's performance, manage courses, and oversee user activity in real-time.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto relative z-10">
            {filterType === "custom" && (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-transparent text-sm font-bold text-gray-700 outline-none"
                    />
                    <span className="text-gray-400 font-bold">-</span>
                    <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-transparent text-sm font-bold text-gray-700 outline-none"
                    />
                </div>
            )}

            <div className="relative w-full sm:w-auto">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full sm:w-48 appearance-none bg-black text-white font-bold text-sm pl-4 pr-10 py-3 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors focus:ring-2 focus:ring-[#FFEA00] focus:outline-none uppercase tracking-wide"
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                </select>
                <FaFilter className="absolute right-4 top-3.5 text-[#FFEA00] pointer-events-none" />
            </div>
        </div>
      </div>

      {/* --- 2. STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard
          icon={FaLayerGroup}
          label="Categories"
          value={stats.categories}
          trend="Total Tracks"
        />
        <StatCard
          icon={FaListAlt}
          label="Sub Categories"
          value={stats.subCategories}
          trend="Specializations"
        />
        <StatCard
          icon={FaBook}
          label="Active Courses"
          value={stats.courses}
          trend="Published Content"
        />
        <StatCard
          icon={FaUsers}
          label="Total Learners"
          value={stats.users}
          trend="Registered Users"
        />
        <StatCard
          icon={FaCertificate}
          label="Certificates"
          value={stats.certificates}
          trend="Issued to date"
        />
      </div>

      {/* --- 3. CHART & ACTIONS --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ANALYTICS CHART */}
        <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <FaChartLine className="text-[#FFEA00]" /> Enrollment Analytics
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                    {filterType === "all" ? "Yearly Overview" : "Filtered Data View"}
                </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaEllipsisH className="text-gray-400" />
            </button>
          </div>

          {/* Visual Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[45, 60, 50, 75, 55, 80, 60, 90, 70, 85, 65, 95].map((h, i) => (
              <div key={i} className="w-full flex flex-col justify-end group h-full relative cursor-pointer">
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none mb-2">
                      {h} Students
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full bg-gray-100 rounded-t-sm group-hover:bg-[#FFEA00] transition-all duration-500 relative overflow-hidden"
                    style={{ height: `${h}%` }}
                  >
                      {/* Gradient Shine effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
              </div>
            ))}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-wider">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS PANEL (UNIFIED STYLE) */}
        <div className="bg-black text-white rounded-2xl shadow-xl p-8 relative overflow-hidden flex flex-col">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEA00] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
             Quick Actions
          </h3>

          <div className="grid grid-cols-1 gap-4 relative z-10 flex-1">
            <QuickAction to="/categories" label="Add Category" icon={FaLayerGroup} />
            <QuickAction to="/subcategories" label="Add Sub-Category" icon={FaListAlt} />
            <QuickAction to="/courses" label="Create Course" icon={FaBook} />
            <QuickAction to="/certificates" label="Issue Certificate" icon={FaCertificate} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

// 1. Enhanced Stat Card
function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Yellow Left Border on Hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFEA00] opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <h3 className="text-4xl font-black text-gray-900 group-hover:text-black">
            {value}
          </h3>
        </div>

        {/* Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-[#FFEA00] transition-colors duration-300">
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase">Trend</span>
        <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
           <FaChartLine /> {trend}
        </span>
      </div>
    </div>
  );
}

// 2. Uniform Quick Action Button (All White/Black style)
function QuickAction({ to, label, icon: Icon }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between p-4 rounded-xl transition-all duration-300 border bg-white/10 border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-[#FFEA00] group-hover:text-black transition-colors" />
        <span className="font-bold text-sm tracking-wide">{label}</span>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 bg-black/30 text-white group-hover:bg-black/10 group-hover:text-black">
        <FaArrowRight size={12} />
      </div>
    </Link>
  );
}
