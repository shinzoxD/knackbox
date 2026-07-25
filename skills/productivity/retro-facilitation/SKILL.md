---
name: retro-facilitation
description: Run and write software retros with useful insights and
  follow-through. Use whenever the user asks for a retrospective, sprint retro
  agenda, what went well / what to improve, retro notes, or how to facilitate
  a team retro.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Retro Facilitation

Retros create change, not venting transcripts. Psychological safety first,
few actions with owners second.

## Facilitation flow (live)

1. **Set the frame** (2 min): blameless, timebox, goal = 1–3 improvements.
2. **Collect data** (5–10 min): silent writing then share (Start/Stop/Continue
   or Went well / Needs work / Puzzles).
3. **Cluster & vote** (5 min): group themes; dot-vote top issues.
4. **Generate insights** (10 min): ask "why" 1–2 times; avoid personal blame.
5. **Decide actions** (5–10 min): specific, owned, due; fewer is better.
6. **Close** (2 min): appreciate, confirm owners, park backlog ideas.

## Output formats

### Agenda (before the meeting)

```markdown
# Retro agenda — <team> — <date>
**Timebox:** 45–60 min
**Prompt:** Start / Stop / Continue
**Materials:** board link, last retro actions
1. Check-in + prime directive
2. Review last actions
3. Gather …
4. Vote …
5. Discuss top 2
6. Actions + owners
```

### Notes (after)

```markdown
# Retro notes — <date>
## Went well
- …

## Needs improvement
- …

## Actions
- [ ] … — Owner: … — Due: …

## Parking lot
- …
```

## Rules

1. Actions must be testable ("add flaky-test quarantine doc") not vibes
   ("communicate better").
2. Re-open last retro's actions first; unfinished items get honest status.
3. Facilitator protects airtime; no single monologue dominates.
4. Separate people problems (1:1 later) from system problems (retro).
5. Cap new actions at three for a typical sprint retro.
6. Do not invent team sentiment; if only sparse notes exist, mark gaps.

## Edge cases

- **Remote/async retro:** longer silent gather window; use threaded votes;
  still produce the same notes format.
- **Incident-heavy sprint:** allow a short timeline share, then move to
  systems; link postmortem rather than redoing it.
- **Toxic blame risk:** restate prime directive; convert accusations into
  process questions.
- **User only wants a board template:** deliver columns + example sticky
  prompts without a fake discussion.
