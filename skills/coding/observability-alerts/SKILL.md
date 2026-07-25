---
name: observability-alerts
description: Design actionable alerts that page humans only for real pain. Use
  whenever the user writes alert rules, fixes alert fatigue, designs on-call
  notifications, escalations, or SLO burn alerts.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Observability Alerts

Every page should map to user pain or imminent pain and a runbook. Symptom-based
beats cause-based flapping.

## Workflow

1. User journeys and SLOs to protect.
2. Alert on symptoms (error rate, latency, freshness) first.
3. Thresholds, windows, and multi-window burn if SLO-based.
4. Severity → route (page vs ticket vs slack).
5. Runbook link mandatory for paging alerts.
6. Dedup, group, inhibit flapping.
7. Review noise weekly; delete or tune.

## Output format

```markdown
## Alert: <name>
**Symptom:** …
**Condition:** …
**Severity / route:** …
**Runbook:** …
**Owners:** …
**Noise risks:** …
```

## Rules

1. No pages without owners and runbooks.
2. Avoid CPU-only alerts as primary for apps.
3. Test alerts (fire drill) occasionally.
4. Night pages need higher bar.
5. Document dependencies to reduce stampede pages.

## Edge cases

- **Batch jobs:** freshness not uptime.
- **Multi-tenant:** avoid one-tenant storms paging everyone without scope.
- **Synthetic checks:** complement, not sole signal.
