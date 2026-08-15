---
name: design-tokens
description: Implement a token and theming system — color, type, space,
  dark mode, CSS variables, and Style Dictionary. Use whenever the user
  mentions design tokens, theme tokens, CSS variables, dark mode tokens,
  style-dictionary, semantic color, a spacing scale, or "tokenizing our
  theme", or wants to replace hex and magic numbers with a theme contract.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Design Tokens

Ship a theme as named values, not hex in components. Primitives hold
palette and scale; semantics name intent; components consume those
via CSS variables. New component APIs, Storybook, and versioning a
primitive belong in `design-system-contribution`. Stay on the token
graph.

## Workflow

1. **Inventory.** Existing tokens, Figma variables, CSS custom
   properties, Tailwind theme, or hex/magic numbers in code. Reuse
   names and values already in the system.
2. **Layers.** Primitive (`palette.blue.500`, `space.4`) → semantic
   (`color.text.primary`, `space.stack.md`) → component tokens only
   when a control must diverge. Components never import primitives.
3. **Groups.** Color, type (size / line / weight / family), space,
   radius, elevation, motion. Same naming pattern in every group.
4. **Themes.** Dark, high-contrast, and density rebind semantics to
   different primitives. Same names; no `if (dark) #fff` in
   components.
5. **Runtime.** CSS variables from the source. Style Dictionary or
   DTCG JSON when they need a pipeline or multi-platform output.
6. **Pairs.** Text/bg and icon/surface pairs must meet contrast in
   every theme. Dark mode is a new check, not invert.
7. **Migrate.** Replace call sites incrementally. List leftover hex.

## Layers

| Layer | Holds | Consumed by |
|---|---|---|
| Primitive | raw palette / scale steps | semantic aliases only |
| Semantic | intent (`text.primary`, `space.stack`) | components, CSS |
| Component | optional overrides | that component only |

## Output format

```markdown
## Tokens: <system or surface>

**Source of truth:** existing files / Figma / none (structure only)
**Runtime:** CSS variables | Style Dictionary | other

### Layers
| Layer | Examples | Who may consume |

### Semantic set
| Token | Role | Light | Dark | Contrast pair |

### Scales
type, space, radius, elevation, motion — steps and names

### CSS / pipeline
custom-property names, generation, theme switch (class / data-attr)

### Migration
files to touch, leftover hex, breaking renames

### Open questions
missing brand values — do not fill with invented hex
```

## Rules

1. Semantic tokens in components. Good: `var(--color-bg-surface)`.
   Bad: `background: #0B1F3A` or `palette.navy.800`.
2. Never invent brand hex, typefaces, or a marketing palette. If the
   brand is missing, emit token names and ask; neutrals only as
   labeled placeholders.
3. Do not put primitive palette steps in component styles.
4. Dark mode changes bindings, not component CSS.
5. One spacing scale. No ad-hoc `13px` / `margin: 17px`.
6. Name by role (`color.text.muted`), not appearance (`color.gray`).
7. Do not invent Style Dictionary APIs. Describe source → transforms
   → CSS/JS; match their pipeline if one exists.
8. A new Button or Storybook story is `design-system-contribution`.
   Point there; still tokenize pasted hex.
9. Contrast pairs travel with the token, not as a follow-up.

## Edge cases

- **No brand file:** propose the graph and CSS variable contract;
  leave values as `[missing — ask brand]` — never a guessed hex.
- **Component request:** "add a Button to the design system" →
  `design-system-contribution`. Offer tokens only if theming is in
  scope.
- **A11y audit:** contrast of existing UI is `accessibility-review`.
  Token pairing for a theme stays here.
- **Tailwind / CSS-in-JS / native:** map the same semantics; do not
  fork a second palette.
- **Forced-colors / high-contrast:** extra theme or system colors;
  invert is not enough.
- **Breaking rename:** alias the old name; do not silently swap hex.
