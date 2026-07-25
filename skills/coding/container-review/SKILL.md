---
name: container-review
description: Review Dockerfiles and container configs for size, security, and
  operability. Use whenever the user shares a Dockerfile, compose file, Kubernetes
  image config, or asks how to harden, slim, or debug a container build.
license: Apache-2.0
compatibility: Portable instructions; may reason about local docker commands when available.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Container Review

Images should be minimal, reproducible, and runnable as non-root with clear
health signals.

## Checklist

- Base image: pinned digest/tag policy; avoid `latest` in prod.
- Multi-stage builds; no build tooling in final image when possible.
- Non-root user; read-only root FS when feasible.
- No secrets in layers (`ENV` passwords, copied `.env`).
- Minimal attack surface: no unused shells/packages if practical.
- Healthcheck / graceful shutdown notes for orchestrators.
- Compose: resource limits, networks, bind-mount safety.

## Output format

```markdown
## Container review

### Findings
1. [blocking|important|nit] …

### Recommended Dockerfile sketch
…

### Build/run verify
…
```

## Rules

1. Prefer distroless/slim only when debugging trade-offs are accepted.
2. Pin versions; explain rebuild policy.
3. Never suggest baking prod secrets into images.
4. Order layers for cache efficiency after correctness/security.
5. Call out root containers in K8s as important when relevant.
6. Do not invent base image CVEs; speak in classes of risk if versions unknown.

## Edge cases

- **GPU / exotic bases:** document host deps.
- **Windows containers:** separate guidance; do not assume Linux paths.
- **Supply chain:** SBOM/signing as optional hardening.
