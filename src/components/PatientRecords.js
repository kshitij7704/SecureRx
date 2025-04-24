// src/components/PatientRecords.js
import React from 'react';
import '../css/PatientRecords.css';

const PatientRecords = ({ records, patientID }) => (
  <div className="records-section">
    <h2>📚 Patient Records</h2>
    {records.length === 0 ? (
      <p className="no-records">No records to display.</p>
    ) : (
      <div className="records-grid">
        {records.map((r, i) => (
          <div key={i} className="record-card">
            <p><strong>Patient ID #:</strong> {patientID}</p>
            <p><strong>Name:</strong> {r.patientName}</p>
            <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
            <p><strong>Treatment:</strong> {r.treatment}</p>
            <p><strong>Date:</strong> {new Date(r.timestamp.toNumber() * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PatientRecords;