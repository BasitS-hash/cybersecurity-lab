Cybersecurity Lab — Complete

This repository scaffold is prepared for local offensive and defensive exercises. Below is a final checklist and verification guide.

Final checklist (files & features)
- docker-compose.yml: Kali, Juice Shop, DVWA (MySQL), vuln-api, Grafana, Loki, Promtail
- infra/vuln-api: vulnerable app (`app.js`), hardened app (`app_fixed.js`), tests (`test.js`, `test_fixed.js`)
- scripts/: start/stop/build/check/validate/cleanup helpers
- docs/: architecture, logging, IDS notes
- challenges/: README and SOLUTION.md for targets
- CI workflows: `.github/workflows/ci.yml` and `lint.yml` (run node smoke tests and shellcheck)
- CONTRIBUTING.md, SECURITY.md

Verification (recommended order)
1. Ensure prerequisites on your host:
   - Docker Desktop or Docker Engine + docker-compose
   - Node 18+ if you want to run local Node tests
   - curl and shellcheck (optional for linting)

2. Start the lab (builds vuln-api image then starts services):

   ./scripts/start.sh

3. Validate docker-compose syntax and list services:

   ./scripts/validate_compose.sh

4. Run quick health checks:

   ./scripts/check_lab.sh

5. Run vuln-api smoke tests locally (requires Node):

   cd infra/vuln-api
   npm install --no-audit --no-fund
   npm test

6. Run the hardened API for remediation exercises:

   SECURE_USER=admin SECURE_PASS=strong node infra/vuln-api/app_fixed.js
   # then run
   node infra/vuln-api/test_fixed.js

7. Explore logs in Grafana:
   - Visit http://localhost:3002 (admin/admin). Add Loki datasource: http://loki:3100

8. Cleanup when finished:

   ./scripts/cleanup.sh

Notes
- Promtail on macOS (Docker Desktop) may not read container logs from `/var/lib/docker/containers`. See `docs/logging.md` for details and workarounds.
- CI runs Node smoke tests in GitHub Actions; push a branch and check Actions for automated verification.

If anything fails in your environment, open an issue with logs and I'll help debug.
