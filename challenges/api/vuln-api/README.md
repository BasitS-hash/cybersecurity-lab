# Vulnerable API - Exercises

This custom Node API includes three intentional vulnerabilities:

1. Reflective XSS: `/reflect?input=` — unsanitized input is echoed directly in HTML.
2. Command injection: `/cmd?cmd=` — user input is passed to `exec()` without sanitization.
3. Insecure auth: `/login` responds with a token for a hardcoded credential set.

Learning objectives:
- Identify and exploit each vector.
- Propose and implement mitigations (input validation, least privilege, avoid shelling out, rate-limiting, secure credential storage).

Safety: only run this API in an isolated environment.
