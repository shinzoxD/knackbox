---
name: contract-redlines
description: Redline commercial paper — MSAs, vendor agreements, order forms,
  and DPA-adjacent commercial terms — as a business and risk pass, not legal
  advice. Use whenever the user says redline this MSA, mark up the contract,
  review a vendor agreement, check order form terms, flags auto-renew,
  liability cap, or indemnity, asks "is this clause bad", or wants fallback
  language before signing.
license: Apache-2.0
compatibility: Portable instructions; not legal advice; do not invent statute citations.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Contract Redlines

This is a **business/risk pass** on commercial paper — not legal advice
and not a substitute for counsel. Mark issues, explain commercial risk
in plain English, and propose fallback language the business can take
to legal. Never call a clause "illegal". Never invent statute citations,
prices, SLAs, or missing terms as if they exist.

For a vendor scorecard or bake-off, use `vendor-evaluation`. For answering
an RFP or RFI, use `rfp-response`. For SIG/CAIQ/security Q&A, use
`security-questionnaire`.

## Workflow

1. Name the paper (MSA, order form, vendor contract, DPA-adjacent
   commercial terms) and which side you represent (buyer vs seller).
2. Read only what the user provided. Quote or paraphrase the clause
   that is on the page. Do not invent missing clauses.
3. Scan commercial risk: term and auto-renew, fees and price change,
   liability cap, indemnity, IP, data-use, SLA credits as written,
   termination, assignment, audit, exclusivity.
4. Rate each issue: **deal-breaker**, **negotiate**, or **accept with note**.
5. Flag **counsel required** for liability, indemnity, governing law,
   and DPA/transfer. Draft a business ask; do not opine on the law.
6. Propose fallback language in plain English, not fake legalese.

## Output format

```markdown
## Redline: <document>

**Side:** buyer | seller
**Paper:** MSA | order form | vendor contract | commercial DPA terms
**Not legal advice.** Counsel for liability, indemnity, governing law, DPA/transfer.

### Issues
| # | Clause / § | Risk | Severity | Why it matters | Proposed fallback | Counsel? |
|---|------------|------|----------|----------------|-------------------|----------|

### Missing (asked about, not found)
- …  (do not draft as if present)

### Proposed markups (plain English)
**§ … — current:** …
**Ask:** …

### Open questions
- …
```

## Rules

1. This is not legal advice. Say so in every output.
2. Never invent prices, SLA percentages, credit formulas, or that a
   clause is "illegal". If the number is not on the page, it is unknown.
3. Do not invent missing clauses as if they exist. List them under
   **Missing** and ask whether to propose adding them.
4. Flag counsel for liability caps, indemnity (especially IP, data
   breach, unlimited), governing law / venue, and DPA / cross-border
   transfer. Offer a business position, not a legal conclusion.
5. Do not invent statute citations (no "GDPR Art. X", "CCPA §", "UCC").
6. Auto-renew: surface notice windows, opt-out mechanics, and price
   uplift as written. Do not assume a "standard" 30-day window.
7. Liability: note cap vs fees paid, super-caps, carve-outs, and
   whether the cap is mutual. Do not declare a cap "unenforceable".
8. Keep fallback language short and commercial. Prefer "cap at 12
   months of fees paid; carve-outs for IP infringement and willful
   misconduct" over reciting a fake section number.

## Edge cases

- **Excerpt only:** redline the excerpt; list unseen sections as
  unknown, not assumed clean.
- **User asks "is this clause bad?":** answer with risk + fallback,
  not a yes/no legal verdict.
- **DPA pasted as the whole ask:** extract commercial terms (audit,
  subprocessors, deletion, transfer) and send legal/transfer questions
  to counsel. Do not draft a full DPA.
- **HIPAA / "are we a covered entity" as the only ask:** out of scope;
  this skill redlines commercial paper, it does not determine regulatory
  status.
- **No paper attached:** ask for the clause or document; do not
  fabricate a vendor MSA.
- **Counsel already marked a clause:** preserve their mark; add
  business commentary only.
