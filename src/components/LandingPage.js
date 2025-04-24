import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to SecureRx</h1>
        <p className="landing-subtitle">
          Secure, transparent, and immutable healthcare records on the blockchain.
        </p>
        <button className="landing-button" onClick={() => navigate('/home')}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default LandingPage;