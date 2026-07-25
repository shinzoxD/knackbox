---
name: ci-cd-pipelines
description: Design and review CI/CD pipelines for speed, safety, and clear
  failure signals. Use whenever the user edits GitHub Actions, GitLab CI,
  Jenkinsfiles, or asks how to structure tests, builds, caches, deploy gates,
  and rollbacks in continuous integration.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# CI/CD Pipelines

Pipelines should be boring: deterministic, fast enough, and hard to bypass on
the way to production.

## Workflow

1. Map stages: lint → unit → build → integration → security → deploy → smoke.
2. Separate PR checks from release/deploy workflows.
3. Caching and parallelism without flaky races.
4. Secrets: OIDC/short-lived creds over long-lived keys when possible.
5. Deploy strategy: gated environments, approvals, progressive delivery.
6. Failure UX: clear logs, annotations, and ownership.

## Output format

```markdown
## Pipeline design: <repo>

### Stages
| Stage | Trigger | Required? | Notes |

### Critical conf
…

### Risks
…

### Example workflow sketch
```

## Rules

1. Required checks must be actually required in branch protection.
2. Do not print secrets; mask and minimize permissions (`permissions:` blocks).
3. Prefer immutable artifacts promoted across envs over rebuild-per-env.
4. Flaky tests belong in quarantine with owners — not silent retries forever.
5. Deploy from main/trunk or tagged releases, not arbitrary forks, without review.
6. Pin actions/images by version digest when security-sensitive.

## Edge cases

- **Monorepo:** path filters; avoid full-build on docs-only.
- **Mobile/native:** signing secrets and build machine constraints.
- **Infra pipelines:** plan on PR, apply on merge with protections.
