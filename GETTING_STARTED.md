# Getting started

You have a job. Install the two to five skills that belong to it — not the whole catalog.

## 1. See what you should install

```bash
npx knackbox for "review a PR"
npx knackbox for "we are down"
npx knackbox jobs
```

Same guides in the browser: [knackbox.pages.dev/start](https://knackbox.pages.dev/start/).

## 2. Install

```bash
npx knackbox for "review a PR" --add
# or copy the printed command:
npx knackbox add code-review security-review test-generation pr-descriptions
```

Default destination is `~/.claude/skills`. Other agents:

```bash
npx knackbox add code-review --agent cursor
npx knackbox add code-review --agent codex,cursor
```

Check your machine:

```bash
npx knackbox doctor
```

## 3. Use it in the agent

Ask the agent to do the job in plain language ("review this diff", "write the commit message"). The skill `description` is what makes the model load the folder — you should not have to say the skill name.

## 4. Then explore

| Need | Go here |
|---|---|
| Browse quality ranking | [skills leaderboard](https://knackbox.pages.dev/skills/) |
| Whole workflow packs | `npx knackbox packs` |
| Why not a popularity board | [WHY.md](WHY.md) |
| Add a skill | [CONTRIBUTING.md](CONTRIBUTING.md) |

Until `knackbox` is on the public npm registry, from a clone:

```bash
node packages/cli/bin/knackbox.js for "review a PR"
```
