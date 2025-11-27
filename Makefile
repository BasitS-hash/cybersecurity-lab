.PHONY: up down build logs

up:
	./scripts/start.sh

down:
	./scripts/stop.sh

build:
	./scripts/build.sh

logs:
	docker-compose logs -f

logs-grafana:
	docker-compose logs -f grafana

check:
	./scripts/check_lab.sh

validate:
	./scripts/validate_compose.sh

start-secure:
	# start the hardened vuln api using env vars in background (requires node installed locally)
	@echo "Starting hardened API in background..."
	SECURE_USER=$${SECURE_USER:-admin} SECURE_PASS=$${SECURE_PASS:-changeme} nohup node infra/vuln-api/app_fixed.js > /tmp/hardened-api.log 2>&1 &
	@echo "Hardened API started (check /tmp/hardened-api.log for logs)"

cleanup:
	# bring down compose and remove named volumes
	docker-compose down -v
