# knackbox CLI

Install [Knackbox](https://github.com/shinzoxD/knackbox) Agent Skills with one command.

```bash
npx knackbox for "review a PR"
npx knackbox add commit-messages
```

Skills land in your agent’s skills directory (default: `~/.claude/skills/<name>`), ready for Claude Code and any runtime that loads `SKILL.md` folders.

## Requirements

- Node.js 18+
- System `tar` (macOS, Linux, and modern Windows / Git for Windows)

No npm dependencies — stdlib only.

## Commands

### Add skills

```bash
npx knackbox add commit-messages
npx knackbox add code-review security-review --force
npx knackbox add sql-query-review --agent cursor
npx knackbox add meeting-notes --dest ./my-skills/meeting-notes
```

| Flag | Meaning |
|---|---|
| `--dest DIR` | Exact install path (single skill only) |
| `--agent NAME` | `claude-code` (default), `codex`, `cursor`, `opencode` |
| `--force` | Replace an existing skill folder |
| `--catalog URL\|path` | Override catalog.json source |
| `--tarball URL\|path` | Override repo archive source |

### Install a starter pack

```bash
npx knackbox pack developer-essentials
npx knackbox pack ops-reliability --force
```

### Browse and search

```bash
npx knackbox list
npx knackbox list --category coding
npx knackbox list --json
npx knackbox search "security terraform"
npx knackbox for "review a PR"
npx knackbox jobs
npx knackbox packs
npx knackbox doctor
```

`for` / `jobs` read [`jobs.json`](../../jobs.json) (override with `--jobs`). `for --add` installs the top match.

`list` / `search` / `packs` resolve the published `catalog.json` / `packs.json` from GitHub by default (or local paths when you pass `--catalog` / `--packs`).

### Recipes

Copy-paste job-based install sets live in the repo root [`RECIPES.md`](../../RECIPES.md).

## How it works

1. Resolve skill names against the live [catalog.json](https://raw.githubusercontent.com/shinzoxD/knackbox/main/catalog.json).
2. Download the repository tarball from GitHub codeload (same source as `install.sh`).
3. Extract only `skills/<category>/<skill>/` with system `tar`.
4. Copy into the destination directory.

Environment overrides (useful for mirrors and tests):

| Variable | Default |
|---|---|
| `KNACKBOX_CATALOG_URL` | GitHub raw `catalog.json` |
| `KNACKBOX_PACKS_URL` | GitHub raw `packs.json` |
| `KNACKBOX_TARBALL_URL` | GitHub codeload tarball of `main` |
| `KNACKBOX_DOCS_URL` | README install section |
| `KNACKBOX_SITE_URL` | `https://knackbox.pages.dev` |
| `KNACKBOX_QUIET=1` | Hide progress on stderr |

## Related installers

- Ecosystem CLI: `npx skills add shinzoxD/knackbox --skill commit-messages`
- Curl fallback: `curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh | bash -s commit-messages`

## Develop

```bash
cd packages/cli
node bin/knackbox.js help
npm test
```

## License

Apache-2.0
