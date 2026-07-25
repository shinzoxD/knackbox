---
name: standup-updates
description: Turn raw work notes into crisp standup or status updates. Use
  whenever the user asks for a standup, daily status, scrum update, Slack
  check-in, or "what I did yesterday / doing today / blockers" — even from
  messy bullets or a git log.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Standup Updates

Standups are for coordination, not diaries. Maximize signal per line:
outcomes, next steps, blockers that need others.

## Default format

```markdown
**Yesterday**
- …

**Today**
- …

**Blockers**
- … (or "None")
```

Async Slack variant (same content, tighter):

```markdown
Y: …
T: …
B: None
```

## Workflow

1. Extract finished outcomes (merged, shipped, decided) vs activity ("worked on").
2. Pick at most 3 bullets per section unless the user wants full dump.
3. Phrase as results: "Shipped X" / "Unblocked Y" not "Continued looking at".
4. Blockers name the dependency and the ask ("Need design OK from Sam on RFC").
5. Match the team's length norm if samples are provided.

## Rules

1. Do not invent completed work. If the source is only a plan, put it under Today.
2. Prefer user/team-visible outcomes over internal thrash.
3. One line per item; link tickets when IDs are given.
4. No status theater ("synergized", "aligned stakeholders") without a concrete
   artifact.
5. If everything is blocked, say so clearly and list asks.
6. For managers/exec status, add a one-line risk or confidence when useful.

## Edge cases

- **Only git log provided:** translate commits into outcomes; skip noise
  merges and WIP fixups.
- **Sick / PTO day:** one honest line; do not pad.
- **Multiple projects:** group with bold project labels.
- **Weekly status instead of daily:** Yesterday→Last period, Today→This period;
  keep the same discipline.
