---
name: experiment-design
description: >-
  Design A/B and switchback experiments before launch: hypothesis, randomization
  unit, primary metric, guardrails, sample size / MDE, duration, and SRM plan.
  Use whenever the user says design this A/B test, experiment design, power
  analysis, MDE, randomization unit, pre-register metrics, or "are we ready to
  launch this experiment" — not when they paste results and ask if a variant
  won, only want a North Star KPI defined, or need a standup.
license: Apache-2.0
compatibility: Portable instructions.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Experiment Design

Write the pre-launch brief so a later reader can ship, hold, or iterate without
rewriting the hypothesis. After results exist, use `ab-test-analysis`. To define
a KPI formula in isolation, use `metrics-definitions`.

## Workflow

1. Hypothesis: treatment, population, one primary metric, direction, mechanism.
2. Unit of randomization (user, account, session, cluster, switchback bucket)
   must match interference. Marketplace, social, and shared-inventory effects
   usually need cluster or switchback — not independent users.
3. Pre-register one primary decision metric. Secondaries are diagnostic.
   Guardrails can veto a win (latency, refunds, support, revenue).
4. Exposure: eligibility, entry event, sticky assignment, exclusions (bots,
   employees, already converted).
5. Power / MDE: state baseline, variance or Bernoulli `p(1-p)`, α, power,
   sidedness, and variant count *before* any n or calendar runtime. Convert n
   from eligible traffic and at least one weekly cycle.
6. SRM plan: intended split, check method, cadence, and stop-the-read if
   assignment is broken. Log assignment and exposure keys.
7. Peek / stop: fixed horizon, or a named sequential design. Informal daily
   p-value peeking is a finding.
8. Launch gate: hypothesis, unit, exposure, metrics, power, duration, SRM,
   stop rule. Missing any is not launch-ready.

## Output format

```markdown
## Experiment design: <name>

**Hypothesis:** if we <treatment> for <population>, <primary> moves <direction>
because <mechanism>
**Decision:** ship if primary wins and no guardrail fails
**Unit of randomization:** … **Why:** interference / SUTVA
**Exposure:** eligibility, entry event, stickiness, exclusions

### Pre-registered metrics
| Role | Metric | Grain | Window | Notes |
|---|---|---|---|---|
| primary | … | … | … | one only |
| guardrail | … | … | … | veto threshold |
| secondary | … | … | … | exploratory |

### Power / MDE
**Assumptions:** baseline, variance or p(1-p), α, power, sidedness, variants
**MDE:** … on the primary (absolute and relative)
**n per arm:** … (formula or named calculator; no invented n)
**Duration:** … full weekly cycles from eligible traffic

### Assignment and SRM
**Split:** … **SRM check:** method, cadence, action if mismatch
**Logs:** assignment + exposure keys

### Peek / stop
fixed horizon | sequential design <name>
**Do not:** stop at first p<0.05 without a sequential plan

### Launch gate
ready | not ready — missing …
```

## Rules

1. Never invent a sample size or runtime without stating assumptions
   (baseline, variance or metric type, α, power, sidedness, variants).
2. One primary metric. Extra "primaries" is multiplicity, not rigor.
3. Randomization unit follows interference, not engineering convenience.
4. Peeking without a sequential design is a finding — call it; do not bless it.
5. Do not interpret post-hoc lifts here (`ab-test-analysis`).
6. Do not write a standalone metric taxonomy here (`metrics-definitions`).
7. SRM is a launch and health gate, not an optional appendix.
8. If traffic cannot hit a decision-relevant MDE in a sane window, say so
   and propose a larger effect, longer run, pre-treatment CUPED, or no test.

**Good:** n ≈ 16σ²/δ² per arm for two-sided 80%/5%, two variants, baseline
stated, δ = smallest change that would change the ship decision.
**Bad:** "run two weeks with 10k users" with no baseline, α, or MDE.

## Edge cases

- **Switchback / network:** time or cluster buckets; burn-in; carryover.
- **Multiple variants:** split α or hierarchical testing; more n.
- **Non-inferiority:** different H0; MDE is a margin, not a lift target.
- **Ramp vs test:** a percentage flag is not a powered experiment until
  assignment and sample size are designed.
- **Novelty / weekday:** duration ≥ one weekly cycle; name novelty risk.
