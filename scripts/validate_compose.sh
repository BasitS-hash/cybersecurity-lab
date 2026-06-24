#!/usr/bin/env bash
set -euo pipefail

# Validate docker-compose file syntax and report services

echo "Validating docker-compose.yml..."
if docker compose config --quiet; then
  echo "docker compose config: OK"
else
  echo "docker compose config: INVALID"
  exit 2
fi

echo "Services defined in compose file:"
docker compose config --services

echo "Note: This requires Docker Engine to be running."
