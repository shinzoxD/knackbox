---
name: caching-strategies
description: Design caching layers with correctness, TTLs, invalidation, and
  stampede control. Use whenever the user asks about Redis cache, CDN caching,
  HTTP cache headers, cache invalidation, thundering herd, or stale reads.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Caching Strategies

Cache for latency and cost, not as a second source of truth without a plan.
Name the consistency model and invalidation path.

## Workflow

1. Read pattern, freshness needs, and blast radius of stale data.
2. Layer: browser, CDN, app memory, Redis, DB.
3. Key design and TTL; avoid unbounded key growth.
4. Invalidation: TTL-only vs event-driven vs write-through.
5. Stampede: singleflight, soft TTL, probabilistic early expire.
6. Negative caching for misses.
7. Metrics: hit ratio, latency, error on cache path.

## Output format

```markdown
## Cache design: <surface>
**Consistency:** …
**Keys / TTL:** …
**Fill path:** …
**Invalidate:** …
**Stampede control:** …
**Failure mode:** …
```

## Rules

1. Security: never cache authorized personal data under shared keys.
2. Prefer explicit invalidation for user-visible mutations.
3. Document what clients may see stale.
4. Measure before multi-layer complexity.
5. Do not invent Redis commands incorrectly — describe intent.

## Edge cases

- **CDN + auth:** private vs public.
- **Multi-region:** replication lag.
- **Search indexes:** near-cache vs source of truth.
