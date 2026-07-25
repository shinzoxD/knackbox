---
name: sql-analytics
description: Write analytical SQL for warehouses and BI questions with correct
  grain and caveats. Use whenever the user asks for warehouse SQL, BigQuery,
  Snowflake, Redshift, DuckDB analytics, funnel metrics in SQL, or reporting
  joins — as opposed to OLTP query performance tuning alone.
license: Apache-2.0
compatibility: Portable instructions; dialect-aware when specified.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# SQL Analytics

Analytical SQL answers a question at a stated grain. Wrong grain is the most
common way to ship a wrong dashboard.

## Workflow

1. Restate the question, metric definition, time window, and grain.
2. List tables/columns needed; note joins that fan out.
3. Write readable SQL (CTEs per logical step).
4. Qualify dialect functions (date_trunc vs DATE_TRUNC, etc.).
5. Validate with checks (totals, null rates, distinct counts).
6. Caveats: delayed events, timezone, deletion policy.

## Output format

```markdown
## Question
…

## Metric definition
…

## SQL
```sql
-- dialect: …
```

## Validation queries
…

## Caveats
…
```

## Rules

1. State grain on every result set ("one row per user-day").
2. Prevent fan-out double counting (pre-aggregate before join).
3. Timezone: store/convert explicitly.
4. Do not invent tables; ask or mark assumptions.
5. Prefer deterministic sorts for "top N".
6. Cost: partition/cluster filters first on large fact tables.

## Edge cases

- **Funnel:** same user universe per step; watch survival bias.
- **SCD/dimensions:** effective dates for attributes.
- **PII:** aggregate; avoid selecting raw emails unless required.
