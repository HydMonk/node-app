import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';
const FAKE_AWS_SECRET_ACCESS_KEY = "AKIA1234567890FAKEKEYEXAMPLE"
const test_server = 'http://user:password@192.0.0.1:3128'

const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

const GITHUB_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwx"

const SLACK_WEBHOOK = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"

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
