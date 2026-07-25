---
name: market-sizing
description: Build transparent TAM SAM SOM style market sizing with explicit
  assumptions. Use whenever the user asks for market size, TAM/SAM/SOM, top-down
  or bottom-up sizing, addressable market, or investor-style market estimates.
license: Apache-2.0
compatibility: Portable instructions; may use public research when network is available.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Market Sizing

Sizing is a model, not a fact. Show math, sources, and sensitivity. Never invent
citeable market reports.

## Approaches

- **Top-down:** industry total → filters → SAM/SOM.
- **Bottom-up:** units × price × accounts you can reach.
- Prefer both when possible; reconcile gaps.

## Output format

```markdown
## Market sizing: <product>

### Definition of market
…

### TAM
assumptions + math

### SAM
…

### SOM (near-term)
…

### Sensitivity
what changes numbers most

### Sources / confidence
…
```

## Rules

1. Label every number assumption vs sourced.
2. If offline/no sources, give framework and inputs to gather — do not fake Gartner figures.
3. Align product wedge with SOM realism.
4. Currency and year explicit.
5. Avoid false precision (7 significant digits).
6. Separate existing spend vs net-new budget creation.

## Edge cases

- **Two-sided markets:** size carefully per side.
- **Platform shifts:** category creation humility.
- **Geographic rollout:** phased SOM.
