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
	# start the hardened vuln api using env vars (requires node installed locally)
	SECURE_USER=${SECURE_USER:-admin} SECURE_PASS=${SECURE_PASS:-changeme} node infra/vuln-api/app_fixed.js &

cleanup:
	# bring down compose and remove named volumes
	docker-compose down -v
