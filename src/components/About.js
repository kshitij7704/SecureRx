import React from 'react';
import { Link } from 'react-router-dom';
import '../css/About.css';

const About = () => (
  <div className="about-container">
    <h1>About MedVault</h1>
    <p>
      MedVault leverages blockchain technology to ensure that patient records are
      secure, tamper-proof, and accessible only by authorized healthcare providers.
    </p>

    <div className="features-grid">
      <div className="feature-card">
        <h3>🔐 Security</h3>
        <p>Records are encrypted and stored on-chain ensuring immutability.</p>
      </div>
      <div className="feature-card">
        <h3>⚖️ Privacy</h3>
        <p>Access controlled via smart contracts; only authorized users can view data.</p>
      </div>
      <div className="feature-card">
        <h3>🚀 Transparency</h3>
        <p>All transactions are logged on a public ledger for full auditability.</p>
      </div>
    </div>

    {/* Get Started Section */}
    <div className="get-started-section">
      <h2>Ready to experience secure healthcare data access?</h2><br></br>
      <Link to="/" className="get-started-button">
        Get Started
      </Link>
    </div>
  </div>
);

export default About;
