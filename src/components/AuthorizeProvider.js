// src/components/AuthorizeProvider.js
import React, { useState } from 'react';
import '../css/AuthorizeProvider.css';

const AuthorizeProvider = ({ contract, isOwner }) => {
  const [providerAddr, setProviderAddr] = useState('');

  const authorize = async () => {
    if (!isOwner) return alert('Only owner can authorize');
    if (!providerAddr) return alert('Enter provider address');
    try {
      const tx = await contract.authorizeProvider(providerAddr);
      await tx.wait();
      alert('Provider authorized');
      setProviderAddr('');
    } catch (err) {
      console.error(err);
      alert('Authorization failed');
    }
  };

  return (
    <div className="form-section">
      <h2>✅ Authorize Provider</h2>

      {/* Instructional text */}
      <ul className="authorize-instructions">
        <li>🔒 Make sure you’re connected as the contract owner.</li>
        <li>📋 Paste the Ethereum address of the new provider.</li>
        <li>▶️ Click “Authorize” to grant on-chain access.</li>
      </ul>

      <input
        className="input-field"
        type="text"
        placeholder="Provider Address"
        value={providerAddr}
        onChange={e => setProviderAddr(e.target.value)}
      />
      <button className="action-button" onClick={authorize}>
        Authorize
      </button>
    </div>
  );
};

export default AuthorizeProvider;
