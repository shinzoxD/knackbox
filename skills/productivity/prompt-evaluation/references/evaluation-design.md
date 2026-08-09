# Prompt evaluation design reference

Load the core sections plus only the system-specific section needed.

## Dataset design

- Source cases from redacted production patterns, support failures, domain
  experts, incident reviews, and intentionally generated boundary cases.
- Keep a development set for iteration and a held-out test set for decisions.
  Do not repeatedly tune on the final test set.
- Tag cases by intent, difficulty, risk, language, length, tool path, retrieval
  requirement, and known failure mode. Report important segments separately.
- Preserve provenance, consent/retention constraints, expected behavior, and why
  each case belongs. Remove secrets and unnecessary personal data.
- Deduplicate semantically. Prevent prompts, reference answers, and grader
  examples from leaking test answers into the evaluated system.
- Prefer a small reviewed golden set over a large uncurated synthetic set. Use
  generated cases to extend coverage, not to define reality alone.

## Choose graders by criterion

1. **Deterministic:** schema validity, exact invariants, required fields,
   forbidden strings, tool allowlists, and state assertions.
2. **Programmatic:** normalized extraction, sandboxed execution, structured
   comparison, retrieval metrics, or domain validators.
3. **Model-based:** semantic correctness, groundedness, style, or rubric-based
   judgments that cannot be reduced to stable code checks.
4. **Human:** ambiguous, high-impact, novel, and grader-disagreement cases; use
   domain experts where correctness requires expertise.

For model graders, provide a criterion-specific rubric, pass/fail anchors,
insufficient-evidence handling, and structured output. Blind variant identity,
randomize pairwise order, calibrate against human labels, and report agreement.
Never ask one broad judge which answer “feels best.”

## RAG measures

Measure retrieval and generation separately:

- retrieval recall/precision or required-source coverage at a chosen cutoff
- answer correctness and completeness
- claim-level support by retrieved evidence
- citation correctness and citation coverage
- abstention when evidence is absent or conflicting

## Tool-agent measures

Evaluate trajectories and final state, not prose alone:

- correct tool choice, arguments, order, and authorization gates
- state invariants and task completion in a sandbox
- unnecessary calls, error recovery, retry behavior, and correct stopping
- policy violations, side effects, and secret exposure

## Classification and extraction

Use precision, recall, F1, per-class confusion, calibration where relevant, and
schema/field accuracy. Accuracy alone is misleading for rare critical classes.

## Analysis

- Use paired results on the same cases. Report wins, losses, ties, and
  regressions rather than only independent averages.
- Add justified uncertainty: binomial intervals for pass rates and paired
  bootstrap or another suitable interval for paired aggregate differences.
- Repeat stochastic cases when variance can change the decision. Keep seeds and
  define retry policy where the platform supports them.
- Report severe failures and key segments even when the aggregate improves.
- Inspect grader disagreements and a sample of passes, not only failures.
- Separate quality, safety, latency, and cost. Do not hide one behind a composite
  unless weights and consequences are explicit.

## Special cases

- **No labels:** start with invariants and a small expert-labeled set; do not
  scale an uncalibrated judge first.
- **Prompt and model changed:** run an ablation or state that attribution is not
  possible.
- **RAG index changed:** version the corpus and evaluate retrieval separately.
- **Rare severe failures:** keep a challenge suite and a zero-tolerance or
  severity-weighted guardrail rather than relying on average accuracy.
- **Multi-turn systems:** preserve state and score the full trajectory plus the
  final outcome.
- **Multilingual product:** use native-speaker review for critical languages and
  report per-language results.
