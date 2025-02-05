import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa"; // Optional icon library

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">My App</div>
      <div className="nav-links">
        <Link to="/dashboard"><FaChartBar /> Dashboard</Link>
        <Link to="/settings"><FaCog /> Settings</Link>
      </div>
    </div>
  );
};

export default Navbar;
