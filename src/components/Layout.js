import { Link } from "react-router-dom";
import { FaUserCircle, FaCog } from "react-icons/fa";
import Sidebar from './Sidebar'; // Add this line at the top of Layout.js


function Layout({ children }) {
  return (
    <div className="layout">
      {/* Navigation Bar */}
      <header className="header">
        <div className="header-left">
          <h1>Attendance System</h1>
        </div>
        <div className="header-right">
          <Link to="/profile">
            <FaUserCircle size={24} />
          </Link>
          <Link to="/settings">
            <FaCog size={24} />
          </Link>
        </div>
      </header>

      {/* Main content section with Sidebar and the page content */}
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          {children} {/* This will render the page content */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
