#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def w(rel, md, trig, no, tasks):
    p = ROOT / rel
    (p / "SKILL.md").write_text(md.strip() + "\n", encoding="utf-8", newline="\n")
    suite = {
        "should_trigger": trig,
        "should_not_trigger": no,
        "tasks": [{"prompt": a, "criteria": b} for a, b in tasks],
    }
    (p / "benchmarks" / "prompts.json").write_text(json.dumps(suite, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(rel)

w("skills/coding/chaos-experiment-design", """---
name: chaos-experiment-design
description: Plan chaos and resilience experiments safely with hypotheses, blast
  radius limits, and abort criteria. Use whenever the user asks for chaos engineering,
  game days, fault injection, resilience experiments, or how to safely break things
  in staging or production.
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

- **Game days:** facilitation roles + scenario script.
- **Multi-region:** partial vs full region loss.
- **Data plane faults:** disk full, poison messages, clock skew.
""", [
    "design a chaos experiment for checkout",
    "game day plan for regional failover",
    "safe fault injection for the payments service",
    "chaos engineering hypothesis for redis down",
    "resilience experiment for pod kill storm",
    "abort criteria for a production chaos test",
], [
    "unannounced 50k RPS load test only",
    "unit test generation only",
    "kubernetes YAML style nits only",
    "write a blog post about chaos",
    "support macro",
    "OKR drafting",
], [
    ("Hypothesis: if payment API pods die, checkout retries succeed within SLO. Plan experiment.", ["states hypothesis and steady state", "blast radius and abort", "env/approval notes"],),
    ("Engineer wants random kill -9 in prod for fun. Respond.", ["rejects unscoped prod chaos", "safer alternative", "learning-focused framing"],),
    ("Game day: lose one AZ of cache. Outline agenda.", ["roles/scenario", "metrics to watch", "debrief structure"],),
])

w("skills/data/data-contract-design", """---
name: data-contract-design
description: Define producer-consumer data contracts with schema evolution,
  compatibility, and SLAs. Use whenever the user designs event schemas, warehouse
  contracts, schema registry rules, or breaking-change policy between data producers
  and consumers.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Data Contract Design

A data contract is a promise: schema, semantics, freshness, and ownership.
Evolution needs compatibility rules, not silent field renames.

## Workflow

1. Producers, consumers, grain, keys, and sensitivity (PII).
2. Schema: required fields, types, enums, nullability.
3. Semantics: units, timezones, late data, idempotency keys.
4. SLA: freshness, completeness, support channel.
5. Compatibility mode (backward/forward/full) and versioning.
6. Validation in CI/pipeline; quarantine bad events.
7. Change process: RFC, dual-publish, deprecation window.

## Output format

```markdown
## Contract: <name>
**Owner:** …
**Grain / keys:** …
### Schema
### Semantics
### SLA
### Compatibility & versioning
### Validation
### Consumers
```

## Rules

1. Never silently remove/rename required fields.
2. Document unknown/forward-compatible extension points.
3. PII fields need retention and access notes.
4. Consumers should not parse free-text as schema.
5. Dual-write windows for breaking changes.
6. Mark assumptions about registry tech.

## Edge cases

- **Fan-out many consumers:** stricter stability.
- **Stream vs batch:** different lateness policies.
- **Schema-less JSON:** still define a contract envelope.
""", [
    "data contract between payments and warehouse",
    "schema evolution rules for event streams",
    "breaking change policy for analytics events",
    "define Avro/JSON schema contract for orders",
    "producer consumer SLA for clickstream",
    "schema registry compatibility mode choice",
], [
    "one-off SQL analytics query only",
    "OpenAPI REST design without data platform",
    "market sizing",
    "A/B test analysis only",
    "terraform review",
    "press release",
], [
    ("Orders event: order_id, amount, currency, created_at. Warehouse + fraud consumers. Draft contract.", ["grain/keys", "schema+semantics", "compatibility notes"],),
    ("Producer wants to rename userId to user_id without version. Advise.", ["treats as breaking risk", "migration path", "compat guidance"],),
    ("No registry; JSON blobs today. Minimal contract envelope?", ["envelope fields", "validation idea", "evolution path"],),
])

w("skills/coding/rate-limiting", """---
name: rate-limiting
description: Design rate limiting and throttling for APIs and gateways with fair
  use and abuse resistance. Use whenever the user asks about rate limits, quotas,
  429 responses, token buckets, leaky buckets, or protecting endpoints from overload
  and abuse.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Rate Limiting

Limits protect availability and fairness. Choose key (IP, user, API key, tenant),
algorithm, and client-visible headers carefully.

## Workflow

1. Threat: abuse, noisy neighbor, cost control, fair multi-tenant.
2. Dimension: per identity, per route, global.
3. Algorithm: fixed window, sliding, token bucket — trade accuracy vs cost.
4. Response: 429, Retry-After, rate limit headers.
5. Bypass/admin paths and authenticated vs anonymous.
6. Observability: reject rate, top offenders.
7. Edge vs app vs gateway placement.

## Output format

```markdown
## Rate limit design
**Goals:** …
**Keys:** …
**Limits:** …
**Algorithm:** …
**Client contract:** …
**Fail mode:** open vs closed
```

## Rules

1. State fail-open vs fail-closed when the limiter store is down.
2. Do not rate-limit health checks into outages.
3. Document limits in API docs.
4. Prefer tenant-aware limits in B2B.
5. Avoid only IP limits behind shared NAT without care.

## Edge cases

- **GraphQL:** cost-based limits.
- **Webhooks outbound:** separate egress budgets.
- **Login endpoints:** stricter anti-bruteforce.
""", [
    "design rate limits for our public API",
    "429 and Retry-After behavior for mobile clients",
    "token bucket vs fixed window for multi-tenant SaaS",
    "protect login from credential stuffing",
    "per-tenant quotas on the export endpoint",
    "gateway rate limiting plan",
], [
    "caching strategy only",
    "chaos experiment",
    "write OpenAPI without limits",
    "SQL optimization",
    "newsletter draft",
    "hiring scorecard",
], [
    ("Public free tier API: 100 req/min/key, bursts ok. Design.", ["keying", "algorithm choice", "client-visible behavior"],),
    ("Limiter Redis down — fail open or closed for payments API?", ["trade-offs", "recommendation by risk", "observability"],),
    ("Shared corporate NAT makes IP limits unfair. Alternative?", ["identity-based keys", "practical approach", "edge cases"],),
])

w("skills/coding/caching-strategies", """---
name: caching-strategies
description: Design caching layers with correctness, TTLs, invalidation, and
  stampede control. Use whenever the user asks about Redis cache, CDN caching,
  HTTP cache headers, cache invalidation, thundering herd, or stale reads.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Caching Strategies

Cache for latency and cost, not as a second source of truth without a plan.
Name the consistency model and invalidation path.

## Workflow

1. Read pattern, freshness needs, and blast radius of stale data.
2. Layer: browser, CDN, app memory, Redis, DB.
3. Key design and TTL; avoid unbounded key growth.
4. Invalidation: TTL-only vs event-driven vs write-through.
5. Stampede: singleflight, soft TTL, probabilistic early expire.
6. Negative caching for misses.
7. Metrics: hit ratio, latency, error on cache path.

## Output format

```markdown
## Cache design: <surface>
**Consistency:** …
**Keys / TTL:** …
**Fill path:** …
**Invalidate:** …
**Stampede control:** …
**Failure mode:** …
```

## Rules

1. Security: never cache authorized personal data under shared keys.
2. Prefer explicit invalidation for user-visible mutations.
3. Document what clients may see stale.
4. Measure before multi-layer complexity.
5. Do not invent Redis commands incorrectly — describe intent.

## Edge cases

- **CDN + auth:** private vs public.
- **Multi-region:** replication lag.
- **Search indexes:** near-cache vs source of truth.
""", [
    "Redis caching design for product pages",
    "HTTP cache headers for a public API",
    "how to avoid cache stampede on cold start",
    "invalidate cache when user updates profile",
    "CDN caching strategy for marketing site",
    "why am I seeing stale data after write",
], [
    "rate limiting only",
    "SQL index review only",
    "chaos game day",
    "press release",
    "sprint planning",
    "data contract schema",
], [
    ("Profile read 10k QPS; updates rare. Cache plan.", ["keys/TTL", "invalidation on update", "stampede note"],),
    ("Cache key is just userId for billing plan; admin endpoint shares it. Risk?", ["authz/cache keying risk", "fix", "correctness"],),
    ("TTL-only cache causes 5 min wrong price after update. Options.", ["invalidation strategies", "trade-offs", "recommendation"],),
])

w("skills/coding/websocket-design", """---
name: websocket-design
description: Design WebSocket and realtime channels with auth, backpressure, and
  reconnect semantics. Use whenever the user builds realtime features, sockets,
  presence, live updates, or streaming over persistent connections.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# WebSocket Design

Realtime needs auth on connect, heartbeats, reconnect/resume, and backpressure.
Do not treat sockets as free unlimited fan-out.

## Workflow

1. Use cases: notifications, collab, trading, presence.
2. Auth: ticket/token on connect; revalidate on resume.
3. Protocol: message types, versioning, compression.
4. Scaling: sticky sessions, pub/sub fan-out, room design.
5. Reliability: heartbeats, backoff reconnect, offline buffer.
6. Backpressure and max message size.
7. Observability: connects, drops, lag.

## Output format

```markdown
## Realtime design
**Channels:** …
**Auth:** …
**Message schema:** …
**Reconnect/resume:** …
**Scale plan:** …
**Limits:** …
```

## Rules

1. Authenticate before subscribing to private rooms.
2. Validate every client message; never trust client as authority for money.
3. Document idle timeouts and ping/pong.
4. Prefer idempotent event ids for delivery.
5. Separate public broadcast from private streams.

## Edge cases

- **Mobile networks:** aggressive reconnect.
- **Horizontal scale:** avoid single-node presence without store.
- **Browser limits:** connection count per origin.
""", [
    "design WebSocket protocol for live notifications",
    "realtime presence system design",
    "reconnect and resume for mobile sockets",
    "auth for private websocket rooms",
    "backpressure when clients are slow",
    "scale websockets across multiple nodes",
], [
    "REST rate limiting only",
    "GraphQL schema without realtime",
    "caching headers",
    "newsletter writing",
    "vendor evaluation",
    "unit tests for pure functions",
], [
    ("Chat rooms with private DMs over websocket. Auth and routing sketch.", ["auth on connect", "room model", "security notes"],),
    ("Clients miss messages on reconnect. Fix design.", ["resume/offset or replay", "idempotent events", "practical approach"],),
    ("One node holds all sockets; traffic growing. Scale options.", ["pub/sub or sticky", "trade-offs", "observability"],),
])

w("skills/coding/cli-design", """---
name: cli-design
description: Design developer CLIs with clear UX, exit codes, flags, and help
  text. Use whenever the user builds a command-line tool, debates flags vs
  subcommands, stdout vs stderr, or asks how to structure a CLI for engineers.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# CLI Design

Great CLIs are boring: predictable flags, scriptable output, useful errors, and
stable exit codes.

## Principles

1. Subcommands for verbs; flags for options.
2. stdout for data; stderr for logs/progress.
3. `--help` accurate; examples in help.
4. Exit 0 success; non-zero for classes of failure.
5. `--json` or stable machine output when automation matters.
6. Sensible defaults; prompt only when interactive and needed.
7. Never break scripts with decorative Unicode unless optional.

## Output format

```markdown
## CLI: <name>
### Commands
### Global flags
### Output contract
### Exit codes
### Examples
```

## Rules

1. Prefer composition over god flags.
2. Document config file precedence.
3. Color auto-detect; `--no-color`.
4. Version with `--version`.
5. Destructive commands need `--force` or confirm.

## Edge cases

- **Pipes:** behave well in CI.
- **Windows paths:** accept both separators when reasonable.
- **Plugins:** discovery and naming.
""", [
    "design a CLI for our deploy tool",
    "flags vs subcommands for this developer tool",
    "exit codes and JSON output for scripting",
    "improve UX of this command line interface",
    "CLI help text and examples structure",
    "make this CLI CI-friendly",
], [
    "REST API design only",
    "web UI design system",
    "terraform module",
    "press release",
    "hiring scorecards",
    "websocket protocol",
], [
    ("Tool: deploy, rollback, status. Sketch CLI.", ["subcommands", "flags", "examples"],),
    ("CLI prints emoji and progress on stdout breaking jq. Fix.", ["stdout/stderr split", "machine mode", "practical fix"],),
    ("Destructive delete command. UX for safety.", ["confirm/force", "clear messaging", "exit codes"],),
])

w("skills/data/anomaly-detection", """---
name: anomaly-detection
description: Investigate metric and log anomalies with structured hypotheses and
  next checks. Use whenever the user sees a spike, drop, or weird pattern in
  metrics or logs and asks what is going on, whether it is real, or how to
  investigate.
license: Apache-2.0
compatibility: Portable instructions; may interpret charts/series when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Anomaly Detection (investigation)

Start with “is it real?”, then scope, then hypotheses, then disconfirm. Avoid
declaring root cause from one graph.

## Workflow

1. Define the signal, window, and expected baseline.
2. Check instrumentation changes, deploys, traffic, and batch jobs.
3. Segment: region, endpoint, tenant, version.
4. Correlate logs/traces/events (not only CPU).
5. Rank hypotheses; suggest next 2–3 checks.
6. If alerting: propose better signal vs noise.

## Output format

```markdown
## Anomaly read: <signal>
**Real?** likely|unclear|artifact
**Scope:** …
**Hypotheses:** 1… 
**Next checks:** …
**Mitigations if user-impacting:** …
```

## Rules

1. Do not invent timestamps or deploy times.
2. Distinguish level shift vs spike vs missing data.
3. Seasonality and weekdays matter.
4. Prefer actionable next steps over ML buzzwords.
5. Security anomalies → involve security path.

## Edge cases

- **Counter resets / rate math errors.**
- **Canary vs full traffic.**
- **Silent dashboard timezone bugs.**
""", [
    "why did error rate spike at 14:00",
    "investigate this latency anomaly chart",
    "is this traffic drop real or a tracking bug",
    "metrics look weird after deploy — how to investigate",
    "log volume anomaly investigation",
    "p99 jumped — structured hypothesis list",
], [
    "design SLO from scratch without anomaly",
    "write alert rules only",
    "A/B experiment analysis",
    "ETL pipeline design only",
    "chaos experiment design",
    "blog post about ML anomaly detection",
], [
    ("Error rate 0.1%→3% after deploy. Investigation plan.", ["deploy correlation", "segment next checks", "hypotheses"],),
    ("Traffic -40% on marketing site Monday. Could be real or tracker.", ["artifact vs real", "checks", "no fake root cause"],),
    ("Single metric spike, no user reports. Triage.", ["impact assessment", "instrumentation check", "next steps"],),
])

w("skills/documents/sla-slo-writing", """---
name: sla-slo-writing
description: Write SLAs and SLOs that operations can measure and support can
  explain. Use whenever the user drafts service levels, uptime commitments, error
  budgets, customer-facing availability language, or internal reliability targets.
license: Apache-2.0
compatibility: Portable instructions; not legal advice.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# SLA / SLO Writing

SLOs are internal targets with measurement. SLAs are external commitments with
consequences. Never invent legal remedies.

## Definitions

- **SLI:** quantitative measure (e.g. success rate of HTTP 2xx/3xx).
- **SLO:** target on SLI over a window.
- **Error budget:** allowed failure derived from SLO.
- **SLA:** contractual promise — only with provided legal/commercial terms.

## Output format

```markdown
## Service: <name>
### SLIs
### SLOs
### Error budget policy
### Measurement notes
### SLA language (only if in scope)
### Exclusions
```

## Rules

1. Every SLO needs a query/definition of success.
2. Separate customer-facing vs internal.
3. Multi-region products: define scope.
4. Maintenance windows explicit if claimed.
5. Do not copy “99.999%” without measurement plan.
6. Support-facing language must match engineering SLIs.

## Edge cases

- **Dependencies:** partial credit / shared fate.
- **Batch jobs:** freshness SLOs not uptime.
- **Mobile clients:** client-side vs server SLI.
""", [
    "draft SLOs for our API",
    "error budget policy for on-call",
    "customer-facing SLA language for availability",
    "SLI definitions for checkout success",
    "uptime commitment we can actually measure",
    "internal reliability targets for the team",
], [
    "alert rule syntax only",
    "chaos experiment",
    "rate limiting design",
    "press release",
    "vendor evaluation scorecard without SLOs",
    "anomaly investigation of one spike",
], [
    ("API wants 99.9% monthly availability SLO. Define SLI and measurement.", ["clear SLI", "window/target", "exclusions ideas"],),
    ("Sales wants five nines in the contract; eng measures 99.5%. Advise.", ["honest gap", "options", "no fake commitment"],),
    ("Data pipeline freshness SLO vs uptime. How to write.", ["freshness SLI", "practical target shape", "ownership"],),
])

w("skills/documents/vendor-evaluation", """---
name: vendor-evaluation
description: Run structured vendor evaluations and scorecards for build-vs-buy
  decisions. Use whenever the user compares vendors, shortlists tools, runs a
  bake-off, or needs a fair scorecard across products for a purchase decision.
license: Apache-2.0
compatibility: Portable instructions; do not invent pricing or certifications.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Vendor Evaluation

Score what matters: must-haves, weighted wants, risks, and total cost — not
demo polish alone.

## Workflow

1. Decision, constraints, must-haves vs nice-to-haves.
2. Criteria + weights (security, cost, UX, ops, lock-in).
3. Candidate list and disqualify early misses.
4. Evidence: docs, trials, references — not brochure claims.
5. Scorecard + recommendation + risks.
6. Pilot plan if close.

## Output format

```markdown
## Evaluation: <category>
### Must-haves
### Scorecard
| Criterion | Weight | Vendor A | Vendor B | Notes |
### TCO notes
### Risks / lock-in
### Recommendation
### Pilot plan
```

## Rules

1. Never invent SOC2/pricing; mark unknown.
2. Weight security for sensitive data.
3. Include exit cost / data portability.
4. Separate build option when relevant.
5. Document who scored and when.

## Edge cases

- **Incumbent bias:** re-score fairly.
- **Open source + support vendor:** split product vs support.
- **Multi-year contracts:** renegotiation leverage notes.
""", [
    "vendor scorecard for error monitoring tools",
    "compare these three vendors fairly",
    "build vs buy evaluation for feature flags",
    "bake-off plan for two databases",
    "shortlist and disqualify SaaS options",
    "weighted criteria for security tooling purchase",
], [
    "RFP customer response matrix",
    "competitor marketing brief only",
    "SLA writing only",
    "implement integration code",
    "press release",
    "sprint planning",
], [
    ("Choose between Datadog-like A vs cheaper B for logs. Criteria sketch.", ["weighted criteria", "risks", "evidence needed"],),
    ("Vendor claims SOC2; we have not verified. How to score.", ["unknown handling", "verification step", "honest scoring"],),
    ("Build vs buy feature flags for mid-size team. Structure decision.", ["build option", "scorecard shape", "recommendation path"],),
])

w("skills/productivity/hiring-scorecards", """---
name: hiring-scorecards
description: Build interview scorecards and debrief structures that reduce bias
  and noise. Use whenever the user designs hiring loops, interview rubrics,
  scorecards, structured debriefs, or leveling guides for candidates.
license: Apache-2.0
compatibility: Portable instructions; follow company legal/HR policy.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Hiring Scorecards

Structured criteria beat vibe hiring. Define competencies, evidence, and a
shared scale before the interview.

## Workflow

1. Role, level, must-have competencies.
2. Scorecard dimensions with behavioral anchors (1–4 or similar).
3. Interview loop map: who covers what (no gaps/overlap chaos).
4. Evidence notes required; no empty scores.
5. Debrief order: independent scores first, then discussion.
6. Decision rule and dissent recording.

## Output format

```markdown
## Scorecard: <role> <level>
### Competencies
| Dimension | 1 | 2 | 3 | 4 |
### Loop plan
### Debrief agenda
### Red flags / non-negotiables
```

## Rules

1. Illegal/unfair criteria excluded (follow local law/HR).
2. Same questions/rubric across candidates for comparable signal.
3. “Culture fit” → specific behaviors, not similarity bias.
4. Take-home reviews use the same rubric.
5. Do not invent company leveling frameworks; adapt if provided.

## Edge cases

- **Internal transfers:** different scorecard emphasis.
- **Executive hiring:** stakeholders + values evidence.
- **High volume:** calibration sessions.
""", [
    "interview scorecard for senior backend engineer",
    "hiring rubric and debrief structure",
    "leveling scorecard for mid frontend",
    "reduce bias in our interview loop",
    "structured debrief agenda for panel",
    "competency anchors for system design interview",
], [
    "interview prep for a candidate only",
    "resume rewrite only",
    "sprint planning",
    "1:1 agenda manager-report",
    "OKR drafting",
    "vendor evaluation",
], [
    ("Senior backend: coding, system design, collaboration. Draft scorecard anchors.", ["dimensions", "anchors", "loop coverage note"],),
    ("Panel debrief starts with loudest voice. Fix process.", ["independent scores first", "structure", "decision rule"],),
    ("Culture fit used to reject unlike personalities. Reframe.", ["behavior-specific criteria", "bias note", "better dimension"],),
])

w("skills/productivity/timebox-planning", """---
name: timebox-planning
description: Plan deep work and timeboxes when everything feels urgent. Use
  whenever the user asks how to schedule focus time, cut thrash, plan a day or
  week under overload, protect maker time, or prioritize under too many tasks.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Timebox Planning

When everything is P0, nothing is. Pick outcomes, timebox deep work, batch
comms, and make cuts explicit.

## Workflow

1. List commitments; mark hard deadlines vs wishes.
2. Energy and calendar constraints (meetings, on-call).
3. Choose 1–3 outcomes for the day/week.
4. Place deep-work blocks first; batch Slack/email.
5. Timebox risky unknowns; define done for each block.
6. Overflow list / explicit not-doing.
7. End-of-day review: move, cut, or renegotiate.

## Output format

```markdown
## Plan — <day/week>
**Outcomes:** …
### Schedule blocks
### Meetings strategy
### Not doing
### Risks
```

## Rules

1. Do not plan 100% utilization.
2. Renegotiate rather than silent miss.
3. Multitasking theater is not a plan.
4. Protect recovery if burnout signals appear.
5. Manager overload: escalate portfolio cuts.

## Edge cases

- **On-call weeks:** thinner plan, thicker buffer.
- **Makers vs managers:** different fragmentation.
- **ADHD/context switch cost:** fewer concurrent WIPs.
""", [
    "plan my week I am overloaded",
    "protect deep work time on my calendar",
    "daily timebox plan for too many tasks",
    "how to cut thrash and focus",
    "maker schedule with too many meetings",
    "prioritize under everything is urgent",
], [
    "sprint planning for a whole team",
    "OKR quarterly goals",
    "hiring scorecard",
    "project multi-month plan",
    "meeting agenda only",
    "task breakdown RFC style",
], [
    ("IC eng: 6 meetings, 12 tickets, deploy Friday. Day plan.", ["outcomes", "deep work blocks", "not doing"],),
    ("Everything marked urgent by stakeholders. Approach.", ["explicit prioritization", "renegotiate", "timeboxes"],),
    ("On-call primary this week. Planning advice.", ["buffer", "thinner commit", "practical schedule shape"],),
])

w("skills/research/customer-discovery", """---
name: customer-discovery
description: Plan and run customer discovery interviews that test assumptions.
  Use whenever the user is validating a startup idea, talking to customers for
  problem discovery, needs an interview guide, or wants to test riskiest product
  assumptions.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Customer Discovery

Talk to learn about past behavior and jobs-to-be-done, not to pitch. Test
assumptions; avoid leading questions and fake validation.

## Workflow

1. Riskiest assumptions list.
2. Target interviewee profile and recruit script.
3. Interview guide: open past-behavior questions.
4. Run: listen, probe, note quotes.
5. Synthesize themes and assumption updates.
6. Decide: persevere, pivot assumption, or kill.
7. Never treat compliments as demand.

## Output format

```markdown
## Discovery plan
**Assumptions:** …
**Who:** …
**Guide:** …
## After N interviews
**Themes:** …
**Assumption updates:** …
**Next experiments:** …
```

## Rules

1. Prefer “tell me about the last time…” over “would you use…”.
2. Do not pitch mid-interview.
3. n small → directional only.
4. Separate problem vs solution interviews.
5. Privacy: strip unnecessary PII in notes.

## Edge cases

- **B2B:** multi-stakeholder buying.
- **Existing customers:** expansion vs new segment.
- **Founder bias:** pre-register what would change your mind.
""", [
    "customer discovery interview guide for our idea",
    "validate startup assumptions with interviews",
    "problem interview script for B2B buyers",
    "how to test if anyone cares about this pain",
    "synthesize five discovery calls",
    "recruit screener for target users",
], [
    "user interview synthesis only with no plan",
    "survey analysis quant",
    "market sizing TAM only",
    "case study marketing",
    "competitor brief",
    "press release",
], [
    ("Idea: AI meeting notes for lawyers. Riskiest assumptions + 8 questions.", ["assumptions", "past-behavior questions", "not pitchy"],),
    ("Interviewees all friends who say they love it. Bias handling.", ["bias callout", "better recruit", "decision rule"],),
    ("After 6 calls, mixed pain signals. Next step.", ["synthesis shape", "experiment", "persevere/pivot framing"],),
])

w("skills/writing/newsletter-writing", """---
name: newsletter-writing
description: Write email newsletters with a clear point, scannable structure, and
  one CTA. Use whenever the user asks for a newsletter draft, weekly digest email,
  subscriber update, or email issue for an audience list.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Newsletter Writing

One issue, one primary point (or tight digest sections). Subject line earns the
open; body earns the click; one main CTA.

## Structure

```markdown
Subject:
Preview:

Hook (2–4 lines)
## Section …
CTA
P.S. optional
```

## Rules

1. Subject honest; no clickbait lies.
2. Short paragraphs; links with purpose.
3. One primary CTA; secondary quiet.
4. Do not invent metrics or subscriber counts.
5. Match brand voice if samples given.
6. Accessibility: meaningful link text.

## Edge cases

- **Digest issues:** bullets + one feature story.
- **Launch issues:** clearer CTA, shorter.
- **Re-engagement:** why come back now.
""", [
    "write this week's product newsletter",
    "subscriber email digest draft",
    "newsletter issue from these three links",
    "weekly update email for our audience",
    "subject lines for a launch newsletter",
    "re-engagement newsletter draft",
], [
    "cold outbound sales sequence",
    "press release formal",
    "long blog post only",
    "social posts only",
    "internal all-hands memo",
    "landing page copy full page",
], [
    ("Product shipped dark mode; link blog. Newsletter 250 words.", ["subject", "hook", "one CTA"],),
    ("Three unrelated updates. Structure digest.", ["scannable sections", "primary CTA choice", "tight writing"],),
    ("Wants 'guaranteed 10x open rate' subject tricks. Respond.", ["honest subjects", "better alternatives", "no false claims"],),
])

w("skills/writing/press-release", """---
name: press-release
description: Write press-style announcements with a lead, facts, and quotes
  without hype fluff. Use whenever the user needs a press release, media
  announcement, wire-style launch note, or journalist-facing company news.
license: Apache-2.0
compatibility: Portable instructions; never invent quotes, customers, or financials.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Press Release

Lead with news value. Dateline, inverted pyramid, attributed quotes, boilerplate.
Facts only.

## Structure

```markdown
FOR IMMEDIATE RELEASE
Headline
Subhead
CITY, Date — Lead paragraph

Body …
Quotes …
Boilerplate …
Media contact …
```

## Rules

1. Never invent executive quotes or customer logos.
2. Avoid superlatives without evidence.
3. Numbers need source/permission.
4. Material claims may need legal review — flag.
5. Separate embargo instructions if provided.
6. Keep AP-ish clarity; short sentences.

## Edge cases

- **Funding:** only stated facts.
- **Crisis:** coordinate with legal/comms; no spin.
- **Product launch:** feature facts > adjectives.
""", [
    "write a press release for our launch",
    "media announcement for Series B",
    "journalist-facing product news draft",
    "FOR IMMEDIATE RELEASE draft from these facts",
    "press release with CEO quote placeholder",
    "wire-style announcement for partnership",
], [
    "customer case study narrative",
    "newsletter to subscribers",
    "social media posts",
    "internal reorg memo",
    "landing page marketing",
    "blog thought leadership",
], [
    ("Facts: launched EU region hosting today; no quotes yet. Draft PR.", ["lead", "placeholders for quotes", "no invented claims"],),
    ("Wants 'world's best AI' in headline. Fix.", ["removes hype", "news-worthy framing", "factual tone"],),
    ("Partnership PR; partner name TBD. Structure.", ["structure", "clear TODOs", "no fake partner"],),
])

w("skills/coding/migration-playbooks", """---
name: migration-playbooks
description: Plan large technical migrations with strangler patterns, dual-run,
  and rollback. Use whenever the user migrates frameworks, databases, clouds,
  monorepo boundaries, or large platform changes at scale.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Migration Playbooks

Big-bang migrations fail. Prefer strangler, dual-run, measurable milestones, and
rollback that still works on Friday night.

## Workflow

1. Current vs target state; non-goals.
2. Risks: data, downtime, client compatibility.
3. Strategy: strangler, expand/contract, blue/green, dual-write.
4. Milestones with exit criteria and owners.
5. Dual-run validation and comparison checks.
6. Rollback and freeze windows.
7. Comms to users/internal teams.
8. Cleanup and decommission checklist.

## Output format

```markdown
## Migration: <name>
**Strategy:** …
### Phases
### Validation
### Rollback
### Comms
### Cleanup
```

## Rules

1. Data migrations need dry-runs and checksums.
2. Feature flags for traffic shifting when possible.
3. Do not delete old path until metrics prove parity.
4. Budget time for unknown unknowns.
5. Explicit owner for each phase.

## Edge cases

- **Zero downtime:** expand/contract schema first.
- **Client SDKs:** version skew matrix.
- **Org migration:** training and runbooks.
""", [
    "plan migration from monolith to services",
    "database migration playbook zero downtime",
    "strangler pattern plan for legacy module",
    "cloud migration dual-run strategy",
    "framework upgrade migration across 20 services",
    "rollback plan for platform migration",
], [
    "single PR refactor plan small file",
    "feature flag for one button only",
    "sprint planning",
    "chaos experiment single fault",
    "helm chart for one service",
    "write press release",
], [
    ("Move auth from monolith to service. Phased plan.", ["strangler/dual-run", "validation", "rollback"],),
    ("Big-bang cutover this weekend for payments DB. Critique.", ["risk callout", "safer alternative", "checks"],),
    ("After migration, old system still gets writes. Cleanup.", ["decommission steps", "traffic proof", "ownership"],),
])

w("skills/coding/observability-alerts", """---
name: observability-alerts
description: Design actionable alerts that page humans only for real pain. Use
  whenever the user writes alert rules, fixes alert fatigue, designs on-call
  notifications, escalations, or SLO burn alerts.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Observability Alerts

Every page should map to user pain or imminent pain and a runbook. Symptom-based
beats cause-based flapping.

## Workflow

1. User journeys and SLOs to protect.
2. Alert on symptoms (error rate, latency, freshness) first.
3. Thresholds, windows, and multi-window burn if SLO-based.
4. Severity → route (page vs ticket vs slack).
5. Runbook link mandatory for paging alerts.
6. Dedup, group, inhibit flapping.
7. Review noise weekly; delete or tune.

## Output format

```markdown
## Alert: <name>
**Symptom:** …
**Condition:** …
**Severity / route:** …
**Runbook:** …
**Owners:** …
**Noise risks:** …
```

## Rules

1. No pages without owners and runbooks.
2. Avoid CPU-only alerts as primary for apps.
3. Test alerts (fire drill) occasionally.
4. Night pages need higher bar.
5. Document dependencies to reduce stampede pages.

## Edge cases

- **Batch jobs:** freshness not uptime.
- **Multi-tenant:** avoid one-tenant storms paging everyone without scope.
- **Synthetic checks:** complement, not sole signal.
""", [
    "design paging alerts for checkout",
    "fix alert fatigue on our on-call",
    "SLO burn rate alert design",
    "what should page vs slack for the API",
    "runbook-linked alert rules list",
    "reduce noisy CPU alerts",
], [
    "dashboard layout only",
    "log field design only",
    "anomaly one-off investigation",
    "chaos experiment",
    "SLA contract wording only",
    "write unit tests",
], [
    ("Checkout error rate pages 20 times/night. Redesign.", ["symptom focus", "threshold/window", "runbook/severity"],),
    ("Team pages on CPU >70%. Critique.", ["symptom vs cause", "better signals", "noise"],),
    ("SLO 99.9%; want burn alerts. Sketch.", ["multi-window idea", "route", "ownership"],),
])

print("done")
