// src/components/Authentication/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (auth.isAuthenticated) navigate("/dashboard/student");
  }, [auth, navigate]);

  // ✅ Helper to store backend JWT
  const storeUserData = (accessToken, user) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setAuth({
      isAuthenticated: true,
      token: accessToken,
      user,
    });

    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}users/login/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Your Django login returns { token, user: {...} }
      storeUserData(res.data.token, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login → backend JWT
  const handleGoogleLogin = async (credentialResponse) => {
    const googleToken = credentialResponse?.credential;
    if (!googleToken) return alert("Google credential missing!");

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}users/google-login/`,
        { token: googleToken },
        { headers: { "Content-Type": "application/json" } }
      );

      // Your backend returns { access: token, user: {...} }
      storeUserData(res.data.access, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error("Google login failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-yellow-500 text-black font-bold rounded-xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google login failed")}
          />
        </div>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
