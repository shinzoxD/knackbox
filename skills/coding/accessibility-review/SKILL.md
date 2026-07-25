---
name: accessibility-review
description: Review UI and content for accessibility issues against WCAG-minded
  practices. Use whenever the user asks for an a11y review, accessibility audit,
  ARIA help, keyboard navigation, screen reader support, or whether a UI is
  accessible — even for small component snippets.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Accessibility Review

Accessibility is usability under more constraints. Prefer semantic HTML and
native controls before ARIA. Findings should be actionable and severity-tagged.

## Review order

1. **[critical]** Keyboard traps, missing names on controls, contrast failures on primary UI, content only as color.
2. **[serious]** Focus order wrong, incomplete labels, modal focus not managed, skip link missing on large pages.
3. **[moderate]** Heading hierarchy skips, redundant ARIA, target size.
4. **[minor]** Text alternatives that could be clearer, non-blocking polish.

## Checklist

- Semantics: headings, lists, landmarks, buttons vs links, form labels.
- Keyboard: tab order, Enter/Space, Escape for dialogs, no keyboard trap.
- Name/role/value: accessible names, expanded/pressed states.
- Visual: contrast, focus visibility, zoom to 200% without loss of action.
- Media: captions/transcripts when media is in scope.
- Motion: respect reduced motion when animations are significant.

## Output format

```markdown
## A11y review: <surface>

### Findings
1. [critical] … — impact — fix

### What looks good
- …

### Test plan
Keyboard path, screen reader smoke, automated scan suggestions.
```

## Rules

1. Prefer native elements over ARIA reimplementation.
2. Do not invent WCAG clause numbers if unsure; describe the user impact.
3. Screenshots alone are incomplete — ask for HTML/structure when needed.
4. Separate product bugs from a11y defects only when both matter.
5. Offer concrete markup fixes, not only "add ARIA".

## Edge cases

- **Design-only mock:** review labels, contrast assumptions, focus order as guidance.
- **Complex widgets:** require keyboard map and state announcements.
- **Charts:** text summary or data table alternative.
