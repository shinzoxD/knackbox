---
name: user-interview-synthesis
description: Synthesize user interviews into themes, insights, and opportunities.
  Use whenever the user pastes interview notes or transcripts and wants themes,
  affinity mapping, insights, JTBD, or product opportunities from qualitative
  research — even from messy notes.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# User Interview Synthesis

Qual synthesis turns anecdotes into decision-useful patterns without erasing
dissent. Tag evidence. Separate observation from interpretation.

## Workflow

1. Note research goal and participant mix (if known).
2. Extract atomic observations and quotes (paraphrase ok; mark exact quotes).
3. Cluster into themes; count how many participants support each (n).
4. Write insights as "force of nature" statements with evidence.
5. Opportunities and recommendations with confidence.
6. Gaps and follow-ups (who else to interview, what to validate quantitatively).

## Output format

```markdown
## Synthesis: <study name>
**Participants:** n=…
**Goal:** …

### Themes
#### Theme title (n=k/N)
- Evidence bullets / quotes
- Counterexamples

### Insights
1. …

### Opportunities
| Opportunity | Evidence | Confidence | Effort guess |

### Divergent perspectives
…

### Method notes & limitations
…
```

## Rules

1. Never invent quotes or participants.
2. One loud user ≠ a theme; show counts or caution.
3. Keep raw pain language; do not sanitize into corporate mush too early.
4. Separate what users do vs what they say they want.
5. Label speculation clearly.
6. Privacy: strip PII not needed for product decisions.

## Edge cases

- **n=1–2:** micro-synthesis + strong caution.
- **Mixed segments:** theme within segment first.
- **Stakeholder wants only highlights:** still attach evidence links/anchors.
