---
name: terraform-review
description: Review Terraform and OpenTofu configuration and plans for blast
  radius, state risk, IAM overreach, and safer apply order. Use whenever the
  user shares .tf files, a terraform plan, asks if apply is safe, or reviews
  infrastructure-as-code modules and state backends.
license: Apache-2.0
compatibility: Portable instructions; may interpret terraform plan output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Terraform Review

Treat apply as a production change. Optimize for least privilege, least
surprise, and reversible steps. Prefer plan evidence over vibes.

## Workflow

1. Identify providers, workspaces/envs, backend/state, and blast radius.
2. Read plan summary: create/update/replace/destroy counts and critical resources.
3. Check IAM, network exposure, secrets, and public endpoints.
4. Flag force-new / replace chains and data-loss paths.
5. Order safe apply (expand before destroy) and verification.
6. Call out missing remote state locking, missing CI plan, or local-only state.

## Severity tags

- **[blocking]** destroy/replace of stateful prod data, open 0.0.0.0/0 admin, secrets in VCS/state plaintext without process
- **[important]** overly broad IAM, missing tags/ownership, non-concurrent-safe patterns
- **[nit]** style, naming, minor refactors

## Output format

```markdown
## Terraform review

**Scope:** …
**Env assumption:** …

### Plan / change summary
…

### Findings
1. [blocking] …

### Apply order
1. …

### Verify after apply
…

### Do not apply if
…
```

## Rules

1. Never invent plan output; if missing, ask for `terraform plan` (or equivalent).
2. Prefer modules and env separation over copy-paste with silent drift.
3. Secrets: no committing `.tfvars` secrets; use secret managers / CI injection.
4. State: remote backend + locking for shared envs.
5. Destructive changes need explicit user confirmation language.
6. Distinguish OpenTofu/Terraform only when syntax or workflow differs.

## Edge cases

- **Import / move:** review address changes carefully; wrong move corrupts state.
- **for_each / count index churn:** warn about replace storms.
- **Partial apply failures:** recovery notes and state surgery as last resort.
