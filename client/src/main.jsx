import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./Context/AuthContext"; // ✅ import AuthProvider
import "./index.css";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>  {/* ✅ Must wrap App here */}
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
