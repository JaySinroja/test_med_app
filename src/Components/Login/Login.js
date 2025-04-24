import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = "Email is required";
    if (!password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login successful!");
      // Implement login logic
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text"><h2>Login</h2></div>
        <div className="login-text">
          Are you a new member? <span><a href="/signup" style={{ color: '#2190FF' }}>Sign Up Here</a></span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" onClick={() => { setEmail(''); setPassword(''); setErrors({}); }}>Reset</button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
