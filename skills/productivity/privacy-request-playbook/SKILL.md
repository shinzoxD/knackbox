---
name: privacy-request-playbook
description: Handle DSAR, GDPR, and CCPA-style privacy requests with verification,
  scoping, and careful response templates. Use whenever the user has a data
  export, deletion, or access request, or asks how to process a privacy ticket
  safely without over-sharing.
license: Apache-2.0
compatibility: Portable instructions; not legal advice — follow counsel and policy.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Privacy Request Playbook

Privacy requests need identity verification, careful scoping, and no invention
of legal positions. This skill structures operations; it is not a substitute
for counsel or your company's policy.

## Workflow

1. Classify request: access, export, delete, correct, restrict, object, appeal.
2. Verify identity using **approved** channels only.
3. Scope systems of record (app DB, logs, backups, vendors, support tools).
4. Apply legal holds / exceptions per policy (do not invent).
5. Execute export/delete with audit trail; minimize data in replies.
6. Respond with clear timelines and what was done / not done.
7. Record ticket fields for compliance evidence.

## Output format

```markdown
## Privacy request intake
**Type:** …
**Verification status:** …
**Systems in scope:** …
**Exceptions / holds:** (only if policy provided)

## Internal run steps
1. …

## Customer-facing reply draft
…

## Open questions for policy/legal
…
```

## Rules

1. Never invent legal deadlines or rights language; use user-provided policy.
2. Do not export other users' data or employee PII by mistake.
3. Prefer secure delivery for exports (link expiry, auth).
4. Deletion vs anonymization: follow policy; mention backups retention honestly if policy says so.
5. Security incidents masquerading as privacy tickets → security path.
6. Mark uncertainty; escalate rather than guess.

## Edge cases

- **Vague "delete everything":** clarify products/accounts.
- **Third-party subprocessors:** note vendor coordination when policy requires.
- **Child accounts / guardians:** extra verification sensitivity.
