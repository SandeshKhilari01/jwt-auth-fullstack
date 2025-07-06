import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  if (!token) {
    return <Login setToken={setToken} setRole={setRole} />;
  }

  return <Dashboard role={role} />;
}

export default App;
