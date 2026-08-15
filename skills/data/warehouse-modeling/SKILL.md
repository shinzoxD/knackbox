---
name: warehouse-modeling
description: Design warehouse dimensional models, activity schemas, and marts
  with explicit fact grain, facts, dimensions, SCD, and conformed dims. Use
  whenever the user asks about star schema, dimensional model, fact table
  grain, SCD type 2, slowly changing dimension, activity schema, wide mart,
  conformed dimension, Kimball, snowflake schema, or "how should we model
  orders in the warehouse" — not ETL DAG mechanics, a single SQL rewrite,
  or a KPI numerator/denominator definition.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Warehouse Modeling

Model so each fact answers one question at one grain. Star schemas, activity
schemas, and wide marts are shapes; grain is the contract.

For pipeline mechanics (extract, load, replay, DAG), use `etl-pipeline-design`.
For KPI numerator/denominator, use `metrics-definitions`. For writing a query,
use `sql-analytics`. For producer-consumer event contracts, use
`data-contract-design`.

## Workflow

1. Name the business process and the questions the table must answer.
2. Write grain as one sentence: "one row per ___". If two grains appear,
   split into two facts — refuse to mix them.
3. Choose shape (star, activity schema, or wide mart) and say why.
4. Facts: measures, additivity, degenerate keys.
5. Dimensions: natural keys, surrogates, attributes, conformed reuse.
6. SCD per changing attribute (0/1/2/3). Default Type 2 when history
   matters.
7. Grain tests: uniqueness, no fan-out vs source, measure reconcile.
8. Late-arriving facts/dims and delete/restate policy.

## Output format

```markdown
## Warehouse model: <process>

**Grain:** one row per …
**Shape:** star | activity schema | wide mart
**Why this shape:** …

### Facts
| Table | Grain | Measures | Additivity | Degenerate keys |

### Dimensions
| Table | Natural key | Surrogate | Conformed with | Attributes |

### SCD
| Dimension / attr | Type | Effective dating | Current flag |

### Grain tests
- uniqueness of the business key at grain
- no fan-out vs source
- measures reconcile to source at that grain

### Open questions
…
```

## Rules

1. Always write grain as "one row per <entity> at <event or period>".
   Two grains in one fact is a defect — split header vs line, event vs
   daily rollup, snapshot vs transaction.
2. Never invent warehouse vendor features (clustering syntax, search
   optimization, dynamic tables, undocumented MERGE flags). If the user
   named a platform, use only features they stated or mark assumptions.
3. Facts hold measures at grain; dimensions hold descriptive context.
   A wide mart is allowed only at one consumer grain, named explicitly.
4. Conformed dimensions share keys and meaning across facts. Reuse
   date/customer/product; do not fork `customer_for_orders` without why.
5. SCD Type 2 needs effective_from/to (or equivalent) and a current
   flag. Type 1 overwrites history — say what reports will get wrong.
6. Activity schema: one row per activity occurrence (name + timestamp +
   join keys). Do not mix activity rows with rolled-up daily facts.
7. Additive measures sum across all dims; semi-additive (balances) do
   not sum over time; non-additive (ratios) must be recomputed.
8. Do not write the ETL DAG here (`etl-pipeline-design`). Do not define
   KPI formulas here (`metrics-definitions`).

**Good:** `fct_order_line` — one row per order_line_id; `fct_order` —
one row per order_id; shared `dim_customer`, `dim_date`.
**Bad:** one `fct_orders` with both `order_total` and `line_qty`.

## Edge cases

- **Order header + line:** two facts sharing conformed dims. Never one
  fact with both order_total and line_qty.
- **Changing plan/segment:** Type 2 if reports need the attribute as-of
  the fact; Type 1 only if overwrite is accepted.
- **Activity vs star:** activity schema when many event types share
  keys and analysts want sequences; star when a few processes have
  stable measures.
- **Wide mart:** one row per customer-day (or stated grain) is fine.
  Document column explosion; still one grain.
- **Missing source grain:** ask; do not invent a primary key.
