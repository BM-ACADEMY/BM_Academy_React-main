import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scroll from "./Scroll";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/FooterSection";

// Website pages
import HomeRoutes from "./Routes/Home";
import Aboutroutes from "./Routes/About";
import Coursesroutes from "./Routes/Courses";
import SACTroutes from "./Routes/SACT";
import SATroutes from "./Routes/SAT";
import Contactsroutes from "./Routes/Contacts";
import Certificateroutes from "./Routes/Certificate";

// Auth
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ForgotPassword from "./components/Authentication/ForgotPassword";

// Dashboards
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCourses from "./components/Admin/ManageCourses";
import ManageUsers from "./components/Admin/ManageUsers";
import Dashboard from "./Routes/Dashboard";
import PaymentRoutes from "./Routes/Payment";

// Role-based protection
import PrivateRoute from "./Routes/PrivateRoute";
import DM from "./Routes/DM";
import DA from "./Routes/DA";
import FSD from "./Routes/Fsd";
import Webinar from "./Dashboard/Webinar/Webinar";


export const App = () => {
  return (
    <Router>
      <Scroll />

      <Routes>
        {/* Public Website Layout */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/about" element={<Aboutroutes />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/webinar" element={<Webinar />} />
                <Route path="/webinar/data-analyst" element={<DA />} />
                <Route path="/webinar/digital-marketing" element={<DM />} />
                <Route path="/webinar/fullstack-development" element={<FSD />} />

                
               

<Route
  path="/courses/*"
  element={
    
      <Coursesroutes />
          
  }
/>
                <Route path="/sact" element={<SACTroutes />} />
                <Route path="/sat" element={<SATroutes />} />
                <Route path="/contacts" element={<Contactsroutes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verify" element={<Certificateroutes />} />
                <Route path="/payments/*" element={<PaymentRoutes />} />
              </Routes>
              <Footer />
            </>
          }
        />

      
        {/* Admin Dashboard (separate layout, no Navbar/Footer) */}
        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};





