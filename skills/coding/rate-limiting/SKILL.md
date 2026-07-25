---
name: rate-limiting
description: Design rate limiting and throttling for APIs and gateways with fair
  use and abuse resistance. Use whenever the user asks about rate limits, quotas,
  429 responses, token buckets, leaky buckets, or protecting endpoints from overload
  and abuse.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Rate Limiting

Limits protect availability and fairness. Choose key (IP, user, API key, tenant),
algorithm, and client-visible headers carefully.

## Workflow

1. Threat: abuse, noisy neighbor, cost control, fair multi-tenant.
2. Dimension: per identity, per route, global.
3. Algorithm: fixed window, sliding, token bucket — trade accuracy vs cost.
4. Response: 429, Retry-After, rate limit headers.
5. Bypass/admin paths and authenticated vs anonymous.
6. Observability: reject rate, top offenders.
7. Edge vs app vs gateway placement.

## Output format

```markdown
## Rate limit design
**Goals:** …
**Keys:** …
**Limits:** …
**Algorithm:** …
**Client contract:** …
**Fail mode:** open vs closed
```

## Rules

1. State fail-open vs fail-closed when the limiter store is down.
2. Do not rate-limit health checks into outages.
3. Document limits in API docs.
4. Prefer tenant-aware limits in B2B.
5. Avoid only IP limits behind shared NAT without care.

## Edge cases

- **GraphQL:** cost-based limits.
- **Webhooks outbound:** separate egress budgets.
- **Login endpoints:** stricter anti-bruteforce.
