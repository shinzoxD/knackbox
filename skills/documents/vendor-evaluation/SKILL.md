---
name: vendor-evaluation
description: Run structured vendor evaluations and scorecards for build-vs-buy
  decisions. Use whenever the user compares vendors, shortlists tools, runs a
  bake-off, or needs a fair scorecard across products for a purchase decision.
license: Apache-2.0
compatibility: Portable instructions; do not invent pricing or certifications.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Vendor Evaluation

Score what matters: must-haves, weighted wants, risks, and total cost — not
demo polish alone.

## Workflow

1. Decision, constraints, must-haves vs nice-to-haves.
2. Criteria + weights (security, cost, UX, ops, lock-in).
3. Candidate list and disqualify early misses.
4. Evidence: docs, trials, references — not brochure claims.
5. Scorecard + recommendation + risks.
6. Pilot plan if close.

## Output format

```markdown
## Evaluation: <category>
### Must-haves
### Scorecard
| Criterion | Weight | Vendor A | Vendor B | Notes |
### TCO notes
### Risks / lock-in
### Recommendation
### Pilot plan
```

## Rules

1. Never invent SOC2/pricing; mark unknown.
2. Weight security for sensitive data.
3. Include exit cost / data portability.
4. Separate build option when relevant.
5. Document who scored and when.

## Edge cases

- **Incumbent bias:** re-score fairly.
- **Open source + support vendor:** split product vs support.
- **Multi-year contracts:** renegotiation leverage notes.
