# Community guide

Knackbox grows when people add skills, improve benchmarks, and share what
agents still get wrong. This page is the short map for contributors and users.

## Ways to help (pick one)

| Effort | What to do | Where |
|---|---|---|
| 5 minutes | Star the repo, share a skill that helped you, try `npx knackbox search <job>` | GitHub / social |
| 15 minutes | [Request a skill](https://github.com/shinzoxD/knackbox/issues/new?template=skill_request.yml) with real trigger prompts | Issues |
| 30 minutes | Add a recipe to [RECIPES.md](RECIPES.md) for your team's workflow | PR |
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

- Cost anomaly investigation playbooks beyond `finops-review`
- Design token / theming implementation (beyond design-system contribution)
- Partner API integration playbooks
- Experiment design (pre-launch, distinct from `ab-test-analysis`)

Shipped from community requests: `terraform-review`, `pulumi-review`,
`cloudformation-review`, `prompt-evaluation`, `mobile-release`,
`desktop-release`, `finops-review`, `incident-command`,
`database-indexing`, `accessibility-implementation`,
`security-questionnaire`, `disaster-recovery`, `frontend-performance`,
`contract-redlines`, `warehouse-modeling`, `prompt-injection-hardening`,
`i18n-review`, `graphql-schema-design`, `support-macros`,
`kubernetes-review`, `load-test-planning`, `privacy-request-playbook`.

If you build a new skill, link any related issue in your PR.

## Using Knackbox in public content

- Site: [knackbox.pages.dev](https://knackbox.pages.dev)
- Install: `npx knackbox add commit-messages` (see [`packages/cli`](packages/cli))
- Ecosystem CLI: `npx skills add shinzoxD/knackbox --skill commit-messages` ([skills.sh](https://www.skills.sh/))
- Ecosystem guide: [ECOSYSTEM.md](ECOSYSTEM.md)
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
