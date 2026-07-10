# Metrics & Tiers

This library ranks skills the way [Artificial Analysis](https://artificialanalysis.ai) ranks models: a leaderboard with independent, measurable columns plus a composite score — so "popular" and "good" are visible as separate facts, not vibes.

Everything measurable today is computed automatically by `scripts/build_catalog.py` and published in `catalog.json`, which the website reads. Fields that need the benchmark harness are `null` until measured; the leaderboard shows them as "—" and never fakes a number.

The complete execution protocol, evidence format, review requirements, and promotion rules are documented in [EVALUATION.md](EVALUATION.md). Published results must include raw model outputs and the skill content digest so a score can be audited and reproduced.

## The leaderboard columns

| Column | What it measures | How | Status |
|---|---|---|---|
| **Skill Score** | Composite quality, 0–100 | `0.5·uplift + 0.3·trigger + 0.2·efficiency` | needs harness |
| **Quality uplift** | Does the skill make outputs better? | Blind A/B win rate: with-skill vs. no-skill on the skill's task set, judged by a model grader (3 runs each) | needs harness |
| **Trigger accuracy** | Does it activate when it should — and stay quiet when it shouldn't? | F1 over the skill's `should_trigger` / `should_not_trigger` prompt sets | needs harness |
| **Context cost** | Tokens loaded when the skill activates | `body_chars / 4`, computed from SKILL.md (references counted separately as on-demand) | ✅ automated now |
| **Efficiency** | Cost-adjusted footprint, 0–100 | `100 · min(1, 1500 / context_tokens)` | ✅ automated now |
| **Installs (30d)** | Popularity | CLI download + install-script hits once distribution ships | needs telemetry |
| **Updated** | Maintenance freshness | Last git commit touching the skill | ✅ automated now |

Popularity is deliberately **not** part of Skill Score — a widely installed skill can be mediocre, and a brand-new one can be excellent. The leaderboard shows both columns and lets users sort by either, exactly like sorting models by intelligence vs. by price.

## Tiers

Tiers are the coarse bifurcation for people who don't want to read columns. They are assigned in `tiers.yaml` at the repo root — **only maintainers edit that file**; skills can never self-declare a tier.

| Tier | Badge | Criteria |
|---|---|---|
| **Core** | ⭐ | Verified, plus maintainer-curated, plus updated within the last 90 days |
| **Verified** | ✅ | Ships a benchmark suite and meets thresholds: trigger F1 ≥ 80 and quality uplift ≥ 60% win rate |
| **Community** | 🧪 | Passes CI validation (the default for every merged skill) |

Until the harness runs, Core/Verified placement is maintainer judgment based on manual testing; once measurements exist, the thresholds above become enforceable and tier changes happen in PRs like any other change.

## Benchmark suites (`benchmarks/prompts.json`)

Any skill can opt into measurement by shipping a benchmark file:

```json
{
  "should_trigger": ["five or more prompts where the skill must activate"],
  "should_not_trigger": ["five or more nearby prompts where it must NOT"],
  "tasks": [
    {
      "prompt": "a realistic task for the skill",
      "criteria": ["what a grader checks in the output"]
    }
  ]
}
```

Guidelines: trigger prompts should be phrased the way real users type, including casual phrasings that don't name the skill. `should_not_trigger` prompts should be *near misses* from adjacent domains — that's what makes precision meaningful. Tasks (3+) should be substantive enough that a skill could plausibly help; trivial one-liners measure nothing.

See `skills/coding/commit-messages/benchmarks/prompts.json` for a complete example. The PR template's "example prompts" section is the seed of this file — formalizing them into a benchmark is the path from Community to Verified.

## Methodology notes

- **Grading**: uplift uses blind pairwise comparison (grader never told which output used the skill), 3 repetitions per task, majority vote — variance in single runs is too high to rank on.
- **Version pinning**: every published measurement records the model, date, and skill commit hash it was measured against. Scores are re-run when a skill changes materially.
- **Gaming resistance**: benchmark files are reviewed like code; suites written to be trivially passable get flagged in review. Trigger sets must include the near-miss negatives.
- **The composite is v0.** Weights (50/30/20) are a starting point and are versioned; changes to the formula bump a `score_version` field in `catalog.json` so historical numbers aren't silently redefined.
