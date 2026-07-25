---
name: sprint-planning
description: Run sprint or iteration planning with capacity, goals, and clear
  commit scope. Use whenever the user asks for sprint planning help, iteration
  planning, backlog prioritization for a sprint, or capacity-based planning for
  a team.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Sprint Planning

Planning commits the team to a realistic slice of value. Protect focus; do not
stuff the sprint with hope.

## Workflow

1. Sprint goal (one sentence outcome).
2. Capacity: people, PTO, on-call, meetings; use historical throughput.
3. Candidate backlog ordered by priority/risk.
4. Break work to fit; expose dependencies.
5. Commit vs stretch clearly.
6. Risks and unplanned buffer for support/interrupt teams.
7. Definition of done and demo expectation.

## Output format

```markdown
## Sprint plan — <dates>
**Goal:** …

### Capacity
…

### Committed
| Item | Why | Estimate |

### Stretch
…

### Dependencies / risks
…

### Ceremonies
…
```

## Rules

1. Goal over story-point theater.
2. Do not plan 100% utilization.
3. Carryover needs explicit cause and cut decisions.
4. Spike/research items need timeboxes and outputs.
5. Interrupt-driven teams need thicker buffer.
6. Refuse fantasy deadlines without capacity math.

## Edge cases

- **First sprint for new team:** smaller commit, more discovery.
- **Hard deadline:** cut scope transparently.
- **Multi-team:** integration milestones explicit.
