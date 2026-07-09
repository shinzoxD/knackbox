# Contributing

Thanks for helping grow the library! This guide covers everything you need to submit a skill.

## Add a skill in five steps

1. **Fork** this repo and create a branch.
2. **Copy the template**: `cp -r template skills/<category>/<your-skill-name>` and edit `SKILL.md`.
3. **Test it**: run your skill against at least 2–3 real prompts in Claude Code or Claude.ai and make sure the output is what you intended.
4. **Validate**: `python scripts/validate.py` must pass (CI runs the same script).
5. **Open a PR** using the template, including the prompts you tested with.

We aim to review PRs within 48 hours.

## Folder and naming rules

- Path is always `skills/<category>/<skill-name>/SKILL.md`.
- Skill names are lowercase-with-hyphens, at most 64 characters, and **must match the folder name** exactly.
- Current categories: `coding`, `writing`, `documents`, `data`, `research`, `productivity`. Want a new category? Open an issue first.
- Optional subfolders: `scripts/` (executable helpers), `references/` (docs loaded on demand), `assets/` (templates, fonts, images).

## The quality bar

**The `description` is the most important line you will write.** It is the only thing the model sees before deciding whether to use your skill, so it must state *when to trigger*, not just what the skill does. Models tend to under-trigger skills, so be a little pushy:

- Weak: `description: Helps with commit messages.`
- Strong: `description: Write clear, conventional git commit messages. Use whenever the user asks for a commit message, is about to commit changes, mentions "git commit", or shares a diff that needs summarizing — even if they don't ask about formatting.`

Beyond the description:

- Keep the `SKILL.md` body under **500 lines**. If you need more, move detail into `references/` and tell the model when to read each file (this is called progressive disclosure — the model only loads what it needs).
- Write instructions for the *model*, not marketing copy for humans. Be concrete: formats, rules, good/bad examples, edge cases.
- Include no secrets, credentials, or personal data anywhere in the skill.
- If your skill ships `scripts/`, keep them short, plainly written, and free of undisclosed network calls — see [SECURITY.md](SECURITY.md).

## Improving existing skills

Fixes and improvements to existing skills are just as valuable as new ones. Keep the skill's `name` unchanged, describe what you changed and why in the PR, and re-test with the original example prompts.

## Tiers and benchmarks

Every merged skill starts at **🧪 community** tier. To move up to **✅ verified**, add a `benchmarks/prompts.json` to your skill (schema and thresholds in [METRICS.md](METRICS.md)) — the example prompts from your PR are the natural seed for it. **⭐ core** is maintainer-curated on top of verified. Tier assignments live in `tiers.yaml`, which only maintainers edit.

## Sign your work

We use the [Developer Certificate of Origin](https://developercertificate.org/) instead of a CLA. Sign each commit with:

```bash
git commit -s -m "feat: add sql-query-reviewer skill"
```

This adds a `Signed-off-by` line certifying you have the right to contribute the work under the repo's Apache-2.0 license.

## Code of conduct

Be excellent to each other. The full policy is in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
