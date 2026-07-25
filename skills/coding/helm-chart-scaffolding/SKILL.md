---
name: helm-chart-scaffolding
description: Scaffold and review Helm charts with safe defaults for values,
  templates, and hooks. Use whenever the user asks for a Helm chart, Chart.yaml,
  values.yaml production review, Helm upgrade hooks, or packaging a service for
  Helm install/upgrade.
license: Apache-2.0
compatibility: Portable instructions; may sketch helm CLI commands when helpful.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Helm Chart Scaffolding

Charts encode install defaults. Prefer safe values, clear NOTES, and upgrades
that do not surprise operators.

## Workflow

1. Clarify app type (stateless API, worker, stateful), envs, and secrets model.
2. Scaffold chart layout: Chart.yaml, values.yaml, templates/, NOTES.txt.
3. Parameterize image, resources, probes, service, ingress, and config.
4. Avoid dangerous defaults (privileged, latest, open 0.0.0.0 without intent).
5. Plan hooks only when necessary; document failure modes.
6. Review upgrade/rollback: immutable tags, PDB, migrations job separation.

## Output format

```markdown
## Helm chart: <name>

### Files
- Chart.yaml …
- values.yaml keys …
- templates …

### Safe defaults
…

### Install / upgrade notes
…

### Risks
…
```

## Rules

1. Prefer values over hardcoding in templates.
2. Secrets via external secret refs or sealed patterns — not plain values committed.
3. Keep templates readable; limit cleverness.
4. Document required vs optional values.
5. Separate app chart from environment values files.
6. Coordinate with kubernetes-review concerns for probes/RBAC/securityContext.

## Edge cases

- **Subcharts/dependencies:** pin versions; watch value collisions.
- **CRDs:** install order and ownership.
- **Library charts:** no deployable templates; document consumers.
