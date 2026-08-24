---
name: feature-analytics
description: Plan event names, properties, identity, and what not to log
  for a new product feature. Use whenever the user asks for a tracking
  plan, instrumentation, event taxonomy, analytics events, Segment,
  Mixpanel, Amplitude, identify vs track, "what should we log for this
  feature", or PII in analytics — even if they only paste a feature
  spec — not when they only want a KPI formula, operator logs, or an
  A/B experiment design.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Feature Analytics

A tracking plan is the product-analytics contract: event names, properties,
identity, and an explicit do-not-log list. Prefer a short, stable taxonomy
over logging every click.

For KPI formulas, use `metrics-definitions`. For operator logs, traces, and
SLOs, use `logging-observability`. For A/B setup, use `experiment-design`.
For warehouse producer-consumer schemas, use `data-contract-design`.

## Workflow

1. Name the feature and the product questions events must answer (funnel
   drop-off, activation, failure). This is not a KPI spec.
2. Identity: `anonymous_id` before login; opaque `user_id` after identify;
   `group_id` / account for B2B. Say when merge happens. Email is not an id.
3. Map journeys to candidate events. Refuse "track everything".
4. For each event: name, trigger, client vs server, required properties, owner.
5. Properties: type, allowed values, source. No PII, secrets, or raw payloads.
6. Do-not-log list: email, name, phone, address, tokens, passwords, PAN/CVV,
   SSN, chat/search free text, HTML, full request/response bodies.
7. QA: one fire per user action, identity present, no forbidden fields.
8. Never invent event volumes, QPS, or storage cost.

## Output format

```markdown
## Tracking plan: <feature>

**Identity:** anonymous_id / user_id / group_id; when identify/group fire
**Source of truth:** client | server | both (say which events)

### Events
| Name | Trigger | Where | Required properties | Owner |

### Properties
| Event | Property | Type | Allowed values | Source |

### Do not log
- …

### QA
- …

### Out of scope
`metrics-definitions` for KPI formulas
`logging-observability` for operator logs
`experiment-design` for A/B setup
```

## Rules

1. Never invent event volumes, traffic, or "this will be N events/day".
2. Never put PII or secrets in event or user properties.
3. Names: object_action, past tense, one casing (snake_case or Title Case).
   Stable names; aliases are deprecated, not silent renames.
4. Money, entitlements, and spoofable outcomes fire server-side.
5. Do not write KPI numerators/denominators here (`metrics-definitions`).
6. Do not design operator logs, SLIs, or traces here (`logging-observability`).
7. Do not design randomization, power, or SRM here (`experiment-design`).
8. Opaque ids only. Do not use email, phone, or name as `user_id`.
9. User traits go on identify/group. Event properties are facts about *this*
   action. Dual client+server fire needs a `source` property or pick one.

**Good:** `checkout_started` with `item_count`, `currency`, `cart_id`.
**Bad:** `ButtonClicked` plus `email`, `card_number`, `password`, and a guessed
million events/day.

## Edge cases

- **B2B seats vs accounts:** events carry both user and group ids; say which
  identity the funnel is on.
- **Anonymous then registered:** identify + alias/merge; do not drop the
  anonymous trail or invent a merge volume.
- **Consent / GDPR:** no analytics events until consent if that is the policy;
  do not "just send email for later matching".
- **Page views vs semantic events:** `page_viewed` is not a substitute for
  `invite_sent` / `invite_accepted`.
- **Feature-flag exposure:** not a product event unless the question needs it
  as a property; flag rollout itself is not this skill.
- **Missing product questions:** ask; do not dump a 40-event taxonomy.
- **Enums over free text:** status, plan, and reason should be closed lists;
  search queries and chat bodies stay off the event.
