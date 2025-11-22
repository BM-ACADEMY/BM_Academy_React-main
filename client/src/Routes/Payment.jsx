// src/Routes/Payment.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Payments from "../components/Payments/Payments";

const PaymentRoutes = () => {
  return (
    <Routes>
      {/* Main payment page */}
      <Route index element={<Payments />} />
    </Routes>
  );
};

export default PaymentRoutes;
