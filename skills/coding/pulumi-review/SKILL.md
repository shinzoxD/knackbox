---
name: pulumi-review
description: Review Pulumi programs, stack configs, and previews for blast
  radius, state risk, secrets, IAM overreach, and safer update order. Use
  whenever the user shares Pulumi TypeScript/Python/Go/C# code, a pulumi
  preview, Pulumi.yaml, stack config, ESC secrets, or asks if a Pulumi up
  is safe — even if they only say "infra as code" in Pulumi.
license: Apache-2.0
compatibility: Portable instructions; may interpret pulumi preview output when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Pulumi Review

Treat `pulumi up` as a production change. Prefer preview evidence over
guesses. Optimize for least privilege, least surprise, and reversible steps.

## Workflow

1. Identify project, stack/env, backend, and language SDK.
2. Read preview: create/update/replace/delete counts and critical resources.
3. Check IAM, network exposure, secrets (config vs ESC vs plaintext), and
   public endpoints.
4. Flag replacements, delete-before-replace, and parent/child destroy chains.
5. Review aliases, retain-on-delete, protect, and import/move correctness.
6. Order safe updates (expand before destroy) and post-up verification.
7. Call out missing locking, shared DIY state, or stack-reference cycles.

## Severity tags

- **[blocking]** destroy/replace of stateful prod data, open 0.0.0.0/0 admin,
  secrets in git/state plaintext, `protect` missing on irreplaceable stores
- **[important]** overly broad IAM, missing stack separation, unencrypted
  config, provider default-region drift
- **[nit]** naming, unused exports, style

## Output format

```markdown
## Pulumi review

**Scope:** …
**Stack / env assumption:** …

### Preview / change summary
…

### Findings
1. [blocking] …

### Update order
1. …

### Verify after up
…

### Do not up if
…
```

## Rules

1. Never invent preview output. If missing, ask for `pulumi preview` (or CI
   preview artifact) before blessing an apply.
2. Secrets belong in ESC, secret config, or a secret manager — never
   plaintext `Pulumi.<stack>.yaml` committed values.
3. Shared stacks need a remote backend with locking; laptop DIY state is a
   finding.
4. Prefer component resources and typed config over copy-paste programs
   that silently drift across stacks.
5. Destructive changes need explicit confirmation language and a rollback
   path (`protect`, snapshots, retain-on-delete).
6. Distinguish language-SDK issues (async/promises, transforms) from
   provider issues; do not "fix" Terraform syntax here.

## Edge cases

- **Aliases / rename:** wrong URN alias orphans or duplicates state.
- **Stack references:** circular or env-crossing refs leak prod into preview.
- **Policy as Code / CrossGuard:** mention missing policy packs when the
  org already uses them; do not invent policy names.
- **Import:** review imported IDs against live resources; mismatch corrupts
  the next up.
---
