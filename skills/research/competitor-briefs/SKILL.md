---
name: competitor-briefs
description: Research competitors into structured comparison briefs with
  evidence and gaps. Use whenever the user asks for competitive analysis,
  competitor research, market landscape, battlecards, or how we compare to
  another product — even if they only name one rival.
license: Apache-2.0
compatibility: Portable instructions; may use web research when the runtime allows network access.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Competitor Briefs

Good competitive work is sourced, dated, and decision-oriented. Separate
facts from inference. Unknowns beat confident fiction.

## Workflow

1. Clarify the decision: pricing page, sales battlecard, build-vs-buy, roadmap
   gap, investor landscape.
2. Fix the comparison set (2–5 rivals + your product if relevant).
3. Collect dimensions that matter: ICP, core jobs-to-be-done, pricing model,
   key features, integrations, packaging, proof (customers, compliance).
4. For each claim, attach evidence (URL, doc, quote) or mark **unverified**.
5. Synthesize: where you win, lose, and what to learn — not a feature laundry
   list without prioritization.

## Output format

```markdown
# Competitor brief: <focus>
**Date:** …
**Decision this supports:** …
**Sources checked:** … (list)

## Snapshot table
| Dimension | Us | Comp A | Comp B |
|---|---|---|---|

## Competitor profiles
### <Name>
- Positioning:
- ICP:
- Pricing (if public):
- Strengths:
- Weaknesses / gaps:
- Notable proof:
- Sources:

## Implications
- Product:
- GTM / sales:
- Risks if we ignore:

## Open questions
- …

## Confidence
high | medium | low — and why (source quality, recency)
```

## Rules

1. Never invent pricing, customer logos, or feature support. Label estimates.
2. Prefer primary sources (vendor site, docs, pricing page, SEC filings) over
   random blogs; note access date when possible.
3. Compare on jobs-to-be-done, not raw feature counts.
4. Call out when a "competitor" is adjacent (different ICP) vs direct.
5. If offline / no network, produce a research plan and interview questions
   instead of fake findings.
6. Keep sales battlecards honest; overclaiming destroys trust in the field.

## Edge cases

- **Single competitor deep-dive:** still include a small "alternatives"
  section so the market is not a false duel.
- **Crowded market:** cluster by archetype (open source, enterprise suite,
  point tool) before naming every vendor.
- **Fast-changing pricing:** screenshot-level caution; mark "verify live".
- **User wants only a matrix:** deliver the table plus a 5-line implication
  summary minimum.
