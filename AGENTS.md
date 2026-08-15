# Agent notes for this repo

If you are an AI agent contributing to Knackbox, read this before writing files.

## What this repo is

A **quality-first** library of Agent Skills (`SKILL.md` folders) plus a static catalog site and a zero-dependency installer. Popularity is not a ranking signal. Unmeasured scores stay empty.

## Do this

1. Add skills only under `skills/<category>/<name>/` with `SKILL.md` + `benchmarks/prompts.json`.
2. The YAML `description` must say **when to trigger**, not just what the skill does.
3. Point at sibling skills instead of overlapping them.
4. Run `python scripts/validate.py` before you stop. It must report 0 errors.
5. Do **not** hand-edit `catalog.json` or the README catalog table. Run `python scripts/build_catalog.py`.
6. Sign commits with `git commit -s` (DCO).

## Do not

- Invent measurements, dollar amounts, CVEs, or vendor API paths.
- Add `scripts/` with undisclosed network calls.
- Expand `tiers.yaml` (maintainers only).
- Dump generic advice the base model already follows.

## Quality bar

`CONTRIBUTING.md` and `template/SKILL.md` are the contract. Benchmarks need 5+ trigger prompts, 5+ near-misses, and 3 graded tasks with observable criteria. No `TODO` placeholders.

## Job guides

`jobs.json` maps real jobs ("review a PR") to a short skill set. The CLI (`knackbox for`) and `/start/` page consume it. If you add a skill that completes a job, add it there and keep the set small (2–5 skills).

## Site

`cd site && npm i && npm test && npm run build` after catalog or page changes. Node 22.12+.
