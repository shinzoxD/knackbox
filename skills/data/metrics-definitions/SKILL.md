---
name: metrics-definitions
description: Define product and business metrics with precise numerators,
  denominators, and edge cases. Use whenever the user asks what to measure,
  how to define a KPI, North Star, activation, retention, churn, or event
  taxonomy for analytics — even for a rough product idea.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Metrics Definitions

A metric without a definition is a slogan. Write metrics so two analysts get
the same number from the same warehouse.

## Workflow

1. Clarify decision the metric informs (grow activation? reduce churn?).
2. Propose a small set: North Star (optional), input metrics, guardrails.
3. For each metric: formula, grain, time window, filters, owners.
4. Map required events/properties (tracking plan lite).
5. List non-goals and common misreads.
6. Suggest validation checks (reconciliation, anomaly thresholds).

## Output format

```markdown
## Metrics spec: <product/area>

### North Star (if any)
**Name:** …
**Formula:** …
**Why it matters:** …

### Input metrics
| Name | Formula | Grain | Window | Owner |

### Guardrails
| Name | Formula | Alert idea |

### Tracking requirements
- event.property …

### Edge cases
- …

### Anti-metrics / misreads
- …
```

## Rules

1. Always define numerator, denominator, and who is in the population.
2. Prefer ratios with explicit windows (e.g. D7 retention) over vague "engagement".
3. Separate leading indicators from lagging outcomes.
4. Do not invent data you cannot collect; flag instrumentation gaps.
5. One source of truth name per metric; note deprecated aliases.
6. Call out gaming risk (metrics people will optimize naively).

## Edge cases

- **B2B seats vs accounts:** state which entity is the unit.
- **Marketplace:** define both sides; avoid averaging away imbalance.
- **Early stage:** fewer metrics, higher instrumentation quality.
