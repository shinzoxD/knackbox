---
name: meeting-agendas
description: Build focused meeting agendas with outcomes, timeboxes, and prep.
  Use whenever the user asks for a meeting agenda, sync agenda, design review
  agenda, kickoff agenda, or how to structure a meeting that needs a decision.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Meeting Agendas

If there is no desired outcome, it should be an email. Agendas force purpose,
prep, and timeboxes.

## Workflow

1. Outcome: decide / inform / explore / workshop.
2. Attendees: who must be present vs optional; decline advice if wrong forum.
3. Prep materials and owners due before the meeting.
4. Timeboxed topics; hardest decision early when energy is high.
5. Explicit decision capture and owners for follow-ups.
6. End with parking lot policy.

## Output format

```markdown
# Agenda: <title>
**When / length:** …
**Outcome:** …
**Attendees:** required / optional
**Prep (before meeting):** …

| Time | Topic | Goal | Owner |
|---|---|---|---|

## Decision questions
1. …

## Notes template
- Decisions:
- Actions:
```

## Rules

1. Every topic has a goal (decide/input/FYI).
2. FYI-only content → pre-read, not meeting centerpiece.
3. Default 25/50 minute lengths when flexible.
4. Do not overload; cut topics rather than shrink to useless slots.
5. Name the decision maker for decision meetings.
6. Offer async alternative when a meeting is unnecessary.

## Edge cases

- **Customer calls:** agenda still useful; share appropriately.
- **Recurring syncs:** standing sections + variable deep dive.
- **Large workshops:** facilitation notes and breakouts.
