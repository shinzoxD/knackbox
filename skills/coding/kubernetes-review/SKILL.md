---
name: kubernetes-review
description: Review Kubernetes manifests and Helm values for security,
  reliability, and operability. Use whenever the user shares Deployment, Service,
  Ingress, StatefulSet, Helm charts, or asks about probes, RBAC, resource limits,
  network policies, or production-ready k8s YAML.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Kubernetes Review

Manifests are production config. Prefer secure defaults, clear probes, bounded
resources, and least-privilege RBAC.

## Review order

1. **[blocking]** privileged pods, hostPath abuse, secrets in env plaintext without need, open RBAC to cluster-admin for apps
2. **[important]** missing probes, no resources, single replica for stateful prod without PDB story, latest tags
3. **[nit]** labels/annotations consistency, naming

## Checklist

- Images: pinned tags/digests; pull policy
- SecurityContext: runAsNonRoot, readOnlyRootFilesystem, drop caps
- Probes: liveness vs readiness correctly used
- Resources: requests/limits appropriate
- RBAC: Role vs ClusterRole; least verbs/resources
- Network: Service type, ingress TLS, NetworkPolicy when required
- Rollouts: strategy, PDB, topology spread for critical apps
- Config/Secrets: not committing raw secrets; mounts vs env

## Output format

```markdown
## Kubernetes review

### Findings
1. [blocking] …

### Recommended patches
…

### Verify
kubectl/helm checks
```

## Rules

1. Do not invent cluster capabilities (CNI, PSA) — state assumptions.
2. Helm: review values and templates for unsafe defaults.
3. Separate app bugs from platform policy gaps.
4. Prefer concrete YAML diffs over vague "harden it".
5. Call out data-loss risks on volume/claim changes.

## Edge cases

- **Jobs/CronJobs:** backoff, concurrency, deadlines.
- **Operators/CRDs:** review RBAC carefully.
- **Local kind/minikube samples:** still flag prod-unsafe patterns.
