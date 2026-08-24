# Knackbox

[![Validate skills](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml/badge.svg)](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Skills](https://img.shields.io/badge/skills-123-green)

**An open library of Agent Skills for Claude Code, Codex, Cursor, and OpenCode — ranked by quality, not installs.**

[skills.sh](https://www.skills.sh/) is great at discovery and popularity. Knackbox is the **quality layer** on the same open [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) `SKILL.md` format: mandatory benchmarks, trust digests, honest metrics (no faked scores), and curated starter packs. Browse the live catalog at **[knackbox.pages.dev](https://knackbox.pages.dev)** · **[WHY.md](WHY.md)** · **[STANDARD.md](STANDARD.md)** · [why page](https://knackbox.pages.dev/why/) · [FAQ](https://knackbox.pages.dev/faq/).

Skills are small folders of instructions that teach a model a job well — commits, reviews, SQL, incidents, writing, IaC, auth, evals — for Claude Code, Codex, Cursor, OpenCode, Claude.ai, and any runtime that reads `SKILL.md`.

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
npx knackbox for "review a PR"
npx knackbox for "review a PR" --add
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

Default destination is `~/.claude/skills/<name>`. Use `--agent codex|cursor|opencode`, `--dest DIR`, or `--force` as needed. Package source: [`packages/cli`](packages/cli). Start with a job: [`GETTING_STARTED.md`](GETTING_STARTED.md) · [`jobs.json`](jobs.json) · [start page](https://knackbox.pages.dev/start/). Longer recipes: [`RECIPES.md`](RECIPES.md).

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
| OSS Maintainers | Issue/PR triage, contributor onboarding, reviews |
| Product & GTM | PRDs, case studies, launches, market sizing, RFPs |
| Realtime & Edge | WebSockets, webhooks, caching, rate limits |
| AI Builders | Prompt rewrite, offline eval, injection hardening |
| Mobile Shipping | iOS/Android/desktop release trains, flags, rollback |
| Identity & Trust | Auth design, webhooks, threat models, security review |

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
| 🧪 community | [accessibility-implementation](skills/coding/accessibility-implementation) | coding | 551 | Implement accessible UI — semantic HTML, keyboard behavior, focus management, and names — rather than only au… |
| 🧪 community | [accessibility-review](skills/coding/accessibility-review) | coding | 441 | Review UI and content for accessibility issues against WCAG-minded practices. Use whenever the user asks for… |
| 🧪 community | [api-changelog](skills/coding/api-changelog) | coding | 254 | Write consumer-facing API changelogs and migration notes for breaking and additive changes. Use whenever the… |
| 🧪 community | [api-design](skills/coding/api-design) | coding | 674 | Design and review HTTP, REST, GraphQL, and internal service APIs with clear contracts, errors, pagination, se… |
| 🧪 community | [auth-design](skills/coding/auth-design) | coding | 650 | Design authentication and authorization — sessions, OAuth/OIDC, JWT, MFA, cookies, and object-level access. U… |
| 🧪 community | [caching-strategies](skills/coding/caching-strategies) | coding | 286 | Design caching layers with correctness, TTLs, invalidation, and stampede control. Use whenever the user asks… |
| 🧪 community | [chaos-experiment-design](skills/coding/chaos-experiment-design) | coding | 302 | Plan chaos and resilience experiments safely with hypotheses, blast radius limits, and abort criteria. Use wh… |
| 🧪 community | [ci-cd-pipelines](skills/coding/ci-cd-pipelines) | coding | 340 | Design and review CI/CD pipelines for speed, safety, and clear failure signals. Use whenever the user edits G… |
| 🧪 community | [cli-design](skills/coding/cli-design) | coding | 244 | Design developer CLIs with clear UX, exit codes, flags, and help text. Use whenever the user builds a command… |
| 🧪 community | [cloudformation-review](skills/coding/cloudformation-review) | coding | 777 | Review AWS CloudFormation and SAM templates for deployment safety, IAM scope, replacement risk, dependencies,… |
| 🧪 community | [code-comments](skills/coding/code-comments) | coding | 317 | Write and improve code comments and docstrings that explain why, not noise. Use whenever the user asks for be… |
| 🧪 community | [container-review](skills/coding/container-review) | coding | 320 | Review Dockerfiles and container configs for size, security, and operability. Use whenever the user shares a… |
| 🧪 community | [database-indexing](skills/coding/database-indexing) | coding | 582 | Design and review database indexes and query plans — covering indexes, INCLUDE columns, partial/expression in… |
| 🧪 community | [database-migrations](skills/coding/database-migrations) | coding | 377 | Plan and review database schema migrations for safety and rollback. Use whenever the user writes migrations,… |
| 🧪 community | [dependency-upgrades](skills/coding/dependency-upgrades) | coding | 648 | Plan and execute dependency upgrades with risk assessment, changelog review, and verification. Use whenever t… |
| 🧪 community | [design-system-contribution](skills/coding/design-system-contribution) | coding | 328 | Guide contributions to a design system — component API, accessibility, tokens, and docs. Use whenever the use… |
| 🧪 community | [design-tokens](skills/coding/design-tokens) | coding | 899 | Implement a token and theming system — color, type, space, dark mode, CSS variables, and Style Dictionary. Us… |
| 🧪 community | [desktop-release](skills/coding/desktop-release) | coding | 684 | Plan and review desktop app releases — Electron, Tauri, and native installers, code signing, auto-update, and… |
| 🧪 community | [error-handling](skills/coding/error-handling) | coding | 365 | Design robust error handling, retries, and failure modes for application code. Use whenever the user asks abo… |
| 🧪 community | [feature-flags](skills/coding/feature-flags) | coding | 321 | Design feature flag rollout plans with targeting, kill switches, and cleanup. Use whenever the user asks abou… |
| 🧪 community | [finops-review](skills/coding/finops-review) | coding | 683 | Review cloud spend and FinOps plans — idle resources, rightsizing, commitment discounts, and unit-cost metric… |
| 🧪 community | [frontend-performance](skills/coding/frontend-performance) | coding | 871 | Implement frontend performance — Core Web Vitals (LCP, INP, CLS), bundle size, code splitting, image optimiza… |
| 🧪 community | [git-conflict-resolution](skills/coding/git-conflict-resolution) | coding | 374 | Resolve git merge and rebase conflicts carefully while preserving intent. Use whenever the user has merge con… |
| 🧪 community | [graphql-schema-design](skills/coding/graphql-schema-design) | coding | 354 | Design and review GraphQL schemas for authz, pagination, N+1 risk, nullability, and evolution. Use whenever t… |
| 🧪 community | [helm-chart-scaffolding](skills/coding/helm-chart-scaffolding) | coding | 332 | Scaffold and review Helm charts with safe defaults for values, templates, and hooks. Use whenever the user as… |
| 🧪 community | [i18n-review](skills/coding/i18n-review) | coding | 434 | Review product UI and copy for internationalization readiness — concatenation, pluralization, locale formats,… |
| 🧪 community | [kubernetes-review](skills/coding/kubernetes-review) | coding | 380 | Review Kubernetes manifests and Helm values for security, reliability, and operability. Use whenever the user… |
| 🧪 community | [load-test-planning](skills/coding/load-test-planning) | coding | 355 | Plan and interpret load tests with clear goals, scenarios, and pass/fail criteria. Use whenever the user asks… |
| 🧪 community | [logging-observability](skills/coding/logging-observability) | coding | 382 | Design logging, metrics, and tracing that operators can use under pressure. Use whenever the user asks about… |
| 🧪 community | [message-queue-design](skills/coding/message-queue-design) | coding | 523 | Design queue and pub/sub systems — Kafka, SQS, Rabbit, NATS — with poison messages, retries, ordering, and ex… |
| 🧪 community | [migration-playbooks](skills/coding/migration-playbooks) | coding | 258 | Plan large technical migrations with strangler patterns, dual-run, and rollback. Use whenever the user migrat… |
| 🧪 community | [mobile-release](skills/coding/mobile-release) | coding | 667 | Plan and review iOS and Android store releases — versioning, signing, store listings, staged rollout, and rol… |
| 🧪 community | [multi-region-active-active](skills/coding/multi-region-active-active) | coding | 1265 | Design multi-region and active-active systems — data-plane topology, consistency, conflict policy, traffic st… |
| 🧪 community | [observability-alerts](skills/coding/observability-alerts) | coding | 259 | Design actionable alerts that page humans only for real pain. Use whenever the user writes alert rules, fixes… |
| 🧪 community | [openapi-spec-design](skills/coding/openapi-spec-design) | coding | 275 | Design and review OpenAPI specifications for clarity, consistency, and evolution. Use whenever the user write… |
| 🧪 community | [partner-api-integration](skills/coding/partner-api-integration) | coding | 922 | Plan integrating a third-party or partner HTTP API: auth, retries, idempotency keys, sandbox vs prod keys, ve… |
| 🧪 community | [performance-review](skills/coding/performance-review) | coding | 641 | Diagnose application performance bottlenecks and propose measured fixes. Use whenever the user mentions slow… |
| 🧪 community | [pr-descriptions](skills/coding/pr-descriptions) | coding | 914 | Write pull request titles and descriptions that reviewers can act on fast. Use whenever the user asks for a P… |
| 🧪 community | [prompt-injection-hardening](skills/coding/prompt-injection-hardening) | coding | 559 | Threat-model AI features against prompt injection, tool abuse, and data exfiltration, then propose mitigation… |
| 🧪 community | [pulumi-review](skills/coding/pulumi-review) | coding | 770 | Review Pulumi programs and previews for safe infrastructure changes across TypeScript, Python, Go, C#, Java,… |
| 🧪 community | [rate-limiting](skills/coding/rate-limiting) | coding | 277 | Design rate limiting and throttling for APIs and gateways with fair use and abuse resistance. Use whenever th… |
| 🧪 community | [refactor-planning](skills/coding/refactor-planning) | coding | 630 | Plan safe refactors that preserve behavior — seams, steps, tests, and rollback. Use whenever the user asks ho… |
| 🧪 community | [secrets-management](skills/coding/secrets-management) | coding | 347 | Handle secrets safely in apps and infrastructure without committing credentials. Use whenever the user asks a… |
| 🧪 community | [security-review](skills/coding/security-review) | coding | 1104 | Review code and designs for security vulnerabilities — injection, authn/authz, secrets, crypto, SSRF, and dat… |
| 🧪 community | [sql-query-review](skills/coding/sql-query-review) | coding | 948 | Review and improve SQL queries for correctness, performance, safety, and maintainability. Use whenever the us… |
| 🧪 community | [terraform-review](skills/coding/terraform-review) | coding | 440 | Review Terraform and OpenTofu configuration and plans for blast radius, state risk, IAM overreach, and safer… |
| 🧪 community | [test-generation](skills/coding/test-generation) | coding | 616 | Design and write focused automated tests for new code, bug fixes, and risky behavior. Use whenever the user a… |
| 🧪 community | [threat-modeling](skills/coding/threat-modeling) | coding | 625 | Build a structured threat model — assets, actors, trust boundaries, STRIDE, and mitigations — before or besid… |
| 🧪 community | [webhook-design](skills/coding/webhook-design) | coding | 610 | Design outbound and inbound webhooks with signatures, retries, idempotency, and replay defense. Use whenever… |
| 🧪 community | [websocket-design](skills/coding/websocket-design) | coding | 286 | Design WebSocket and realtime channels with auth, backpressure, and reconnect semantics. Use whenever the use… |
| 🧪 community | [ab-test-analysis](skills/data/ab-test-analysis) | data | 377 | Analyze A/B and experiment results with correct metrics, uncertainty, and caveats. Use whenever the user shar… |
| 🧪 community | [anomaly-detection](skills/data/anomaly-detection) | data | 257 | Investigate metric and log anomalies with structured hypotheses and next checks. Use whenever the user sees a… |
| 🧪 community | [cost-anomaly-investigation](skills/data/cost-anomaly-investigation) | data | 792 | Investigate a sudden cloud, bill, or cost spike — isolate the time window, rank hypotheses, and name the next… |
| 🧪 community | [csv-analysis](skills/data/csv-analysis) | data | 961 | Analyze CSV, TSV, and tabular data files — profile the data, answer questions with verifiable numbers, and fl… |
| 🧪 community | [data-cleaning](skills/data/data-cleaning) | data | 540 | Profile and clean messy tabular datasets with reproducible transformations and explicit handling of types, mi… |
| 🧪 community | [data-contract-design](skills/data/data-contract-design) | data | 308 | Define producer-consumer data contracts with schema evolution, compatibility, and SLAs. Use whenever the user… |
| 🧪 community | [data-visualization](skills/data/data-visualization) | data | 579 | Choose and produce clear, honest charts from tabular or summarized data. Use whenever the user asks for a cha… |
| 🧪 community | [etl-pipeline-design](skills/data/etl-pipeline-design) | data | 300 | Design ETL and ELT pipelines with clear contracts, quality checks, and failure modes. Use whenever the user p… |
| 🧪 community | [experiment-design](skills/data/experiment-design) | data | 957 | Design A/B and switchback experiments before launch: hypothesis, randomization unit, primary metric, guardrai… |
| 🧪 community | [metrics-definitions](skills/data/metrics-definitions) | data | 378 | Define product and business metrics with precise numerators, denominators, and edge cases. Use whenever the u… |
| 🧪 community | [sql-analytics](skills/data/sql-analytics) | data | 294 | Write analytical SQL for warehouses and BI questions with correct grain and caveats. Use whenever the user as… |
| 🧪 community | [warehouse-modeling](skills/data/warehouse-modeling) | data | 882 | Design warehouse dimensional models, activity schemas, and marts with explicit fact grain, facts, dimensions,… |
| 🧪 community | [architecture-decision-records](skills/documents/architecture-decision-records) | documents | 332 | Write concise Architecture Decision Records that capture context, decision, and consequences. Use whenever th… |
| 🧪 community | [contract-redlines](skills/documents/contract-redlines) | documents | 905 | Redline commercial paper — MSAs, vendor agreements, order forms, and DPA-adjacent commercial terms — as a bus… |
| 🧪 community | [disaster-recovery](skills/documents/disaster-recovery) | documents | 879 | Write and review disaster recovery and backup restore playbooks. Use whenever the user asks for a DR plan, RP… |
| 🧪 community | [incident-command](skills/documents/incident-command) | documents | 716 | Run a live incident as commander — roles, timeline, decisions, and page cadence — distinct from postmortems a… |
| 🧪 community | [incident-postmortems](skills/documents/incident-postmortems) | documents | 556 | Write blameless incident postmortems with timeline, impact, root cause, and action items. Use whenever the us… |
| 🧪 community | [onboarding-guides](skills/documents/onboarding-guides) | documents | 292 | Write new-hire and contributor onboarding guides that get people productive fast. Use whenever the user asks… |
| 🧪 community | [policy-writing](skills/documents/policy-writing) | documents | 208 | Write clear internal policies people can follow under time pressure. Use whenever the user asks for a company… |
| 🧪 community | [product-requirements](skills/documents/product-requirements) | documents | 599 | Write decision-ready product requirements (PRDs) with problem, users, success metrics, non-goals, and scoped… |
| 🧪 community | [project-proposals](skills/documents/project-proposals) | documents | 477 | Turn a rough initiative into a decision-ready project proposal with outcomes, scope, plan, costs, risks, and… |
| 🧪 community | [release-notes](skills/documents/release-notes) | documents | 724 | Write clear user-facing and developer release notes from commits, PRs, and changelogs. Use whenever the user… |
| 🧪 community | [resume-builder](skills/documents/resume-builder) | documents | 526 | Build or rewrite resumes and tailor them to a specific job description, with achievement-focused bullets that… |
| 🧪 community | [rfc-design-docs](skills/documents/rfc-design-docs) | documents | 588 | Write RFCs and technical design docs that force clear decisions. Use whenever the user asks for an RFC, desig… |
| 🧪 community | [rfp-response](skills/documents/rfp-response) | documents | 279 | Structure RFP and RFI responses that map requirements to evidence. Use whenever the user answers a vendor que… |
| 🧪 community | [runbook-writing](skills/documents/runbook-writing) | documents | 356 | Write operational runbooks that on-call engineers can follow under stress. Use whenever the user asks for a r… |
| 🧪 community | [security-questionnaire](skills/documents/security-questionnaire) | documents | 574 | Answer vendor and enterprise security questionnaires — SIG, CAIQ, SOC 2, ISO, and custom sales security packs… |
| 🧪 community | [sla-slo-writing](skills/documents/sla-slo-writing) | documents | 255 | Write SLAs and SLOs that operations can measure and support can explain. Use whenever the user drafts service… |
| 🧪 community | [status-reports](skills/documents/status-reports) | documents | 245 | Write clear project and program status reports for stakeholders. Use whenever the user asks for a weekly stat… |
| 🧪 community | [technical-documentation](skills/documents/technical-documentation) | documents | 504 | Write and improve technical documentation, tutorials, runbooks, and reference pages that users can follow suc… |
| 🧪 community | [vendor-evaluation](skills/documents/vendor-evaluation) | documents | 252 | Run structured vendor evaluations and scorecards for build-vs-buy decisions. Use whenever the user compares v… |
| 🧪 community | [1-1-agendas](skills/productivity/1-1-agendas) | productivity | 224 | Prepare effective manager and IC 1:1 agendas and notes. Use whenever the user asks for a one-on-one agenda, 1… |
| 🧪 community | [decision-memos](skills/productivity/decision-memos) | productivity | 460 | Write concise decision memos that compare options, expose trade-offs, and make a clear evidence-based recomme… |
| 🧪 community | [delegation-briefs](skills/productivity/delegation-briefs) | productivity | 248 | Write tight delegation briefs so others can execute without thrash. Use whenever the user wants to hand off w… |
| 🧪 community | [email-drafts](skills/productivity/email-drafts) | productivity | 478 | Draft and rewrite professional emails that get replies — clear ask, right tone, minimal length. Use whenever… |
| 🧪 community | [hiring-scorecards](skills/productivity/hiring-scorecards) | productivity | 277 | Build interview scorecards and debrief structures that reduce bias and noise. Use whenever the user designs h… |
| 🧪 community | [interview-prep](skills/productivity/interview-prep) | productivity | 354 | Prepare for technical and behavioral interviews with structured practice. Use whenever the user asks for inte… |
| 🧪 community | [issue-triage](skills/productivity/issue-triage) | productivity | 405 | Triage bugs and tickets with severity, repro steps, and next actions. Use whenever the user asks to triage is… |
| 🧪 community | [meeting-agendas](skills/productivity/meeting-agendas) | productivity | 320 | Build focused meeting agendas with outcomes, timeboxes, and prep. Use whenever the user asks for a meeting ag… |
| 🧪 community | [okr-drafting](skills/productivity/okr-drafting) | productivity | 303 | Draft OKRs and goal cascades that are measurable and non-vanity. Use whenever the user asks for OKRs, quarter… |
| 🧪 community | [oss-maintainer-triage](skills/productivity/oss-maintainer-triage) | productivity | 326 | Triage open-source issues and PRs with labels, reproduction asks, and maintainer-friendly replies. Use whenev… |
| 🧪 community | [privacy-request-playbook](skills/productivity/privacy-request-playbook) | productivity | 403 | Handle DSAR, GDPR, and CCPA-style privacy requests with verification, scoping, and careful response templates… |
| 🧪 community | [prompt-evaluation](skills/productivity/prompt-evaluation) | productivity | 992 | Design and review repeatable offline evaluations for prompts, RAG systems, and tool-using agents. Use wheneve… |
| 🧪 community | [prompt-improver](skills/productivity/prompt-improver) | productivity | 540 | Rewrite and strengthen prompts for AI models — diagnose what's vague, add structure, and return a copy-paste-… |
| 🧪 community | [retro-facilitation](skills/productivity/retro-facilitation) | productivity | 507 | Run and write software retros with useful insights and follow-through. Use whenever the user asks for a retro… |
| 🧪 community | [sprint-planning](skills/productivity/sprint-planning) | productivity | 281 | Run sprint or iteration planning with capacity, goals, and clear commit scope. Use whenever the user asks for… |
| 🧪 community | [standup-updates](skills/productivity/standup-updates) | productivity | 367 | Turn raw work notes into crisp standup or status updates. Use whenever the user asks for a standup, daily sta… |
| 🧪 community | [support-macros](skills/productivity/support-macros) | productivity | 381 | Draft customer support replies and macros with correct tone, escalation judgment, and no over-promising. Use… |
| 🧪 community | [task-planning](skills/productivity/task-planning) | productivity | 498 | Convert ambiguous work into an executable plan with outcomes, dependencies, milestones, owners, and verificat… |
| 🧪 community | [timebox-planning](skills/productivity/timebox-planning) | productivity | 253 | Plan deep work and timeboxes when everything feels urgent. Use whenever the user asks how to schedule focus t… |
| 🧪 community | [competitor-briefs](skills/research/competitor-briefs) | research | 532 | Research competitors into structured comparison briefs with evidence and gaps. Use whenever the user asks for… |
| 🧪 community | [customer-discovery](skills/research/customer-discovery) | research | 260 | Plan and run customer discovery interviews that test assumptions. Use whenever the user is validating a start… |
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
| 🧪 community | [incident-comms](skills/writing/incident-comms) | writing | 396 | Write customer and stakeholder communications during incidents. Use whenever the user needs a status page upd… |
| 🧪 community | [internal-comms](skills/writing/internal-comms) | writing | 207 | Write clear internal company communications — all-hands notes, policy updates, and reorg announcements. Use w… |
| 🧪 community | [landing-page-copy](skills/writing/landing-page-copy) | writing | 503 | Write and improve landing-page copy with a clear offer, credible proof, scannable structure, and focused call… |
| 🧪 community | [newsletter-writing](skills/writing/newsletter-writing) | writing | 161 | Write email newsletters with a clear point, scannable structure, and one CTA. Use whenever the user asks for… |
| 🧪 community | [press-release](skills/writing/press-release) | writing | 171 | Write press-style announcements with a lead, facts, and quotes without hype fluff. Use whenever the user need… |
| 🧪 community | [product-announcements](skills/writing/product-announcements) | writing | 327 | Write product launch and feature announcements for users and stakeholders. Use whenever the user asks for a l… |
| 🧪 community | [social-posts](skills/writing/social-posts) | writing | 291 | Write clear social posts and short threads for LinkedIn, X, and similar channels. Use whenever the user asks… |
<!-- CATALOG:END -->

The same data is available as machine-readable [`catalog.json`](catalog.json), which also powers the project website. Each entry includes its source URL, Apache-2.0 license, compatibility notes, declared network/filesystem/execution permissions, executable-code profile, and a deterministic SHA-256 digest of the complete skill package.

## Website

**Live catalog:** [knackbox.pages.dev](https://knackbox.pages.dev) — browse the [skill leaderboard](https://knackbox.pages.dev/skills/), [starter packs](https://knackbox.pages.dev/packs/), and per-skill pages with install commands.

The static site in [`site/`](site/) is built from `catalog.json` plus the raw repository markdown files. It ships with SEO essentials: canonical URLs, Open Graph / Twitter cards, JSON-LD (WebSite, FAQ, HowTo, SoftwareSourceCode), `sitemap-index.xml`, `robots.txt`, [`llms.txt`](https://knackbox.pages.dev/llms.txt), and [`llms-full.txt`](https://knackbox.pages.dev/llms-full.txt) for AI crawlers. Machine-readable [`catalog.json`](https://knackbox.pages.dev/catalog.json) is published at the site root. Human-readable answers: [FAQ](https://knackbox.pages.dev/faq/).

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
