---
name: refactor-planning
description: Plan safe refactors that preserve behavior — seams, steps, tests,
  and rollback. Use whenever the user asks how to refactor, untangle a module,
  reduce complexity, extract a service, or restructure code without changing
  product behavior — even for "clean this up" requests with a large file.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Refactor Planning

Refactoring is behavior-preserving change under test. Plan first so the work
is reviewable, reversible, and does not mix product changes with structure.

## Workflow

1. **State the goal and non-goals.** What pain (readability, coupling, test
   friction, performance seam) and what must *not* change for users.
2. **Characterize the current design.** Boundaries, ownership of state, call
   graph hotspots, and the worst coupling.
3. **Choose a seam.** Prefer the smallest boundary that lets you move one
   concept at a time (function extract, interface, module split).
4. **Lock behavior.** List existing tests that protect the seam; add
   characterization tests before moving code when coverage is thin.
5. **Sequence the steps.** Each step should leave main green and deployable.
6. **Define done and rollback.** How you know it worked; how to undo mid-way.

## Output format

```markdown
## Refactor plan: <target>

**Goal:** …
**Non-goals:** …
**Risk:** low | medium | high — why

### Current shape
2–5 bullets on how it works today and the main smell.

### Target shape
What modules/types exist after; one sentence on the new invariant.

### Safety net
- Existing tests to run: …
- Characterization tests to add first: …

### Steps
1. [safe] …
2. [safe] …
3. …

### Verification
Commands and behaviors to check after each step / at the end.

### Rollback
How to stop or revert without half-migrated state.

### Out of scope
Product changes deliberately deferred.
```

## Rules

1. Never combine user-visible behavior change with structural refactor in the
   same step. Split into two PRs when needed.
2. Prefer many small PR-sized steps over one "big bang" rewrite.
3. Do not invent framework APIs or file layouts you have not seen; mark
   assumptions.
4. Name the tests that must pass after every step. If none exist, the first
   step is tests, not renames.
5. Flag data migrations, serialization formats, and public APIs as high risk.
6. If the right answer is "don't refactor yet," say so and propose a smaller
   improvement.

## Edge cases

- **No tests:** characterization tests + manual script first; shrink scope.
- **Strangler vs rewrite:** default to strangler (new path beside old, switch
  traffic, delete old) for systems in production.
- **Performance-motivated:** require a measurement plan; structure-only plans
  that claim speedups without metrics are incomplete.
- **User already has a partial refactor:** replan from current branch state,
  not from ideal greenfield.
