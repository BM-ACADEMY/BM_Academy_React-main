import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    // Integrate your backend password reset API here
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-start justify-center pt-28 px-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
          🔒 Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="📧 Enter your email"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl shadow hover:bg-yellow-400 transition"
          >
            ✅ Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
