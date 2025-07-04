const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET = 'supersecretkey'; // 🔐 You should store this securely in production

app.use(cors());
app.use(express.json());

const DUMMY_USER = { username: 'admin', password: 'secret' };

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/api/data', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    return res.json({ data: `Hello ${decoded.username}, this is your protected data.` });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
