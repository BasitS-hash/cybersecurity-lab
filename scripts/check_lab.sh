#!/usr/bin/env bash
set -euo pipefail

# Simple health check script for local lab services.
# Usage: ./scripts/check_lab.sh

which curl >/dev/null 2>&1 || { echo "curl is required"; exit 2; }

echo "Checking Juice Shop (http://localhost:3000)..."
if curl -fsS http://localhost:3000 >/dev/null; then
  echo "  Juice Shop: OK"
else
  echo "  Juice Shop: FAIL"
fi

echo "Checking DVWA (http://localhost)..."
if curl -fsS http://localhost >/dev/null; then
  echo "  DVWA: OK"
else
  echo "  DVWA: FAIL"
fi

echo "Checking Vulnerable API (http://localhost:4000/reflect?input=ok)..."
if curl -fsS "http://localhost:4000/reflect?input=ok" | grep -q ok; then
  echo "  vuln-api: OK"
else
  echo "  vuln-api: FAIL"
fi

echo "Done. NOTE: these checks are superficial. For deeper verification run infra/vuln-api tests or docker-compose logs."
