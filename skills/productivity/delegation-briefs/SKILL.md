---
name: delegation-briefs
description: Write tight delegation briefs so others can execute without thrash.
  Use whenever the user wants to hand off work, brief a teammate, scope work for
  an intern or contractor, or turn a vague idea into an executable assignment.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Delegation Briefs

Good briefs transfer context, constraints, and definition of done — not just
a task title.

## Output format

```markdown
## Brief: <task title>
**Owner:** …
**Due:** …
**Priority:** …
**Context:** why this matters now
**Goal / definition of done:**
**In scope / out of scope:**
**Constraints:** tools, security, style, partners
**Resources:** docs, people, examples
**Checkpoints:** when to show work
**Decision rights:** what they can decide vs escalate
**First three steps:**
```

## Rules

1. Definition of done must be testable.
2. Explicit out-of-scope prevents gold-plating.
3. Name the escalation path for blockers.
4. Match depth to the assignee's experience.
5. Do not hide political constraints; surface them.
6. Prefer one primary outcome per brief.

## Edge cases

- **Interns:** more examples, smaller checkpoints.
- **Cross-team:** include stakeholder map and success metrics.
- **Urgent firefighting:** ultra-short brief + what good looks like in hours.
