// src/Context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    user: null,
  });

  useEffect(() => {
    // Initialize from localStorage on page load
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && refreshToken && user) {
      setAuth({ isAuthenticated: true, token, refreshToken, user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
