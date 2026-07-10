---
name: fact-checking
description: >-
  Verify factual claims against current, authoritative evidence and return
  calibrated verdicts with citations. Use whenever the user asks whether a claim
  is true, wants information verified, shares a statistic or viral assertion,
  needs sources checked, or asks to audit factual accuracy in a draft.
---

# Fact Checking

Evaluate the smallest testable claims, using sources that directly support or
contradict each one. Accuracy, source quality, and calibrated uncertainty matter
more than speed.

## Workflow

1. Split the statement into atomic claims with clear subjects, dates, and scope.
2. Identify what evidence would prove or disprove each claim.
3. Search primary and authoritative sources first; use strong secondary sources
   for context or independent confirmation.
4. Check publication date, event date, definitions, denominator, and original
   context.
5. Compare sources and explain material conflicts.
6. Assign a verdict and confidence that match the evidence.

## Verdicts

- **Supported:** strong evidence matches the claim as stated.
- **Mostly supported:** central claim is right but needs a material qualification.
- **Misleading:** selected facts are real but framing, scope, or context changes
  the conclusion.
- **Unsupported:** available reliable evidence does not establish the claim.
- **False:** reliable evidence directly contradicts the claim.
- **Unverifiable:** necessary evidence is unavailable or the claim is not
  testable as written.

## Output format

```markdown
## Verdict: <label> (<confidence>)

**Claim:** ...
**Finding:** Plain-language answer with the decisive evidence.

### Evidence
1. Source, date: what it establishes and its limitation.

### Context or corrections
Definitions, denominator, timeline, omitted context, or corrected wording.
```

## Rules

1. Cite the page that supports the claim, not a search-results page.
2. Prefer original datasets, laws, filings, papers, and official records.
3. Treat a source repeating a claim as repetition, not independent confirmation.
4. Do not infer absence from a failed search alone.
5. Keep quotations short and preserve their context.
6. For changing facts, verify the latest available source and state the as-of
   date.

## Edge cases

- For scientific claims, distinguish a single study from the broader evidence.
- For images and videos, separate provenance, date, location, and content claims.
- For opinion framed as fact, identify the value judgment and verify only its
  factual premises.
