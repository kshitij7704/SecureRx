import React, { useState } from 'react';

const AuthorizeProvider = ({ contract, isOwner }) => {
  const [providerAddress, setProviderAddress] = useState('');

  const authorize = async () => {
    if (!isOwner) return alert("Only the owner can authorize.");
    const tx = await contract.authorizeProvider(providerAddress);
    await tx.wait();
    alert("Provider authorized successfully.");
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">✅ Authorize Provider</h2>
      <input
        className="border px-4 py-2 rounded w-full"
        placeholder="Provider Address"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={authorize}
      >
        Authorize
      </button>
    </div>
  );
};

export default AuthorizeProvider;