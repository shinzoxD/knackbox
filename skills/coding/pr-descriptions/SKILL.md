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
```

## Rules

1. Derive content from the diff/commits provided — never pad with invented
   details or generic statements ("improved performance") that the diff
   doesn't show.
2. Title follows the repo's commit convention if visible; otherwise
   Conventional Commits types.
3. "How to test" must be executable as written: commands, URLs, sample
   inputs, expected output.
4. Mention what you did NOT do when it's a natural question ("did not
   migrate the v1 endpoint; tracked in #456").
5. Keep the whole description under ~300 words unless the change is
   genuinely large.

## Edge cases

- **Mixed/unrelated changes in one branch**: describe the primary change,
  list the stragglers under Notes, and suggest splitting if practical.
- **No issue link exists**: write the Why from the diff and flag that no
  ticket is referenced.
- **Draft PRs**: lead with what feedback is wanted and what's known to be
  unfinished.
