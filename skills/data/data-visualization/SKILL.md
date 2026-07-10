---
name: data-visualization
description: >-
  Choose and produce clear, honest charts from tabular or summarized data. Use
  whenever the user asks for a chart, dashboard, plot, visual comparison, trend
  view, or advice on how to visualize data, including requests to improve an
  existing graph or select the right chart type.
---

# Data Visualization

Build a visual that answers one decision-relevant question. Select the chart
from the analytical task, not from novelty or decoration.

## Workflow

1. State the question the chart must answer and the intended audience.
2. Verify the fields, units, time grain, missing values, and aggregation.
3. Choose an encoding that matches the task.
4. Build the simplest legible chart and label the important evidence directly.
5. Check scale integrity, color accessibility, and mobile readability.
6. Include the data source, transformations, and caveats.

## Chart selection

- **Trend over time:** line chart; use bars for short discrete periods.
- **Category comparison:** sorted bars or dot plot.
- **Distribution:** histogram, box plot, or density plot with sample size.
- **Relationship:** scatter plot with units and an optional justified trendline.
- **Part to whole:** stacked bars for a few comparable groups; avoid many slices.
- **Geographic pattern:** map only when location is analytically meaningful.
- **Operational monitoring:** compact time series, thresholds, and current value.

## Output format

```markdown
## Visual specification

**Question:** ...
**Chart:** ... because ...
**X / Y / color / facet:** ...
**Aggregation:** ...
**Annotations:** ...
**Accessibility:** palette, text alternative, table fallback
**Caveats:** ...
```

When code is requested, return runnable code plus the generated artifact or a
precise preview description.

## Rules

1. Start quantitative axes at zero for bars unless a clearly labeled exception
   is necessary. Lines may use a focused scale when it does not exaggerate.
2. Do not use 3D effects, decorative gradients, or area encodings that distort
   comparisons.
3. Use color to encode meaning, not to compensate for weak hierarchy.
4. Label units, denominators, date ranges, and filters.
5. Do not imply causation from correlation or continuity across missing periods.
6. Provide a table or text summary for users who cannot inspect the chart.

## Edge cases

- For dual axes, prefer separate aligned charts; use dual axes only with an
  explicit reason and unmistakable labels.
- For small samples, show individual observations when privacy allows.
- For dashboards, prioritize repeated scanning and comparison over card-heavy
  decoration.
