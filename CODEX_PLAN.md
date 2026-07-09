# Knackbox — Implementation Plan (agent brief)

You are implementing the remaining phases of **Knackbox**, an open-source library of AI agent skills. Work inside the knackbox repository (this file lives at its root as `CODEX_PLAN.md`). Read this entire brief before writing any code.

## 1. Context — what already exists (do not rebuild)

The repo is complete and green for Phase 0/1:

```
knackbox/
├── README.md              # catalog table auto-generated between CATALOG markers
├── METRICS.md             # leaderboard spec: columns, tiers, score formula
├── CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, LICENSE (Apache-2.0)
├── tiers.yaml             # maintainer-controlled tier assignments
├── catalog.json           # GENERATED — never hand-edit
├── template/SKILL.md
├── skills/<category>/<name>/SKILL.md      # 11 skills, 6 categories
│   └── benchmarks/prompts.json            # 4 skills ship benchmark suites
├── scripts/validate.py    # CI validation (frontmatter, links, secrets, tiers)
├── scripts/build_catalog.py               # emits catalog.json + README table
└── .github/workflows/validate.yml         # PR validation + catalog auto-commit
```

`catalog.json` schema per skill: `name, description, category, path, tier (core|verified|community), updated, context_tokens, reference_tokens, has_scripts, has_benchmarks, metrics {efficiency, trigger_accuracy, quality_uplift, skill_score, installs_30d}` — the last four metrics are `null` until measured. Read `METRICS.md` before Phase B; it is the authority on formulas and thresholds.

## 2. Ground rules (apply to every phase)

1. **`catalog.json` is the single source of truth for the website.** The site reads it (plus raw SKILL.md files) at build time. No database, no CMS, no runtime API.
2. **Never hand-edit** `catalog.json` or the README table between `<!-- CATALOG:START/END -->`. Regenerate with `python scripts/build_catalog.py`.
3. **Never fabricate metric values.** `null` renders as "—" everywhere and sorts below measured values.
4. Don't rename, move, or rewrite anything under `skills/`, and don't refactor `validate.py`/`build_catalog.py` beyond the changes this brief specifies.
5. Dependency budget: repo scripts stay Python stdlib + PyYAML (the benchmark harness may additionally use the `anthropic` SDK). The site uses Astro + Tailwind + Pagefind and nothing heavier. When unspecified, prefer fewer dependencies, static over dynamic, boring over clever.
6. After completing each phase, run the full check before committing:
   `python scripts/validate.py && python scripts/build_catalog.py && (cd site && npm run build)` (skip the site step until Phase A exists). All must pass.
7. Commit style: follow `skills/coding/commit-messages/SKILL.md` — this repo eats its own dog food. Small, single-purpose commits per phase step.
8. If something in this brief is impossible or contradictory, stop and report it instead of silently improvising.

## 3. Phase 0 — Setup (15 min)

- [x] GitHub org/user slug resolved to `shinzoxD`; repository URLs use that slug.
- [x] Ensure `git init` + initial commit exist; ensure `python scripts/validate.py` exits 0 before you change anything.

## 4. Phase A — Website (`site/`) — the main deliverable

Static Astro site in a `site/` directory at the repo root.

### Stack
- Astro (current stable) + the official Tailwind integration.
- Pagefind for search, run as a postbuild step: `pagefind --site dist`.
- Client-side JS: plain vanilla only (table sorting, copy buttons, theme toggle). No React/Vue/Alpine.
- Dark mode via `class` strategy: respects `prefers-color-scheme`, manual toggle persisted in `localStorage`.

### Data layer (`site/src/lib/catalog.ts`)
- Import `../../catalog.json` at build time; export typed helpers (`allSkills`, `byTier`, `byCategory`, `getSkill(category, name)`).
- Load each skill's SKILL.md body from `../skills/**/SKILL.md` at build time, strip YAML frontmatter, render markdown to HTML at build time.
- Nulls: a `fmt(value)` helper returns `"—"` for null/undefined.

### Routes
1. **`/` (home)** — one-line pitch ("An open library of skills for AI agents"), a copyable install command in a terminal-styled block, live stats computed from catalog.json (skill count, category count, count per tier), the ⭐ core skills as featured cards, prominent links to `/skills` and GitHub.
2. **`/skills` (leaderboard)** — the centerpiece. A dense, sortable table with columns: Tier (badge), Skill (link), Category, Skill Score, Uplift, Trigger, Context (tok), Updated. Requirements:
   - Click a column header to sort; second click reverses. Default sort: tier rank (core → verified → community), then name.
   - Null metrics render "—" and always sort below measured values regardless of direction.
   - Category filter chips (multi-select) and a tier filter; both update the table without reload.
   - A Pagefind search input above the table.
   - A one-line caption linking to `/docs/metrics` for methodology.
3. **`/skills/[category]/[name]`** — one page per skill: tier badge, rendered SKILL.md body, a metrics sidebar (all catalog fields, nulls as "—", "benchmark suite: yes/no"), a copy-button install command (`bash <(curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh) <skill-name>`), and a "View on GitHub" link to the skill folder.
4. **`/docs`** — install instructions per surface (Claude Code `~/.claude/skills/`, Claude.ai upload, "any Agent Skills-compatible tool"), plus what skills are. `/docs/metrics` renders METRICS.md.
5. **`/contribute`** — renders CONTRIBUTING.md with a hero link to the skill request issues.

### Design direction
Data-dense and credible, like a benchmarking site, not a marketing splash: system-ui or one variable font, generous whitespace, tabular numerals for metric columns, subtle tier badge colors (gold/green/gray), fast first paint, zero layout shift on sort. Must look correct on a 380 px viewport (table scrolls horizontally in a wrapper).

