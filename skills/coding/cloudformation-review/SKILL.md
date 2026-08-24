---
name: cloudformation-review
description: Review AWS CloudFormation and SAM templates for deployment safety,
  IAM scope, replacement risk, dependencies, rollback behavior, and operability.
  Use whenever the user shares YAML or JSON templates, change sets, nested
  stacks, custom resources, or asks whether a CloudFormation deployment is safe.
license: Apache-2.0
compatibility: Portable instructions; may interpret templates, change sets, stack events, and linter output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# CloudFormation Review

Treat every stack update as a production change. Base the verdict on a change
set and deployment context when available; a template alone cannot prove what
CloudFormation will replace or delete in an existing stack.

For Terraform or OpenTofu plans, use `terraform-review`. For Pulumi programs
or previews, use `pulumi-review`.

## Workflow

1. Establish the account, Region, partition, stack, environment, parameters,
   capabilities, and deployment command. Mark assumptions that affect risk.
2. Inventory resources, nested stacks, exports/imports, transforms, macros,
   custom resources, and stateful or externally shared dependencies.
3. Inspect the change set. Separate creates, in-place updates, replacements,
   removals, imports, and condition-driven changes. Trace replacement chains.
4. Review data protection, identity, network exposure, secrets, dependency
   ordering, quotas, rollback behavior, and observability.
5. Propose the smallest reversible deployment sequence and explicit gates.
6. End with a verdict: **safe to execute**, **safe with conditions**, or
   **do not execute**. State what evidence could change the verdict.

## Detailed checks

Read `references/review-checklist.md` for full template or change-set reviews,
especially when stateful resources, IAM, nested stacks, StackSets, SAM/macros,
or custom resources are present. Use only the sections relevant to the change.

## Severity tags

- **[blocking]** likely data loss, destructive replacement without recovery,
  privilege escalation, exposed sensitive service, or unbounded custom code
- **[important]** rollback gap, broad access, hidden drift, fragile dependency,
  missing alarm, or material operability risk
- **[nit]** readability, naming, duplication, or maintainability issue with low
  deployment risk

## Output format

```markdown
## CloudFormation review

**Target:** <account / Region / stack / environment or unknown>
**Evidence:** <template, parameters, change set, events, lint output>
**Verdict:** <safe to execute | safe with conditions | do not execute>

### Change summary
- Create: ...
- Update: ...
- Replace/delete: ...

### Findings
1. [blocking] **<finding>** — <resource/logical ID and consequence>
   **Action:** <specific remediation or gate>

### Deployment plan
1. <precondition or backup>
2. <change-set execution step>
3. <verification and rollback trigger>

### Missing evidence
- <item that prevents a stronger verdict>
```

## Rules

1. Never invent change-set output, current stack state, parameter values, or AWS
   defaults. Ask for them or mark the conclusion conditional.
2. Do not call `validate-template` a safety check; it does not evaluate live
   replacements, permissions, quotas, or runtime behavior.
3. Name logical IDs and properties in findings so the review is actionable.
4. Distinguish stack rollback from rollback of external actions performed by a
   macro or custom resource.
5. Prefer expand/migrate/contract changes over destructive in-place migrations.
6. Do not recommend `Retain` without assigning follow-up ownership and cleanup.
