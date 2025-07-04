import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ username: '', password: '' });

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, form);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed.');
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${API}/data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage(res.data.data);
    } catch (err) {
      setMessage('Access denied.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React + Node Auth Demo</h1>

      {!token && (
        <>
          <input
            type="text"
            placeholder="Username"
            onChange={e => setForm({ ...form, username: e.target.value })}
          /><br />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          /><br />
          <button onClick={login}>Login</button>
        </>
      )}

      {token && (
        <>
          <button onClick={getData}>Get Protected Data</button>
          <button onClick={() => { setToken(''); localStorage.clear(); }}>Logout</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default App;