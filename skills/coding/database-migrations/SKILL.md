---
name: database-migrations
description: Plan and review database schema migrations for safety and rollback.
  Use whenever the user writes migrations, alters tables, backfills data, adds
  indexes, or asks how to deploy schema changes without downtime or lock pain.
license: Apache-2.0
compatibility: Portable instructions; dialect-aware when the user specifies the database.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Database Migrations

Schema change is a production event. Expand/contract, avoid long locks, and
never invent irreversible data loss as "fine".

## Workflow

1. State current schema, target schema, dialect, table size class if known.
2. Classify: additive, destructive, rewrite, backfill, index-only.
3. Prefer expand → migrate reads/writes → contract over in-place big bang.
4. Call out locking, full table rewrites, and default-value rewrites on large tables.
5. Plan online backfill (batched) separate from the schema DDL when needed.
6. Define rollback / forward-fix and verification queries.

## Output format

```markdown
## Migration plan: <change>

**Dialect:** …
**Risk:** low | medium | high

### Steps
1. …

### SQL (or migration files)
…

### Locks / performance notes
…

### App deploy ordering
…

### Verify
…

### Rollback
…
```

## Rules

1. Never drop columns/tables before code stops reading them.
2. Adding NOT NULL requires a default or multi-step backfill.
3. Create indexes concurrently when the dialect and ops model support it.
4. Separate long backfills from transactional DDL when possible.
5. State assumptions about table size; ask if missing and risk depends on it.
6. Do not run destructive SQL without an explicit user goal.

## Edge cases

- **Multi-service shared DB:** coordinate expand/contract across deployables.
- **Zero-downtime:** dual-write or dual-read windows spelled out.
- **Data repair:** treat as a scripted job with dry-run counts, not a sneaky migration.
