import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants/Contract';
import AddRecord from './AddRecord';
import AuthorizeProvider from './AuthorizeProvider';
import PatientRecords from './PatientRecords';

const Home = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [patientID, setPatientID] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contract);

      const owner = await contract.getOwner();
      setIsOwner(owner.toLowerCase() === account.toLowerCase());
    };
    init();
  }, []);

  const fetchRecords = async () => {
    const result = await contract.getPatientRecords(patientID);
    setRecords(result);
  };

  return (
    <div className="p-6 space-y-8">
      {account && (
        <p className="text-sm text-gray-700">
          Connected Wallet: <span className="font-semibold">{account}</span>
        </p>
      )}
      {isOwner && <p className="text-green-600 font-semibold">You're the contract owner</p>}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🔍 Fetch Patient Records</h2>
        <input
          className="border px-4 py-2 rounded w-full"
          placeholder="Enter Patient ID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={fetchRecords}
        >
          Fetch Records
        </button>
      </div>

      <AddRecord contract={contract} patientID={patientID} onUpdate={fetchRecords} />
      <AuthorizeProvider contract={contract} isOwner={isOwner} />
      <PatientRecords records={records} />
    </div>
  );
};

export default Home;