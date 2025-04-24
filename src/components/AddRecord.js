import React, { useState } from 'react';
import '../css/AddRecord.css';

const AddRecord = ({ contract, onUpdate }) => {
  const [patientID, setPatientID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const add = async () => {
    if (!patientID.trim())     return alert('Please enter the Patient ID');
    if (!patientName.trim())   return alert('Please enter the Patient Name');
    if (!diagnosis.trim())     return alert('Please enter the Diagnosis');
    if (!treatment.trim())     return alert('Please enter the Treatment');

    try {
      const tx = await contract.addRecord(
        patientID,
        patientName,
        diagnosis,
        treatment
      );
      await tx.wait();
      onUpdate();

      setPatientID('');
      setPatientName('');
      setDiagnosis('');
      setTreatment('');
    } catch (err) {
      console.error(err);
      alert('Failed to add record');
    }
  };

  return (
    <div className="form-section">
      <h2>➕ Add Patient Record</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Treatment"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />
      <button className="action-button" onClick={add}>
        Add Record
      </button>
    </div>
  );
};

export default AddRecord;