---
name: etl-pipeline-design
description: Design ETL and ELT pipelines with clear contracts, quality checks,
  and failure modes. Use whenever the user plans data ingestion, transformations,
  warehouse loads, dbt-style models, batch/stream pipelines, or data pipeline
  architecture.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# ETL / ELT Pipeline Design

Pipelines are products: contracts, SLAs, and tests. Prefer explicit schemas and
idempotent loads over heroic one-off scripts.

## Workflow

1. Sources, destinations, latency needs (batch vs stream).
2. Grain and business keys; late/duplicate data policy.
3. ELT vs ETL trade-off for this stack.
4. Stages: extract, land, validate, transform, publish.
5. Data quality checks and alerting.
6. Backfills, reprocessing, and cost controls.
7. Ownership and lineage docs.

## Output format

```markdown
## Pipeline design: <name>

**SLA / freshness:** …
**Grain:** …

### Architecture
…

### Contracts
…

### Quality checks
…

### Failure & replay
…

### Cost notes
…
```

## Rules

1. Define idempotency keys for loads.
2. Never silently drop rows; quarantine or metric the drops.
3. PII handling and retention called out.
4. Separate raw/landing from curated marts.
5. Backfills must not corrupt current tables without plan.
6. Do not invent warehouse features; mark assumptions.

## Edge cases

- **CDC/streaming:** ordering, exactly-once illusions, watermarking.
- **Slowly changing dimensions:** SCD strategy explicit.
- **Multi-source joins:** source-of-truth hierarchy.
