---
name: rfc-design-docs
description: Write RFCs and technical design docs that force clear decisions.
  Use whenever the user asks for an RFC, design doc, architecture proposal,
  tech design, or "how should we build X" write-up for a feature or system
  change — even from a rough bullet list.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# RFC / Design Docs

A good design doc makes the decision easy to challenge: context, options,
trade-offs, and a clear recommendation. Length is not rigor.

## Workflow

1. Problem and non-goals first — what success looks like and what you refuse
   to solve now.
2. Constraints: scale, latency, compliance, team skills, deadlines, existing
   systems.
3. Options (at least two real ones, plus "do nothing" when relevant).
4. Recommendation with the decisive trade-offs.
5. Detailed design only for the chosen path: data model, APIs, failure modes,
   rollout, observability.
6. Open questions and decision log.

## Output format

```markdown
# RFC: <title>
**Status:** draft | review | accepted | superseded
**Authors:** …
**Last updated:** …

## Summary
One short paragraph: what we propose and why.

## Motivation
Problem, evidence, urgency.

## Goals
- …

## Non-goals
- …

## Constraints
- …

## Options considered
### Option A — …
Pros / cons / cost

### Option B — …
Pros / cons / cost

## Recommendation
Which option and the decisive reasons.

## Detailed design
### Overview
### APIs / interfaces
### Data model
### Failure modes and consistency
### Security and privacy
### Rollout and migration
### Observability
### Testing strategy

## Alternatives rejected (brief)
…

## Open questions
- …

## Success metrics
How we know this worked 2–6 weeks after ship.
```

## Rules

1. Every option must be viable enough to be chosen; strawmen waste readers.
2. Label assumptions. Do not invent traffic numbers; use ranges or TODOs.
3. Prefer diagrams described in text or mermaid only when they clarify.
4. Security, multi-tenant isolation, and data retention get explicit sections
   when user data or auth is involved.
5. Rollout must cover dual-write/dual-read, flags, and rollback when state
   changes.
6. Keep the first half readable by an eng manager; deep detail can follow.

## Edge cases

- **Early brainstorm:** produce a short RFC-lite (Summary, Options,
  Recommendation, Open questions) and say what research is needed.
- **Revising an existing RFC:** keep a Decision log of what changed and why.
- **Cross-team political choice:** make trade-offs explicit and fair; avoid
  burying the cost on the other team without stating it.
- **User wants only the API section:** still restate goals/non-goals in brief
  so the API is grounded.
