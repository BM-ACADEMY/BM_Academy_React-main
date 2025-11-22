// src/Routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null; // wait until we check token
  if (!token) return <Navigate to="/login" replace />;

  return children;
}
