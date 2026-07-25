---
name: logging-observability
description: Design logging, metrics, and tracing that operators can use under
  pressure. Use whenever the user asks about structured logs, metrics,
  OpenTelemetry, dashboards, SLIs/SLOs, alerting, or how to instrument a service
  for production debugging.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Logging & Observability

If you cannot diagnose it at 3 a.m., you did not finish the feature. Prefer
high-cardinality-careful metrics, structured logs, and traces that connect them.

## Three pillars (practical)

| Signal | Use for |
|---|---|
| Metrics | SLIs, alerts, capacity |
| Logs | rich context on discrete events |
| Traces | latency across services |

## Workflow

1. Define user journeys and SLIs (availability, latency, error rate).
2. Identify golden signals per service.
3. Specify structured log fields (request_id, tenant, error codes) — never secrets.
4. Trace critical paths; propagation headers.
5. Alert on symptoms (SLO burn) more than raw CPU when possible.
6. Dashboard sketch: RED/USE + business KPI.

## Output format

```markdown
## Observability plan: <service>

### SLIs / SLOs
…

### Metrics
…

### Logs (fields & levels)
…

### Traces
…

### Alerts
…

### Privacy / cardinality risks
…
```

## Rules

1. Never log passwords, tokens, raw PII, or full payment payloads.
2. Bound cardinality (no unbounded user IDs as metric labels).
3. Correlate with a request/trace ID across services.
4. Prefer logging errors with stable `error_code` over unique essay messages only.
5. Alerts need runbook links and human-actionable thresholds.
6. Sampling traces is fine; always sample errors.

## Edge cases

- **Batch jobs:** progress metrics, last success timestamp.
- **Mobile/clients:** privacy and volume constraints.
- **Multi-tenant:** tenant in logs/metrics with care for isolation and cardinality.
