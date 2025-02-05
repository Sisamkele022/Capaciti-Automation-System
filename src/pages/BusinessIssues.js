import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/BusinessIssues.css";

function BusinessIssues() {
  const [issueText, setIssueText] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("Complaint");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [anonymous, setAnonymous] = useState(false); // Track if user wants to be anonymous

  useEffect(() => {
    const storedIssues = JSON.parse(localStorage.getItem("businessIssues"));
    if (storedIssues) {
      // Optionally, display previously reported issues
    }
  }, []);

  const reportIssue = () => {
    if (issueText.trim()) {
      const newIssue = {
        text: issueText,
        category: feedbackCategory,
        status: "Pending",
        anonymous: anonymous, // Store whether it's anonymous
      };

      const newIssues = JSON.parse(localStorage.getItem("businessIssues")) || [];
      newIssues.push(newIssue);
      localStorage.setItem("businessIssues", JSON.stringify(newIssues));

      setIssueText(""); // Clear the text input after submission
      setFeedbackStatus("Your feedback has been submitted and is under review.");
    } else {
      setFeedbackStatus("Please write something before submitting.");
    }
  };

  return (
    <Layout>
      <div className="issues-container">
        <h2>Submit Your Feedback</h2>

        {/* Section 1: Text Area */}
        <div className="text-input-section">
          <textarea
            placeholder="Describe your issue, suggestion, or appreciation..."
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
          />
        </div>

        {/* Section 2: Feedback Category */}
        <div className="category-selection">
          <h3>Select Feedback Type</h3>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="category"
                value="Complaint"
                checked={feedbackCategory === "Complaint"}
                onChange={() => setFeedbackCategory("Complaint")}
              />
              Complaint
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Suggestion"
                checked={feedbackCategory === "Suggestion"}
                onChange={() => setFeedbackCategory("Suggestion")}
              />
              Suggestion
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Appreciation"
                checked={feedbackCategory === "Appreciation"}
                onChange={() => setFeedbackCategory("Appreciation")}
              />
              Appreciation
            </label>
          </div>
        </div>

        {/* Section 3: Anonymous Option */}
        <div className="anonymous-option">
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            Remain Anonymous
          </label>
        </div>

        {/* Section 4: Submit Button */}
        <div className="submit-button-section">
          <button onClick={reportIssue}>Submit Feedback</button>
          {feedbackStatus && <div className="feedback-status">{feedbackStatus}</div>}
        </div>
      </div>
    </Layout>
  );
}

export default BusinessIssues;
