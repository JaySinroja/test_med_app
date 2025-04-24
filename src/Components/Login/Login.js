// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { API_URL } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok && json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("name", email.split("@")[0]); // fallback if no name returned
        window.location.href = "/"; // Force reload to update Navbar
      } else {
        setErrors(json.errors || [{ msg: json.error || "Login failed" }]);
      }
    } catch (error) {
      setErrors([{ msg: "Something went wrong. Please try again later." }]);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {errors.length > 0 && (
          <ul style={{ color: 'red' }}>
            {errors.map((err, idx) => (
              <li key={idx}>{err.msg}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Login;
