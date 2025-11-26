# Vulnerable API - Solutions and Mitigations

This file contains walkthroughs for the three intentional vulnerabilities in `infra/vuln-api/app.js`.

1) Reflective XSS (`/reflect?input=`)
- Exploit: visit `/reflect?input=<script>alert(1)</script>` to cause the script to run in the victim's browser.
- Mitigation: escape HTML on output, use context-aware encoding, and implement Content Security Policy (CSP).

2) Command injection (`/cmd?cmd=`)
- Exploit: pass `?cmd=ls%20%2F` or more harmful payloads to execute shell commands.
- Mitigation: never pass user input into shell exec. Use language-native APIs for tasks, validate and whitelist inputs, and run processes with least privilege or in a sandbox.

3) Insecure auth (`/login` with hardcoded creds)
- Exploit: credentials are public knowledge; anyone can login and receive a token.
- Mitigation: use secure user storage (hashed passwords), environment-provided secrets, rate-limiting, and proper session management. Replace any hardcoded secrets with env vars and use strong, salted hashing (bcrypt).

Additional exercises
- Update `app.js` to remove `exec()` usage and replace with safe alternatives. Add unit tests to assert expected behavior.
- Add CSP headers to responses and sanitize or encode reflected input.

Safety
- Do not expose this service publicly. Use the lab network and isolated hosts.
