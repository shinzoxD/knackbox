---
name: literature-reviews
description: >-
  Plan and synthesize a literature review across papers and reports, organizing
  evidence by research question rather than by source. Use whenever the user
  asks for a literature review, state-of-the-art overview, evidence map,
  comparison of studies, research gap analysis, or help structuring sources for
  an academic or technical review.
license: Apache-2.0
compatibility: Network access is optional when the user supplies all source material.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Literature Reviews

Build a transparent synthesis that explains what the evidence collectively
shows, where it conflicts, and what remains unknown.

## Workflow

1. Define the research question, population or system, outcome, period, and
   review purpose.
2. State inclusion and exclusion criteria before selecting evidence.
3. Search across appropriate databases and capture the query, date, and filters.
4. Extract comparable fields into an evidence matrix.
5. Assess study design, sample, bias, applicability, and confidence.
6. Synthesize by theme or question, not one paragraph per paper.
7. Identify genuine gaps and distinguish them from topics outside scope.

## Evidence matrix

| Source | Design/data | Sample/context | Finding | Limitation | Relevance |
|---|---|---|---|---|---|

## Output format

```markdown
# Literature review: <question>

## Scope and method
Question, databases/sources, search date, criteria, and review limitations.

## Evidence summary
Number and types of included sources; overall confidence.

## Findings by theme
For each theme: agreement, disagreement, magnitude, and evidence quality.

## Gaps and open questions
What is not known and what research would resolve it.

## Implications
What the evidence supports doing, avoiding, or testing next.
```

## Rules

1. Never claim the search is systematic unless the method and screening process
   meet that standard.
2. Keep study findings separate from author interpretation and your synthesis.
3. Preserve effect sizes, uncertainty, and sample context when available.
4. Weight evidence by quality and relevance, not citation count.
5. Note preprints, retractions, conflicts of interest, and inaccessible full text.
6. Do not call a topic a research gap merely because the supplied sources omit
   it.

## Edge cases

- With only a few user-provided sources, call the result a focused synthesis and
  state that the wider literature was not searched.
- When studies use incompatible outcomes, synthesize narratively rather than
  forcing a numerical comparison.
- When evidence conflicts, test differences in population, method, definitions,
  and time period before declaring the field inconsistent.
