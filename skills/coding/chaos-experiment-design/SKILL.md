---
name: chaos-experiment-design
description: Plan chaos and resilience experiments safely with hypotheses, blast
  radius limits, and abort criteria. Use whenever the user asks for chaos engineering,
  fault injection, resilience experiments, or how to safely break things in staging
  or production. For facilitating a game day or on-call shadow, use
  game-day-facilitation.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Chaos Experiment Design

Chaos without a hypothesis is vandalism. Scope blast radius, define steady state,
abort criteria, and learnings — prefer staging before prod.

## Workflow

1. Hypothesis: if X fails, Y still holds (SLO/user journey).
2. Steady-state metrics and dashboards.
3. Fault: type, target, magnitude, duration.
4. Blast radius, blast radius controls, abort conditions.
5. Observability and comms (who knows, status page if needed).
6. Runbook for inject + stop; post-experiment notes.
7. Never surprise prod; approval for prod experiments.

## Output format

```markdown
## Experiment: <name>
**Hypothesis:** …
**Steady state:** …
**Method:** …
**Blast radius:** …
**Abort if:** …
**Schedule / env:** …
**Rollback:** …
**Learning questions:** …
```

## Rules

1. No unannounced production chaos.
2. One variable at a time when possible.
3. Customer-impacting faults need explicit approval language.
4. Capture learning even if the system “passed”.
5. Do not invent tool-specific syntax you are unsure of.

## Edge cases

- **Game days:** point at `game-day-facilitation` for roles and debrief;
  keep the fault hypothesis here.
- **Multi-region:** partial vs full region loss.
- **Data plane faults:** disk full, poison messages, clock skew.
