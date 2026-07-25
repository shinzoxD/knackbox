---
name: code-comments
description: Write and improve code comments and docstrings that explain why,
  not noise. Use whenever the user asks for better comments, docstrings, module
  headers, JSDoc/TSDoc, or documentation comments in source code.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Code Comments

Comments capture intent, invariants, and non-obvious trade-offs. If the code
can be clearer, prefer rename/refactor over a comment that restates the line.

## When to comment

- Why a non-obvious approach was chosen
- Invariants and concurrency assumptions
- Workarounds for bugs in dependencies (link issue)
- Public API docstrings: params, returns, errors, examples
- Security-sensitive constraints

## When not to

- Restate `i += 1` as "increment i"
- Leave stale comments that contradict code
- Joke or dead commented-out code blocks without reason

## Rules

1. Update comments in the same change as behavior.
2. Prefer short, precise language; link specs when long.
3. Public APIs get complete docstrings; internals only where needed.
4. Mark TODOs with ticket refs if required by team norms — avoid empty TODOs.
5. Do not invent library behavior in comments.
6. For generated code, say so and point to source of generation.

## Output format

Provide the commented code or a diff-style patch, plus a one-line rationale for
non-obvious comments.

## Edge cases

- **Regulated code:** traceability comments may be mandatory.
- **Algorithms:** complexity and references (paper/RFC).
- **Deleted code:** delete comments with code; use VCS history.
