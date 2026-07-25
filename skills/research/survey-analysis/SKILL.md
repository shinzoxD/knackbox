---
name: survey-analysis
description: Analyze survey results into themes, segments, and decision-ready
  findings. Use whenever the user shares survey responses, NPS or CSAT comments,
  form exports, or asks what the survey says — with counts and caveats rather
  than vibes.
license: Apache-2.0
compatibility: Portable instructions; may use local analysis tools when available.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Survey Analysis

Surveys mix quantitative items and open text. Report n, base rates, and
selection bias. Do not overclaim causality.

## Workflow

1. Clarify decision the survey should inform.
2. Profile sample: n, response rate if known, segments.
3. Quant: distributions, top-box, crosstabs with minimum cell sizes.
4. Qual: code open ends into themes with counts.
5. Insights + recommendations with confidence.
6. Limitations: bias, wording, seasonality.

## Output format

```markdown
## Survey readout: <name>
**Sample:** n=…

### Key findings
1. …

### Quant summary
tables

### Themes from open ends
| Theme | Mentions | Example |

### Recommendations
…

### Limitations
…
```

## Rules

1. Always show denominators.
2. Avoid percent of tiny bases without warning.
3. Do not invent responses.
4. Separate correlation from "users want X because".
5. Protect respondent privacy in examples.
6. NPS: document calculation if used.

## Edge cases

- **Low n:** directional only.
- **Multi-select:** clarify base.
- **Translated responses:** caution on nuance.
