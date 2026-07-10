# Evaluation Protocol

Knackbox publishes measurements only when another person can inspect what was
tested, what the model produced, and how the result was judged. The current
protocol identifier is `knackbox-eval-v1`.

## Evaluation gates

A skill is eligible for a measured score only when it has:

1. At least five realistic prompts that should trigger it.
2. At least five nearby prompts that should not trigger it.
3. At least three substantive output-quality tasks with observable criteria.
4. A baseline run without the skill and a run with the exact published skill.
5. Three independent runs per prompt and task for published measurements.
6. Blind, randomized pairwise grading plus human review of raw outputs.

Benchmark suites live in `benchmarks/prompts.json`. Generated measurements live
in `measurements/<skill>.json` and record the model, protocol, timestamp, skill
tree hash, content digest, trigger decisions, raw outputs, token counts, timing,
judge decisions, and aggregate scores.

## Test design

- Prompts must resemble real user requests, including casual phrasing and
  incomplete context.
- Negative trigger prompts must be plausible near misses from adjacent skills.
- Criteria must be specific enough to cite evidence for a pass or preference.
- Include edge cases and failure modes, not only ideal inputs.
- Do not use private, licensed, or personal data in public benchmark fixtures.

## Execution

Run the plan without API calls first:

```bash
python scripts/run_benchmarks.py --skill api-design --dry-run
```

Published runs use a clean context, temperature zero, and three repetitions:

```bash
python scripts/run_benchmarks.py --skill api-design --runs 3
```

For quality uplift, each task is executed once with the skill instructions and
once with the baseline system prompt. Their presentation order is randomized.
The grader sees the task, criteria, and two unlabeled outputs, then selects the
first, second, or a tie. Ties count as half a win.

## Human review

Before merging a measurement, a reviewer checks:

- Raw outputs do not contain sensitive or benchmark-extraneous information.
- Judge decisions are supported by the stated criteria.
- Prompt wording does not reveal which output should win.
- Criteria are neither trivial nor impossible.
- Failures indicate skill behavior rather than a broken fixture or unavailable
  dependency.

The reviewer records corrections in the measurement pull request. Model grading
is evidence, not final authority.

## Promotion and regression

Tier thresholds are defined in `METRICS.md`. A skill is not promoted from suite
coverage alone. Material changes to `SKILL.md`, scripts, references, or fixtures
change the content digest and require a new measurement. A regression can demote
a skill through an ordinary evidence-linked pull request.

## Cost control

The harness prints the exact estimated API-call count and requires confirmation
before spending. CI validates suites and measurement schemas but never executes
paid model calls.
