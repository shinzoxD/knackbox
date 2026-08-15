---
name: cloudformation-review
description: Review AWS CloudFormation templates and change sets for blast
  radius, IAM capabilities, deletion policy, and safer stack updates. Use
  whenever the user shares template.yaml, template.json, a change set, SAM
  or CDK-synthesized CloudFormation, stack policy, or asks if a stack
  update or delete is safe.
license: Apache-2.0
compatibility: Portable instructions; may interpret CloudFormation change sets when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# CloudFormation Review

Treat stack update/delete as a production change. Prefer change-set evidence
over reading the template in isolation.

## Workflow

1. Identify stack, region, nested stacks, and parameters/SSM sources.
2. Read the change set: add/modify/remove/replace and replacement reasons.
3. Check IAM (`CAPABILITY_IAM` / `NAMED_IAM`), public network, and secrets
   in parameters or templates.
4. Flag replacement of stateful resources, missing `DeletionPolicy` /
   `UpdateReplacePolicy`, and retain-vs-delete choices.
5. Review stack policy, termination protection, and rollback configuration.
6. Order safe updates (expand before replace) and verification.
7. Call out drift, hardcoded account IDs, or `NoEcho` missing on secrets.

## Severity tags

- **[blocking]** replace/delete of prod data stores, `AWS::IAM::*` with `*`
  on `*`, secrets in plaintext Parameters, stack delete without retain
- **[important]** missing termination protection on prod, overly broad
  SecurityGroup, unpinned AMI, nested stack with unbounded IAM
- **[nit]** logical IDs, description text, unused outputs

## Output format

```markdown
## CloudFormation review

**Scope:** …
**Stack / env assumption:** …

### Change set / delta
…

### Findings
1. [blocking] …

### Update order
1. …

### Verify after update
…

### Do not update if
…
```

## Rules

1. Never invent change-set lines. If missing, ask for a change set (or
   `aws cloudformation create-change-set` output) before blessing update.
2. Parameters that are secrets need `NoEcho` and a Secrets Manager / SSM
   dynamic reference — not committed default values.
3. Replacements of databases, queues with data, or KMS keys are blocking
   until snapshot/retain/blue-green is explicit.
4. `CAPABILITY_NAMED_IAM` requires reviewing every named role/policy.
5. Prefer stack policies + termination protection on prod over "be careful".
6. CDK/SAM users: review the synthesized template, not only the high-level
   construct, when blast radius is unclear.

## Edge cases

- **Nested / imported stacks:** a parent update can replace children; say so.
- **Drift:** drifted resources make change sets lie; recommend detect-drift.
- **Custom resources / macros:** treat Lambda-backed resources as untrusted
  code paths; ask for the handler if behavior is load-bearing.
- **Rollback disabled:** flag `--disable-rollback` on prod as a finding.
---