### Acceptance criteria (Phase A done when all true)
- `cd site && npm run build` completes with zero errors; output is fully static.
- Every skill in catalog.json has a working detail page; adding a new skill folder + rebuilding the catalog produces its page with **no site code changes**.
- Leaderboard sorts correctly with nulls last; filters and search work with JS enabled; the table still renders (unsorted) with JS disabled.
- Lighthouse (mobile) ≥ 90 on Performance and Accessibility for `/` and `/skills`.
- README gains a "Website" section: local dev (`cd site && npm i && npm run dev`) and deploy notes.

## 5. Phase B — Benchmark harness (`scripts/run_benchmarks.py`)

Fills the null metrics. Runs manually by a maintainer (it costs API money) — never in CI.

### Interface
```
python scripts/run_benchmarks.py --skill skills/coding/commit-messages
python scripts/run_benchmarks.py --all          # every skill with benchmarks/prompts.json
  [--model claude-sonnet-4-6] [--runs 3] [--yes]
```
Requires `ANTHROPIC_API_KEY` env var; uses the `anthropic` Python SDK. Before spending, print the estimated number of API calls and require `--yes` or interactive confirmation.

### Trigger evaluation
For each prompt in `should_trigger` and `should_not_trigger`: show the model a system prompt containing the *descriptions only* of ALL repo skills (target + the other 10 as distractors, from catalog.json) and instruct it to reply with exactly the name of the one skill it would consult, or `none`. Run each prompt `--runs` times (default 3). A trigger counts when the majority of runs name the target skill. Compute precision, recall, F1 (as percentages, 1 decimal).

### Uplift evaluation
For each entry in `tasks`: generate output A (system prompt = full SKILL.md body) and output B (no skill). Grade with a judge call that receives the task, the `criteria`, and both outputs in randomized order without labels, and must answer which output better satisfies the criteria: `first`, `second`, or `tie`. Repeat `--runs` times with fresh generations; uplift = win rate % where the with-skill output wins (ties count 0.5).

### Output & merge
- Write `measurements/<skill-name>.json`: `{measured_at, model, skill_commit (git rev-parse of the skill dir), runs, trigger: {precision, recall, f1}, uplift: {win_rate, tasks}}`. Create `measurements/` with a README explaining files are generated.
- Modify `build_catalog.py`: if a measurement file exists for a skill, populate `metrics.trigger_accuracy` (=f1), `metrics.quality_uplift` (=win_rate), and compute `metrics.skill_score = round(0.5*uplift + 0.3*f1 + 0.2*efficiency, 1)` per METRICS.md; also record `metrics.measured_at` and `metrics.model`. Missing measurement ⇒ fields stay null. `score_version` stays `"v0"`.
- Modify `validate.py`: if `measurements/` files exist, error when a file references a skill that doesn't exist.

### Acceptance criteria
- Dry-run mode (`--dry-run`) prints the plan (prompts, call count) with zero API calls — verify this path yourself.
- Running against `commit-messages` produces a valid measurements file, and `build_catalog.py` then emits non-null trigger/uplift/skill_score for it while all other skills stay null.
- Unit-test the pure logic (F1 math, win-rate math, merge behavior) with stdlib `unittest`, no network: `python -m unittest discover scripts/tests`.

## 6. Phase C — Distribution

1. **`install.sh` at repo root** (bash + curl + tar only):
   `curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh | bash -s <skill-name> [--dest DIR]`
   Downloads the repo tarball from GitHub codeload, extracts exactly `skills/*/<skill-name>` into `--dest` (default `~/.claude/skills/<skill-name>`), refuses to overwrite unless `--force`, prints what was installed and the docs URL. Unknown skill name ⇒ list available names from the tarball and exit 1. `set -euo pipefail`, no sudo, works on macOS and Linux.
2. Update README and the site's install snippets to use it.
3. **Stretch (only after A–C accepted):** `packages/cli` npm package exposing `npx knackbox add <skill>` — resolves the skill via raw catalog.json, then reuses the tarball extraction (shell out to system `tar`). Node stdlib only.

### Acceptance criteria
- On a clean container: piping install.sh installs a skill into a temp `--dest`, the folder matches the repo copy exactly (`diff -r`), and a bogus skill name exits non-zero with the list of valid names.

## 7. Phase D — CI & deploy wiring

- Extend `.github/workflows/validate.yml`: on PRs that touch `site/**`, also run `cd site && npm ci && npm run build`.
- New `.github/workflows/deploy-site.yml`: on push to `main`, run validate → build catalog → build site → deploy `site/dist` to Cloudflare Pages (project `knackbox`) using `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets. **If the secrets are absent, skip the deploy step with a notice instead of failing** — CI must stay green before hosting is configured.
- Add README badges: validate workflow status, license, skill count.

## 8. Definition of done — final checklist

- [ ] `python scripts/validate.py` → 0 errors, 0 warnings
- [ ] `python scripts/build_catalog.py` → catalog + README table regenerate cleanly (idempotent on second run)
- [ ] `python -m unittest discover scripts/tests` → all pass
- [ ] `cd site && npm run build` → static site with home, leaderboard, 11 skill pages, docs, contribute
- [ ] Leaderboard: sortable, filterable, nulls as "—" sorted last, searchable
- [ ] `install.sh` verified end-to-end in a temp dir
- [ ] Both workflows valid (`act` dry-run or YAML lint) and deploy skips gracefully without secrets
- [ ] No hand edits to generated files anywhere in the diff
- [ ] Every commit message follows the repo's own commit-messages skill

Work through the phases in order (A → B → C → D), committing at each acceptance boundary, and report progress against this checklist as you go.
