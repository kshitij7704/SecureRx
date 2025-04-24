// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">Welcome to SecureRx</h1>
          <p className="landing-subtitle">
            Secure, transparent, and immutable healthcare records powered by blockchain.
          </p>
          <div className="landing-buttons">
            <button
              className="landing-button primary"
              onClick={() => navigate('/home')}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h3>Why SecureRx?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🔗 On-Chain Storage</h4>
            <p>
              All patient records live on the blockchain itself—immutable, transparent, and tamper-proof.
            </p>
          </div>

          <div className="feature-card">
            <h4>👤 Provider Authorization</h4>
            <p>
              Only the contract owner can grant on-chain permissions, ensuring that only approved
              healthcare providers can interact with data.
            </p>
          </div>

          <div className="feature-card">
            <h4>➕ Add & 🔍 Fetch Records</h4>
            <p>
              Authorized users can seamlessly add new patient entries and retrieve existing records
              by Patient ID directly from the UI.
            </p>
          </div>

          <div className="feature-card">
            <h4>📜 Immutable Audit Trails</h4>
            <p>
              Every add or view transaction is recorded on-chain, giving you a permanent audit log
              for compliance and peace of mind.
            </p>
          </div>

          <div className="feature-card">
            <h4>🔐 Access Control</h4>
            <p>
              Smart-contract-enforced access rules mean patient data is viewable or editable only by
              addresses you’ve explicitly authorized.
            </p>
          </div>

          <div className="feature-card">
            <h4>🌐 Decentralized Access</h4>
            <p>
              Access and manage records from any application or node on the blockchain network,
              anywhere in the world.
            </p>
          </div>
        </div>

        <div className="landing-buttons">
          <button
            className="landing-button secondary"
            onClick={() => navigate('/about')}
          >
            Learn More
          </button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
