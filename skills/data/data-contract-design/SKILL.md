---
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
