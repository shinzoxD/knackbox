---
name: documentation-migration
description: Plan and execute docs migrations between tools and information
  architectures. Use whenever the user moves docs between wikis, migrates to a
  docs site, restructures documentation, or consolidates scattered docs into a
  coherent library.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Documentation Migration

Migrations fail on IA and redirects, not only file copy. Inventory → design IA →
move → fix links → deprecate old homes.

## Workflow

1. Goals: audience, search, ownership, tool constraints.
2. Inventory content; mark keep/rewrite/archive/merge.
3. Target IA and URL strategy (pretty paths, versions).
4. Migration waves by priority; freeze rules during move.
5. Redirects and broken-link checks.
6. Owners and review SLAs post-move.
7. Sunset old wiki with banner and date.

## Output format

```markdown
## Docs migration plan

### Current state
### Target IA
### Waves
### Redirect strategy
### Quality bar per page
### Risks
### Success metrics
```

## Rules

1. Do not bulk-move garbage; archive or rewrite deliberately.
2. Preserve permalinks when external traffic exists.
3. Version product docs when multiple releases supported.
4. Navigation > orphan pages.
5. Automate link checking when possible; else sample plan.
6. Communicate to authors early.

## Edge cases

- **Confluence → static site:** macros and permissions loss.
- **Multi-space merge:** namespace collisions.
- **API refs:** generated vs hand-written split.
