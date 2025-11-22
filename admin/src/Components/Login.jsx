import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // Construct URL safely
// Remove any double slashes
    const loginUrl = `${import.meta.env.VITE_BASE_URI.replace(/\/$/, '')}/users/admin/login/`;
    console.log("Admin login URL:", loginUrl);

    // Send login request
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      throw new Error(text || "Server returned an invalid response");
    }

    if (!res.ok) {
      throw new Error(data.detail || data.message || "Login failed");
    }

    // Ensure admin object exists
    if (!data.admin) {
      throw new Error("Invalid response from server: admin info missing");
    }

    // Check user role
    if (data.admin.role !== "admin") {
      throw new Error("You are not authorized as admin");
    }

    // Save token & admin info in localStorage
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("user_email", data.admin.email);
    localStorage.setItem("user_role", data.admin.role);

    // Notify parent app
    if (onLogin) onLogin();

    // Redirect to admin dashboard
    navigate("/dashboard", { replace: true });
  } catch (err) {
    console.error("Login error:", err);
    setError(err.message || "Network error. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          BM Academy Admin
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition"
          >
            ✅ Login
          </button>
        </form>
      </div>
    </div>
  );
}
