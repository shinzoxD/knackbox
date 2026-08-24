---
name: game-day-facilitation
description: Facilitate a game day or on-call shadow with objectives, injects,
  abort criteria, observer roles, and a blameless debrief. Use whenever the
  user mentions game day, gameday, on-call shadowing, incident drill
  facilitation, tabletop exercise, or "run a game day" — even if they also
  mention chaos, failover, paging, or incident response. Do not use for a
  live SEV or a chaos-experiment hypothesis.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Game Day Facilitation

A game day is a scheduled drill of people and process. Produce a
facilitation pack: objectives, roles, inject script, abort criteria,
observer sheet, and debrief. Fault hypotheses belong to
`chaos-experiment-design`. A live SEV belongs to `incident-command`.

## Workflow

1. **Objective.** One learning goal (runbook, paging, failover comms,
   shadow independence). "Break prod and see" is not an objective.
2. **Scope and env.** Staging, or an announced approved prod window.
   Named blast radius. Named **abort** conditions before any inject.
3. **Roles.** Facilitator, inject operator, primary, shadow, observers,
   scribe. Dual-hat on a small team is fine; say who wears which hats.
4. **Inject script.** Timed cards. Each inject has stop/rollback. No
   surprise extras mid-drill.
5. **Safety brief.** Blameless. How to abort. Who may abort. Freeze if
   a real incident starts.
6. **Run.** Facilitator owns the clock. Observers stay quiet on the
   bridge unless safety is at risk.
7. **Debrief same day.** Facts, process and runbook gaps, 1–3 owned
   actions. No blame.

## Roles

- **Facilitator** — clock, inject cadence, abort, psychological safety.
- **Inject operator** — executes the scripted fault; never freelances.
- **Primary** — treats it as real; owns mitigate decisions.
- **Shadow** — does the work or narrates; primary can take over.
- **Observers** — watch comms, decisions, runbook use; no coaching
  unless the facilitator asks.
- **Scribe** — UTC timeline of detections, decisions, injects, aborts.

## Output format

```markdown
# Game day: <name>
**When / env:** …
**Objective (one line):** …
**In scope / out of scope:** …
**Abort if:** …
**Who may abort:** …

## Roles
| Role | Name | Notes |

## Inject script
| T+ | Inject | Expected | Rollback | Owner |

## Observer prompts
- Comms: …
- Decisions: …
- Runbook: …
- Shadow: …

## Safety brief (read aloud)
- This is a drill. Blameless. Freeze on real SEV → `incident-command`.
- Never surprise prod. Abort is success, not failure.

## Debrief
**What we saw:** …
**Runbook / paging gaps:** …
**Actions (max 3):**
- [ ] … — Owner: … — Due: …
```

## Rules

1. Never surprise production. Refuse unannounced prod injects; offer a
   scheduled drill or a tabletop instead.
2. Abort criteria are mandatory and specific (error budget, customer
   impact, real pager, facilitator call). Abort ends the drill cleanly.
3. Psychological safety: no gotchas, no public scoring of people, no
   blame in notes or debrief.
4. One inject variable at a time unless the script already says otherwise.
5. Do not invent SLO numbers, customer counts, or tool syntax.
6. Fault hypothesis / blast radius → `chaos-experiment-design`. Keep
   this skill on roles, injects, observers, and debrief.
7. Live SEV → stop the drill and hand to `incident-command`.

## Edge cases

- **Tabletop only:** same pack; injects are narrative cards, not live
  faults. Still abort, observers, debrief.
- **On-call shadow, no inject:** objective is the pager path and
  handoff; observer watches; still debrief.
- **Real incident during the drill:** abort immediately; announce
  freeze; remaining work is `incident-command`.
- **"Kill pods in prod for fun":** refuse. Staging or a scheduled,
  approved window with abort criteria only.
- **User wants only the chaos hypothesis:** point at
  `chaos-experiment-design`; do not turn this into experiment design.
