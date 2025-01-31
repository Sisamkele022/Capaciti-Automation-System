import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/AttendanceTracking.css";
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSyncAlt } from "react-icons/fa";

function AttendanceTracking() {
  const [attendance, setAttendance] = useState([]);
  const [locationVerified, setLocationVerified] = useState(false);
  const [isAtOffice, setIsAtOffice] = useState(false);
  const officeLocation = { lat: -26.2041, lon: 28.0473 }; // Example coordinates
  const radius = 50; // 50 meters radius from office
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem("attendance"));
    if (savedAttendance) {
      setAttendance(savedAttendance);
    }
  }, []);

  const checkLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistance(officeLocation.lat, officeLocation.lon, latitude, longitude);
        if (distance <= radius) {
          setIsAtOffice(true);
          setLocationVerified(true);
        } else {
          setIsAtOffice(false);
          setLocationVerified(true);
        }
        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);
        setLocationVerified(true);
        setLoadingLocation(false);
      }
    );
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const markAttendance = () => {
    if (!locationVerified) {
      alert("Checking your location...");
      return;
    }

    if (isAtOffice) {
      const date = new Date().toLocaleString();
      const newAttendance = [...attendance, { date, status: "Checked In" }];
      setAttendance(newAttendance);
      localStorage.setItem("attendance", JSON.stringify(newAttendance));
    } else {
      alert("You must be at the office to mark attendance.");
    }
  };

  return (
    <Layout>
      <div className="attendance-container">
        <h2>Attendance Tracking</h2>
        <div className="location-check-container">
          <button className="check-location-btn" onClick={checkLocation} disabled={loadingLocation}>
            {loadingLocation ? (
              <div className="spinner"></div>
            ) : (
              <FaMapMarkerAlt />
            )}
            Check Location
          </button>
          <p className="location-status">
            {locationVerified ? (
              isAtOffice ? (
                <span className="status-verified"><FaCheckCircle /> You are at the office</span>
              ) : (
                <span className="status-verified"><FaTimesCircle /> You are not at the office</span>
              )
            ) : (
              <span className="loading-status"><FaSyncAlt /> Verifying location...</span>
            )}
          </p>
        </div>
        <button className="mark-attendance-btn" onClick={markAttendance}>
          Mark Attendance
        </button>
        <ul className="attendance-list">
          {attendance.map((entry, index) => (
            <li key={index} className={index % 2 === 0 ? "even" : "odd"}>
              {entry.date} - {entry.status}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AttendanceTracking;
