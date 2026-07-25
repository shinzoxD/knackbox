---
name: status-reports
description: Write clear project and program status reports for stakeholders.
  Use whenever the user asks for a weekly status, program update, executive
  status, RAG status, or progress report on a project or initiative.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Status Reports

Status is for decisions, not diaries. Lead with health, then deltas, then asks.

## Default format

```markdown
# Status: <project> — <date>
**Overall:** Green | Yellow | Red — one sentence why

## Highlights (since last update)
- …

## Progress vs plan
| Workstream | Status | Notes |

## Risks / blockers
| Risk | Impact | Mitigation | Owner |

## Asks / decisions needed
1. …

## Next period plan
- …

## Metrics (if any)
…
```

## Rules

1. Color must match the narrative; no Green with hidden P0.
2. Prefer outcomes over activity ("Shipped X" not "Worked on X").
3. Quantify when numbers exist; never invent KPIs.
4. Make asks explicit with owners and dates.
5. Keep exec versions ≤ 1 page; link details.
6. Separate customer-facing incidents (use incident-comms) from project status.

## Edge cases

- **Multi-team program:** roll-up with per-stream RAG.
- **No progress:** say so; replan rather than pad.
- **Confidential:** scrub names/data as required.
