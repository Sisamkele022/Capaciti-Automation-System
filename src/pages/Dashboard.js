import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, Filler } from 'chart.js';  // Updated imports
import "../styles/Dashboard.css";

// Registering the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, Filler);  // Updated registration

const Dashboard = () => {
  // Dummy data for charts
  const trainingProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Training Progress',
        data: [10, 30, 50, 70, 90],
        borderColor: '#5C6BC0',
        backgroundColor: 'rgba(92, 107, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Performance',
        data: [3000, 5000, 7000, 8000, 12000],
        backgroundColor: '#00C853',
        borderColor: '#00C853',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 200, 83, 0.5)',
      },
    ],
  };

  const projectCompletionData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        label: 'Project Status',
        data: [60, 30, 10],
        backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
        borderColor: '#ecf0f1',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        {/* Row 1: Key Metrics and Graphs */}
        <div className="row key-metrics">
          <div className="col metric-box">
            <h3 className="metric-title">Training Progress</h3>
            <Line data={trainingProgressData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Training Progress Over Time' } } }} />
            <a href="/training" className="metric-link">View Details</a>
          </div>
          <div className="col metric-box">
            <h3 className="metric-title">Monthly Performance</h3>
            <Bar data={salesData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'MonthlyPerformance Over Months' } } }} />
            <a href="/sales" className="metric-link">View More</a>
          </div>
          <div className="col metric-box">
            <h3 className="metric-title">Project Status</h3>
            <Pie data={projectCompletionData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Project Completion Status' } } }} />
            <a href="/projects" className="metric-link">See Full Details</a>
          </div>
        </div>

        {/* Row 2: Latest Announcements */}
        <div className="row news-feed">
          <div className="col">
            <h3>Latest Announcements</h3>
            <ul>
              <li>New course: Advanced Node.js coming soon!</li>
              <li>Reminder: Team sync-up meeting tomorrow at 3 PM.</li>
              <li>Feedback survey request for recent training sessions.</li>
            </ul>
          </div>
        </div>

        {/* Row 3: Current Tasks */}
        <div className="row task-list">
          <div className="col">
            <h3>Your Current Tasks</h3>
            <ul>
              <li>Complete the coding assignment by EOD.</li>
              <li>Submit feedback on last week's training.</li>
              <li>Join the sprint planning meeting at 4 PM.</li>
            </ul>
          </div>
        </div>

        {/* Row 4: Quick Links */}
        <div className="row quick-links">
          <div className="col">
            <h3>Quick Access</h3>
            <ul>
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/tools">Development Tools</a></li>
              <li><a href="/support">Support Center</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
