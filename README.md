# Knackbox

[![Validate skills](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml/badge.svg)](https://github.com/shinzoxD/knackbox/actions/workflows/validate.yml)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Skills](https://img.shields.io/badge/skills-11-green)

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

**Claude Code** — run the installer:

```bash
curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh | bash -s commit-messages
```

Use `--dest DIR` to install to another Agent Skills-compatible directory, or `--force` to replace an existing copy.

**Claude.ai** — open Settings → Capabilities → Skills and upload the skill folder (or paste the `SKILL.md`).

**Anything else** — any agent runtime that supports the Agent Skills format can load these folders as-is.

## Browse the catalog

Skills are ranked the way [Artificial Analysis](https://artificialanalysis.ai) ranks models — independent measured columns plus a composite score, with a coarse tier for quick filtering: **⭐ core** (curated + benchmarked + maintained), **✅ verified** (ships a benchmark suite that meets thresholds), **🧪 community** (passes CI validation). Full methodology, formulas, and how to get your skill Verified: [METRICS.md](METRICS.md).

The table below is regenerated automatically by CI on every merge — do not edit it by hand.

<!-- CATALOG:START -->
| Tier | Skill | Category | Context (tok) | Description |
|---|---|---|---|---|
| ⭐ core | [code-review](skills/coding/code-review) | coding | 572 | Review code changes for bugs, security issues, and maintainability with severity-tagged, actionable findings.… |
| ⭐ core | [commit-messages](skills/coding/commit-messages) | coding | 496 | Write clear, conventional git commit messages from diffs or descriptions of changes. Use whenever the user as… |
| ⭐ core | [meeting-notes](skills/documents/meeting-notes) | documents | 536 | Turn raw meeting transcripts, chat logs, or rough notes into clean, structured meeting notes with decisions a… |
| ✅ verified | [debugging](skills/coding/debugging) | coding | 541 | Diagnose bugs systematically instead of guessing — form hypotheses, isolate the fault, and verify the fix. Us… |
| 🧪 community | [pr-descriptions](skills/coding/pr-descriptions) | coding | 400 | Write pull request titles and descriptions that reviewers can act on fast. Use whenever the user asks for a P… |
| 🧪 community | [csv-analysis](skills/data/csv-analysis) | data | 460 | Analyze CSV, TSV, and tabular data files — profile the data, answer questions with verifiable numbers, and fl… |
| 🧪 community | [resume-builder](skills/documents/resume-builder) | documents | 526 | Build or rewrite resumes and tailor them to a specific job description, with achievement-focused bullets that… |
| 🧪 community | [email-drafts](skills/productivity/email-drafts) | productivity | 478 | Draft and rewrite professional emails that get replies — clear ask, right tone, minimal length. Use whenever… |
| 🧪 community | [prompt-improver](skills/productivity/prompt-improver) | productivity | 540 | Rewrite and strengthen prompts for AI models — diagnose what's vague, add structure, and return a copy-paste-… |
| 🧪 community | [research-summaries](skills/research/research-summaries) | research | 496 | Summarize papers, articles, and reports into structured research briefs that separate claims from evidence. U… |
| 🧪 community | [blog-posts](skills/writing/blog-posts) | writing | 478 | Write blog posts and articles with a strong hook, clear structure, and a consistent voice. Use whenever the u… |
<!-- CATALOG:END -->

The same data is available as machine-readable [`catalog.json`](catalog.json), which also powers the project website.

## Website

The static site lives in [`site/`](site/) and is built from `catalog.json` plus the raw repository markdown files.

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

The build emits static files to `site/dist` and runs Pagefind as a postbuild search indexer. Deploy `site/dist` to any static host; the included GitHub Actions workflow is wired for Cloudflare Pages.

## Contributing

New skills are very welcome — the whole point of this repo is to grow. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the folder rules and quality bar, copy [`template/SKILL.md`](template/SKILL.md) to get started, and run the validator before opening a PR:

```bash
python scripts/validate.py
```

Looking for ideas? Check the [skill request issues](../../issues?q=is%3Aissue+is%3Aopen+label%3Askill-request).

## Security

Skills may contain executable scripts. Every script is reviewed line-by-line before merge, but you should still read what you install — see [SECURITY.md](SECURITY.md).

## License

Apache-2.0 — see [LICENSE](LICENSE). Contributions are accepted under the same license via [DCO sign-off](CONTRIBUTING.md#sign-your-work).
