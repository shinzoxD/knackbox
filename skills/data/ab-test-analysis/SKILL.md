---
name: ab-test-analysis
description: Analyze A/B and experiment results with correct metrics, uncertainty,
  and caveats. Use whenever the user shares experiment data, asks if a variant
  won, or needs help interpreting lift, p-values, confidence intervals, CUPED,
  or sample ratio mismatch.
license: Apache-2.0
compatibility: Portable instructions; may use local analysis tools when available.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# A/B Test Analysis

Experiments need pre-registered metrics, healthy assignment, and honest
uncertainty. Do not crown winners from noisy or peeked data without caveats.

## Workflow

1. Confirm hypothesis, primary metric, guardrails, unit of randomization, and duration.
2. Check data quality: sample ratio mismatch, bots, nulls, novelty effects.
3. Compute lift with uncertainty (CI); avoid p-hacking language.
4. Segment carefully; treat segments as exploratory unless pre-registered.
5. State decision: ship / hold / iterate, with risks.

## Output format

```markdown
## Experiment read: <name>

**Primary metric:** …
**Result:** …
**Decision recommendation:** ship | hold | iterate

### Health checks
- SRM: …
- Coverage / exclusions: …

### Estimates
| Variant | N | Metric | Lift | 95% CI |

### Guardrails
…

### Caveats
…
```

## Rules

1. Never invent statistical significance; if numbers are missing, say what to compute.
2. Multiple metrics inflate false positives — say so when user looks at many.
3. Distinguish practical significance from statistical significance.
4. SRM failure means pause interpretation of outcomes.
5. Peeking early without sequential design → caveat strongly.
6. Correlation of segments is not automatic heterogeneity proof.

## Edge cases

- **Switchback / network effects:** note interference when users interact.
- **Low power:** recommend more runtime or larger effect — do not fake certainty.
- **Non-inferiority:** different decision frame than superiority tests.
