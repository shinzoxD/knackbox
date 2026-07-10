---
name: commit-messages
description: Write clear, conventional git commit messages from diffs or
  descriptions of changes. Use whenever the user asks for a commit message,
  is about to commit changes, mentions "git commit", shares a diff or staged
  changes that need summarizing, or finishes a coding task that will be
  committed — even if they don't ask about message formatting.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Commit Messages

Produce commit messages in Conventional Commits style that explain *why* a
change exists, not just what changed. A reader six months from now should
understand the intent without opening the diff.

## Format

```
<type>(<optional scope>): <summary in imperative mood, ≤50 chars>

<optional body: what and why, wrapped at 72 chars>

<optional footer: BREAKING CHANGE, issue refs>
```

Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `build`, `ci`, `chore`.

## Rules

1. Summary line uses the imperative mood: "add", not "added" or "adds".
   Test: the line should complete the sentence "If applied, this commit
   will ___".
2. Never end the summary with a period.
3. Choose the type by *intent*, not by files touched: a bug fix that adds a
   test is `fix`, not `test`.
4. Add a body only when the diff doesn't speak for itself — explain
   constraints, trade-offs, or the bug's root cause. Skip it for trivial
   changes.
5. Breaking changes get a `!` after the type/scope **and** a
   `BREAKING CHANGE:` footer describing the migration.
6. One logical change per message. If the diff contains unrelated changes,
   say so and propose splitting it into separate commits.

## Examples

Good:

```
fix(auth): prevent session fixation on login

Regenerate the session ID after successful authentication.
Previously the pre-login session ID was reused, allowing an
attacker who set a victim's cookie to hijack the session.

Closes #482
```

Bad (vague, past tense, wrong type):

```
chore: updated some auth stuff and fixed bugs.
```

## Edge cases

- **No diff provided**: ask for `git diff --staged` output or a short
  description of the change; don't invent specifics.
- **Huge mixed diff**: summarize the dominant change as the commit, list the
  unrelated changes, and recommend separate commits for them.
- **User's repo has its own convention** (visible from `git log`): match the
  existing convention instead of this one, and say you're doing so.
