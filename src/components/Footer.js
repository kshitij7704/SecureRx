import React from 'react';
import '../css/Footer.css';

const Footer = () => (
  <footer className="footer-container">
    <p>© {new Date().getFullYear()} SecureRx. All rights reserved.</p>
    <p>
      Made by <a href="https://kshitij-kashyap-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Kshitij Kashyap</a>
    </p>
  </footer>
);

export default Footer;