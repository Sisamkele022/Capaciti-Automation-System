import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Layout from "../components/Layout";
import "../styles/LeaveForm.css";

const LeaveForms = () => {
  // States for form inputs
  const [name, setName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(12); // Example leave balance
  const [leaveHistory, setLeaveHistory] = useState(
    JSON.parse(localStorage.getItem("leaveHistory")) || []
  );
  const [availablePayslips, setAvailablePayslips] = useState([
    { month: "January", fileName: "payslip_january.pdf" },
    { month: "February", fileName: "payslip_february.pdf" },
    { month: "March", fileName: "payslip_march.pdf" },
    // Add more payslips as needed
  ]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date cannot be before the start date.");
      return;
    }
    
    const leaveData = {
      name,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending"
    };
    
    // Save to localStorage and show success message
    setLeaveHistory([...leaveHistory, leaveData]);
    localStorage.setItem("leaveHistory", JSON.stringify([...leaveHistory, leaveData]));
    alert("Leave form submitted successfully! Confirmation sent to your email.");
  };

  // Generate Payslip PDF
  const generatePayslipPDF = (month) => {
    const doc = new jsPDF();

    // Add text to the PDF
    doc.text(`Payslip for ${month}`, 20, 20);
    doc.text(`Employee: ${name}`, 20, 30);
    doc.text(`Leave Balance: ${leaveBalance} days`, 20, 40);
    doc.text(`Leave Type: ${leaveType}`, 20, 50);
    doc.text(`Leave Period: ${startDate} to ${endDate}`, 20, 60);
    doc.text(`Reason: ${reason}`, 20, 70);

    // Save the generated PDF
    doc.save(`${month}_Payslip.pdf`);
  };

  // Handle payslip download
  const handlePayslipDownload = (month) => {
    generatePayslipPDF(month);
  };

  // Render the leave form and leave history
  return (
    <div className="leave-form-container">
      <h2>Leave Request Form</h2>
      
      {/* Leave Form */}
      <form onSubmit={handleSubmit} className="leave-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            name="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select leave type</option>
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal Leave</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reason">Reason for Leave:</label>
          <input
            list="leave-reasons"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <datalist id="leave-reasons">
            <option value="Sick" />
            <option value="Vacation" />
            <option value="Family Emergency" />
          </datalist>
        </div>

        <div>
          <label>Leave Balance: {leaveBalance} days remaining</label>
        </div>

        <button type="submit" className="submit-button">Submit Leave Request</button>
      </form>

      {/* Leave History */}
      <div className="leave-history">
        <h3>Leave History</h3>
        <ul>
          {leaveHistory.map((leave, index) => (
            <li key={index}>
              <strong>{leave.name}</strong> requested {leave.leaveType} from {leave.startDate} to {leave.endDate} 
              - <span>Status: {leave.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Payslip Download Section */}
      <div className="payslip-download">
        <h3>Available Payslips</h3>
        <ul>
          {availablePayslips.map((payslip, index) => (
            <li key={index}>
              <span>{payslip.month} Payslip</span>
              <button onClick={() => handlePayslipDownload(payslip.month)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveForms;
