---
name: secrets-management
description: Handle secrets safely in apps and infrastructure without committing
  credentials. Use whenever the user asks about API keys, secret managers, .env
  handling, rotation, CI secrets, or how to inject credentials at runtime.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Secrets Management

Secrets are credentials that grant power. Minimize sprawl, never commit them,
prefer short-lived credentials, and plan rotation.

## Principles

1. No secrets in git, logs, client bundles, or screenshots.
2. Inject at runtime from a secret manager or sealed CI store.
3. Least privilege and per-environment secrets.
4. Rotation and revocation paths tested.
5. Prefer OIDC/workload identity over long-lived static keys when possible.

## Workflow

1. Inventory secret types (DB, API, TLS, signing).
2. Choose storage (cloud SM, k8s secrets + encryption, CI OIDC).
3. Access patterns for apps, humans, and automation.
4. Local dev: .env gitignored + sample .env.example without values.
5. Leak response: rotate, audit logs, invalidate.

## Output format

```markdown
## Secrets plan

### Inventory
…

### Storage & injection
…

### CI/CD
…

### Rotation
…

### Anti-patterns to remove
…
```

## Rules

1. Never ask the user to paste live production secrets into chat if avoidable; use placeholders.
2. Distinguish public client IDs from private client secrets.
3. Encrypt-at-rest is not enough if authz is wide open.
4. Document break-glass carefully.
5. Redact in examples always.

## Edge cases

- **Mobile apps:** no long-lived master secrets in binaries.
- **Webhooks:** signing secrets rotation dual-key window.
- **Multi-tenant:** per-tenant secret isolation.
