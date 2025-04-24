import React, { useState } from 'react';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMsg('');

    try {
      const response = await fetch('http://localhost:8181/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors); // e.g., array of { msg: "...", param: "...", ... }
        } else {
          setErrors([{ msg: data.error || 'Registration failed' }]);
        }
      } else {
        setSuccessMsg('Registration successful! Please log in.');
        setUser({ name: '', email: '', password: '' });
      }
    } catch (error) {
      setErrors([{ msg: 'Network error or server not responding' }]);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>

      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errors.length > 0 &&
        errors.map((err, index) => (
          <p key={index} style={{ color: 'red' }}>
            {err.msg}
          </p>
        ))}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default SignUp;
