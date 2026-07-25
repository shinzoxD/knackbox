# Community guide

Knackbox grows when people add skills, improve benchmarks, and share what
agents still get wrong. This page is the short map for contributors and users.

## Ways to help (pick one)

| Effort | What to do | Where |
|---|---|---|
| 5 minutes | Star the repo, share a skill that helped you | GitHub / social |
| 15 minutes | [Request a skill](https://github.com/shinzoxD/knackbox/issues/new?template=skill_request.yml) with real trigger prompts | Issues |
| 1–2 hours | Improve an existing skill (examples, edge cases, benchmarks) | PR |
| Half day | Add a new skill with `scripts/new_skill.py` + validation | PR |
| Ongoing | Run measurements when you have API access; report regressions | PR + Discussions |

## Good first contributions

These usually review quickly:

1. **Thicken a thin skill** — add a good/bad example pair or an edge case you hit in production.
2. **Expand benchmarks** — add realistic `should_trigger` / near-miss prompts from your workflow.
3. **Add `references/`** — progressive disclosure for long checklists (see `meeting-notes`, `security-review`).
4. **Fix trigger descriptions** — the YAML `description` is the most important line; make under-triggering harder.
5. **Pack ideas** — propose a starter pack of 3–6 skills for a job you actually do.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for folder rules, the quality bar, and DCO sign-off (`git commit -s`).

## Skill ideas the community often wants

Open a skill request (or claim one) if you can bring real expertise:

- Infrastructure-as-code review (Terraform/Pulumi)
- Prompt evaluation / offline eval harness notes
- Mobile release checklist
- Threat model for AI features (prompt injection, data exfil)
- Localization / i18n review
- GraphQL schema design (deeper than general API design)
- Data contract / schema registry workflows
- Customer support macros with escalation judgment
- Hiring scorecards (beyond interview prep)
- Open-source maintainer triage (issues + PRs)

If you build one of these, link the issue in your PR.

## Using Knackbox in public content

- Site: [knackbox.pages.dev](https://knackbox.pages.dev)
- Install example: `npx skills add shinzoxD/knackbox --skill commit-messages`
- Machine catalog: [catalog.json](https://knackbox.pages.dev/catalog.json)
- AI crawlers: [llms.txt](https://knackbox.pages.dev/llms.txt)

Attribution is appreciated but not required beyond the Apache-2.0 license terms.

## Code of conduct and safety

- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — be excellent.
- [SECURITY.md](SECURITY.md) — private vulnerability reports; careful review of any `scripts/`.
- Skills must not ship secrets, credentials, or undisclosed network calls.

## Maintainers

Tier changes (`tiers.yaml`) and measurement merges follow [GOVERNANCE.md](GOVERNANCE.md)
and [EVALUATION.md](EVALUATION.md). When in doubt, open a Discussion before a large PR.
