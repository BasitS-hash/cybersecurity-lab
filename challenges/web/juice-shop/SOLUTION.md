# Juice Shop - Solution Hints and Mitigations

OWASP Juice Shop contains many challenges; this file provides high-level hints and defenses.

Common approaches
- Use the "Score Board" in the Juice Shop UI to track challenges.
- Try XSS payloads in search fields, product reviews, and input forms.
- Inspect JavaScript on the page for insecure client-side logic that can be abused.

Mitigations
- Validate inputs and use output encoding.
- Implement proper authentication and authorization checks on the server side.
- Use secure cookies, rate-limiting, and monitor anomalous behavior.
