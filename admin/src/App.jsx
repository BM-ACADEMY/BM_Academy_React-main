import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Components/Pages/Courses";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Components/Pages/Dashboard";
import AdminLogin from "./Components/Login";
import Users from "./Components/Pages/Users";
import Certificate from "./Components/Pages/Certificate";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Courses */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Certificates */}
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Layout>
                <Certificate />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
