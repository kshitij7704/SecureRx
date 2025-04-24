import React, { useState } from 'react';

const AddRecord = ({ contract, patientID, onUpdate }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const add = async () => {
    const tx = await contract.addRecord(patientID, "Alice", diagnosis, treatment);
    await tx.wait();
    onUpdate();
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">➕ Add Patient Record</h2>
      <input
        className="border px-4 py-2 rounded w-full"
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded w-full"
        placeholder="Treatment"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={add}
      >
        Add Record
      </button>
    </div>
  );
};

export default AddRecord;