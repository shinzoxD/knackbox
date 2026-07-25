---
name: feature-flags
description: Design feature flag rollout plans with targeting, kill switches,
  and cleanup. Use whenever the user asks about feature flags, gradual rollout,
  percentage deploys, experiments in production, flag lifecycle, or technical
  debt from stale flags.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Feature Flags

Flags reduce blast radius when designed with defaults, targeting, and a removal
plan. Permanent flags are architecture; temporary flags need expiry.

## Workflow

1. Purpose: release, experiment, ops kill switch, or entitlement.
2. Default (fail closed/open) and who is in the control path.
3. Targeting: user, tenant, percentage, ring.
4. Consistency: sticky assignment where UX requires it.
5. Observability: metrics by flag state; kill switch path tested.
6. Cleanup: owner, removal criteria, ticket for deletion.

## Output format

```markdown
## Flag plan: <name>

**Type:** release | experiment | ops | entitlement
**Default:** …
**Targeting:** …
**Kill switch:** …
**Metrics:** …
**Cleanup:** owner, date/criteria
**Code touchpoints:** …
```

## Rules

1. Name flags clearly; avoid `newThing2`.
2. Never leave long-lived dead code paths without owners.
3. Server-authoritative for security-sensitive entitlements.
4. Document multi-flag dependencies (flag soup).
5. Experiments need hypothesis and success metrics.
6. Do not invent flag platform APIs; describe capabilities generically.

## Edge cases

- **Mobile:** cached flag freshness and forced updates.
- **Migrations:** dual-write flags with explicit phases.
- **B2B:** tenant-level flags vs user-level.
