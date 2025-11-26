# DVWA - Challenges

Damn Vulnerable Web Application (DVWA) is targeted for practicing classic web vulnerabilities.

Access:
- http://localhost

Configuration:
- DVWA requires the database to be reachable (Docker Compose launches a MySQL container). If DVWA shows config errors, ensure the MySQL container finished initialization.

Typical modules:
- SQL Injection
- XSS
- File upload vulnerabilities

Mitigations:
- Parameterized queries, output encoding, secure configuration, and proper file validation.
