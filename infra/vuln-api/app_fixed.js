// Hardened version of the vulnerable API for remediation exercises.
// - Escapes reflected input to prevent XSS
// - Uses a whitelist + execFile for command execution to avoid shell injection
// - Uses environment-provided credentials for authentication (no hardcoded secrets)

const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Reflective XSS protected
app.get('/reflect', (req, res) => {
  const input = req.query.input || '';
  res.send(`<html><body><h1>Reflect (hardened)</h1><div>${escapeHtml(input)}</div></body></html>`);
});

// Safe command execution: whitelist commands and use execFile (no shell)
const CMD_WHITELIST = {
  // command: [allowed-args-count-min, allowed-args-count-max]
  'node': [0, 5],
  'whoami': [0, 0],
  'date': [0, 0]
};

app.get('/cmd', (req, res) => {
  const cmd = req.query.cmd;
  if (!cmd) return res.status(400).send('missing cmd');

  const parts = cmd.split(' ').filter(Boolean);
  const program = parts[0];
  const args = parts.slice(1);

  if (!Object.prototype.hasOwnProperty.call(CMD_WHITELIST, program)) {
    return res.status(403).send('command not allowed');
  }

  const [minArgs, maxArgs] = CMD_WHITELIST[program];
  if (args.length < minArgs || args.length > maxArgs) {
    return res.status(400).send('invalid args');
  }

  execFile(program, args, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) return res.status(500).send(String(err));
    res.send(`<pre>${escapeHtml(stdout)}\n${escapeHtml(stderr)}</pre>`);
  });
});

// Auth: use env vars for credentials (SECURE_USER, SECURE_PASS)
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = process.env.SECURE_USER || 'admin';
  const pass = process.env.SECURE_PASS || 'please-change-me';
  if (username === user && password === pass) {
    // In a real app, issue a signed JWT or session cookie. This is illustrative.
    return res.json({ token: 'env-based-token' });
  }
  res.status(401).json({ error: 'invalid credentials' });
});

app.listen(port, () => console.log(`Hardened API running on port ${port}`));
