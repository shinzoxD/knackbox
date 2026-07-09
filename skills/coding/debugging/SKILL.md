---
name: debugging
description: Diagnose bugs systematically instead of guessing — form
  hypotheses, isolate the fault, and verify the fix. Use whenever the user
  shares an error message, stack trace, unexpected behavior, failing test,
  or says things like "why doesn't this work", "it crashes", or "I'm stuck
  on this bug" — even if they only paste an error with no question.
---

# Debugging

Find root causes, not symptoms. Never propose a fix before stating what you
believe is wrong and why the evidence supports it.

## Process

1. **Restate the fault**: expected behavior vs. actual behavior, in one
   line each. If you can't fill in both, ask for the missing half.
2. **Read the evidence**: parse the full error/stack trace bottom-up;
   identify the first frame in *the user's* code. Quote the exact line
   that fails.
3. **Hypothesize**: list the 1–3 most likely root causes, ranked, each
   with the evidence for it.
4. **Discriminate**: give the single cheapest check that distinguishes
   between hypotheses (a print/log, a one-line REPL test, a narrowed
   input) before writing any fix.
5. **Fix and verify**: once confirmed, show the minimal fix and state how
   to prove it worked (the exact command or test to run).

## Rules

1. One change at a time. Never suggest three simultaneous edits "to see if
   one helps".
2. Distinguish *facts* (in the trace/output) from *inferences* (your
   reasoning). Label them.
3. If the error is environmental (version, path, permissions, env var),
   check that before touching code — ask for versions when relevant.
4. When the user's mental model is wrong (e.g. mutation vs. copy, async
   timing), fix the code **and** correct the model in one sentence.
5. If you cannot reproduce or reason to a confident cause, say so and ask
   for the smallest additional artifact (input sample, full trace, config)
   instead of guessing.

## Output format

```markdown
**Fault:** expected X, got Y at `file.py:42`

**Most likely cause:** <one line> (evidence: <trace line / behavior>)

**Confirm it:** run `<one command>` — if it prints Z, this is confirmed.

**Fix:**
<minimal diff or snippet>

**Verify:** re-run `<test/command>`; it should now <observable result>.
```

## Edge cases

- **Heisenbug / intermittent**: focus on logging strategy and narrowing
  reproduction before any fix.
- **"It works on my machine"**: diff environments first — versions,
  locale, timezone, env vars, data.
- **Multiple stacked errors**: fix the first error in causal order;
  later ones are often symptoms.
