---
name: prompt-evaluation
description: Design and review repeatable offline evaluations for prompts, RAG
  systems, and tool-using agents. Use whenever the user asks about eval datasets,
  graders, rubrics, golden sets, regression tests, pass rates, model comparisons,
  prompt changes, or how to measure AI output quality before release.
license: Apache-2.0
compatibility: Portable evaluation-design instructions; can adapt to any model provider or test harness.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Prompt Evaluation

Turn a vague claim such as “the new prompt is better” into a reproducible,
decision-linked evaluation. Measure behavior on representative cases, preserve
raw evidence, expose segment regressions, and keep graders auditable.

This skill designs the *eval*. To rewrite the prompt itself, use
`prompt-improver`. To threat-model tool-using agents, use
`prompt-injection-hardening`.

## Workflow

1. Define the release decision, system boundary, unit of evaluation, target
   population, unacceptable failures, and the smallest meaningful improvement.
2. Freeze the compared configurations: prompts, model/version, parameters,
   tools, retrieval index, policies, dependencies, and relevant runtime flags.
3. Build a versioned dataset from realistic, privacy-safe cases. Include normal,
   difficult, adversarial, and known-failure cases with stable IDs and tags.
4. Define observable criteria before running variants. Choose deterministic,
   programmatic, model-based, and human graders by criterion.
5. Run paired comparisons on the same cases. Record outputs, traces, grader
   decisions, latency, token/cost data, errors, retries, and configuration IDs.
6. Analyze the primary metric, uncertainty, segment performance, grader
   disagreement, and severity-weighted regressions.
7. Return a ship decision with explicit thresholds, residual risk, and the cases
   humans must inspect. Never convert missing measurements into a score.

## Evaluation contract

Write this contract before implementing a harness:

| Field | Required decision |
|---|---|
| Decision | What release, prompt, model, or architecture choice will this inform? |
| Unit | One turn, conversation, retrieved answer, trajectory, or completed task? |
| Population | Which users, languages, intents, risk levels, and input lengths? |
| Criteria | What observable behavior counts as success or failure? |
| Primary metric | Which single metric gates the decision? |
| Guardrails | Which severe failures cannot be averaged away? |
| Threshold | Minimum acceptable level and maximum allowed regression? |
| Evidence | Which outputs, traces, annotations, and config digests are retained? |

If these fields are unknown, produce a proposed contract and mark assumptions
instead of building a large dataset around an undefined decision.

## Detailed design

Read `references/evaluation-design.md` before finalizing a full evaluation,
choosing model graders, or evaluating RAG, tool-using agents, classification, or
extraction. Load only the relevant system-specific sections.

## Output format

```markdown
## Evaluation plan: <system or change>

### Decision contract
- Decision: ...
- Unit / population: ...
- Primary metric and threshold: ...
- Non-negotiable guardrails: ...

### Dataset
| Segment | Source | Count target | Risk covered |
|---|---|---:|---|
| ... | ... | ... | ... |

### Graders
| Criterion | Grader | Evidence | Calibration |
|---|---|---|---|
| ... | ... | ... | ... |

### Run protocol
1. ...

### Report
- Primary result with uncertainty: ...
- Segment and severe regressions: ...
- Grader disagreement: ...
- Latency / cost / errors: ...

### Ship rule
Ship only if ...
```

## Rules

1. Never fabricate runs, labels, confidence intervals, or pass rates. Separate
   the evaluation plan from measured results.
2. Keep prompts, configs, datasets, graders, and raw outputs versioned or
   content-addressed so a result can be reproduced.
3. Do not use the same model output as both the reference answer and the sole
   evidence that the model is correct.
4. Do not let aggregate improvements mask critical safety or policy failures.
5. Do not run side-effecting agent evaluations against production; use sandboxes,
   fakes, scoped test accounts, or transaction rollback.
6. Record model/provider errors separately from graded failures and define retry
   behavior before the run.
7. Treat model-judge scores as measurements with bias and variance, not truth.
