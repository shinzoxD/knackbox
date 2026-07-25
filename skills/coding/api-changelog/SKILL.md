---
name: api-changelog
description: Write consumer-facing API changelogs and migration notes for
  breaking and additive changes. Use whenever the user asks for an API changelog,
  OpenAPI migration notes, deprecation announcement, version diff summary, or
  how to communicate a breaking API change to clients.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# API Changelog

API consumers need precise deltas: what changed, who is affected, and how to
migrate. Prefer machine-readable intent plus human migration steps.

## Sections

```markdown
# API changelog — <service> <version or date>

## Summary
One paragraph.

## Breaking changes
- …

## Deprecations
- … (removal date if known)

## Additive changes
- …

## Bug fixes (API-visible)
- …

## Migration guide
### Before
### After
### Rollout / dual-run

## OpenAPI / SDK notes
…
```

## Rules

1. Never invent endpoints or fields not in the source material.
2. Label breaking vs non-breaking carefully (nullability, enum, auth).
3. Include example requests/responses for migrations.
4. Deprecations need timeline and replacement.
5. Separate internal refactors that do not affect clients.
6. Link ticket/RFC ids when provided.

## Edge cases

- **GraphQL:** field deprecation directives and client query impact.
- **Webhooks:** payload changes and signature versioning.
- **Errors:** new codes clients must handle.
