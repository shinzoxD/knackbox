---
name: release-notes
description: Write clear user-facing and developer release notes from commits,
  PRs, and changelogs. Use whenever the user asks for release notes, a
  changelog entry, what's new for a version, ship notes for customers or
  engineers, or a summary of changes between tags — even if they only paste
  commit subjects or merged PR titles.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Release Notes

Turn a pile of commits into notes people actually read. Audience decides
vocabulary; honesty decides what ships in the list.

## Choose the audience

| Audience | Voice | Include | Exclude |
|---|---|---|---|
| **Users / customers** | benefits, plain language | new capabilities, fixes they feel, migration steps they must take | refactors, dependency bumps, internal renames |
| **Developers / operators** | precise, technical | API changes, config flags, deprecations, upgrade steps | marketing fluff |
| **Mixed / CHANGELOG.md** | Keep a Changelog style | Added / Changed / Fixed / Deprecated / Removed / Security | empty sections |

If the user does not specify, default to **mixed Keep a Changelog** and offer
a short user-facing blurb on top when the release is product-visible.

## Workflow

1. Cluster commits/PRs by user-visible theme (not by file or author).
2. Drop noise: "fix typo", "merge main", pure formatting, WIP reverts that
   cancel out — unless security-relevant.
3. Rewrite each item as an outcome: what changed for the reader, not "updated
   FooService".
4. Call out **breaking changes** and **security fixes** first, with upgrade
   steps.
5. Attach version, date (ISO), and compare link placeholders if unknown.

## Output formats

### Keep a Changelog (default)

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Security
- …

### Breaking changes
- … Migration: …

### Added
- …

### Changed
- …

### Fixed
- …

### Deprecated
- …

### Removed
- …
```

Omit empty sections.

### Customer "What's new"

```markdown
# What's new in <Product> X.Y

**Highlights**
- One sentence each, benefit-led.

**Improvements**
- …

**Fixes**
- …

**Action required** (only if any)
- What to do, by when, link/placeholder for docs.
```

## Rules

1. Never invent features. If the commit list is ambiguous, write the safest
   reading and mark uncertainty with `[confirm: …]`.
2. One bullet = one idea. Merge five "fix null checks" commits into one
   "Fixed crashes when …" when the user-visible effect is the same.
3. Prefer user language: "Export to CSV" not "Added ExportService#toCsv".
4. Security fixes get a clear description of the *impact class* without a
   usable exploit recipe.
5. Breaking changes must include a migration path or an explicit "no
   automatic migration".
6. Keep the whole notes set scannable: ~5–15 bullets for a normal release;
   summarize long tails under "Other fixes".

## Edge cases

- **Only conventional commit subjects**: group by type (`feat`→Added,
  `fix`→Fixed, `feat!`/`BREAKING`→Breaking) then rewrite titles in prose.
- **Hotfix / patch**: lead with the fix and who should upgrade; skip
  empty marketing sections.
- **Internal platform release**: developer audience by default; include
  config and observability changes.
- **Nothing user-visible**: say so, produce a short internal changelog, and
  do not fake "Highlights".
