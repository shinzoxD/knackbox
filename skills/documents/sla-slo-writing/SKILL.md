---
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
