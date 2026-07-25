# Changelog

All notable changes to Knackbox are documented here. Skill additions are summarized;
see `catalog.json` for the full generated inventory.

## Unreleased

### Added

- Quality-first positioning vs skills.sh: WHY.md, STANDARD.md, site `/why/`, CLI `why`/`compare`/multi-agent.
- Skills batch to 83: helm, design-system, OSS triage, OpenAPI, flags, secrets, ETL, policies, RFPs, sprint/1:1, market sizing, case studies, docs migration, code comments.
- Packs: OSS Maintainers, Product & GTM.
- Skills: `kubernetes-review`, `load-test-planning`, `privacy-request-playbook`,
  `api-changelog`, `onboarding-guides`, `survey-analysis`, `internal-comms`,
  `okr-drafting` (catalog target: 68 skills).
- CLI: `knackbox search`, `knackbox doctor`, typo suggestions on unknown skills.
- Root `package.json` so the CLI can be installed from the GitHub repo root.
- `RECIPES.md` — copy-paste install recipes for common jobs.
- Expanded starter packs for platform, privacy/compliance-adjacent, and leadership work.

## 0.1.0 — 2026-07-25

### Added

- Initial public catalog growth path (23 → 60 skills across six categories).
- Static site on Cloudflare Pages with SEO (sitemap, robots, llms.txt, JSON-LD).
- `packages/cli` — zero-dependency Node installer (`add`, `pack`, `list`, `packs`).
- `install.sh` curl fallback and ecosystem Skills CLI compatibility.
- Benchmark harness scripts, metrics docs, and community contribution guide.
- Starter packs: developer, quality, platform, data, research, writing, leadership,
  ops, career, customer-facing.
