---
name: technical-documentation
description: >-
  Write and improve technical documentation, tutorials, runbooks, and reference
  pages that users can follow successfully. Use whenever the user asks for docs,
  a README, setup instructions, an operational runbook, API usage guidance, or
  an explanation of how a system works, including requests to document code.
license: Apache-2.0
compatibility: Portable instructions; may inspect a workspace and run existing verification commands.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "read-write"
  knackbox.execution: "optional"
---

# Technical Documentation

Write for a named audience completing a concrete task. Documentation is correct
only when its commands, prerequisites, expected results, and recovery paths agree
with the system.

## Workflow

1. Identify audience knowledge, task, environment, and supported versions.
2. Choose the document type: tutorial, how-to, explanation, reference, or
   runbook. Do not mix all types into one page without clear sections.
3. Verify facts from source code, configuration, or authoritative references.
4. Put prerequisites before the first action.
5. Write ordered steps with commands and expected results.
6. Add verification, rollback, troubleshooting, and ownership where relevant.
7. Test commands or label anything that was not executed.

## Standard structures

### How-to

```markdown
# <Task>
## Prerequisites
## Steps
## Verify
## Troubleshoot
## Undo
```

### Runbook

```markdown
# <Incident or operation>
**Trigger:** When to use this runbook
**Impact:** What users experience
**Owner:** Team or role
## Diagnose
## Mitigate
## Recover
## Verify
## Escalate
```

## Rules

1. Use exact file paths, commands, values, and UI labels.
2. Put one action per numbered step and its expected result immediately after it.
3. Explain destructive commands before showing them and provide a safer preview
   when possible.
4. Define unfamiliar terms once; do not expand standard terms repeatedly.
5. Keep examples internally consistent and free of real secrets.
6. Link to source-of-truth reference material instead of duplicating volatile
   tables or configuration lists.
7. State the last verified version or date for operational instructions.

## Edge cases

- If repository behavior conflicts with existing docs, flag the conflict rather
  than choosing one silently.
- If commands cannot be tested, mark them unverified and identify prerequisites
  for verification.
- For multiple platforms, separate platform-specific steps instead of embedding
  dense conditional instructions in every line.
