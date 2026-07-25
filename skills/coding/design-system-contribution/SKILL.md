---
name: design-system-contribution
description: Guide contributions to a design system — component API, accessibility,
  tokens, and docs. Use whenever the user adds a design-system component, variants,
  design tokens, Storybook docs, or asks how to version UI primitives safely.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Design System Contribution

Design systems succeed on consistency and safe evolution. Components need a
stable API, a11y, tokens, and docs — not one-off CSS.

## Workflow

1. Problem: which user/product need; is a primitive missing or a composition?
2. API: props, variants, slots/composition; avoid prop explosion.
3. Tokens: color/space/type via tokens, not magic numbers.
4. A11y: keyboard, name/role, focus, contrast baselines.
5. Docs: examples, do/don't, accessibility notes, Storybook stories.
6. Versioning: additive changes preferred; breaking changes flagged.

## Output format

```markdown
## DS contribution: <component>

### API proposal
…

### Tokens
…

### A11y requirements
…

### Docs / stories
…

### Migration / versioning
…
```

## Rules

1. Prefer composition over mega-components.
2. Do not invent brand tokens; use or extend the system’s token names.
3. Ship accessibility with the component, not as follow-up.
4. Public API needs explicit default and controlled/uncontrolled behavior.
5. Visual QA across themes/densities when those exist.
6. Coordinate with product one-offs: promote only when reused.

## Edge cases

- **Icons:** sizing, aria-hidden vs labeled buttons.
- **Forms:** label association and error text.
- **Breaking visual change:** major version or explicit migration.
