import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      client_id="281995264661-p0jsb5s26huk2auv0krl7nc28e3jmk26.apps.googleusercontent.com"
      onSuccess={async (credentialResponse) => {
        const access_token = credentialResponse.credential;

        try {
          const res = await axios.post(
            "${import.meta.env.VITE_BASE_URI}auth/google/",
            { access_token },
            { headers: { "Content-Type": "application/json" } }
          );

          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem("role", res.data.user.role || "student");

          const role = res.data.user.role || "student";
          navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/student");
        } catch (err) {
          console.error("Google login failed:", err.response?.data || err.message);
          alert("Google login failed!");
        }
      }}
      onError={() => console.log("Google login failed")}
    />
  );
};

export default GoogleAuthButton;
