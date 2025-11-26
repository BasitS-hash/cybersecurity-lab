# Logging and Monitoring (Grafana + Loki)

This lab includes a lightweight logging stack to collect container logs and view them in Grafana.

Services added (Docker Compose)
- `loki` (port 3100) — log ingestion and storage
- `grafana` (port 3002) — dashboard and Explore UI
- `promtail` — log collector that tails system and Docker logs and forwards them to Loki

Access
- Grafana: http://localhost:3002 (admin/admin)
- Loki API: http://localhost:3100

Notes and caveats
- Promtail attempts to read container logs under `/var/lib/docker/containers` and `/var/log`. On macOS with Docker Desktop, container logs may be in a different location; Promtail may require adjustments or run on a Linux host for full visibility.
- For production or persistent labs, consider configuring Loki's object storage (S3/GCS) instead of filesystem-backed storage.
- This stack is for educational purposes to show how logs can be aggregated and queried.

Quick start
1. Start the lab stack:

   ./scripts/start.sh

2. If Compose started successfully, visit Grafana at http://localhost:3002 and add Loki as a data source (URL: http://loki:3100).
3. Use Explore in Grafana to query logs with `{job="varlogs"}` or filter by labels like `container`.

Further extensions
- Add Filebeat or Vector for richer log shipping.
- Add metrics collection (Prometheus + Node Exporter) and visualize with Grafana.
