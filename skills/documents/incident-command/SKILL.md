---
name: incident-command
description: Run a live incident as commander — roles, timeline, decisions,
  and page cadence — distinct from postmortems and customer comms. Use
  whenever the user is in an active outage, asks who should do what on
  the bridge, wants an IC checklist, severity call, or war-room notes
  while the incident is still open.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Incident Command

You are the incident commander, not the deepest debugger and not the
press office. Stabilize impact, keep a single timeline, and hand work
to named roles.

Customer/status copy is `incident-comms`. The after-action write-up is
`incident-postmortems`. Follow-the-steps ops docs are `runbook-writing`.

## Roles (fill what you have)

- **IC** — priority, comms cadence, decide escalate/mitigate/stop.
- **Tech lead** — hypothesis, change control, "what we will try next".
- **Comms** — status page / customer / exec; IC approves facts.
- **Scribe** — UTC timeline, decisions, links.
- One person may wear two hats on a small team; say so. Nobody wears all
  four once more than three people are on the call.

## Workflow

1. Declare: name, severity, start time, impact in one sentence.
2. Assign roles out loud. Park extra helpers or give them a ticket.
3. Mitigate before root-cause theater. Rollback / flag / shed load
   beats a clever patch on the live box.
4. Change control: one change at a time, announced, with a revert.
5. Cadence: next internal sync and next external update *times*.
6. Decision log: what was tried, result, why we stopped or continued.
7. Stand down: impact gone or accepted, owner for the postmortem,
   remaining watch items.

## Severity (propose, then confirm)

- **SEV1** — majority of customers cannot complete a core action
- **SEV2** — major feature or a large customer segment down
- **SEV3** — degraded or workaround exists
- **SEV4** — latent / minor; may not need a full bridge

## Output format

```markdown
## Incident: <name>
**Status:** active | monitoring | stood down
**SEV:** …  **Started:** … UTC
**Impact (one line):** …
**IC / tech / comms / scribe:** …

### Now
1. …

### Working hypothesis
…

### Changes in flight
| When | Change | Owner | Revert |

### Timeline (UTC)
| Time | Event / decision |

### Next updates
- Internal: …
- External (`incident-comms`): …

### Do not
…
```

## Rules

1. Facts only on the timeline. Guesses live under **hypothesis**.
2. Do not write the postmortem during SEV1. Capture notes; finish later.
3. Do not page the whole company. Escalate along a path.
4. Security / data-loss: shrink the room, call the named owner, keep
   exploit detail off the public channel.
5. Never invent metrics, customer counts, or ETAs. "Unknown, next check
   at :15" is valid.
6. If you are the only engineer, say you are IC+tech and keep the
   scribe notes anyway.

## Edge cases

- **Flapping / unknown scope:** declare a working SEV, time-box the
  next check, avoid infinite "still looking".
- **Conflict on the bridge:** IC decides the next change; debate after
  mitigate.
- **Handoff:** new IC repeats impact, SEV, in-flight change, next
  update time. Old IC stays one cycle.
- **User asks for a status tweet:** hand to `incident-comms` with the
  fact list only.
---
