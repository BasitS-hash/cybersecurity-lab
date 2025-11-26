# DVWA - Solution Hints and Mitigations

This file contains high-level hints and mitigations for common DVWA modules.

SQL Injection
- Hint: Use SQLi payloads against forms or URL parameters when inputs are concatenated into queries.
- Mitigation: Use parameterized queries / prepared statements. Validate and sanitize inputs.

XSS
- Hint: Try reflected and stored payloads in fields and review HTML responses.
- Mitigation: Context-aware escaping and Content Security Policy.

File upload
- Hint: Upload files with double extensions or bypass content-type checks.
- Mitigation: Strict server-side file validation, store uploads outside webroot, block executable permissions.

Notes
- DVWA includes a security level slider; set to low for easier practice then increase to harder levels.
