---
name: test-generation
description: >-
  Design and write focused automated tests for new code, bug fixes, and risky
  behavior. Use whenever the user asks for tests, shares untested code, fixes a
  defect that needs regression coverage, mentions coverage gaps, or wants help
  deciding what to test, even if they do not name a testing framework.
---

# Test Generation

Create tests that protect observable behavior and likely failure modes. A small
set of high-signal tests is better than broad coverage coupled to implementation
details.

## Workflow

1. Identify the public contract, invariants, side effects, and failure modes.
2. Read the repository's existing test framework, fixtures, naming, and helper
   patterns before writing code.
3. Rank cases by risk: regression, boundaries, permissions, malformed input,
   concurrency, and external failures.
4. Choose the narrowest test level that proves the behavior.
5. Write deterministic tests with an explicit arrange, act, assert structure.
6. Run the smallest relevant test command, then the broader suite when the
   change affects shared behavior.

## Case selection

Include cases from these groups when relevant:

- Representative success path.
- Boundary values immediately below, at, and above a limit.
- Empty, missing, malformed, duplicated, and unexpectedly large input.
- Authorization and tenant isolation.
- Dependency timeout, partial failure, retry, and cancellation.
- State transitions, repeated calls, and idempotency.
- A regression test that fails for the reported bug before the fix.

## Output format

When code can be edited, provide the tests and summarize:

```markdown
## Coverage added
- `<test name>`: behavior and risk protected

## Command
`<exact test command>`

## Remaining gaps
- Anything requiring integration infrastructure or unavailable context
```

When only planning tests, return a table with case, level, setup, assertion, and
priority.

## Rules

1. Assert externally meaningful results, not private method call sequences.
2. Do not use snapshots for volatile or security-sensitive values unless the
   snapshot is intentionally reviewed and stable.
3. Avoid sleeps, network access, wall-clock assumptions, and random data without
   a fixed seed.
4. Keep one reason for failure per test where practical.
5. Reuse local factories and fixtures, but do not hide the behavior under test
   behind excessive helpers.
6. Never claim a test passes unless it was run; report the exact blocker if it
   could not be executed.

## Edge cases

- For legacy code with no test seam, first add a characterization test around
  current behavior.
- For generated code, test the generator or schema rather than generated lines.
- For flaky failures, preserve diagnostics and isolate nondeterminism before
  weakening assertions.
