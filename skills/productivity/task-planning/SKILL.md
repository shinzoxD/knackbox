---
name: task-planning
description: >-
  Convert ambiguous work into an executable plan with outcomes, dependencies,
  milestones, owners, and verification steps. Use whenever the user asks for a
  plan, roadmap, implementation sequence, checklist, breakdown of a large task,
  or help deciding what to do next, even if the request is only a rough goal.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Task Planning

Create a plan that can be executed and checked, not a restatement of the goal.
Scale the detail to the uncertainty, risk, and number of people involved.

## Workflow

1. Restate the desired outcome and completion evidence in one sentence.
2. List constraints, assumptions, and unknowns that can change the approach.
3. Break work into outcome-based milestones.
4. Identify dependencies, critical path, owners, and decision points.
5. Add verification and rollback to risky steps.
6. Order tasks so early work reduces the largest uncertainty.

## Output format

```markdown
## Outcome
<What will be true and how completion is verified>

## Assumptions
- ...

## Plan
| # | Task | Owner | Depends on | Done when |
|---:|---|---|---|---|

## Risks and decisions
| Risk or decision | Trigger/date | Response/owner |
|---|---|---|

## Immediate next action
<One concrete action that can start now>
```

## Rules

1. Every task starts with an action verb and has observable completion criteria.
2. Do not assign arbitrary dates without capacity, dependency, or deadline data.
   Use sequence and rough ranges instead.
3. Keep research and decision tasks separate from implementation tasks.
4. Name external dependencies and the owner responsible for resolving them.
5. Avoid microtasks that add tracking overhead without reducing risk.
6. Put validation in the plan, not in a generic final step.

## Planning depth

- **Personal task:** 3 to 7 ordered actions.
- **Small project:** milestones, dependencies, risks, and weekly checkpoints.
- **Cross-team initiative:** owners, decision log, interfaces, rollout, and
  operational readiness.

## Edge cases

- When the goal is underspecified, provide a short discovery phase with explicit
  questions and exit criteria.
- When a deadline is fixed, plan backward from the acceptance milestone and
  surface scope trade-offs.
- When execution has already started, preserve completed work and replan only the
  remaining critical path.
