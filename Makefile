.PHONY: up down build logs logs-grafana check validate cleanup start-secure lint help

## up: Start the full lab stack (builds custom images first)
up:
	./scripts/start.sh

## down: Stop the lab (preserves volumes)
down:
	./scripts/stop.sh

## build: Rebuild custom container images (vuln-api)
build:
	./scripts/build.sh

## logs: Tail all service logs
logs:
	docker compose logs -f

## logs-grafana: Tail Grafana logs only
logs-grafana:
	docker compose logs -f grafana

## check: Run health checks against running services
check:
	./scripts/check_lab.sh

## validate: Validate docker-compose.yml syntax
validate:
	./scripts/validate_compose.sh

## cleanup: Tear down stack and remove all volumes
cleanup:
	./scripts/cleanup.sh

## start-secure: Start the hardened vuln-api locally (requires Node 18+)
start-secure:
	@echo "Starting hardened API — set SECURE_USER and SECURE_PASS first."
	SECURE_USER=$${SECURE_USER:-admin} SECURE_PASS=$${SECURE_PASS:-changeme} \
		nohup node infra/vuln-api/app_fixed.js > /tmp/hardened-api.log 2>&1 &
	@echo "Hardened API started. Logs: /tmp/hardened-api.log"

## lint: Run yamllint locally (requires: pip install yamllint)
lint:
	yamllint -d "{extends: relaxed, rules: {line-length: {max: 140}}}" \
		docker-compose.yml .github/workflows/*.yml \
		infra/logging/loki-config.yaml infra/logging/promtail-config.yaml

## help: Show this help
help:
	@grep -E '^## ' Makefile | sed 's/## //'
