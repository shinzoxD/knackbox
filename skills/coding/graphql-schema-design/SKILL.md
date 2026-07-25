---
name: graphql-schema-design
description: Design and review GraphQL schemas for authz, pagination, N+1 risk,
  nullability, and evolution. Use whenever the user works on GraphQL types,
  resolvers, connections, deprecations, query cost, or schema reviews — even
  when they only paste an SDL snippet.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# GraphQL Schema Design

Schema is the product contract. Optimize for client clarity, server efficiency,
and safe evolution.

## Workflow

1. Clarify clients, auth model, and write vs read paths.
2. Model types and relationships; avoid leaking DB tables blindly.
3. Specify nullability deliberately (every `!` is a promise).
4. Pagination: connections/cursors for lists that can grow.
5. Authz: field and object level; never rely on "hidden" fields alone.
6. Evolution: deprecations, additive changes, versioning policy.
7. Performance: N+1, dataloader, query depth/cost limits.

## Output format

```markdown
## GraphQL design: <api>

### Type overview
…

### Queries / mutations
…

### Authz notes
…

### Pagination & errors
…

### Risks (N+1, breaking changes)
…

### Example operations
```

## Rules

1. Prefer additive evolution; mark breaking changes explicitly.
2. Mutations should return clear payloads (errors, viewer, mutated entity).
3. Do not put secrets in GraphQL types that any authorized client can query casually without field authz.
4. Lists without bounds need pagination or hard limits.
5. Document error handling conventions (union vs exceptions).
6. If SDL is incomplete, state assumptions about resolvers.

## Edge cases

- **Subscriptions:** auth, fan-out cost, filtering.
- **Federation:** ownership boundaries and shared types.
- **File uploads:** not always native; call out alternatives.
