#!/usr/bin/env bash
set -euo pipefail

echo "Building custom containers (vuln-api)..."
docker-compose build vuln-api

echo "Build complete."
