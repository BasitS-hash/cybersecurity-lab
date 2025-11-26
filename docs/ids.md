# IDS/Network Monitoring (Suricata) — notes and example

This lab can be extended with an IDS like Suricata to capture network traffic and generate alerts.

Important notes
- Running Suricata in container mode for host network capture typically requires privileged access and access to the host network or a mirror/span port. On macOS with Docker Desktop network capture is limited — it's best to run Suricata on a Linux host or VM.
- Use caution: Suricata may require large disk space for logs and rulesets.

Example service (informational only — commented):

```yaml
# suricata:
#   image: jasonish/suricata:6.0.0
#   container_name: lab_suricata
#   cap_add:
#     - NET_RAW
#     - NET_ADMIN
#   network_mode: host
#   volumes:
#     - ./infra/ids/suricata.yaml:/etc/suricata/suricata.yaml:ro
#     - ./infra/ids/rules/:/etc/suricata/rules/:ro
#   command: -c /etc/suricata/suricata.yaml -i eth0
```

Recommended workflow
1. Provision a Linux VM or host for running Suricata.
2. Install or run Suricata with host network access or on a mirrored interface.
3. Configure rule sets (EmergingThreats or custom rules) and forward alerts to a central SIEM or Loki/ELK for analysis.

If you'd like, I can add Suricata configuration files and a commented compose snippet (non-activated by default).
