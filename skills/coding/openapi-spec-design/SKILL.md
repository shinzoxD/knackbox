---
name: openapi-spec-design
description: Design and review OpenAPI specifications for clarity, consistency,
  and evolution. Use whenever the user writes OpenAPI or Swagger YAML/JSON,
  reviews API specs, or asks how to document REST endpoints for code generation
  and client SDKs.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# OpenAPI Spec Design

The spec is a contract. Optimize for accurate types, examples, error shapes,
and non-breaking evolution.

## Checklist

- openapi version, info, servers
- paths: methods, operationId, tags, summary
- parameters vs requestBody clarity
- schemas: required fields, enums, formats, nullable
- responses: success + error components
- securitySchemes and per-operation security
- examples that match schemas
- deprecation flags and changelog alignment

## Output format

```markdown
## OpenAPI review / design

### Issues
1. …

### Recommended components
…

### Example path sketch
```yaml
# snippet
```
```

## Rules

1. operationId stable and unique for codegen.
2. Do not mark fields required if servers omit them.
3. Reuse components.schemas; avoid copy-paste drift.
4. Document auth failures (401/403) consistently.
5. Breaking schema changes need versioning strategy.
6. Examples must validate against the schema mentally.

## Edge cases

- **File uploads:** multipart content types.
- **Webhooks:** callbacks section.
- **Polymorphism:** oneOf/anyOf discriminators carefully.
