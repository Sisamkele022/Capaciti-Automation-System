import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import AttendanceTracking from "./pages/AttendanceTracking";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* Updated path for root route */}
      <Route path="*" element={<App />} />
      <Route path="/attendance" element={<AttendanceTracking />} />
    </Routes>
  </Router>
);
