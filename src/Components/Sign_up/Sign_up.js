// src/components/Sign_Up/Sign_Up.js
import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (!name || !email || !phone || !password) {
      validationErrors.push('All fields are required');
    }

    if (!/^\d{10}$/.test(phone)) {
      validationErrors.push('Phone number must be exactly 10 digits');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        navigate("/");
        window.location.reload();
      } else if (json.errors) {
        // Validation errors from backend (array of objects)
        const backendErrors = json.errors.map(err => err.msg);
        setErrors(backendErrors);
      } else if (json.error) {
        setErrors([json.error]);
      }
    } catch (err) {
      setErrors(["Something went wrong. Please try again later."]);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn1">Sign Up</button>

            {errors.length > 0 && (
              <div className="err" style={{ color: 'red', marginTop: '10px' }}>
                <ul>
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
