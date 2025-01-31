import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/BusinessIssues.css";

function BusinessIssues() {
  const [issues, setIssues] = useState([]);
  const [issueText, setIssueText] = useState("");

  const reportIssue = () => {
    if (issueText) {
      const newIssues = [...issues, issueText];
      setIssues(newIssues);
      localStorage.setItem("businessIssues", JSON.stringify(newIssues));
      setIssueText("");
    }
  };

  return (
    <Layout>
      <div className="issues-container">
        <h2>Report a Business Issue</h2>
        <textarea placeholder="Describe your issue" value={issueText} onChange={(e) => setIssueText(e.target.value)} />
        <button onClick={reportIssue}>Submit Issue</button>
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default BusinessIssues;
