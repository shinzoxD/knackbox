---
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
