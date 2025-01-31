import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/DocumentSystem.css";

function DocumentSystem() {
  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState("");

  const addDocument = () => {
    if (docName) {
      const newDocs = [...documents, docName];
      setDocuments(newDocs);
      localStorage.setItem("documents", JSON.stringify(newDocs));
      setDocName("");
    }
  };

  return (
    <Layout>
      <div className="doc-container">
        <h2>Document Management</h2>
        <input type="text" placeholder="Document Name" value={docName} onChange={(e) => setDocName(e.target.value)} />
        <button onClick={addDocument}>Add Document</button>
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default DocumentSystem;
