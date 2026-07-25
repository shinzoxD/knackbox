---
name: rfp-response
description: Structure RFP and RFI responses that map requirements to evidence.
  Use whenever the user answers a vendor questionnaire, RFP, RFI, security
  questionnaire, or procurement response with claim-and-evidence rows.
license: Apache-2.0
compatibility: Portable instructions; do not invent compliance certifications.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# RFP / Questionnaire Response

Buyers compare evidence, not adjectives. Map each requirement to status,
explanation, and proof. Never invent certifications or customers.

## Workflow

1. Extract requirements into a matrix.
2. Status: meets / partial / roadmap / does not meet / N/A.
3. Evidence: doc links, architecture notes, screenshots placeholders.
4. Risks and differentiators honestly.
5. Consistent tone; single voice pass at end.
6. Track owners for gaps.

## Output format

```markdown
## Requirement matrix
| ID | Requirement | Status | Response | Evidence | Owner |

## Narrative summary
…

## Gaps / risks
…

## Questions back to buyer
…
```

## Rules

1. Never claim SOC2/ISO/etc. without user confirmation.
2. Partial is better than misleading yes.
3. Keep answers scoped to the asked requirement.
4. Mark assumptions.
5. Security questionnaires: no sensitive internal diagrams beyond policy.
6. Version the response package.

## Edge cases

- **Boilerplate libraries:** still tailor critical rows.
- **Page limits:** executive summary + matrix appendix.
- **Multi-product:** state which product SKU.
