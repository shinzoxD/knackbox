---
name: prompt-evaluation
description: Design offline prompt and agent eval harnesses — golden sets,
  rubrics, judges, leakage checks, and regression gates. Use whenever the
  user asks how to evaluate a prompt, measure an LLM change, build an eval
  suite, compare models, score outputs, or stop shipping prompt edits on
  vibes.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Prompt Evaluation

A prompt change is a product change. Do not ship it because one example
looked nicer. Measure trigger-adjacent tasks against a frozen set.

This skill designs the *eval*. To rewrite the prompt itself, use
`prompt-improver`. To threat-model tool-using agents, use
`prompt-injection-hardening`.

## Workflow

1. Name the behavior under test in one sentence (not "be better").
2. Split cases: **core** (must always pass), **edge**, **adversarial**,
   **near-miss / should-refuse**.
3. Define observable criteria per case — strings, JSON schema, numeric
   tolerance, or a rubric a second rater can apply.
4. Choose graders: exact/programmatic first; LLM-as-judge only when
   the criterion is subjective, with a written rubric and spot checks.
5. Freeze the set and the judge version. Record model, temperature, date.
6. Report pass rate, regressions vs last ship, and failing case IDs.
7. Gate: what must stay green to merge a prompt or model swap.

## Output format

```markdown
## Eval plan: <behavior>

**Success definition:** …
**Non-goals:** …

### Suites
| ID | Type | Input gist | Pass criteria | Grader |

### Sample size & splits
…

### Judge (if any)
Model / rubric / known failure modes

### Metrics
primary, guardrail, cost/latency

### Ship gate
…

### Contamination / leakage risks
…
```

## Rules

1. Criteria must be checkable without the author's taste. "Sounds good"
   is not a criterion.
2. Prefer 20–50 tight cases over 500 unlabeled ones. Grow only after
   the rubric is stable.
3. Hold out a slice the author did not tune on. If every case was used
   to edit the prompt, say the score is in-sample.
4. LLM judges need a rubric, a 1–5 or binary scale, and at least a
   10-case human agreement check. Do not hide judge variance.
5. Never put secrets, real PII, or live prod transcripts in the set
   without redaction.
6. Cost and latency are first-class if the user will run this in CI.
7. When comparing models, keep the *prompt and set* fixed; when
   comparing prompts, keep the *model and set* fixed.

## Edge cases

- **"Just pick the best model":** refuse a winner without a task-shaped
  set; offer a 15-case starter instead.
- **Agent / tool loops:** score final state *and* illegal tool calls
  separately.
- **Flaky judges:** add a programmatic assertion or a second judge;
  do not average noise into a fake 2% win.
- **User wants prompt-improver:** still produce the eval plan first if
  they asked how they will know it worked.
---
