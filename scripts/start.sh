#!/usr/bin/env bash
set -euo pipefail

echo "Starting cybersecurity lab..."
docker compose up -d --build

echo "Services started."
echo "  Juice Shop:     http://localhost:3000"
echo "  DVWA:           http://localhost"
echo "  Vulnerable API: http://localhost:4000"
echo "  Grafana:        http://localhost:3002  (admin/admin)"
echo ""
echo "Run './scripts/check_lab.sh' to verify services are healthy."
