# Cybersecurity Lab - Local Deployment

This folder contains the instructions and safe notes for running the lab locally.

Important safety notes
- This lab contains intentionally vulnerable services. Run it only on an isolated machine or a private network.
- Do not expose the lab to the public internet.
- Use snapshots / clean VMs and reset state between exercises.

Quick start (macOS with Docker):

1. Install Docker Desktop and ensure it is running.
2. From the repository root run:

   ./scripts/start.sh

3. Access services:
   - OWASP Juice Shop: http://localhost:3000
   - DVWA: http://localhost
   - Vulnerable API: http://localhost:4000

Logging and monitoring:

- Grafana: http://localhost:3002 (admin/admin)
- Loki API: http://localhost:3100

Note: On macOS Docker Desktop, Promtail may not be able to read container logs from `/var/lib/docker/containers` due to virtualization differences. If you cannot see logs in Grafana, run the stack on a Linux host or adjust Promtail's `__path__` to match your Docker log location.

To stop the lab:

   ./scripts/stop.sh

To rebuild the custom vulnerable API container:

   ./scripts/build.sh

To validate the docker-compose configuration (requires docker-compose):

   ./scripts/validate_compose.sh

To run quick health checks after start:

   ./scripts/check_lab.sh

