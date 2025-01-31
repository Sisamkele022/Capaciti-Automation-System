import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import Dashboard from "./pages/Dashboard";
import AttendanceTracking from "./pages/AttendanceTracking";
import BusinessIssues from "./pages/BusinessIssues";
import DocumentSystem from "./pages/DocumentSystem";
import LeaveForms from "./pages/LeaveForms";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./styles/global.css"; // Corrected to match the actual file name
import "./styles/Navbar.css"; // Navbar styles
import "./styles/Sidebar.css"; // Sidebar styles

function App() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div style={{ marginLeft: "250px", width: "100%" }}>
        {/* Navbar */}
        <Navbar />
        <Routes>
          {/* Define routes for the different pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<AttendanceTracking />} />
          <Route path="/business-issues" element={<BusinessIssues />} />
          <Route path="/documents" element={<DocumentSystem />} />
          <Route path="/leave-forms" element={<LeaveForms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* Default route */}
          <Route path="/" element={<Dashboard />} /> {/* Redirect to Dashboard as the landing page */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
