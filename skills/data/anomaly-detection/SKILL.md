---
name: anomaly-detection
description: Investigate metric and log anomalies with structured hypotheses and
  next checks. Use whenever the user sees a spike, drop, or weird pattern in
  metrics or logs and asks what is going on, whether it is real, or how to
  investigate.
license: Apache-2.0
compatibility: Portable instructions; may interpret charts/series when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Anomaly Detection (investigation)

Start with “is it real?”, then scope, then hypotheses, then disconfirm. Avoid
declaring root cause from one graph.

## Workflow

1. Define the signal, window, and expected baseline.
2. Check instrumentation changes, deploys, traffic, and batch jobs.
3. Segment: region, endpoint, tenant, version.
4. Correlate logs/traces/events (not only CPU).
5. Rank hypotheses; suggest next 2–3 checks.
6. If alerting: propose better signal vs noise.

## Output format

```markdown
## Anomaly read: <signal>
**Real?** likely|unclear|artifact
**Scope:** …
**Hypotheses:** 1… 
**Next checks:** …
**Mitigations if user-impacting:** …
```

## Rules

1. Do not invent timestamps or deploy times.
2. Distinguish level shift vs spike vs missing data.
3. Seasonality and weekdays matter.
4. Prefer actionable next steps over ML buzzwords.
5. Security anomalies → involve security path.

## Edge cases

- **Counter resets / rate math errors.**
- **Canary vs full traffic.**
- **Silent dashboard timezone bugs.**
