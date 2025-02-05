import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/DocumentSystem.css";

function DocumentSystem() {
  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Retrieve stored documents from localStorage
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents"));
    if (storedDocs) {
      setDocuments(storedDocs);
    }
  }, []);

  const addDocument = () => {
    if (docName && file) {
      const newDocs = [
        ...documents,
        { name: docName, file: file.name, status: "Outstanding" },
      ];
      setDocuments(newDocs);
      localStorage.setItem("documents", JSON.stringify(newDocs));
      setDocName("");
      setFile(null);
      setUploadStatus("Document added. Upload successful.");
    } else {
      setUploadStatus("Please add document name and upload a file.");
    }
  };

  const markAsSubmitted = (docName) => {
    const updatedDocs = documents.map((doc) =>
      doc.name === docName ? { ...doc, status: "Submitted" } : doc
    );
    setDocuments(updatedDocs);
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Layout>
      <div className="doc-container">
        <h2>Document Management</h2>

        <div className="doc-input-section">
          <input
            type="text"
            placeholder="Document Name"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
          <button onClick={addDocument}>Add Document</button>
          {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
        </div>

        <div className="document-sections">
          <div className="documents-required">
            <h3>Important Documents Needed</h3>
            <ul>
              <li>Identity Document (ID)</li>
              <li>Proof of Address</li>
              <li>Banking Details (Bank Statement or Salary Slip)</li>
              <li>Tax Number (or Tax Clearance Certificate)</li>
              <li>Employment Contract</li>
              <li>Medical Aid Details (if applicable)</li>
              <li>Qualifications and Certifications</li>
            </ul>
          </div>

          <div className="document-status">
            <h3>Outstanding Documents</h3>
            <ul>
              {documents
                .filter((doc) => doc.status === "Outstanding")
                .map((doc, index) => (
                  <li key={index}>
                    {doc.name} - {doc.file}
                    <button onClick={() => markAsSubmitted(doc.name)}>
                      Mark as Submitted
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="document-status">
            <h3>Submitted Documents</h3>
            <ul>
              {documents
                .filter((doc) => doc.status === "Submitted")
                .map((doc, index) => (
                  <li key={index}>
                    {doc.name} - {doc.file}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DocumentSystem;
