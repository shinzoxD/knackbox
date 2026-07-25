---
name: i18n-review
description: Review product UI and copy for internationalization readiness —
  concatenation, pluralization, locale formats, RTL, and string extraction. Use
  whenever the user asks about i18n, l10n, localization readiness, translation
  safety, or whether strings are ready for other locales.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# i18n Review

Localization fails when English sentences are glued in code. Review for
extractable strings, plural rules, locale formats, and layout resilience.

## Checklist

- **Extraction:** user-visible strings not hardcoded in ways that block catalogs.
- **Concatenation:** no `Hello + name + , you have + n + messages` patterns.
- **Placeholders:** named placeholders; translators can reorder.
- **Plurals:** ICU/CLDR plural forms, not `n == 1 ? singular : plural` only.
- **Dates/numbers/currency:** locale-aware formatting, not hardcoded MM/DD/YYYY.
- **Layout:** flex/wrap for long German/Finnish; no tight fixed widths on labels.
- **RTL:** mirroring, icons, and bidirectional text when RTL is in scope.
- **Images/text in images:** not the only way to convey meaning.
- **Locale negotiation:** Accept-Language / user setting consistency.

## Output format

```markdown
## i18n review: <surface>

### Findings
1. [blocking|important|nit] … — fix

### Tracking / process notes
Pseudo-loc, glossary, freeze windows if relevant.

### Test plan
Locales to sample, plural edge cases, RTL smoke.
```

## Rules

1. Prefer concrete code fixes over "be careful with translations".
2. Do not claim a library API exists if unsure — describe the requirement.
3. Separate copy tone edits from i18n mechanics.
4. Gender/agreement languages: avoid forced English grammar in templates.
5. Measure/unit and address formats when forms are in scope.
6. If only designs (no code), review copy structure and layout assumptions.

## Edge cases

- **Server-generated emails:** still need locale and plural rules.
- **Logs/ops strings:** usually do not translate; mark as internal.
- **Mixed LTR product names in RTL UI:** bidi isolation guidance.
