import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const storeUserData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ isAuthenticated: true, token, user });
    window.dispatchEvent(new Event("storage"));
  };

  // ----------------- Normal Signup -----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}users/signup/`,
        { name, email, phone, password, role: "client" },
        { headers: { "Content-Type": "application/json" } }
      );

      // Auto-login
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}users/login/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      storeUserData(res.data.access, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  // ----------------- Google Signup/Login -----------------
  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return alert("Google credential missing!");

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}users/google-login/`,
        { token },
        { headers: { "Content-Type": "application/json" } }
      );

      storeUserData(res.data.access, res.data.user);
      navigate("/dashboard/student");
    } catch (err) {
      console.error("Google signup/login failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Google signup/login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Signing up..." : "Sign Up"}
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
            onError={() => alert("Google signup/login failed")}
          />
        </div>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;
