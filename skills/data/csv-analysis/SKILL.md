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
   rows that aren't headers.
2. **Compute with code** whenever an execution environment exists (pandas
   or equivalent). Show the code so results are checkable. Without
   execution, compute by hand only for small data (≤ ~30 rows) and say
   you did so.
3. **Answer the question first**, in one sentence with the number, then
   show supporting breakdowns as small tables (≤ 10 rows; aggregate the
   rest into "Other").
4. **State assumptions** you made: how nulls were treated, which column
   you interpreted as the date, currency units, deduplication.

## Rules

1. Never report a figure you didn't compute. If the data can't answer the
   question (missing column, wrong grain), say exactly what's missing.
2. Distinguish correlation from causation in any trend commentary.
3. Round for readability (2 significant decimals) but compute at full
   precision.
4. Flag data-quality problems that could change conclusions (duplicates,
   outliers, a month with half the usual rows) even when unasked.
5. Suggest a chart only when it adds insight; name the chart type and the
   exact columns to plot.

## Edge cases

- **File too large to display**: work on aggregates; never paste thousands
  of rows back at the user.
- **Ambiguous question** ("how are sales doing?"): compute the obvious
  read (total + trend by month), then ask which dimension to break down.
- **Multiple candidate columns** (two date fields): pick the one that
  matches the question, and say which you used.
