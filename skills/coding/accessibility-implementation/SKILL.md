---
name: accessibility-implementation
description: Implement accessible UI — semantic HTML, keyboard behavior,
  focus management, and names — rather than only auditing. Use whenever
  the user asks how to build an accessible modal, menu, form, table, or
  component, wants ARIA patterns to implement, or to fix a11y findings
  in code.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Accessibility Implementation

Ship markup a keyboard and a screen reader can use. Prefer native
elements. ARIA is a last resort that you must keep in sync with state.

To *audit* an existing UI, use `accessibility-review`. Design-system
API work is `design-system-contribution`.

## Workflow

1. Name the widget and the equivalent native control (button, dialog,
   tabs, combobox, table).
2. Structure: heading/landmark/list/label first; role only if no native.
3. Keyboard map: Tab/Shift+Tab, Enter/Space, Escape, arrows if a
   composite. No trap except a modal that restores focus on close.
4. Name, role, value: visible label, `aria-expanded` / `aria-selected`
   only when the role requires them, and they must match JS state.
5. Focus: visible ring, logical order, initial focus in dialogs, return
   focus to the opener.
6. Motion and contrast: `prefers-reduced-motion`, do not convey meaning
   by color alone.
7. Test notes: keyboard path and one screen-reader smoke.

## Output format

```markdown
## A11y implementation: <widget>

**Native first:** …

### Markup
```html
<!-- minimal correct structure -->
```

### Keyboard
| Key | Behavior |

### State / ARIA
what is synced, what is not used

### Focus
open / move / close

### Do not
…
```

## Rules

1. `<div onclick>` is not a button. Use `<button type="button">`.
2. Do not add `role="button"` to a real `<button>`.
3. `aria-label` loses to a visible `<label>` when both exist and
   disagree — make them the same, or drop the aria.
4. Modals: focus in, inert/aria-modal the rest, Escape + close button,
   restore focus.
5. Live regions only for *new* status the user did not just type.
6. Icon-only controls need an accessible name.
7. Do not invent WCAG clause numbers. Describe the user path.

## Edge cases

- **Review request:** if they only want findings, point at
  `accessibility-review` and still offer the fix markup if they
  pasted broken code.
- **Custom select / combobox:** this is hard; implement a known
  pattern (listbox + input) rather than inventing one.
- **Canvas / chart:** provide a text summary or data table, not
  ARIA on every pixel.
- **SSR / hydration:** do not flash a non-keyboard version first.
---
