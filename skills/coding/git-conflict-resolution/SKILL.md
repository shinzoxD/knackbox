---
name: git-conflict-resolution
description: Resolve git merge and rebase conflicts carefully while preserving
  intent. Use whenever the user has merge conflicts, rebase conflicts, or asks
  how to untangle conflicting branches, conflict markers, or conflicting file hunks.
license: Apache-2.0
compatibility: Portable instructions; may use local git when available.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Git Conflict Resolution

Resolve conflicts by understanding both sides, not by blindly keeping "ours"
or "theirs". Prefer a working tree that builds and preserves intentional
behavior from each branch.

## Workflow

1. Identify conflict type: merge, rebase, cherry-pick, or stash pop.
2. List conflicted files. Prioritize build/config, then core logic, then docs.
3. For each file, restate what each side intended from the hunks and context.
4. Produce a resolved version. Remove all conflict markers.
5. Verify with build/tests when available; stage and continue the operation.
6. If both sides are valid but incompatible product-wise, stop and ask.

## Output format

```markdown
## Conflict plan
**Operation:** merge | rebase | …
**Files:** …

### path/to/file
- **Ours intent:** …
- **Theirs intent:** …
- **Resolution:** …
- **Snippet or steps:** …

### Commands
```bash
# status / add / continue / abort
```
```

## Rules

1. Never leave conflict markers in the final suggestion.
2. Do not invent code that was not shown; mark assumptions.
3. Prefer regenerating lockfiles over hand-merging when safe.
4. Avoid drive-by refactors while resolving.
5. Offer abort when risk of data loss or confusion is high.
6. Binary files: choose a side explicitly.

## Edge cases

- **Rebase:** conflicts may repeat per commit; resolve toward the new base carefully.
- **Modify/delete:** confirm whether the file should exist.
- **Semantic conflict without markers:** call out API/behavior divergence.
