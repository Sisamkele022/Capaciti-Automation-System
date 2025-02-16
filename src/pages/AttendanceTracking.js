import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/AttendanceTracking.css";
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaQrcode } from "react-icons/fa";

function AttendanceTracking() {
  const [attendance, setAttendance] = useState([]);
  const [locationVerified, setLocationVerified] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [qrVerified, setQrVerified] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusClass, setStatusClass] = useState("");

  const officeLocation = { lat: -26.1926, lon: 28.0342 }; // 19 Ameshoff St
  const radius = 50; // 50 meters

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
          setLocationVerified(true);
          setLocationMessage("Location Verified: You are at 19 Ameshoff Street.");
        } else {
          setLocationVerified(true);
          setLocationMessage("Location Not Verified. You are outside the office.");
        }
        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);
        setLocationVerified(true);
        setLocationMessage("Location verification failed. Please try again.");
        setLoadingLocation(false);
      }
    );
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Convert to meters
  };

  const scanQRCode = () => {
    setQrVerified(true);
  };

  const markAttendance = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    const lateHour = 8;
    const lateMinute = 45;

    // Check if it's the weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setStatusMessage("Clocking in on weekends is not allowed.");
      setStatusClass("status-error");
      return;
    }

    // Check if the user is late
    if (hours > lateHour || (hours === lateHour && minutes > lateMinute)) {
      setStatusMessage("You are late! Clock-in time is after 08:45 AM.");
      setStatusClass("status-late");
    } else {
      setStatusMessage("Clock-in successful!");
      setStatusClass("status-success");
    }

    if (!locationVerified && !qrVerified) {
      alert("Please verify your location or scan your QR code.");
      return;
    }

    const date = new Date().toLocaleString();
    const newAttendance = [...attendance, { date, status: "Checked In" }];
    setAttendance(newAttendance);
    localStorage.setItem("attendance", JSON.stringify(newAttendance));
  };

  return (
    <Layout>
      <div className="attendance-container">
        <h2>Attendance Tracking</h2>
        <div className="login-methods">
          <div className="location-check-container">
          <button className="check-location-btn" onClick={checkLocation} disabled={loadingLocation}>
            {loadingLocation ? "Checking..." : <FaMapMarkerAlt />} Verify Location
          </button>
            <p className={`location-status ${locationVerified ? "status-verified" : "status-pending"}`}>
              {locationMessage}
            </p>
          </div>

          <div className="qr-check-container">
            <img src="/assets/QR.png" alt="Scan this QR code at the door" className="qr-image" />
          </div>
        </div>

        <button className="mark-attendance-btn" onClick={markAttendance}>
          Mark Attendance
        </button>

        <div className={`status-message ${statusClass}`}>
          {statusMessage}
        </div>

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
