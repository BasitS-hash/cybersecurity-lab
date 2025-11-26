# cybersecurity-lab

WARNING — intentionally vulnerable code and services
--------------------------------------------------

This repository contains intentionally vulnerable applications and services for educational use only. Do NOT run these services on public or production networks. Use isolated machines, private networks, or disposable VMs, and follow the safety guidance in `lab/README.md`.

An advanced, extensible local cybersecurity lab scaffold that includes intentionally vulnerable applications and tools for practicing offensive and defensive techniques.

See `lab/README.md` and `README-QUICKSTART.md` for setup and safety notes.

This repository is a starting point — extend with additional images, logging, monitoring, and persistent snapshots as needed.

Quick additions made by scaffold:
- Logging stack (Grafana + Loki + Promtail) — view container logs at http://localhost:3002
- Simple vulnerable API with tests: `infra/vuln-api` (endpoints: `/reflect`, `/cmd`, `/login`)
- Health checks: `scripts/check_lab.sh`
- Per-challenge solution hints under `challenges/*/SOLUTION.md`

CI and status (replace placeholders with your repo path if you make this public):

![integration](https://github.com/<owner>/<repo>/actions/workflows/integration.yml/badge.svg)
![ci](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)
![codeql](https://github.com/<owner>/<repo>/actions/workflows/codeql.yml/badge.svg)

Please read the safety notes in `lab/README.md` before running this lab. Do not expose the services to public networks.