import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaLayerGroup } from "react-icons/fa";
// Optional: Add a subtle background pattern or image if you like
// import bgImage from "../assets/login-bg.jpg";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- LOGIC (Kept exactly as yours) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Construct URL safely
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
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">

      {/* Optional: Background decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-600 skew-y-3 origin-top-left -translate-y-20 z-0"></div>

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm z-10 relative border border-slate-100">

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-4 shadow-lg shadow-blue-200">
            <FaLayerGroup />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the admin panel.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-pulse">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
            <div className="relative group">
              <FaUserAlt className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors text-sm" />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
              />
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 hover:underline">Forgot?</a>
             </div>
            <div className="relative group">
              <FaLock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors text-sm" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} BM Academy. All rights reserved.
        </div>
      </div>
    </div>
  );
}
