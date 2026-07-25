---
name: policy-writing
description: Write clear internal policies people can follow under time pressure.
  Use whenever the user asks for a company policy, acceptable use policy, security
  policy draft, travel policy, or HR/process policy that needs plain language.
license: Apache-2.0
compatibility: Portable instructions; not legal advice — align with counsel.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Policy Writing

Policies state rules, scope, exceptions, and enforcement. Prefer short sentences
and testable requirements over corporate fog.

## Structure

```markdown
# Policy: <title>
**Owner:** …
**Effective:** …
**Applies to:** …

## Purpose
## Scope
## Requirements
## Exceptions
## Enforcement / consequences
## Related docs
## Revision history
```

## Rules

1. Requirements use must/should carefully and consistently.
2. Do not invent legal obligations; use provided constraints.
3. Define terms once; avoid undefined acronyms.
4. Separate procedure (how) from policy (must).
5. Include exception path and owner.
6. Make enforcement realistic.

## Edge cases

- **Regulated industries:** flag need for legal review.
- **Global companies:** locale variations.
- **Security policies:** pair with runbooks, not only prose.
