// Simple intentionally vulnerable API
// WARNING: This file contains intentional vulnerabilities for educational use only.

const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reflective XSS example
app.get('/reflect', (req, res) => {
  const input = req.query.input || '';
  res.send(`<html><body><h1>Reflect</h1><div>${input}</div></body></html>`);
});

// Command injection example (deliberate): /cmd?cmd=ls
app.get('/cmd', (req, res) => {
  const cmd = req.query.cmd || '';
  if (!cmd) return res.status(400).send('missing cmd');
  // intentionally insecure
  exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) return res.status(500).send(String(err));
    res.send(`<pre>${stdout}\n${stderr}</pre>`);
  });
});

// Simple auth example (insecure): returns a fake token
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'admin' && password === 'password') {
    return res.json({ token: 'super-secret-token' });
  }
  res.status(401).json({ error: 'invalid credentials' });
});

app.listen(port, () => console.log(`Vulnerable API running on port ${port}`));
