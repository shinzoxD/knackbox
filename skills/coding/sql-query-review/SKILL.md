---
name: sql-query-review
description: Review and improve SQL queries for correctness, performance,
  safety, and maintainability. Use whenever the user shares a SQL query, asks
  to optimize a query, check indexes, prevent SQL injection, rewrite a join,
  explain a slow query plan, or debug wrong database results — even for
  ORM-generated SQL or "why is this query slow".
license: Apache-2.0
compatibility: Portable instructions; may reason about EXPLAIN output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# SQL Query Review

Treat SQL as production code: correctness and safety first, then performance,
then style. Prefer rewrites the reader can paste and run.

## Workflow

1. Restate what the query is *trying* to return (grain: one row per what?).
2. Check correctness: join type, filter placement, NULL semantics, aggregation
   grain, DISTINCT papering over fan-out.
3. Check safety: injection (string-built SQL), over-fetch of sensitive columns,
   missing tenant/user predicates, destructive statements without predicates.
4. Check performance: selective filters, sargability, index use, N+1 patterns,
   SELECT *, unnecessary sorts, large OFFSET pagination.
5. Deliver a rewritten query (or incremental patches) with assumptions labeled.

## Correctness checklist

- **Grain**: joins that multiply rows before `SUM`/`COUNT` without care.
- **NULLs**: `= NULL` is always unknown; use `IS NULL`. Outer joins + filters
  in `WHERE` that accidentally turn them into inner joins.
- **Filters**: predicates on the wrong side of a `LEFT JOIN`; time zones and
  inclusive/exclusive date ranges.
- **Aggregates**: columns in `SELECT`/`ORDER BY` not in `GROUP BY` (dialect
  dependent); `COUNT(*)` vs `COUNT(col)`.
- **Window functions**: `PARTITION BY` / `ORDER BY` match the business question.
- **EXISTS vs IN**: prefer `EXISTS` for correlated semi-joins; beware `NOT IN`
  with NULLs.

## Performance checklist

- Prefer sargable predicates: `created_at >= $1` over `DATE(created_at) = …`
  when an index exists on `created_at`.
- Select only needed columns; avoid `SELECT *` in application paths.
- Pagination: keyset/cursor (`WHERE (created_at, id) < ($1, $2)`) over large
  `OFFSET`.
- Watch non-selective leading wildcards (`LIKE '%foo'`), functions on indexed
  columns, and implicit casts that block indexes.
- If `EXPLAIN`/`EXPLAIN ANALYZE` is provided, cite the expensive node; if not,
  propose what to measure instead of inventing timings.

## Safety checklist

- Never concatenate untrusted input into SQL. Use bind parameters.
- Multi-tenant apps: every query that returns user data must constrain tenant
  (or equivalent) unless it is an explicitly audited admin path.
- `UPDATE`/`DELETE` without a restrictive `WHERE` (or with a join that can
  expand) is a blocking finding.
- Limit bulk exports; avoid returning password hashes or secrets.

## Output format

```markdown
## SQL review

**Intent (grain):** one row per …
**Dialect assumed:** PostgreSQL | MySQL | SQLite | … (state if inferred)

### Findings
1. [blocking|important|nit] — issue and consequence
2. …

### Recommended query
```sql
-- rewritten SQL
```

### Indexes / plan notes
What index or EXPLAIN step would confirm the fix.

### Test cases
2–4 inputs/edge rows that would prove correctness (NULL, empty join, duplicate parents).
```

## Rules

1. Always state the dialect assumption; syntax and NULL behavior differ.
2. Do not invent table statistics, index definitions, or runtimes. If schema
   is missing, list what you need or give conditional advice.
3. Preserve the original business intent unless you explain a necessary change.
4. Prefer readable SQL (CTEs for steps) over clever one-liners when teaching.
5. If the query is already solid, say so and only suggest optional polish.

## Edge cases

- **ORM / query builder only**: reverse-engineer the SQL intent, show the SQL
  you think it emits, and suggest either raw SQL or ORM API that parameterizes.
- **Migration / DDL mixed in**: separate data-fix from schema change advice.
- **Warehouse SQL (BigQuery/Snowflake/Redshift)**: call out slot/cost and
  partition pruning instead of classic B-tree index talk when relevant.
- **User wants "just make it faster"**: refuse to sacrifice correctness;
  measure first if no plan or volume info is given.
