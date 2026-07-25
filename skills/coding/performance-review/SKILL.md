---
name: performance-review
description: Diagnose application performance bottlenecks and propose measured
  fixes. Use whenever the user mentions slow endpoints, high latency, CPU or
  memory spikes, N+1 queries, profiling results, p95/p99, or asks how to make
  code or systems faster — even without formal profiler output.
license: Apache-2.0
compatibility: Portable instructions; may interpret profiles or traces when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "optional"
---

# Performance Review

Guessing is not a performance strategy. Measure, find the dominant cost,
fix that, re-measure. Optimize for the user's SLO (latency, throughput,
cost), not micro-benchmark theater.

## Workflow

1. **Define success.** Target metric (p95 latency, req/s, memory ceiling),
   environment (prod-like?), and workload (endpoint, query, batch size).
2. **Gather evidence.** Profiles, traces, EXPLAIN, logs, metrics, or a
   minimal repro. If missing, prescribe the cheapest measurement first.
3. **Find the dominant bottleneck.** CPU, I/O, lock contention, network
   chattiness, over-fetch, GC, cold start — pick one primary.
4. **Propose fixes ordered by expected impact / effort.** Prefer algorithmic
   and I/O reductions before micro-opts.
5. **Verification plan.** How to prove the win and catch regressions.

## Common patterns

| Symptom | Often check |
|---|---|
| Slow list endpoint | N+1 queries, missing index, over-serialization |
| High CPU | Hot loops, regex, JSON parse, compression, crypto |
| High memory / OOM | Unbounded caches, loading full tables, leaks |
| Tail latency | Lock contention, GC pauses, cold deps, retries |
| Batch job slow | Sequential I/O, small transactions, no parallelism |

## Output format

```markdown
## Performance review: <surface>

**Goal metric:** …
**Evidence used:** … (or: measurements to collect first)

### Primary bottleneck (hypothesis)
What + why + confidence (low/med/high)

### Recommendations
1. [high impact] … — expected effect, risk, how to verify
2. …

### Do not do yet
Premature micro-opts that distract from the bottleneck.

### Measurement plan
Commands, profilers, or dashboards to confirm.
```

## Rules

1. Never claim a speedup percentage without measurement or a clearly labeled
   estimate.
2. One primary bottleneck before a laundry list of nits.
3. Correctness and security beat clever caching; call out stale-data risks.
4. Distinguish algorithmic O() improvements from constant-factor tweaks.
5. If code is not the bottleneck (network, DB plan, noisy neighbor), say so.
6. Prefer fixes that add observability (timers, spans) when evidence is thin.

## Edge cases

- **No profile provided:** give a 3-step measurement recipe before deep code
  rewrites.
- **Micro-benchmark only:** warn about dead-code elimination and unrealistic
  inputs; ask for end-to-end numbers.
- **Frontend:** include bundle size, waterfalls, and main-thread long tasks
  when relevant — not only server CPU.
- **"Make it faster" with no SLO:** propose a default (e.g. p95 under X) and
  proceed.
