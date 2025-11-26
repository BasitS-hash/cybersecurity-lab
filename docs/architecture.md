# Lab architecture

Overview

This lab is organized using Docker Compose. The main purpose is to offer a safe, local environment that contains:

- Offensive tooling (Kali container) to perform assessments.
- Web application targets (OWASP Juice Shop, DVWA).
- A small custom vulnerable API implemented in Node for targeted exercises.
- A separate MySQL service for DVWA.

Network

All containers share a private Docker bridge network `labnet` (defined in `docker-compose.yml`). Exposed host ports are:

- 3000 -> Juice Shop
- 80 -> DVWA
- 4000 -> Vulnerable API

Design notes

- The Kali container is provided as a convenience; you may prefer running Kali on a separate VM.
- All images are pulled from public registries. If you need offline use, pre-pull or build images on an isolated machine.
- Keep production machines and sensitive networks separate from this lab.

Extensions

- Add a logging stack (ELK/EFK) to capture traffic and host telemetry.
- Add IDS/IPS like Suricata or Zeek in a sensor container.
- Add a bastion or jump host to practice pivoting scenarios.
