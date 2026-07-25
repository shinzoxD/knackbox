---
name: dependency-upgrades
description: Plan and execute dependency upgrades with risk assessment,
  changelog review, and verification. Use whenever the user wants to bump
  packages, resolve CVEs, upgrade a major version, interpret dependency
  conflicts, or update lockfiles safely.
license: Apache-2.0
compatibility: Portable instructions; may use local package managers when available.
metadata:
  knackbox.network: "optional"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Dependency Upgrades

Upgrades are production changes. Treat them like deploys: know the blast
radius, read what broke, and verify with the right tests.

## Workflow

1. **Inventory.** Package name, current → target version, direct vs transitive,
   ecosystem (npm, pip, cargo, go, maven, etc.).
2. **Why now.** Security CVE, feature need, ecosystem pressure, or routine
   maintenance. Security may justify wider risk.
3. **Read release notes** for every major/minor jump on the path (not only
   the final version). Note breaking changes, renames, peer deps.
4. **Plan the slice.** Prefer one high-risk major at a time; batch low-risk
   patch bumps when tooling allows.
5. **Apply, resolve, verify.** Lockfile committed; run unit/integration and
   any smoke paths that exercise the library.
6. **Rollback plan.** Pin previous version; know if native addons or codegen
   need clean rebuilds.

## Risk rubric

| Signal | Risk |
|---|---|
| Patch/security-only, wide adoption | Lower |
| Major version, public API used deeply | Higher |
| Auth, crypto, DB driver, framework core | Higher |
| DevDependency / types-only | Lower |
| Native bindings, Electron, mobile | Higher |

## Output format

```markdown
## Upgrade plan: <package> <from> → <to>

**Motivation:** security | feature | maintenance
**Risk:** low | medium | high
**Scope:** direct deps affected, related peers

### Breaking changes that matter here
- … (only those that touch this codebase)

### Steps
1. …
2. …

### Commands
```bash
# ecosystem-specific
```

### Verification
- tests: …
- manual smoke: …

### Rollback
…

### Open questions
…
```

## Rules

1. Do not invent CVE IDs, CVSS scores, or changelog entries. If you lack
   network/docs, say what to look up.
2. Prefer the package manager's update workflow over hand-editing lockfiles.
3. Call out peer dependency and engine constraints (`node`, `python`) explicitly.
4. Separating "security emergency bump" from "spring cleaning" is good planning.
5. After majors, search the repo for removed APIs and config keys you know
   changed — list files to touch when visible.
6. Never recommend `--force` / ignoring peer deps without explaining the cost.

## Edge cases

- **Transitive CVE only:** upgrade the direct parent that pulls a fixed
  version; document if a temporary override/pin is used.
- **Monorepo:** state which packages share the dependency and whether
  versions must align.
- **Multiple majors behind:** step through intermediate majors if the
  project documents a migration path.
- **No lockfile:** treat as higher risk; recommend introducing one.
