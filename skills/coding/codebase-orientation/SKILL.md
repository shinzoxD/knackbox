---
name: codebase-orientation
description: Orient an engineer (or agent) in an unfamiliar codebase — map
  modules, entrypoints, how to run tests, and where to change a feature.
  Use whenever the user says "I'm new to this repo", asks where X is
  implemented, wants you to map this repo, asks how this project is
  structured, or an agent is exploring a repository — even if they only
  paste a directory listing. Distinct from onboarding-guides (HR/company
  onboarding) and debugging (a specific bug).
license: Apache-2.0
compatibility: Portable instructions; may list files and run existing test or help commands when execution is allowed.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Codebase Orientation

Map the tree from evidence, not memory. Never invent package names, scripts,
or paths. Output a map, entrypoints, how to run, and where to change X.

Company onboarding is `onboarding-guides`. A specific crash or 500 is
`debugging`. New API design is `api-design`. Daily status is `standup-updates`.

## Workflow

1. **Scope.** Whole repo vs "where is X". If they name X, hunt that first;
   still sketch the map so X has a place.
2. **Inventory.** List the repo root. Read README, CONTRIBUTING, and the
   manifests that exist (`package.json`, `pyproject.toml`, `Cargo.toml`,
   `go.mod`, `Makefile`, CI). Quote names you saw.
3. **Map modules.** First-party directories only. Skip `node_modules`,
   `vendor`, `dist`, `build`, `.git`, `.venv`, `target`. One line per
   module: path → role, with the file that proves it.
4. **Entrypoints.** Files that start a process: `main`, `cmd/`, `bin/`,
   `app/`, `src/index.*`, documented CLIs, server listen sites. Cite the file.
5. **How to run.** Copy install/test/dev commands from those manifests,
   Makefile, or CI — not from habit. If README and a script block disagree,
   prefer the file that would actually execute; note the conflict.
6. **Where to change X.** Search names, routes, types, and tests. Rank
   1–3 files with why. Stop at the location; do not design the change
   unless asked.

## Output format

```markdown
## Map
| Path | Role | Evidence |

## Entrypoints
- `path` — what it starts (evidence)

## How to run
- install: `…` (from …)
- tests: `…` (from …)
- app/dev: `…` (from …)

## Where to change
**X:** `file` — why. Next: `file`.

## Unknowns
- commands or paths not in the tree
```

## Rules

1. Never invent package names, binaries, or scripts. If it is not in the
   tree, write **not found**.
2. Distinguish *facts* (paths, script names) from *inferences* (what a
   folder "probably" does). Label them.
3. Do not dump the whole tree. Top-level plus one extra level into the
   relevant subtree.
4. Generated code: point at the generator or schema, not the generated dump.
5. Execution is optional. List and read first. Run existing `test`/`help`
   only when allowed, to confirm how-to-run. Do not install deps unless asked.
6. If the checkout is sparse or blocked, say what you could not see instead
   of filling gaps.

**Good:** `packages/cli/bin/knackbox.js` is the CLI (`package.json` `bin`).
Tests: the `test` script in that package's `package.json`.
**Bad:** "Typical Express app; run `npm test` with Jest."

## Edge cases

- **Monorepo:** map packages/`apps`/`crates` first; dive only into the
  asked package.
- **No tests found:** say so; do not invent `pytest` or `npm test`.
- **Multiple languages:** one how-to-run section per runtime.
- **User pastes a tree only:** orient from that paste; do not assume files
  they did not show.
- **"Write our new-hire handbook":** `onboarding-guides`, not this skill.
