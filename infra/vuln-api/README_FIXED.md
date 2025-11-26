Hardened API (remediation)

This folder contains `app_fixed.js` — a hardened version of the intentionally vulnerable API.

Key changes compared to `app.js`:
- Output is escaped to prevent reflected XSS.
- Command execution is restricted to a whitelist and uses `execFile` (no shell interpolation).
- Credentials are read from `SECURE_USER` and `SECURE_PASS` environment variables instead of being hardcoded.

How to run the hardened server (local development):

1. From repository root, run the secure app directly with Node (Node 18+ required):

   SECURE_USER=admin SECURE_PASS=strong-password node infra/vuln-api/app_fixed.js

2. Run the fixed tests (ensure the server is running):

   node infra/vuln-api/test_fixed.js

Notes
- This hardened version is intended for remediation exercises only. It is not a full production-grade implementation.
