import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-title">🩺 SecureRx</div>
    <ul className="navbar-links">
      <li><NavLink end to="/" className="nav-link">Home</NavLink></li>
      <li><NavLink to="/home" className="nav-link">Dashboard</NavLink></li>
      <li><NavLink to="/about" className="nav-link">About</NavLink></li>
    </ul>
  </nav>
);

export default Navbar;