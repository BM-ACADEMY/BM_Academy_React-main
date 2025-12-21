// src/Components/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaCertificate } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

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

        const usersCount = Array.isArray(usersRes.data)
          ? usersRes.data.length
          : 0;

        const coursesCount = Array.isArray(coursesRes.data)
          ? coursesRes.data.length
          : 0;

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
      <div className="p-10 text-center text-gray-700">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          label="Total Users"
          value={stats.users}
          color="yellow"
        />

        <StatCard
          icon={<FaBook />}
          label="Total Courses"
          value={stats.courses}
          color="blue"
        />

        <StatCard
          icon={<FaCertificate />}
          label="Total Certificates"
          value={stats.certificates}
          color="green"
        />
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Quick Links
        </h3>
        <div className="flex gap-4 flex-wrap">
          <a
            href="/users"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow"
          >
            Manage Users
          </a>
          <a
            href="/courses"
            className="bg-blue-400 hover:bg-blue-500 text-black px-4 py-2 rounded-lg shadow"
          >
            Manage Courses
          </a>
          <a
            href="/certificates"
            className="bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-lg shadow"
          >
            Manage Certificates
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small reusable stat card ---------- */
function StatCard({ icon, label, value, color }) {
  const colors = {
    yellow: "bg-yellow-500/20 text-yellow-400",
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="p-6 rounded-2xl flex items-center gap-4 shadow hover:shadow-lg transition bg-white">
      <div className={`text-4xl ${colors[color]}`}>{icon}</div>
      <div>
        <h3 className="text-gray-800 text-lg font-semibold">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
