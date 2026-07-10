---
name: decision-memos
description: >-
  Write concise decision memos that compare options, expose trade-offs, and make
  a clear evidence-based recommendation. Use whenever the user must choose
  between tools, vendors, architectures, priorities, or policies, asks for pros
  and cons, or needs a decision recorded for stakeholders.
---

# Decision Memos

Help a named decision-maker choose and preserve the reasoning for later review.
The memo should make disagreement productive by exposing criteria and uncertainty.

## Workflow

1. State the decision, owner, deadline, and consequence of delay.
2. Define must-have constraints and weighted decision criteria.
3. Present only viable options, including the status quo when relevant.
4. Compare each option against the same evidence and criteria.
5. Recommend one option and state the strongest argument against it.
6. Define implementation, review date, and reversal triggers.

## Output format

```markdown
# Decision: <question>

**Owner:** ...
**Decision by:** ...
**Recommendation:** ...

## Context
Facts, constraints, and why the decision is needed now.

## Criteria
| Criterion | Weight | Measurement |
|---|---:|---|

## Options
| Option | Benefits | Costs and risks | Evidence |
|---|---|---|---|

## Recommendation
Why it wins, key assumptions, and strongest counterargument.

## Implementation and review
First steps, owner, review date, and reversal triggers.
```

## Rules

1. Separate facts, forecasts, preferences, and assumptions.
2. Do not create numerical scores unless weights and evidence justify them.
3. Compare options on the same time horizon and total-cost boundary.
4. Name uncertainty instead of hiding it behind confident language.
5. Do not pad the option list with choices that violate hard constraints.
6. Record dissent or unresolved objections when they affect execution.

## Edge cases

- For a reversible decision, keep the memo short and favor a time-boxed trial.
- For an irreversible or high-cost decision, require stronger evidence,
  pre-mortem risks, and explicit approval.
- If evidence is insufficient, recommend the smallest experiment that resolves
  the highest-value uncertainty.
