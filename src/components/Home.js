import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/Contract';
import AddRecord from './AddRecord';
import AuthorizeProvider from './AuthorizeProvider';
import PatientRecords from './PatientRecords';

const Home = () => {
  const [contract,   setContract]   = useState(null);
  const [account,    setAccount]    = useState(null);
  const [isOwner,    setIsOwner]    = useState(false);
  const [patientID,  setPatientID]  = useState('');
  const [records,    setRecords]    = useState([]);

  // Initialize wallet + contract
  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userAcc = await signer.getAddress();
      setAccount(userAcc);

      const ctr = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(ctr);

      const ownerAddr = await ctr.getOwner();
      setIsOwner(ownerAddr.toLowerCase() === userAcc.toLowerCase());
    };
    init();
  }, []);

  // Fetch records for the entered patient ID
  const fetchRecords = async () => {
    if (!patientID.trim()) return alert('Please enter a Patient ID');
    try {
      const result = await contract.getPatientRecords(patientID);
      setRecords(result);
    } catch (err) {
      console.error(err);
      alert('Fetch failed');
    }
  };

  return (
    <div className="home-container">
      {account && <p className="account-info">Connected: {account}</p>}
      {isOwner  && <p className="owner-info">You are the owner</p>}

      {/* Fetch Section */}
      <div className="form-section">
        <h2>🔍 Fetch Patient Records</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Patient ID"
          value={patientID}
          onChange={e => setPatientID(e.target.value)}
        />
        <button className="action-button" onClick={fetchRecords}>
          Fetch
        </button>
      </div>

      {/* Action Sections */}
      <div className="forms-container">
        <AddRecord contract={contract} onUpdate={fetchRecords} />
        <AuthorizeProvider contract={contract} isOwner={isOwner} />
      </div>

      {/* Results */}
      <PatientRecords records={records} patientID={patientID} />
    </div>
  );
};

export default Home;