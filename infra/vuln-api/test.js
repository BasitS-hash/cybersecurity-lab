// Simple smoke tests for the vuln-api. Uses built-in fetch (Node 18+).
// This file is intentionally minimal so CI can quickly verify endpoints.

const assert = require('assert').strict;
const http = require('http');

const BASE = 'http://127.0.0.1:4000';

async function run() {
  // /reflect endpoint
  const r1 = await fetch(`${BASE}/reflect?input=test`);
  assert.equal(r1.status, 200, '/reflect should return 200');
  const body1 = await r1.text();
  assert.ok(body1.includes('test'), '/reflect should echo input');

  // /login endpoint (post)
  const r2 = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'password' })
  });
  assert.equal(r2.status, 200, '/login should return 200 for valid creds');
  const json = await r2.json();
  assert.equal(typeof json.token, 'string', '/login should return a token');

  // /cmd endpoint negative test (missing cmd)
  const r3 = await fetch(`${BASE}/cmd`);
  assert.equal(r3.status, 400, '/cmd without cmd should 400');

  console.log('vuln-api smoke tests: OK');
}

run().catch(err => {
  console.error('vuln-api smoke tests: FAIL');
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
