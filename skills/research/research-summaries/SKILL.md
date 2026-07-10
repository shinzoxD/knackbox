---
name: research-summaries
description: Summarize papers, articles, and reports into structured
  research briefs that separate claims from evidence. Use whenever the
  user shares a paper, study, PDF, or article and asks what it says,
  wants key findings or limitations, asks "is this study any good", or
  needs several sources synthesized into one brief.
license: Apache-2.0
compatibility: Network access is optional when the user supplies all source material.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Research Summaries

Produce a brief that lets the reader decide whether to trust and whether
to read the original. Precision about *who claims what on what evidence*
matters more than coverage.

## Output format (single source)

```markdown
# <Title> — <authors, year, venue>

**One-line takeaway:** <the finding, with effect size if given>

**Research question:** ...
**Method:** design, sample/data size, key controls (2–3 lines)
**Findings:** the 2–4 results that matter, each with its number
**Limitations:** authors' stated ones, THEN yours — labeled separately
**Relevance to you:** 1–2 lines tied to the user's stated purpose
```

## Rules

1. Three layers, never blended: (a) what the authors found, (b) what the
   authors claim it means, (c) your assessment. Label (c) explicitly
   ("My read: ...").
2. Keep numbers attached to findings: sample size, effect size, p-values
   or intervals where given. "Improved outcomes" without magnitude is
   banned.
3. Note the evidence tier when relevant: RCT vs. observational vs.
   simulation vs. opinion — one phrase, not a lecture.
4. Quote at most one short phrase; everything else in your own words.
5. If you only saw an abstract or excerpt, say so — never summarize
   sections you didn't read as if you had.
6. Failure modes to flag when present: tiny samples, no control group,
   conflicts of interest, results that don't support the headline claim.

## Synthesizing multiple sources

Organize by *question*, not by source. For each question: where sources
agree, where they conflict (name them), and what would resolve the
conflict. End with a one-paragraph state-of-the-evidence.

## Edge cases

- **Paywalled/missing source**: work from what's provided and mark the
  gap; don't reconstruct from memory of the paper.
- **User wants "simple" version**: keep the numbers, simplify the words —
  accuracy survives simplification, precision does not get dropped.
- **Preprints**: note peer-review status in one phrase.
