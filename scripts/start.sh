#!/usr/bin/env bash
set -euo pipefail

echo "Starting cybersecurity lab (docker-compose up -d)..."
docker-compose up -d --build

echo "Services started. Juice Shop: http://localhost:3000 | DVWA: http://localhost | Vulnerable API: http://localhost:4000"
