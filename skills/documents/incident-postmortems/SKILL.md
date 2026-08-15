---
name: incident-postmortems
description: Write blameless incident postmortems with timeline, impact, root
  cause, and action items. Use whenever the user asks for a postmortem, RCA,
  incident write-up, outage report, or lessons learned after a production
  failure — even from rough Slack notes or pager logs. For a live
  outage still in progress, use incident-command.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Incident Postmortems

A postmortem exists to prevent recurrence, not to assign blame. Facts first,
system causes second, durable actions third.

## Workflow

1. Collect: detection time, impact window, customer effect, severity, systems
   involved, what fixed it.
2. Build a **timeline** in order with timestamps and sources (monitor, human).
3. Separate **what happened** from **why it was possible** (root/contributing
   causes). Prefer multiple contributing factors over a single villain.
4. List **action items** with owners and due dates; tag prevent / detect / mitigate.
5. Record open questions honestly.

## Output format

```markdown
# Postmortem: <short title>
**Date of incident:** …
**Authors:** …
**Status:** draft | final
**Severity:** …

## Summary
3–5 sentences a non-responder can understand.

## Impact
- Customers/users affected: …
- Duration: detect → mitigate → full resolve
- SLOs / revenue / trust notes (only if known)

## Timeline (UTC unless stated)
| Time | Event |
|---|---|

## Root cause
Primary technical cause in plain language.

## Contributing factors
- …

## What went well
- …

## What went poorly
- …

## Action items
- [ ] <action> — Owner: … — Due: … — Type: prevent|detect|mitigate

## Lessons learned
- …

## Open questions
- …
```

## Rules

1. Blameless language: systems, incentives, missing guardrails — not "Alice
   forgot". Individuals appear only as roles on the timeline when needed.
2. Never invent times, magnitudes, or causes. Mark gaps as unknown.
3. Action items must be specific and verifiable ("add alert on error rate >2%
   for 5m"), not "be more careful".
4. Distinguish proximate trigger (deploy) from deeper cause (no canary).
5. Keep customer-facing impact factual; no spin.
6. If severity is unclear, propose one and ask for confirmation.

## Edge cases

- **Partial notes only:** produce a draft with **Open questions** dominating;
  do not fill a fake timeline.
- **Security incident:** minimize exploit detail in widely shared docs; note
  that a restricted appendix may be required.
- **Near miss:** still useful — focus on detection gaps and latent risk.
- **Recurring issue:** link prior postmortems and check whether past actions
  were incomplete.
