# skills.sh & the Agent Skills ecosystem

[skills.sh](https://www.skills.sh/) is the open **Agent Skills directory and leaderboard**.
The CLI is:

```bash
npx skills add <owner/repo>
```

Knackbox is a normal skills package in that ecosystem. Same `SKILL.md` format,
same install path model — not a competing standard.

## Can you use Knackbox skills via skills.sh?

**Yes.** The Skills CLI already discovers all Knackbox skills from GitHub:

```bash
# List every skill in this repo
npx skills add shinzoxD/knackbox --list

# Install one skill into your agent(s)
npx skills add shinzoxD/knackbox --skill commit-messages -y

# Install everything from Knackbox
npx skills add shinzoxD/knackbox --skill '*' -y

# Target a specific agent (Claude Code, Cursor, Codex, OpenCode, …)
npx skills add shinzoxD/knackbox --skill code-review -a claude-code -y
npx skills add shinzoxD/knackbox --skill '*' -a '*' -y
```

Or use Knackbox’s own installer:

```bash
npx knackbox add commit-messages
npx knackbox pack developer-essentials
```

Browse the leaderboard/search UI: [skills.sh](https://www.skills.sh/).

## Can you use *all* skills from skills.sh on this project?

### What works

| Goal | How |
|------|-----|
| Use Knackbox skills in Claude/Cursor/Codex while editing this repo | `npx skills add shinzoxD/knackbox --skill '*' -y` (project or `-g` global) |
| Use popular third-party skills *while developing* Knackbox | Install them **into your agent** (global or this workspace), not into `skills/` |
| Restore a known set later | `skills-lock.json` from the Skills CLI (`experimental_install`) |

### What you should *not* do

| Idea | Why not |
|------|---------|
| Vendor **every** skills.sh package into `skills/` | Hundreds of repos, mixed licenses, no review, catalog/CI explode, duplicates of our own skills |
| Commit `.agents/skills/` copies of Knackbox into git | Duplicates source of truth under `skills/`; install dirs are local agent state |
| Treat install counts as quality | Leaderboard is popularity; Knackbox tiers + benchmarks are the quality bar |

Third-party skills are **installed by users into agents**. Knackbox **authors and reviews** first-party skills under Apache-2.0 with validation and benchmarks.

## Useful complementary packages (install for *you*, not into the catalog)

These are high-signal ecosystem packs that pair well with Knackbox when you’re
coding (React, TDD, agent workflows). Install globally or project-local as you like:

```bash
# Vercel engineering skills
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -y

# Matt Pocock workflow skills
npx skills add mattpocock/skills --skill tdd -y
npx skills add mattpocock/skills --skill grill-me -y

# Superpowers engineering loop
npx skills add obra/superpowers --skill systematic-debugging -y
npx skills add obra/superpowers --skill writing-plans -y

# Anthropic document skills (when you need pptx/pdf/docx tooling skills)
npx skills add anthropics/skills --skill pdf -y
npx skills add anthropics/skills --skill docx -y

# Discover more
npx skills find
# or open https://www.skills.sh/
```

Search on the site, then install by `owner/repo` + `--skill <name>`.

## How discovery works

```
skills.sh  →  leaderboard / search (web)
     ↑
npx skills add owner/repo
     ↓
Clones GitHub repo, finds **/SKILL.md
     ↓
Installs into agent skill dirs
  e.g. ~/.claude/skills, ~/.codex/skills,
       .agents/skills (project), etc.
```

Knackbox layout (`skills/<category>/<name>/SKILL.md`) is already compatible —
CI even checks `npx skills add . --list` skill count.

## Making Knackbox more visible on skills.sh

1. Keep the repo public and `SKILL.md` valid (done).
2. Document the install line everywhere:  
   `npx skills add shinzoxD/knackbox --skill <name>`
3. Organic installs raise leaderboard ranking over time.
4. Optional: link knackbox.pages.dev ↔ skills.sh in README/social posts.

There is no separate “submit to skills.sh” form for GitHub packages — listing is
effectively **install-driven discovery** of public repos that contain skills.

## Project-local install (dogfooding this repo)

From the knackbox clone:

```bash
npx skills add shinzoxD/knackbox --skill '*' -a codex -y --copy
# or from local tree during development:
npx skills add . --skill commit-messages -y
```

That creates `.agents/skills/` and optionally `skills-lock.json`. Both are
**gitignored** here so the canonical library remains `skills/`.

## Summary

- **Yes** — all **Knackbox** skills work with skills.sh / `npx skills`.
- **Yes** — you can install **other** skills.sh packages into your agents while working on this project.
- **No** — we should not merge the entire skills.sh catalog into Knackbox’s first-party library.
- **Best setup**: Knackbox for curated general workflows + selective third-party packs for stack-specific needs (Vercel, Azure, Supabase, etc.).
