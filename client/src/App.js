import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ username: '', password: '' });

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('✅ Login successful!');
    } catch (err) {
      setMessage('❌ Login failed.');
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${API}/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.data);
    } catch (err) {
      setMessage('❌ Unauthorized access.');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setMessage('Logged out.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React + Node + JWT Auth</h1>

      {!token ? (
        <>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          /><br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          /><br />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <button onClick={getData}>Get Protected Data</button>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default App;
