---
name: okr-drafting
description: Draft OKRs and goal cascades that are measurable and non-vanity.
  Use whenever the user asks for OKRs, quarterly objectives, key results, goal
  setting, or how to turn a strategy into measurable objectives and key results.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# OKR Drafting

Objectives are qualitative and motivating. Key results are measurable outcomes,
not a task list. Fewer OKRs beat a wall of metrics.

## Patterns

**Objective:** memorable outcome direction (not "be world class").
**Key results:** 2–4 metrics or binary milestones with starting point → target.

Bad KR: "Launch dashboard" (task).
Better KR: "Raise weekly active teams using dashboard from 12% to 30%".

## Output format

```markdown
## OKRs — <team> — <quarter>

### O1: …
- KR1: from X to Y by date (source of metric)
- KR2: …
- KR3: …

### Notes
- scoring: …
- dependencies: …
- non-goals: …
```

## Rules

1. KRs need baseline and target when numbers exist; else mark metric TBD.
2. Avoid vanity metrics disconnected from user/business value.
3. Cascade: company → team without cloning identical KRs everywhere.
4. Commit vs stretch: label if useful.
5. Do not invent company strategy; use provided context.
6. Cap at ~3 objectives per team per cycle unless asked otherwise.

## Edge cases

- **Platform teams:** KRs via customer team outcomes + reliability SLOs.
- **Early startup:** shorter cycle; learning KRs ok if measurable.
- **Individual OKRs:** align to team; avoid HR-only busywork.
