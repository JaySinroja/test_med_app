import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your components
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        {/* You can add more routes later like Sign_Up, Login, etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
