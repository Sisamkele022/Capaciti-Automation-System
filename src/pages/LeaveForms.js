import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/LeaveForm.css";

function LeaveForm() {
  const [leaveData, setLeaveData] = useState({
    name: "",
    date: "",
    reason: "",
  });

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("leaveForm", JSON.stringify(leaveData));
    alert("Leave form submitted successfully!");
  };

  return (
    <Layout>
      <div className="leave-container">
        <h2>Leave Request</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="date" name="date" onChange={handleChange} required />
          <textarea name="reason" placeholder="Reason for leave" onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export default LeaveForm;
