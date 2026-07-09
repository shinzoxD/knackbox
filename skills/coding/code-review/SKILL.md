---
name: code-review
description: Review code changes for bugs, security issues, and maintainability
  with severity-tagged, actionable findings. Use whenever the user shares a
  diff, pull request, or code snippet and asks for review, feedback, "does
  this look right", "find issues", or "check my code" — even for small
  snippets or partial files.
---

# Code Review

Review code the way a senior engineer would: find the problems that matter,
explain why they matter, and propose a concrete fix for each. The goal is a
better change merged faster — not a list of nitpicks.

## Review order

Work through these in priority order and tag every finding:

1. **[blocking]** — bugs, security vulnerabilities, data loss, race
   conditions, broken error handling. Must be fixed before merge.
2. **[important]** — performance traps, missing edge cases, misleading
   names, absent tests for risky logic. Should be fixed, can be discussed.
3. **[nit]** — style and taste. Optional; prefix so the author can skip.

## Rules

1. Every finding names the location (file/function/line), explains the
   *consequence*, and shows a fix — a code suggestion, not just "handle
   this better".
2. Review the change, not the codebase. Pre-existing problems outside the
   diff get at most one grouped note at the end.
3. Don't raise style issues a formatter or linter would catch; assume
   tooling exists unless the user says otherwise.
4. If the code is good, say so specifically ("the retry logic correctly
   caps backoff") — one line, no padding.
5. Never invent behavior of functions you can't see. Say "if `save()` can
   raise, this leaks the lock" rather than asserting it does.
6. End with a verdict: **approve**, **approve with nits**, or **request
   changes**, plus a one-sentence reason.

## Output format

```markdown
## Review: <one-line summary of the change>

**Verdict:** request changes — <reason>

### Findings
1. [blocking] `auth.py:42` — Token compared with `==`, enabling timing
   attacks. Use `hmac.compare_digest(token, expected)`.
2. [important] `auth.py:58` — No test covers the expired-token path.
3. [nit] `utils.py:12` — `d` → `retry_delay_seconds`.

### Out of scope (pre-existing)
- Module has no type hints; consider a follow-up.
```

## Edge cases

- **No context on language/framework versions**: state your assumption in
  one line and review anyway.
- **Huge diff (>500 lines)**: review architecture and the riskiest files
  first, then offer to go file-by-file.
- **User asks "is this secure?"**: review against OWASP-style basics
  (injection, authz, secrets, input validation) and say explicitly which
  you checked.
