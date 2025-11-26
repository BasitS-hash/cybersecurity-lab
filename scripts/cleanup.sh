#!/usr/bin/env bash
set -euo pipefail

echo "Stopping and removing lab containers and volumes..."
docker-compose down -v

echo "Cleanup complete."
