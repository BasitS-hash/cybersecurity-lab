#!/usr/bin/env bash
set -euo pipefail

# Validate docker-compose file syntax and report services

echo "Validating docker-compose.yml..."
if docker-compose config >/dev/null; then
  echo "docker-compose: OK"
else
  echo "docker-compose: INVALID"
  exit 2
fi

echo "Listing services from compose file:"
docker-compose config --services

echo "Note: This script requires docker-compose to be installed and Docker engine to be running."
