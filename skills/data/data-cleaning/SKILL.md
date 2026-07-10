---
name: data-cleaning
description: >-
  Profile and clean messy tabular datasets with reproducible transformations and
  explicit handling of types, missing values, duplicates, and outliers. Use
  whenever the user has inconsistent CSV or spreadsheet data, asks to prepare
  data for analysis, merge records, standardize columns, remove duplicates, or
  fix data-quality problems.
---

# Data Cleaning

Turn raw data into an analysis-ready dataset without hiding assumptions or
destroying information.

## Workflow

1. Preserve the original input and work on a copy.
2. Profile row count, columns, inferred types, nulls, unique values, ranges, and
   duplicate candidates.
3. Define the target schema and record-level identity rules.
4. Apply transformations in explicit, reproducible steps.
5. Validate the result against invariants and reconcile row-count changes.
6. Produce a cleaning report alongside the cleaned output.

## Cleaning order

1. Normalize column names and encoding.
2. Parse types, dates, units, booleans, and categorical labels.
3. Trim whitespace and normalize known sentinel values.
4. Resolve exact and fuzzy duplicates using documented keys.
5. Handle missing values according to column meaning.
6. Inspect impossible values and outliers without deleting them automatically.
7. Validate keys, ranges, cross-field rules, and referential integrity.

## Output format

```markdown
## Data quality report

**Input:** rows, columns, source
**Output:** rows, columns

### Changes
| Step | Rule | Rows affected | Reversible |
|---|---|---:|---|

### Remaining issues
| Column | Issue | Count | Recommended decision |
|---|---|---:|---|

### Validation
- Passed invariants
- Failed or unverified invariants
```

Provide the exact script, query, or transformation steps when tools are
available.

## Rules

1. Never overwrite raw data.
2. Do not silently impute missing values or remove outliers.
3. Preserve original values when a normalization may be disputed.
4. Distinguish an empty value, unknown value, not-applicable value, and zero.
5. Reconcile every dropped or merged row with counts.
6. Use deterministic matching rules and surface ambiguous duplicate groups for
   review.

## Edge cases

- For personally identifiable data, minimize exposure and do not echo sensitive
  rows into the report.
- For locale-dependent dates and decimals, require or infer the locale with a
  stated confidence level.
- For large files, profile in chunks and verify that chunk processing preserves
  global duplicate and ordering rules.
