import React from 'react';

const PatientRecords = ({ records }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">📚 Patient Records</h2>
      <div className="space-y-4">
        {records.map((r, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <p><strong>ID:</strong> {r.recordID.toNumber()}</p>
            <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
            <p><strong>Treatment:</strong> {r.treatment}</p>
            <p><strong>Date:</strong> {new Date(r.timestamp.toNumber() * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;