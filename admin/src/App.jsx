import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Courses from "./Components/Pages/Courses";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard";
import AdminLogin from "./Components/Login";
import Users from "./Components/Pages/Users";
import Certificate from "./Components/Pages/Certificate";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  return (
    <Router>
      <Routes>
        {/* Root redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AdminLogin onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/courses"
          element={
            isAuthenticated ? (
              <Layout>
                <Courses />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <Layout>
                <Users />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
  path="/certificates"
  element={
    isAuthenticated ? (
      <Layout>
        <Certificate />
      </Layout>
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


        

        {/* Catch-all route: redirect unknown URLs to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
