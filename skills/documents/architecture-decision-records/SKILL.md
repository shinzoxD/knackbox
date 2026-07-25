---
name: architecture-decision-records
description: Write concise Architecture Decision Records that capture context,
  decision, and consequences. Use whenever the user asks for an ADR, architecture
  decision log entry, decision record, or why we chose technology X over Y in a
  durable doc — even for small stack choices.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Architecture Decision Records

ADRs are short, immutable-enough records of decisions. Prefer clarity over
essay length. Link out to full RFCs when needed.

## When to use ADR vs RFC

- **ADR:** single decision, few pages, durable log entry.
- **RFC:** broader design with multiple open questions and detailed design.

## Format (default)

```markdown
# ADR-<NNNN>: <Title>
Date: YYYY-MM-DD
Status: proposed | accepted | deprecated | superseded by ADR-XXXX

## Context
Forces, constraints, requirements.

## Decision
What we will do, in plain language.

## Alternatives considered
- Option A — why not
- Option B — why not

## Consequences
Positive, negative, and follow-up work.

## Notes
Links, owners, review date.
```

## Rules

1. One decision per ADR.
2. Status must be explicit; superseding must reference the new ADR id.
3. Alternatives must be real, not strawmen.
4. Consequences include ops, cost, security, and team skills — not only happy path.
5. Keep under ~2 pages unless the user asks for more.
6. Do not rewrite history; supersede instead of silently editing accepted ADRs.

## Edge cases

- **Revisiting an old ADR:** add a new ADR that supersedes; summarize delta.
- **Reversible trial:** status can be accepted with a review date.
- **User wants template only:** provide empty format with guidance comments.
