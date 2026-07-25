---
name: runbook-writing
description: Write operational runbooks that on-call engineers can follow under
  stress. Use whenever the user asks for a runbook, playbook, ops procedure,
  alert response guide, or how to document incident response steps for a system.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Runbook Writing

Runbooks are for 3 a.m. brains. Short steps, copy-pasteable commands, clear
stop conditions, and escalation paths.

## Workflow

1. Scope: service, symptoms/alerts that trigger this runbook, severity.
2. Preconditions: access, dashboards, feature flags, dependencies.
3. Diagnosis steps with expected outputs.
4. Mitigation steps (customer impact first) then durable fix pointers.
5. Rollback / communications / escalation.
6. Post-incident: what to capture for the postmortem.

## Output format

```markdown
# Runbook: <title>
**Service:** …
**Alert / symptom:** …
**Severity guidance:** …
**Last reviewed:** …

## Overview
One paragraph.

## Dashboards & signals
- …

## Diagnosis
1. …

## Mitigation
1. …

## Escalation
- …

## Rollback
…

## Do not
- …

## Related
links / owners / code paths
```

## Rules

1. Imperative steps; one action per step.
2. Commands in copy-paste blocks with placeholders like `<cluster>`.
3. Never require tribal knowledge without a link or command to discover it.
4. Separate customer mitigation from root-cause engineering.
5. Include "when to stop and escalate".
6. Mark destructive steps with **danger** and confirmation.

## Edge cases

- **Partial outage:** branch the path by symptom.
- **Security incident:** avoid spreading exploit detail; point to secure channel.
- **No prod access in doc context:** still structure the runbook; mark missing commands clearly.
