#!/usr/bin/env bash
set -euo pipefail

echo "Stopping cybersecurity lab..."
docker compose down

echo "Lab stopped."
