---
name: pulumi-review
description: Review Pulumi programs and previews for safe infrastructure changes
  across TypeScript, Python, Go, C#, Java, and YAML. Use whenever the user shares
  Pulumi code or preview output, designs component resources, handles secrets or
  state, or asks whether pulumi up is safe.
license: Apache-2.0
compatibility: Portable instructions; may interpret Pulumi programs, previews, stack state summaries, and policy output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Pulumi Review

Review the program, resource graph, and preview together. Optimize for stable
resource identity, encrypted state, least privilege, predictable replacements,
and recoverable updates across every affected stack.

For Terraform or OpenTofu plans, use `terraform-review`. For CloudFormation
or SAM templates and change sets, use `cloudformation-review`.

## Workflow

1. Identify the project, stack, backend, secrets provider, language/runtime,
   Pulumi CLI and provider versions, target accounts/Regions, and environment.
2. Map components, custom resources, providers, parents, dependencies,
   StackReferences, Automation API callers, and policy packs.
3. Inspect a current preview with detailed diffs. Separate creates, updates,
   replacements, deletes, reads, refresh-only drift, and unknown outputs.
4. Review identity/refactors, lifecycle options, secrets, state, cloud access,
   runtime side effects, and failure recovery.
5. Propose a safe update order with preconditions, verification, and rollback or
   roll-forward triggers.
6. End with **safe to update**, **safe with conditions**, or **do not update**.

## Detailed checks

Read `references/review-checklist.md` for full program and preview reviews,
especially when refactoring components, changing lifecycle options, handling
secrets, reconciling drift, or using Automation API or dynamic providers.

## Severity tags

- **[blocking]** destructive stateful replacement, plaintext secret, wrong
  stack/provider target, privilege escalation, or irreversible state operation
- **[important]** identity churn, hidden drift, downtime, orphan risk, fragile
  side effect, unpinned provider, or missing recovery evidence
- **[nit]** low-risk naming, organization, readability, or component API issue

## Output format

```markdown
## Pulumi review

**Target:** <backend / org / project / stack / cloud target or unknown>
**Evidence:** <program, preview, policy output, state/drift context>
**Verdict:** <safe to update | safe with conditions | do not update>

### Preview summary
- Create/update: ...
- Replace/delete: ...
- Unknown/drift: ...

### Findings
1. [blocking] **<finding>** — <URN/resource and consequence>
   **Action:** <specific remediation or gate>

### Update plan
1. <precondition, alias, backup, or secret fix>
2. <preview/update sequence>
3. <verification and recovery trigger>

### Missing evidence
- <item that prevents a stronger verdict>
```

## Rules

1. Never invent preview results, state contents, provider defaults, or stack
   configuration. Ask for evidence or make the verdict conditional.
2. Name the resource/URN and lifecycle option in each material finding.
3. Do not use `dependsOn` to solve application readiness or replace correct
   `Input`/`Output` dependencies.
4. Do not silence unexplained diffs with `ignoreChanges` or hide them with
   output filtering; establish ownership and drift behavior first.
5. Separate cloud rollback from Pulumi state recovery after partial failure.
6. Review all stacks that consume changed StackReference outputs or components.
