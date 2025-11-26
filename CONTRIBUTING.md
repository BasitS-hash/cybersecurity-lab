Contributing to cybersecurity-lab

Thanks for your interest in contributing. This repository contains intentionally vulnerable code for educational purposes. Please follow these rules:

- Safety first: do not expose vulnerable services to public networks. Keep changes local and documented.
- Use branches for features and bug fixes. Provide a clear summary in the PR describing security implications.
- Verify changes with the included CI workflows. Add tests for new code.
- Do not add secrets to the repository. Use environment variables and update `.env.example` if needed.
- For major additions (IDS, VMs, C2 tooling), document required host privileges and warn users about elevated permissions.

Submitting PRs
- Fork and branch, then open a PR against `main` with a clear title and description.
- Include test instructions and security considerations.
