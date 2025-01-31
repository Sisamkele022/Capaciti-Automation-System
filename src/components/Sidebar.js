import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="menu-item">Dashboard</Link>
      <Link to="/attendance" className="menu-item">Attendance</Link>
      <Link to="/business-issues" className="menu-item">Business Issues</Link>
      <Link to="/documents" className="menu-item">Documents</Link>
      <Link to="/leave-forms" className="menu-item">Leave Forms</Link>
      <Link to="/profile" className="menu-item">Profile</Link>
      <Link to="/settings" className="menu-item">Settings</Link>
    </div>
  );
};

export default Sidebar;
