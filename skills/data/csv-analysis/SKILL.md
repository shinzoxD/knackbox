---
name: csv-analysis
description: Analyze CSV, TSV, and tabular data files — profile the data,
  answer questions with verifiable numbers, and flag quality issues. Use
  whenever the user uploads or pastes tabular data, asks "what does this
  data show", wants totals, trends, comparisons, or charts from a
  spreadsheet-like file, or asks any question that must be answered from
  rows and columns.
license: Apache-2.0
compatibility: Portable instructions; may use local tabular-data analysis tools.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read-write"
  knackbox.execution: "optional"
---

# CSV Analysis

Answers must be computed, not estimated. Every number you report should be
reproducible from the file.

## Process

1. **Profile before answering.** Report: rows × columns, column names with
   inferred types, null counts, and 3 sample rows. Flag parsing hazards:
   delimiter, encoding, thousands separators, mixed date formats, header
   rows that aren't headers, quoted newlines, BOM.
2. **Define the grain.** One row = one what? (order line, daily total,
   user snapshot). Wrong grain is the most common source of wrong answers.
3. **Compute with code** whenever an execution environment exists (pandas,
   polars, SQL, or equivalent). Show the code so results are checkable.
   Without execution, compute by hand only for small data (≤ ~30 rows) and
   say you did so.
4. **Answer the question first**, in one sentence with the number, then
   show supporting breakdowns as small tables (≤ 10 rows; aggregate the
   rest into "Other").
5. **State assumptions**: null treatment, date column chosen, currency
   units, timezone, deduplication keys, inclusive date ranges.

## Output shape

```markdown
## Answer
<one sentence with the key number(s)>

## How I got there
- Grain: …
- Filters: …
- Metric definition: e.g. net = revenue - refunds

## Profile (first time on this file)
| rows | cols | notes |
Code or steps used.

## Supporting table
(compact)

## Data quality flags
- …

## Caveats
correlation ≠ causation; coverage gaps; etc.
```

## Rules

1. Never report a figure you didn't compute. If the data can't answer the
   question (missing column, wrong grain), say exactly what's missing.
2. Distinguish correlation from causation in any trend commentary.
3. Round for readability (2 significant decimals for rates; keep currency
   to cents if source has them) but compute at full precision.
4. Flag data-quality problems that could change conclusions (duplicates,
   outliers, a month with half the usual rows, silent unit mixes) even
   when unasked.
5. Suggest a chart only when it adds insight; name the chart type and the
   exact columns to plot — defer drawing to data-visualization when the
   user mainly wants a chart.
6. Prefer explicit metric definitions: "active users = users with ≥1 event
   in the window", not "engagement".
7. When comparing groups, report denominators (n=) and avoid percentages
   of tiny samples without a warning.

## Common metric patterns

| Question shape | Default approach |
|---|---|
| "Which X is best?" | Define metric, time window, min sample size; rank with n |
| "How are sales doing?" | Total + period-over-period + top breakdown dimension |
| "Churn / retention" | Cohort definition, censoring for still-active users |
| "Funnel" | Ordered stages, same user universe, drop-off % per step |
| "Anomaly" | Baseline period, absolute and % change, segment that drives it |

## Edge cases

- **File too large to display**: work on aggregates; never paste thousands
  of rows back at the user.
- **Ambiguous question** ("how are sales doing?"): compute the obvious
  read (total + trend by month), then ask which dimension to break down.
- **Multiple candidate columns** (two date fields): pick the one that
  matches the question, and say which you used.
- **Messy types** ("1,200" as string, mixed null tokens `NA`/`n/a`/`-`):
  clean in a visible step before aggregating; coordinate with data-cleaning
  skill patterns when the job is mostly cleanup.
- **Joined-looking flat files**: watch double-counting when a header-level
  amount is repeated on every line item.
- **No execution environment**: refuse large-file numeric claims; sample
  or ask for pre-aggregates.

## Validation habit

After the main answer, sanity-check:

- Row counts before/after filters
- Totals roughly match sum of breakdown parts
- Dates sorted and range matches the claimed window
