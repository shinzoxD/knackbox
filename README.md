# Knackbox

[![Validate skills](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml/badge.svg)](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Skills](https://img.shields.io/badge/skills-47-green)

**An open library of skills for AI agents.**

Skills are small folders of instructions and resources that teach an AI model how to do a specific job well — writing commit messages, formatting meeting notes, reviewing SQL, anything. Knackbox collects high-quality, community-reviewed skills in the open [Agent Skills format](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview), so they work with Claude Code, Claude.ai, the Claude API, and any other tool that reads `SKILL.md` files.

## What a skill looks like

```
skills/<category>/<skill-name>/
├── SKILL.md        # required: YAML frontmatter + instructions
├── scripts/        # optional executable helpers
├── references/     # optional docs the model loads only when needed
└── assets/         # optional templates, fonts, icons
```

The `SKILL.md` frontmatter has two required fields. The `description` is what makes a model decide to *use* the skill, so it always says **when to trigger**, not just what the skill does:

```yaml
---
name: commit-messages
description: Write clear, conventional git commit messages. Use whenever the
  user asks for a commit message, is about to commit changes, or shares a
  diff that needs summarizing.
---
```

## Install a skill

**Open Skills CLI** — install into Claude Code, Codex, OpenCode, Cursor, or another detected agent:

```bash
npx skills add shinzoxD/knackbox --skill commit-messages
```

Add `-g` for a global install or `-a claude-code` to choose an agent explicitly. Browse the wider ecosystem at
[skills.sh](https://skills.sh/).

**Dependency-free fallback** — install directly into Claude Code with the repository script:

```bash
curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh | bash -s commit-messages
```

Use `--dest DIR` to select another Agent Skills-compatible directory, or `--force` to replace an existing copy.

**Claude.ai** — open Settings → Capabilities → Skills and upload the skill folder (or paste the `SKILL.md`).

**Anything else** — any agent runtime that supports the Agent Skills format can load these folders as-is.

## Starter packs

Curated packs provide explicit multi-skill installation commands for common workflows:

| Pack | Skills |
|---|---|
| Developer Essentials | Design, debug, test, review, secure, migrate, and ship code |
| Quality & Accessibility | Code review, security, a11y, performance, triage, tests |
| Data Workbench | Cleaning, analysis, charts, metric definitions, experiments |
| Research Rigor | Fact checks, summaries, literature, competitors, interviews |
| Clear Writing | Email, blogs, editing, landing pages, launches, social |
| Project Leadership | Decisions, RFCs, ADRs, status, retros, incidents, release notes |
| Ops & Reliability | Runbooks, postmortems, migrations, errors, performance |
| Career & Hiring | Interview prep, resumes, decision memos, professional email |

Browse commands at [knackbox.pages.dev/packs](https://knackbox.pages.dev/packs/) or consume [`packs.json`](packs.json) directly.

## Community

Want to help grow the library? See **[COMMUNITY.md](COMMUNITY.md)** for good first contributions, skill ideas, and how to request missing workflows. New skills and improvements are welcome — [CONTRIBUTING.md](CONTRIBUTING.md) has the quality bar.

## Browse the catalog

Skills are ranked the way [Artificial Analysis](https://artificialanalysis.ai) ranks models — independent measurement columns plus a composite score, with a coarse tier for quick filtering: **⭐ core** (maintainer-curated, suite-covered, and maintained), **✅ verified** (suite-covered and manually validated until measured thresholds are published), **🧪 community** (passes CI validation). Every skill ships a benchmark suite; unmeasured score fields remain visibly empty rather than being estimated. Full methodology, formulas, and how to get your skill Verified: [METRICS.md](METRICS.md).

The table below is regenerated automatically by CI on every merge — do not edit it by hand.

<!-- CATALOG:START -->
| Tier | Skill | Category | Context (tok) | Description |
|---|---|---|---|---|
| ⭐ core | [code-review](skills/coding/code-review) | coding | 572 | Review code changes for bugs, security issues, and maintainability with severity-tagged, actionable findings.… |
| ⭐ core | [commit-messages](skills/coding/commit-messages) | coding | 496 | Write clear, conventional git commit messages from diffs or descriptions of changes. Use whenever the user as… |
| ⭐ core | [meeting-notes](skills/documents/meeting-notes) | documents | 536 | Turn raw meeting transcripts, chat logs, or rough notes into clean, structured meeting notes with decisions a… |
| ✅ verified | [debugging](skills/coding/debugging) | coding | 541 | Diagnose bugs systematically instead of guessing — form hypotheses, isolate the fault, and verify the fix. Us… |
| 🧪 community | [accessibility-review](skills/coding/accessibility-review) | coding | 441 | Review UI and content for accessibility issues against WCAG-minded practices. Use whenever the user asks for… |
| 🧪 community | [api-design](skills/coding/api-design) | coding | 674 | Design and review HTTP, REST, GraphQL, and internal service APIs with clear contracts, errors, pagination, se… |
| 🧪 community | [database-migrations](skills/coding/database-migrations) | coding | 377 | Plan and review database schema migrations for safety and rollback. Use whenever the user writes migrations,… |
| 🧪 community | [dependency-upgrades](skills/coding/dependency-upgrades) | coding | 648 | Plan and execute dependency upgrades with risk assessment, changelog review, and verification. Use whenever t… |
| 🧪 community | [error-handling](skills/coding/error-handling) | coding | 365 | Design robust error handling, retries, and failure modes for application code. Use whenever the user asks abo… |
| 🧪 community | [git-conflict-resolution](skills/coding/git-conflict-resolution) | coding | 374 | Resolve git merge and rebase conflicts carefully while preserving intent. Use whenever the user has merge con… |
| 🧪 community | [performance-review](skills/coding/performance-review) | coding | 641 | Diagnose application performance bottlenecks and propose measured fixes. Use whenever the user mentions slow… |
| 🧪 community | [pr-descriptions](skills/coding/pr-descriptions) | coding | 914 | Write pull request titles and descriptions that reviewers can act on fast. Use whenever the user asks for a P… |
| 🧪 community | [refactor-planning](skills/coding/refactor-planning) | coding | 630 | Plan safe refactors that preserve behavior — seams, steps, tests, and rollback. Use whenever the user asks ho… |
| 🧪 community | [security-review](skills/coding/security-review) | coding | 1095 | Review code and designs for security vulnerabilities — injection, authn/authz, secrets, crypto, SSRF, and dat… |
| 🧪 community | [sql-query-review](skills/coding/sql-query-review) | coding | 948 | Review and improve SQL queries for correctness, performance, safety, and maintainability. Use whenever the us… |
| 🧪 community | [test-generation](skills/coding/test-generation) | coding | 616 | Design and write focused automated tests for new code, bug fixes, and risky behavior. Use whenever the user a… |
| 🧪 community | [ab-test-analysis](skills/data/ab-test-analysis) | data | 377 | Analyze A/B and experiment results with correct metrics, uncertainty, and caveats. Use whenever the user shar… |
| 🧪 community | [csv-analysis](skills/data/csv-analysis) | data | 961 | Analyze CSV, TSV, and tabular data files — profile the data, answer questions with verifiable numbers, and fl… |
| 🧪 community | [data-cleaning](skills/data/data-cleaning) | data | 540 | Profile and clean messy tabular datasets with reproducible transformations and explicit handling of types, mi… |
| 🧪 community | [data-visualization](skills/data/data-visualization) | data | 579 | Choose and produce clear, honest charts from tabular or summarized data. Use whenever the user asks for a cha… |
| 🧪 community | [metrics-definitions](skills/data/metrics-definitions) | data | 378 | Define product and business metrics with precise numerators, denominators, and edge cases. Use whenever the u… |
| 🧪 community | [architecture-decision-records](skills/documents/architecture-decision-records) | documents | 332 | Write concise Architecture Decision Records that capture context, decision, and consequences. Use whenever th… |
| 🧪 community | [incident-postmortems](skills/documents/incident-postmortems) | documents | 556 | Write blameless incident postmortems with timeline, impact, root cause, and action items. Use whenever the us… |
| 🧪 community | [project-proposals](skills/documents/project-proposals) | documents | 477 | Turn a rough initiative into a decision-ready project proposal with outcomes, scope, plan, costs, risks, and… |
| 🧪 community | [release-notes](skills/documents/release-notes) | documents | 724 | Write clear user-facing and developer release notes from commits, PRs, and changelogs. Use whenever the user… |
| 🧪 community | [resume-builder](skills/documents/resume-builder) | documents | 526 | Build or rewrite resumes and tailor them to a specific job description, with achievement-focused bullets that… |
| 🧪 community | [rfc-design-docs](skills/documents/rfc-design-docs) | documents | 588 | Write RFCs and technical design docs that force clear decisions. Use whenever the user asks for an RFC, desig… |
| 🧪 community | [runbook-writing](skills/documents/runbook-writing) | documents | 356 | Write operational runbooks that on-call engineers can follow under stress. Use whenever the user asks for a r… |
| 🧪 community | [technical-documentation](skills/documents/technical-documentation) | documents | 504 | Write and improve technical documentation, tutorials, runbooks, and reference pages that users can follow suc… |
| 🧪 community | [decision-memos](skills/productivity/decision-memos) | productivity | 460 | Write concise decision memos that compare options, expose trade-offs, and make a clear evidence-based recomme… |
| 🧪 community | [email-drafts](skills/productivity/email-drafts) | productivity | 478 | Draft and rewrite professional emails that get replies — clear ask, right tone, minimal length. Use whenever… |
| 🧪 community | [interview-prep](skills/productivity/interview-prep) | productivity | 354 | Prepare for technical and behavioral interviews with structured practice. Use whenever the user asks for inte… |
| 🧪 community | [issue-triage](skills/productivity/issue-triage) | productivity | 405 | Triage bugs and tickets with severity, repro steps, and next actions. Use whenever the user asks to triage is… |
| 🧪 community | [prompt-improver](skills/productivity/prompt-improver) | productivity | 540 | Rewrite and strengthen prompts for AI models — diagnose what's vague, add structure, and return a copy-paste-… |
| 🧪 community | [retro-facilitation](skills/productivity/retro-facilitation) | productivity | 507 | Run and write software retros with useful insights and follow-through. Use whenever the user asks for a retro… |
| 🧪 community | [standup-updates](skills/productivity/standup-updates) | productivity | 367 | Turn raw work notes into crisp standup or status updates. Use whenever the user asks for a standup, daily sta… |
| 🧪 community | [task-planning](skills/productivity/task-planning) | productivity | 498 | Convert ambiguous work into an executable plan with outcomes, dependencies, milestones, owners, and verificat… |
| 🧪 community | [competitor-briefs](skills/research/competitor-briefs) | research | 532 | Research competitors into structured comparison briefs with evidence and gaps. Use whenever the user asks for… |
| 🧪 community | [fact-checking](skills/research/fact-checking) | research | 549 | Verify factual claims against current, authoritative evidence and return calibrated verdicts with citations.… |
| 🧪 community | [literature-reviews](skills/research/literature-reviews) | research | 548 | Plan and synthesize a literature review across papers and reports, organizing evidence by research question r… |
| 🧪 community | [research-summaries](skills/research/research-summaries) | research | 496 | Summarize papers, articles, and reports into structured research briefs that separate claims from evidence. U… |
| 🧪 community | [user-interview-synthesis](skills/research/user-interview-synthesis) | research | 358 | Synthesize user interviews into themes, insights, and opportunities. Use whenever the user pastes interview n… |
| 🧪 community | [blog-posts](skills/writing/blog-posts) | writing | 856 | Write blog posts and articles with a strong hook, clear structure, and a consistent voice. Use whenever the u… |
| 🧪 community | [copy-editing](skills/writing/copy-editing) | writing | 522 | Edit prose for clarity, correctness, flow, consistency, and concision while preserving the author's meaning a… |
| 🧪 community | [landing-page-copy](skills/writing/landing-page-copy) | writing | 503 | Write and improve landing-page copy with a clear offer, credible proof, scannable structure, and focused call… |
| 🧪 community | [product-announcements](skills/writing/product-announcements) | writing | 327 | Write product launch and feature announcements for users and stakeholders. Use whenever the user asks for a l… |
| 🧪 community | [social-posts](skills/writing/social-posts) | writing | 291 | Write clear social posts and short threads for LinkedIn, X, and similar channels. Use whenever the user asks… |
<!-- CATALOG:END -->

The same data is available as machine-readable [`catalog.json`](catalog.json), which also powers the project website. Each entry includes its source URL, Apache-2.0 license, compatibility notes, declared network/filesystem/execution permissions, executable-code profile, and a deterministic SHA-256 digest of the complete skill package.

## Website

**Live catalog:** [knackbox.pages.dev](https://knackbox.pages.dev) — browse the [skill leaderboard](https://knackbox.pages.dev/skills/), [starter packs](https://knackbox.pages.dev/packs/), and per-skill pages with install commands.

The static site in [`site/`](site/) is built from `catalog.json` plus the raw repository markdown files. It ships with SEO essentials: canonical URLs, Open Graph / Twitter cards, JSON-LD, `sitemap-index.xml`, `robots.txt`, and [`llms.txt`](https://knackbox.pages.dev/llms.txt) for AI crawlers. Machine-readable [`catalog.json`](https://knackbox.pages.dev/catalog.json) is published at the site root.

Requires Node.js 22.12 or newer.

Local development:

```bash
cd site
npm i
npm run dev
```

Production build:

```bash
cd site
npm run build
```

The build copies `catalog.json` / `packs.json` into `public/`, emits static files to `site/dist`, generates the sitemap, and runs Pagefind as a postbuild search indexer. Deploy `site/dist` to any static host; the included GitHub Actions workflow is wired for Cloudflare Pages.

## Contributing

New skills are very welcome — the whole point of this repo is to grow. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the folder rules and quality bar, copy [`template/SKILL.md`](template/SKILL.md) to get started, and run the validator before opening a PR:

```bash
python scripts/validate.py
```

Looking for ideas? Check the [skill request issues](../../issues?q=is%3Aissue+is%3Aopen+label%3Askill-request).

Questions and early proposals belong in [GitHub Discussions](../../discussions). See
[SUPPORT.md](SUPPORT.md) for where to ask for help, [GOVERNANCE.md](GOVERNANCE.md) for how decisions and tiers are managed,
and [EVALUATION.md](EVALUATION.md) for the reproducible benchmark protocol.

## Security

Skills may contain executable scripts. Every script is reviewed line-by-line before merge, but you should still read what you install — see [SECURITY.md](SECURITY.md).

## License

Apache-2.0 — see [LICENSE](LICENSE). Contributions are accepted under the same license via [DCO sign-off](CONTRIBUTING.md#sign-your-work).
