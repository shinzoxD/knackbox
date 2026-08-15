---
name: product-requirements
description: Write decision-ready product requirements (PRDs) with problem,
  users, success metrics, non-goals, and scoped requirements. Use whenever
  the user asks for a PRD, product spec, requirements doc, feature brief,
  or to turn a vague idea into shippable product requirements.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Product Requirements

A PRD is a decision document, not a novel. It should let engineering,
design, and GTM argue about the *same* problem and say no to the rest.

For RFC-level technical design, use `rfc-design-docs`. For a go/no-go
memo, use `decision-memos`. For launch copy, use
`product-announcements`.

## Workflow

1. **Problem:** who hurts, how often, what they do today, why now.
2. **Users:** primary / secondary / anti-persona. One job-to-be-done.
3. **Outcomes:** 1–3 measurable success metrics with baseline and
   target. Kill vanity counts.
4. **Non-goals:** what this version will *not* do. Be specific.
5. **Requirements:** user-visible behavior, numbered, testable.
   Separate must / should / later.
6. **UX sketch in words:** happy path, empty, error, permission
   denied, admin.
7. **Constraints:** platforms, compliance, perf, offline, flags.
8. **Risks & open questions:** owners, due dates, what is assumed.
9. **Launch slice:** who gets it first, how we know it worked, rollback.

## Output format

```markdown
# PRD: <feature>

**Status:** draft | review | approved
**Owner:** …
**Problem:** one paragraph

## Users
## Success metrics
## Non-goals
## Requirements
### Must
1. …
### Should
### Later
## UX / flows
## Analytics
## Risks & open questions
## Launch & rollback
```

## Rules

1. Every must-requirement is testable without the author's taste.
2. Do not hide scope in adjectives ("robust", "delightful", "smart").
3. If the problem is unproven, say so and propose the cheapest test
   (`customer-discovery`) instead of a 12-page spec.
4. Metrics need numerator, denominator, and window — or they are
   slogans. Use `metrics-definitions` when the KPI itself is fuzzy.
5. Requirements describe *user-visible* behavior. Implementation
   belongs in an RFC unless it is a hard constraint.
6. Capture disagreements as open questions with owners, not as
   mushy compromise wording.
7. Keep it short. If it needs a table of contents, you mixed in a
   design doc.

## Edge cases

- **Only a slogan:** write a one-page problem/metrics/non-goals and
  stop; do not invent a full backlog.
- **Platform rewrite:** force a user outcome ("time-to-X") or refuse
  to spec a rewrite as a feature.
- **Legal / privacy:** flag as open questions; do not author policy.
- **Already-built feature:** write the spec from current behavior
  first ("as-is") then the delta.
---
