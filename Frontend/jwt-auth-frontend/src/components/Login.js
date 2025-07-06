import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setRole }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Trim username to remove spaces (common bug)
    const trimmed = {
      username: credentials.username.trim(),
      password: credentials.password
    };

    try {
      console.log("📤 Sending login request:", trimmed); // Debug line

      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        trimmed,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setToken(token);
      setRole(role);

      // Redirect based on role
      navigate(`/${role}`);
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      const message = err.response?.data?.message || 'Invalid credential';
      setError(message);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: 400,
  margin: '50px auto',
  padding: 20,
  border: '1px solid #ccc',
  borderRadius: 8,
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Login;
