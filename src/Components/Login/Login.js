import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css'; // Make sure your styling is connected

const Login = () => {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hook for navigation
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      navigate('/');
    }
  }, []);

  // Login form submission handler
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload(); // Force Navbar update
      } else {
        if (json.errors) {
          json.errors.forEach((err) => alert(err.msg));
        } else {
          alert(json.error);
        }
      }
    } catch (err) {
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
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
                  aria-describedby="emailHelp"
                  required
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
                  aria-describedby="passwordHelp"
                  required
                />
              </div>

              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
