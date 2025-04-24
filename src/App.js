import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;