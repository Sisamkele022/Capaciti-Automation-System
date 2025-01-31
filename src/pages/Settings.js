import React, { useState } from "react";
import "../styles/Settings.css";
import { FaCheckCircle, FaLock, FaBell, FaCog, FaSave } from "react-icons/fa";

function Settings() {
  const [settings, setSettings] = useState({
    password: "",
    newPassword: "",
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const toggleSwitch = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name],
    });
  };

  const handleSave = () => {
    // Logic to save settings
    alert("Settings saved!");
  };

  return (
    <div className="settings-container">
      <h1 className="page-title">Account Settings</h1>
      <div className="settings-section">
        <div className="settings-item">
          <label>Change Password</label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Current Password"
              value={settings.password}
              onChange={handleChange}
              className="settings-input"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={settings.newPassword}
              onChange={handleChange}
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-item">
          <label>Notification Preferences</label>
          <div className="switch-group">
            <div className="switch-item">
              <label>Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => toggleSwitch("emailNotifications")}
                className="switch-input"
              />
            </div>
            <div className="switch-item">
              <label>SMS Notifications</label>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => toggleSwitch("smsNotifications")}
                className="switch-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-item">
          <label>Account Information</label>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value="john.doe@gmail.com" // Pre-filled example email
              className="settings-input"
              readOnly
            />
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="save-btn">
        <FaSave /> Save Changes
      </button>
    </div>
  );
}

export default Settings;
