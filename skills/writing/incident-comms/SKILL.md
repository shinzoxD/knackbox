---
name: incident-comms
description: Write customer and stakeholder communications during incidents.
  Use whenever the user needs a status page update, outage notice, customer
  incident email, or internal incident broadcast — separate from the engineering
  postmortem write-up.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Incident Communications

During an incident, communications reduce uncertainty. Be honest, frequent
enough, and free of blame and speculation presented as fact.

## Channels

| Channel | Traits |
|---|---|
| Status page | short, timestamped, impact + next update time |
| Customer email | clearer narrative, who is affected, what to do |
| Internal | more detail, war-room links, roles |

## Workflow

1. Confirmed facts only: impact, start time, scope, workaround.
2. Separate known vs investigating.
3. Next update time commitment.
4. Customer actions (if any).
5. Resolve message when mitigated; promise post-incident follow-up without fake RCAs.

## Output format

```markdown
## Status update — <timestamp UTC>
**Impact:** …
**Current status:** investigating | identified | monitoring | resolved
**What we know:** …
**What we are doing:** …
**Workaround:** …
**Next update by:** …
```

## Rules

1. Never invent root cause; "under investigation" is valid.
2. No humor that minimizes customer pain.
3. Security incidents: minimize exploit detail in public channels.
4. Match severity cadence (more frequent when impact is high).
5. Align public wording with legal/support guidance when provided.
6. Engineering postmortems are a different skill (`incident-postmortems`).

## Edge cases

- **Partial degradation:** be specific about who is affected.
- **False alarm:** brief resolve with apology for noise if customers saw it.
- **Prolonged incident:** rolling updates without repeating empty filler.
