import React, { useState } from 'react';
import './Sign_Up.css';

function Sign_Up() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) tempErrors.phone = "Phone must be exactly 10 digits";
    if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Invalid email format";
    if (form.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Sign Up successful!");
      // Implement sign up logic
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text"><h1>Sign Up</h1></div>
        <div className="signup-text1">Already a member? <span><a href="/login" style={{ color: '#2190FF' }}>Login</a></span></div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" className="form-control" placeholder="Enter your name" value={form.name} onChange={handleChange} />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input name="phone" id="phone" className="form-control" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="email" id="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" id="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={handleChange} />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-danger" onClick={() => { setForm({ name: '', phone: '', email: '', password: '' }); setErrors({}); }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up;
