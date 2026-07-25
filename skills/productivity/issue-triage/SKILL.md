---
name: issue-triage
description: Triage bugs and tickets with severity, repro steps, and next
  actions. Use whenever the user asks to triage issues, prioritize a backlog of
  bugs, rewrite a bug report, classify severity, or clean up noisy tickets —
  even from messy Slack reports.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Issue Triage

Triage creates shared clarity: what is broken, how bad, who owns next, and
whether it is even a bug.

## Severity heuristic

| Severity | Meaning |
|---|---|
| S0/P0 | Total outage or active data loss/security incident |
| S1/P1 | Major feature broken for many; no practical workaround |
| S2/P2 | Important issue with workaround or limited scope |
| S3/P3 | Minor/cosmetic/polish |

Adjust to the team's labels if provided.

## Workflow

1. Restate the report in one sentence.
2. Classify: bug, tech debt, question, feature, duplicate, invalid.
3. Severity + impact (users, revenue, trust).
4. Repro steps and expected vs actual.
5. Missing info checklist.
6. Next action + owner role (not necessarily a named person if unknown).

## Output format

```markdown
## Triage: <short title>
**Type:** bug | …
**Severity:** …
**Impact:** …
**Repro:** …
**Expected / actual:** …
**Workaround:** …
**Missing info:** …
**Next:** …
**Duplicate of:** …
```

## Rules

1. Do not inflate severity for squeaky wheels without impact evidence.
2. Prefer actionable titles ("Checkout 500 on empty cart") over "broken".
3. Separate user error / docs gaps from product defects when clear.
4. Batch triage tables when many tickets are provided.
5. Never invent repro results; mark needs-verification.
6. Security reports: minimize public exploit detail; flag private handling.

## Edge cases

- **No repro:** still triage impact; request artifacts (logs, HAR, versions).
- **Flaky CI:** type as reliability/tech debt with frequency notes.
- **Feature disguised as bug:** reclassify politely with acceptance criteria ask.
