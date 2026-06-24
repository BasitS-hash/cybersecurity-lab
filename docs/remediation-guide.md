# Remediation Guide — Hardened API

This guide covers the hardened version of the vulnerable API (`infra/vuln-api/app_fixed.js`) and how to use it for remediation exercises.

## Key Fixes vs. Vulnerable Version

| Vulnerability | `app.js` (vulnerable) | `app_fixed.js` (hardened) |
|---|---|---|
| Reflected XSS | Raw input injected into HTML | All output HTML-escaped via `escapeHtml()` |
| Command injection | `exec(userInput)` — full shell | `execFile()` with allowlist — no shell interpolation |
| Hardcoded credentials | `admin` / `password` in source | Read from `SECURE_USER` / `SECURE_PASS` env vars |

## Running the Hardened Server

```bash
# From repo root (requires Node 18+)
SECURE_USER=admin SECURE_PASS=your-strong-pass node infra/vuln-api/app_fixed.js

# In another terminal — run fixed smoke tests
node infra/vuln-api/test_fixed.js
```

## Exercises

1. Compare `app.js` and `app_fixed.js` line by line and note every security change.
2. Add CSP headers to `app_fixed.js` (`Content-Security-Policy: default-src 'self'`).
3. Add rate-limiting to `/login` using `express-rate-limit`.
4. Replace the fake token in `/login` with a signed JWT (`jsonwebtoken`).
5. Write additional tests in `test_fixed.js` to assert the XSS payload is escaped.

## Notes

- This is an illustrative, not production-grade, implementation.
- Never expose the vulnerable `app.js` to public networks.
