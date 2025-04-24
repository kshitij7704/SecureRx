import React from 'react';
import '../css/Footer.css';

const Footer = () => (
  <footer className="footer-container">
    <p>© {new Date().getFullYear()} MedVault. All rights reserved.</p>
    <p>Made by Kshitij Kashyap</p>
  </footer>
);

export default Footer;