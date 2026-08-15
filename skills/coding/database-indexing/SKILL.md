---
name: database-indexing
description: Design and review database indexes and query plans — covering
  indexes, INCLUDE columns, partial/expression indexes, and EXPLAIN
  coaching beyond a single query rewrite. Use whenever the user asks what
  index to add, shares EXPLAIN ANALYZE, talks seq scans or index bloat,
  or wants a indexing plan for Postgres, MySQL, or SQL Server.
license: Apache-2.0
compatibility: Portable instructions; may interpret EXPLAIN output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Database Indexing

Indexes are a write tax you pay to make a specific read cheap. Name the
query first. Do not spray indexes on every foreign key "just in case".

For rewriting one statement, use `sql-query-review`. For schema change
safety, use `database-migrations`.

## Workflow

1. Dialect, table size (rows/bytes if known), write rate, and the
   *exact* query or EXPLAIN.
2. Restate the access path: equality keys, range keys, ORDER BY, and
   covering columns.
3. Propose the smallest index that serves that path (left-prefix,
   INCLUDE / covering, partial, expression).
4. Check existing indexes for redundancy, unused, or wrong column order.
5. Call out write cost, bloat, and CREATE INDEX CONCURRENTLY / ONLINE.
6. Verification: what EXPLAIN node should disappear, and a rollback
   (`DROP INDEX CONCURRENTLY`).

## Output format

```markdown
## Indexing plan: <table / query>

**Dialect / size assumption:** …
**Target access path:** …

### Proposed indexes
```sql
-- CREATE INDEX …
```

### Why this shape
leading columns, range, covering, partial predicate

### Do not add
…

### Apply / rollback
CONCURRENTLY, lock notes, DROP

### Verify
EXPLAIN expectation
```

## Rules

1. Never invent table stats or existing indexes. If missing, say what
   you assumed or ask for `\d` / `SHOW INDEX` / EXPLAIN.
2. Equality columns before range columns in a B-tree.
3. Do not recommend an index that the predicate cannot use (function
   on the column, leading wildcard, implicit cast).
4. One new index per proven query until writes hurt. Composite beats
   three overlapping singles.
5. Unique constraints *are* indexes; do not duplicate them.
6. Warehouse engines: talk clustering/partition prune/clustering keys,
   not "add a B-tree on user_id", unless the engine has them.
7. `CREATE INDEX` on a large hot table without CONCURRENTLY/ONLINE is
   a finding.

## Edge cases

- **ORM-only:** infer the SQL, then index that SQL — not the object
  graph.
- **Many slow queries:** rank by frequency × latency; index the top
  two, not twenty.
- **Already indexed and still slow:** look at selectivity, heap
  fetches, mis-estimates, and whether the query should be rewritten
  (`sql-query-review`) instead of another index.
- **JSON / arrays:** expression or GIN only when the predicate matches
  the operator class.
---
