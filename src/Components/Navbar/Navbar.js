// src/components/Navbar/Navbar.js
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMenuActive, setMenuActive] = useState(false);
  const handleClick = () => setMenuActive(!isMenuActive);

  const isLoggedIn = !!sessionStorage.getItem('auth-token');
  const email = sessionStorage.getItem('email');
  const username = email ? email.split('@')[0] : '';

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
            <title>Doctor With Stethoscope</title>
            <g>
              <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z" />
              <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={isMenuActive ? 'fa fa-times' : 'fa fa-bars'}></i>
      </div>

      <ul className={`nav__links ${isMenuActive ? 'active' : ''}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className="link user-greeting">Hi, {username}</li>
            <li className="link">
              <button className="btn1" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/instant">Instant Booking</Link>
            </li>

          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
