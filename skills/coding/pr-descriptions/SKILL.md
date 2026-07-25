---
name: pr-descriptions
description: Write pull request titles and descriptions that reviewers can
  act on fast. Use whenever the user asks for a PR description, opens or
  prepares a pull/merge request, shares commits or a branch diff to
  summarize, or says "write up this PR" — even if they only paste a diff.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# PR Descriptions

Write for the reviewer first and the git historian second. A good PR
description lets a reviewer predict what they'll see in the diff before
they open it.

## Format

```markdown
<type>: <imperative title, ≤ 70 chars>

## What
2–4 sentences: the change at the level of behavior, not files.

## Why
The problem or requirement this solves. Link issues: Closes #123.

## How to test
Numbered, copy-pasteable steps a reviewer can run, with expected results.

## Notes for reviewers   (only if needed)
Risky spots, decisions you want challenged, follow-ups deliberately
left out.

## Breaking changes      (only if any)
What breaks and the migration path.

## Screenshots / recordings  (only for UI)
Before/after or a short path through the UI.
```

If the repo already has a PR template, fill *that* structure and map the
sections above into it rather than inventing a parallel format.

## Rules

1. Derive content from the diff/commits provided — never pad with invented
   details or generic statements ("improved performance") that the diff
   doesn't show.
2. Title follows the repo's commit convention if visible; otherwise
   Conventional Commits types (`feat`, `fix`, `refactor`, `docs`, `test`,
   `chore`, `perf`, `ci`).
3. "How to test" must be executable as written: commands, URLs, sample
   inputs, expected output. Include at least one negative/edge path when
   the change touches validation or auth.
4. Mention what you did NOT do when it's a natural question ("did not
   migrate the v1 endpoint; tracked in #456").
5. Keep the whole description under ~300 words unless the change is
   genuinely large; for large PRs, add a short "Review map" (which files
   matter first).
6. Call out migrations, feature flags, and rollout order explicitly.
7. Security- or privacy-sensitive changes get one plain sentence on impact
   and how it was verified (without writing an exploit).

## Title patterns

| Situation | Title shape |
|---|---|
| New capability | `feat: allow CSV export on reports` |
| Bug | `fix: prevent null tax crash on invoices` |
| Breaking API | `feat!: require DATABASE_URL instead of DB_URL` |
| Behavior-neutral | `refactor: extract session validation helper` |

**Bad:** "Update code", "Fix stuff", "WIP", "Address comments".
**Good:** states the user-visible or API-visible outcome.

## Rules for multi-commit branches

- Summarize the *net* behavior of the branch, not each commit.
- If history is noisy, still describe the final state; optionally note
  "squashed commits recommended".
- List secondary fixes under Notes only if a reviewer would otherwise
  wonder why those files changed.

## Edge cases

- **Mixed/unrelated changes in one branch**: describe the primary change,
  list the stragglers under Notes, and suggest splitting if practical.
- **No issue link exists**: write the Why from the diff and flag that no
  ticket is referenced.
- **Draft PRs**: lead with what feedback is wanted and what's known to be
  unfinished; title may include `(draft)` only if the forge does not have
  a draft state.
- **Revert PRs**: state what is reverted, why, and whether a follow-up fix
  is planned.
- **Generated code / lockfiles**: mention them so reviewers know not to
  line-read noise; point at the source change that caused regeneration.
- **Docs-only**: shorten to What + Why; testing can be "preview docs site"
  or "read-through".

## Self-check before delivery

- [ ] Title ≤ 70 chars, imperative, accurate
- [ ] What is behavior-level, not a file list
- [ ] Why is present (problem/motivation)
- [ ] Test steps are runnable with expected results
- [ ] No claims the diff does not support
