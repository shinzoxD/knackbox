# Knackbox

[![Validate skills](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml/badge.svg)](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Skills](https://img.shields.io/badge/skills-83-green)

**An open library of skills for AI agents — ranked by quality, not installs.**

[skills.sh](https://www.skills.sh/) is great at discovery and popularity. Knackbox is the **quality layer** on the same open [Agent Skills format](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview): mandatory benchmarks, trust digests, honest metrics (no faked scores), and curated packs. See **[WHY.md](WHY.md)** · **[STANDARD.md](STANDARD.md)** · [why page](https://knackbox.pages.dev/why/).

Skills are small folders of instructions that teach a model a job well — commits, reviews, SQL, incidents, writing — for Claude Code, Codex, Cursor, OpenCode, and any runtime that reads `SKILL.md`.

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

**Knackbox CLI** — zero-dependency Node installer (resolves the live catalog, extracts from the repo tarball):

```bash
npx knackbox add commit-messages
npx knackbox add code-review security-review --agent cursor
npx knackbox pack developer-essentials
npx knackbox search security
npx knackbox list --sort tier
npx knackbox compare code-review security-review
npx knackbox add commit-messages --agent codex,cursor
npx knackbox doctor
npx knackbox why
```

Default destination is `~/.claude/skills/<name>`. Use `--agent codex|cursor|opencode`, `--dest DIR`, or `--force` as needed. Package source: [`packages/cli`](packages/cli). Job-based install recipes: [`RECIPES.md`](RECIPES.md).

Until the package is on the public npm registry, run from a clone:

```bash
node packages/cli/bin/knackbox.js add commit-messages
# or: npm run knackbox -- add commit-messages
```

**Open Skills CLI ([skills.sh](https://www.skills.sh/))** — install into Claude Code, Codex, OpenCode, Cursor, or another detected agent:

```bash
npx skills add shinzoxD/knackbox --list
npx skills add shinzoxD/knackbox --skill commit-messages -y
npx skills add shinzoxD/knackbox --skill '*' -y
```

Add `-g` for a global install or `-a claude-code` (or `-a '*'` for all agents). Knackbox is fully compatible with the open Agent Skills ecosystem; see [ECOSYSTEM.md](ECOSYSTEM.md) for how skills.sh works and how to combine third-party skills with this library.

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
| Developer Essentials | Design, debug, test, review, secure, CI/CD, k8s, ship |
| Quality & Accessibility | Code review, security, a11y, i18n, performance, triage |
| Platform & Infra | Terraform, k8s, containers, CI/CD, load tests, GraphQL |
| Data Workbench | Cleaning, analysis, charts, metrics, experiments, SQL |
| Research Rigor | Fact checks, summaries, literature, competitors, surveys |
| Clear Writing | Email, blogs, launches, social, internal & API comms |
| Project Leadership | Decisions, RFCs, OKRs, onboarding, status, retros |
| Ops & Reliability | Runbooks, postmortems, k8s, load tests, observability |
| Career & Hiring | Interview prep, resumes, decision memos, professional email |
| Customer Facing | Support macros, privacy, incident updates, announcements |
| Privacy & Trust | Privacy requests, support judgment, security, agent hardening |
| Team Operating System | OKRs, agendas, onboarding, status, retros, delegation |

Job-based install sets: [RECIPES.md](RECIPES.md).

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
| 🧪 community | [api-changelog](skills/coding/api-changelog) | coding | 254 | Write consumer-facing API changelogs and migration notes for breaking and additive changes. Use whenever the… |
| 🧪 community | [api-design](skills/coding/api-design) | coding | 674 | Design and review HTTP, REST, GraphQL, and internal service APIs with clear contracts, errors, pagination, se… |
| 🧪 community | [ci-cd-pipelines](skills/coding/ci-cd-pipelines) | coding | 340 | Design and review CI/CD pipelines for speed, safety, and clear failure signals. Use whenever the user edits G… |
| 🧪 community | [code-comments](skills/coding/code-comments) | coding | 317 | Write and improve code comments and docstrings that explain why, not noise. Use whenever the user asks for be… |
| 🧪 community | [container-review](skills/coding/container-review) | coding | 320 | Review Dockerfiles and container configs for size, security, and operability. Use whenever the user shares a… |
| 🧪 community | [database-migrations](skills/coding/database-migrations) | coding | 377 | Plan and review database schema migrations for safety and rollback. Use whenever the user writes migrations,… |
| 🧪 community | [dependency-upgrades](skills/coding/dependency-upgrades) | coding | 648 | Plan and execute dependency upgrades with risk assessment, changelog review, and verification. Use whenever t… |
| 🧪 community | [design-system-contribution](skills/coding/design-system-contribution) | coding | 328 | Guide contributions to a design system — component API, accessibility, tokens, and docs. Use whenever the use… |
| 🧪 community | [error-handling](skills/coding/error-handling) | coding | 365 | Design robust error handling, retries, and failure modes for application code. Use whenever the user asks abo… |
| 🧪 community | [feature-flags](skills/coding/feature-flags) | coding | 321 | Design feature flag rollout plans with targeting, kill switches, and cleanup. Use whenever the user asks abou… |
| 🧪 community | [git-conflict-resolution](skills/coding/git-conflict-resolution) | coding | 374 | Resolve git merge and rebase conflicts carefully while preserving intent. Use whenever the user has merge con… |
| 🧪 community | [graphql-schema-design](skills/coding/graphql-schema-design) | coding | 354 | Design and review GraphQL schemas for authz, pagination, N+1 risk, nullability, and evolution. Use whenever t… |
| 🧪 community | [helm-chart-scaffolding](skills/coding/helm-chart-scaffolding) | coding | 332 | Scaffold and review Helm charts with safe defaults for values, templates, and hooks. Use whenever the user as… |
| 🧪 community | [i18n-review](skills/coding/i18n-review) | coding | 434 | Review product UI and copy for internationalization readiness — concatenation, pluralization, locale formats,… |
| 🧪 community | [kubernetes-review](skills/coding/kubernetes-review) | coding | 380 | Review Kubernetes manifests and Helm values for security, reliability, and operability. Use whenever the user… |
| 🧪 community | [load-test-planning](skills/coding/load-test-planning) | coding | 355 | Plan and interpret load tests with clear goals, scenarios, and pass/fail criteria. Use whenever the user asks… |
| 🧪 community | [logging-observability](skills/coding/logging-observability) | coding | 382 | Design logging, metrics, and tracing that operators can use under pressure. Use whenever the user asks about… |
| 🧪 community | [openapi-spec-design](skills/coding/openapi-spec-design) | coding | 275 | Design and review OpenAPI specifications for clarity, consistency, and evolution. Use whenever the user write… |
| 🧪 community | [performance-review](skills/coding/performance-review) | coding | 641 | Diagnose application performance bottlenecks and propose measured fixes. Use whenever the user mentions slow… |
| 🧪 community | [pr-descriptions](skills/coding/pr-descriptions) | coding | 914 | Write pull request titles and descriptions that reviewers can act on fast. Use whenever the user asks for a P… |
| 🧪 community | [prompt-injection-hardening](skills/coding/prompt-injection-hardening) | coding | 559 | Threat-model AI features against prompt injection, tool abuse, and data exfiltration, then propose mitigation… |
| 🧪 community | [refactor-planning](skills/coding/refactor-planning) | coding | 630 | Plan safe refactors that preserve behavior — seams, steps, tests, and rollback. Use whenever the user asks ho… |
| 🧪 community | [secrets-management](skills/coding/secrets-management) | coding | 347 | Handle secrets safely in apps and infrastructure without committing credentials. Use whenever the user asks a… |
| 🧪 community | [security-review](skills/coding/security-review) | coding | 1095 | Review code and designs for security vulnerabilities — injection, authn/authz, secrets, crypto, SSRF, and dat… |
| 🧪 community | [sql-query-review](skills/coding/sql-query-review) | coding | 948 | Review and improve SQL queries for correctness, performance, safety, and maintainability. Use whenever the us… |
| 🧪 community | [terraform-review](skills/coding/terraform-review) | coding | 440 | Review Terraform and OpenTofu configuration and plans for blast radius, state risk, IAM overreach, and safer… |
| 🧪 community | [test-generation](skills/coding/test-generation) | coding | 616 | Design and write focused automated tests for new code, bug fixes, and risky behavior. Use whenever the user a… |
| 🧪 community | [ab-test-analysis](skills/data/ab-test-analysis) | data | 377 | Analyze A/B and experiment results with correct metrics, uncertainty, and caveats. Use whenever the user shar… |
| 🧪 community | [csv-analysis](skills/data/csv-analysis) | data | 961 | Analyze CSV, TSV, and tabular data files — profile the data, answer questions with verifiable numbers, and fl… |
| 🧪 community | [data-cleaning](skills/data/data-cleaning) | data | 540 | Profile and clean messy tabular datasets with reproducible transformations and explicit handling of types, mi… |
| 🧪 community | [data-visualization](skills/data/data-visualization) | data | 579 | Choose and produce clear, honest charts from tabular or summarized data. Use whenever the user asks for a cha… |
| 🧪 community | [etl-pipeline-design](skills/data/etl-pipeline-design) | data | 300 | Design ETL and ELT pipelines with clear contracts, quality checks, and failure modes. Use whenever the user p… |
| 🧪 community | [metrics-definitions](skills/data/metrics-definitions) | data | 378 | Define product and business metrics with precise numerators, denominators, and edge cases. Use whenever the u… |
| 🧪 community | [sql-analytics](skills/data/sql-analytics) | data | 294 | Write analytical SQL for warehouses and BI questions with correct grain and caveats. Use whenever the user as… |
| 🧪 community | [architecture-decision-records](skills/documents/architecture-decision-records) | documents | 332 | Write concise Architecture Decision Records that capture context, decision, and consequences. Use whenever th… |
| 🧪 community | [incident-postmortems](skills/documents/incident-postmortems) | documents | 556 | Write blameless incident postmortems with timeline, impact, root cause, and action items. Use whenever the us… |
| 🧪 community | [onboarding-guides](skills/documents/onboarding-guides) | documents | 292 | Write new-hire and contributor onboarding guides that get people productive fast. Use whenever the user asks… |
| 🧪 community | [policy-writing](skills/documents/policy-writing) | documents | 208 | Write clear internal policies people can follow under time pressure. Use whenever the user asks for a company… |
| 🧪 community | [project-proposals](skills/documents/project-proposals) | documents | 477 | Turn a rough initiative into a decision-ready project proposal with outcomes, scope, plan, costs, risks, and… |
| 🧪 community | [release-notes](skills/documents/release-notes) | documents | 724 | Write clear user-facing and developer release notes from commits, PRs, and changelogs. Use whenever the user… |
| 🧪 community | [resume-builder](skills/documents/resume-builder) | documents | 526 | Build or rewrite resumes and tailor them to a specific job description, with achievement-focused bullets that… |
| 🧪 community | [rfc-design-docs](skills/documents/rfc-design-docs) | documents | 588 | Write RFCs and technical design docs that force clear decisions. Use whenever the user asks for an RFC, desig… |
| 🧪 community | [rfp-response](skills/documents/rfp-response) | documents | 279 | Structure RFP and RFI responses that map requirements to evidence. Use whenever the user answers a vendor que… |
| 🧪 community | [runbook-writing](skills/documents/runbook-writing) | documents | 356 | Write operational runbooks that on-call engineers can follow under stress. Use whenever the user asks for a r… |
| 🧪 community | [status-reports](skills/documents/status-reports) | documents | 245 | Write clear project and program status reports for stakeholders. Use whenever the user asks for a weekly stat… |
| 🧪 community | [technical-documentation](skills/documents/technical-documentation) | documents | 504 | Write and improve technical documentation, tutorials, runbooks, and reference pages that users can follow suc… |
| 🧪 community | [1-1-agendas](skills/productivity/1-1-agendas) | productivity | 224 | Prepare effective manager and IC 1:1 agendas and notes. Use whenever the user asks for a one-on-one agenda, 1… |
| 🧪 community | [decision-memos](skills/productivity/decision-memos) | productivity | 460 | Write concise decision memos that compare options, expose trade-offs, and make a clear evidence-based recomme… |
| 🧪 community | [delegation-briefs](skills/productivity/delegation-briefs) | productivity | 248 | Write tight delegation briefs so others can execute without thrash. Use whenever the user wants to hand off w… |
| 🧪 community | [email-drafts](skills/productivity/email-drafts) | productivity | 478 | Draft and rewrite professional emails that get replies — clear ask, right tone, minimal length. Use whenever… |
| 🧪 community | [interview-prep](skills/productivity/interview-prep) | productivity | 354 | Prepare for technical and behavioral interviews with structured practice. Use whenever the user asks for inte… |
| 🧪 community | [issue-triage](skills/productivity/issue-triage) | productivity | 405 | Triage bugs and tickets with severity, repro steps, and next actions. Use whenever the user asks to triage is… |
| 🧪 community | [meeting-agendas](skills/productivity/meeting-agendas) | productivity | 320 | Build focused meeting agendas with outcomes, timeboxes, and prep. Use whenever the user asks for a meeting ag… |
| 🧪 community | [okr-drafting](skills/productivity/okr-drafting) | productivity | 303 | Draft OKRs and goal cascades that are measurable and non-vanity. Use whenever the user asks for OKRs, quarter… |
| 🧪 community | [oss-maintainer-triage](skills/productivity/oss-maintainer-triage) | productivity | 326 | Triage open-source issues and PRs with labels, reproduction asks, and maintainer-friendly replies. Use whenev… |
| 🧪 community | [privacy-request-playbook](skills/productivity/privacy-request-playbook) | productivity | 403 | Handle DSAR, GDPR, and CCPA-style privacy requests with verification, scoping, and careful response templates… |
| 🧪 community | [prompt-improver](skills/productivity/prompt-improver) | productivity | 540 | Rewrite and strengthen prompts for AI models — diagnose what's vague, add structure, and return a copy-paste-… |
| 🧪 community | [retro-facilitation](skills/productivity/retro-facilitation) | productivity | 507 | Run and write software retros with useful insights and follow-through. Use whenever the user asks for a retro… |
| 🧪 community | [sprint-planning](skills/productivity/sprint-planning) | productivity | 281 | Run sprint or iteration planning with capacity, goals, and clear commit scope. Use whenever the user asks for… |
| 🧪 community | [standup-updates](skills/productivity/standup-updates) | productivity | 367 | Turn raw work notes into crisp standup or status updates. Use whenever the user asks for a standup, daily sta… |
| 🧪 community | [support-macros](skills/productivity/support-macros) | productivity | 381 | Draft customer support replies and macros with correct tone, escalation judgment, and no over-promising. Use… |
| 🧪 community | [task-planning](skills/productivity/task-planning) | productivity | 498 | Convert ambiguous work into an executable plan with outcomes, dependencies, milestones, owners, and verificat… |
| 🧪 community | [competitor-briefs](skills/research/competitor-briefs) | research | 532 | Research competitors into structured comparison briefs with evidence and gaps. Use whenever the user asks for… |
| 🧪 community | [fact-checking](skills/research/fact-checking) | research | 549 | Verify factual claims against current, authoritative evidence and return calibrated verdicts with citations.… |
| 🧪 community | [literature-reviews](skills/research/literature-reviews) | research | 548 | Plan and synthesize a literature review across papers and reports, organizing evidence by research question r… |
| 🧪 community | [market-sizing](skills/research/market-sizing) | research | 249 | Build transparent TAM SAM SOM style market sizing with explicit assumptions. Use whenever the user asks for m… |
| 🧪 community | [research-summaries](skills/research/research-summaries) | research | 496 | Summarize papers, articles, and reports into structured research briefs that separate claims from evidence. U… |
| 🧪 community | [survey-analysis](skills/research/survey-analysis) | research | 266 | Analyze survey results into themes, segments, and decision-ready findings. Use whenever the user shares surve… |
| 🧪 community | [user-interview-synthesis](skills/research/user-interview-synthesis) | research | 358 | Synthesize user interviews into themes, insights, and opportunities. Use whenever the user pastes interview n… |
| 🧪 community | [blog-posts](skills/writing/blog-posts) | writing | 856 | Write blog posts and articles with a strong hook, clear structure, and a consistent voice. Use whenever the u… |
| 🧪 community | [case-studies](skills/writing/case-studies) | writing | 234 | Write customer case studies with problem, solution, proof, and quote discipline. Use whenever the user asks f… |
| 🧪 community | [copy-editing](skills/writing/copy-editing) | writing | 522 | Edit prose for clarity, correctness, flow, consistency, and concision while preserving the author's meaning a… |
| 🧪 community | [documentation-migration](skills/writing/documentation-migration) | writing | 290 | Plan and execute docs migrations between tools and information architectures. Use whenever the user moves doc… |
| 🧪 community | [incident-comms](skills/writing/incident-comms) | writing | 377 | Write customer and stakeholder communications during incidents. Use whenever the user needs a status page upd… |
| 🧪 community | [internal-comms](skills/writing/internal-comms) | writing | 207 | Write clear internal company communications — all-hands notes, policy updates, and reorg announcements. Use w… |
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
