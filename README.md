# cybersecurity-lab

> **WARNING — intentionally vulnerable services inside.**
> Run only in isolated networks or disposable VMs. Never expose to the public internet.
> See [Ethics & Authorized Use](#ethics--authorized-use) before starting.

A hands-on, CTF-style local security lab for practicing offensive and defensive techniques. Spins up real vulnerable targets via Docker Compose, ships a custom purposely-broken API with a hardened counterpart for remediation exercises, and includes a log-aggregation stack (Grafana + Loki) for defensive visibility.

---

## Badges

![CI](https://github.com/BasitS-hash/cybersecurity-lab/actions/workflows/ci.yml/badge.svg)
![Lint](https://github.com/BasitS-hash/cybersecurity-lab/actions/workflows/lint.yml/badge.svg)
![Secret Scan](https://github.com/BasitS-hash/cybersecurity-lab/actions/workflows/secret-scan.yml/badge.svg)
![CodeQL](https://github.com/BasitS-hash/cybersecurity-lab/actions/workflows/codeql.yml/badge.svg)

---

## Lab Catalog

| Service | URL | Purpose |
|---|---|---|
| OWASP Juice Shop | http://localhost:3000 | Web app CTF (XSS, IDOR, SQLi, …) |
| DVWA | http://localhost | Classic web-vuln training (SQLi, XSS, file upload) |
| Vulnerable API | http://localhost:4000 | Custom Node API with XSS, CMDi, insecure-auth |
| Grafana | http://localhost:3002 | Log dashboards (admin / admin) |
| Loki | http://localhost:3100 | Log ingestion API |
| Kali container | `docker exec -it lab_kali bash` | Offensive tooling |

Challenge write-ups and solution notes live in [`challenges/`](challenges/README.md).

---

## Architecture

```
Host
└── Docker bridge network: labnet (isolated, not internet-routable)
    ├── lab_kali          – Kali rolling (offensive tools)
    ├── lab_juice         – OWASP Juice Shop :3000
    ├── lab_dvwa          – DVWA :80 → depends on lab_dvwa_db
    ├── lab_dvwa_db       – MySQL 5.7 (internal only)
    ├── lab_vuln_api      – Custom Node vulnerable API :4000
    ├── lab_loki          – Loki log store :3100
    ├── lab_promtail      – Log collector (forwards to Loki)
    └── lab_grafana       – Grafana dashboards :3002
```

All services share the `labnet` bridge network. Only the listed ports are bound to localhost. See [`docs/architecture.md`](docs/architecture.md) for extension notes.

---

## Quickstart

### Prerequisites

- Docker Desktop (macOS/Windows) or Docker Engine + Compose plugin (Linux)
- `curl` (health checks)
- Node 18+ (optional — for running vuln-api tests locally without Docker)

### 1. Clone and start

```bash
git clone https://github.com/BasitS-hash/cybersecurity-lab.git
cd cybersecurity-lab
cp .env.example .env          # review defaults — never commit .env
./scripts/start.sh            # builds vuln-api image then starts all services
```

### 2. Verify services are up

```bash
./scripts/check_lab.sh
```

### 3. Run vuln-api smoke tests (optional, local Node)

```bash
cd infra/vuln-api
npm install --no-audit --no-fund
npm test
```

### 4. Stop the lab

```bash
./scripts/stop.sh             # keeps volumes
# or
./scripts/cleanup.sh          # full teardown including volumes
```

### Makefile shortcuts

```
make up          # start lab
make down        # stop lab
make check       # health checks
make validate    # validate docker-compose syntax
make logs        # tail all logs
```

---

## Challenges

| Challenge | Target | Vulnerabilities |
|---|---|---|
| [Vulnerable API](challenges/api/vuln-api/README.md) | `localhost:4000` | Reflected XSS, Command Injection, Insecure Auth |
| [Juice Shop](challenges/web/juice-shop/README.md) | `localhost:3000` | Score-board driven — XSS, IDOR, broken-access-control, … |
| [DVWA](challenges/web/dvwa/README.md) | `localhost` | SQL injection, XSS, file upload, CSRF |

Each challenge folder has a `README.md` (objectives + hints) and a `SOLUTION.md` (full walkthrough). Read the README first.

### Remediation exercise

Compare `infra/vuln-api/app.js` (intentionally broken) with `infra/vuln-api/app_fixed.js` (hardened). Run the hardened server:

```bash
SECURE_USER=admin SECURE_PASS=your-strong-pass node infra/vuln-api/app_fixed.js
node infra/vuln-api/test_fixed.js   # verify fixes
```

---

## Logging & Monitoring

Grafana + Loki + Promtail ships with the lab. After `make up`:

1. Open http://localhost:3002 (admin / admin).
2. Add a Loki data source: URL `http://loki:3100`.
3. Use Explore and query `{job="varlogs"}` or filter by `container`.

> **macOS note:** Promtail may not read container logs from `/var/lib/docker/containers` on Docker Desktop due to VM layering. Run the stack on Linux for full log visibility, or see [`docs/logging.md`](docs/logging.md).

---

## CI/CD

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | push / PR | Node smoke tests for vuln-api |
| `lint.yml` | push / main, PR | ShellCheck on scripts, YAML lint, Hadolint |
| `secret-scan.yml` | push / PR | Basic hardcoded-secret regex scan |
| `codeql.yml` | push / PR | GitHub CodeQL static analysis (JavaScript) |
| `integration.yml` | push / PR | Full compose stack up + health checks + smoke tests |

---

## Ethics & Authorized Use

This repository is **for educational and authorized security testing only**.

- Do **not** run these services on production or shared networks.
- Use only on machines/networks you own or have explicit written permission to test.
- Keep the `labnet` Docker network isolated from your LAN.
- Reset and destroy containers between exercises to avoid state leakage.
- Do not use techniques practiced here against systems without authorization — that is illegal and unethical.

By using this lab you agree to use it only for lawful, authorized purposes.

---

## Extending the Lab

Ideas to level up the lab:

- **IDS/IPS:** Add Suricata or Zeek in sensor mode — see [`docs/ids.md`](docs/ids.md).
- **Metrics:** Add Prometheus + Node Exporter and wire Grafana dashboards.
- **C2 / pivoting:** Add a C2 framework container (Sliver, Havoc) to practice post-exploitation.
- **SAST/DAST:** Wire Semgrep or OWASP ZAP as a CI step.
- **Persistent snapshots:** Use named Docker volumes so DVWA MySQL survives restarts.

---

## Repository Structure

```
cybersecurity-lab/
├── challenges/          # Per-target challenge READMEs + solution write-ups
│   ├── api/vuln-api/
│   └── web/{juice-shop,dvwa}/
├── docs/                # Architecture, logging, IDS notes
├── infra/
│   ├── vuln-api/        # Custom vulnerable Node API (app.js) + hardened (app_fixed.js)
│   └── logging/         # Loki + Promtail configs
├── scripts/             # start / stop / build / check / validate / cleanup helpers
├── .github/
│   ├── workflows/       # CI, lint, secret-scan, CodeQL, integration
│   └── dependabot.yml
├── docker-compose.yml
├── Makefile
└── .env.example
```

---

## License

[MIT](LICENSE) — use freely for learning. See [Ethics & Authorized Use](#ethics--authorized-use).
