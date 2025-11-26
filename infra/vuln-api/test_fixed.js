// Smoke tests for the hardened vuln API (app_fixed.js)
// Verifies reflect escaping and env-based login behavior

const assert = require('assert').strict;

const BASE = 'http://127.0.0.1:4000';

async function run() {
  // /reflect should escape '<' into '&lt;'
  const r1 = await fetch(`${BASE}/reflect?input=<script>alert(1)</script>`);
  assert.equal(r1.status, 200, '/reflect should return 200');
  const body1 = await r1.text();
  assert.ok(body1.includes('&lt;script&gt;'), 'reflect should escape HTML');

  // /login should use env-based creds; we cannot set env of running server here,
  // so test that invalid creds return 401
  const r2 = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'invalid', password: 'invalid' })
  });
  assert.equal(r2.status, 401, '/login should return 401 for invalid creds');

  console.log('hardened vuln-api smoke tests: OK');
}

run().catch(err => {
  console.error('hardened vuln-api smoke tests: FAIL');
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
