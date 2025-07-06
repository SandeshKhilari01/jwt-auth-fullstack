import React from 'react';

const Dashboard = ({ role }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload(); // or use navigate('/') if using react-router
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome, {role} 👋</h1>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  textAlign: 'center',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Dashboard;
