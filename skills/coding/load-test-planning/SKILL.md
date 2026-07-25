---
name: load-test-planning
description: Plan and interpret load tests with clear goals, scenarios, and
  pass/fail criteria. Use whenever the user asks for k6, Locust, JMeter, Gatling,
  soak tests, stress tests, capacity tests, or how to read p95 latency and error
  rates under load.
license: Apache-2.0
compatibility: Portable instructions; may sketch tool scripts when helpful.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Load Test Planning

Load tests answer a decision: can we hit this SLO under this traffic model?
Vanity RPS without scenarios is noise.

## Workflow

1. Goal: launch readiness, regression, capacity, soak, or breakpoint.
2. Model traffic: users, RPS, mix of endpoints, think time, geo if relevant.
3. Define SLOs as pass/fail (e.g. p95 < 300ms, error rate < 0.1%).
4. Environment: prod-like data size, caching, auth; never surprise prod without approval.
5. Ramp plan: warm-up → steady → (optional) stress → cool-down.
6. Observability: app metrics, infra, DB; correlate with test timeline.
7. Interpret: bottlenecks, saturation, not only green/red.

## Output format

```markdown
## Load test plan: <system>

**Goal:** …
**Traffic model:** …
**Pass/fail:** …

### Scenarios
1. …

### Ramp
…

### Tooling notes
k6/Locust/…

### Observability checklist
…

### Risks / ethics
prod impact, data safety
```

## Rules

1. Never recommend unannounced prod stress without explicit approval.
2. Pass criteria must match product SLOs when they exist.
3. Distinguish average vs tail latency.
4. Include auth and realistic payloads; GETs-only is usually wrong.
5. Document data setup and teardown.
6. Do not invent tool syntax you are unsure of — describe intent.

## Edge cases

- **Soak:** memory leaks, connection pool exhaustion over hours.
- **Spike:** sudden 10x; autoscaling lag.
- **Write-heavy:** idempotency and cleanup.
