---
name: error-handling
description: Design robust error handling, retries, and failure modes for
  application code. Use whenever the user asks about exceptions, error types,
  retry policies, circuit breakers, timeouts, or how to handle failures in APIs,
  jobs, and distributed calls.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Error Handling

Failures are normal. Design for classification, recovery, and operator
visibility — not only try/catch cosmetics.

## Workflow

1. Enumerate failure modes (validation, not found, conflict, auth, dependency down, timeout, partial success).
2. Separate expected domain errors from programmer bugs.
3. Define user-visible messages vs internal detail (never leak secrets).
4. Retries only for safe/idempotent operations with backoff and caps.
5. Specify observability: structured logs, metrics, traces, correlation IDs.
6. Document partial failure and compensation for multi-step workflows.

## Output format

```markdown
## Error design: <component>

### Taxonomy
| Kind | Example | Retry? | User message | Operator signal |

### Boundaries
Where errors are caught and translated.

### Retry / timeout policy
…

### Propagation
HTTP/RPC codes or typed errors callers see.
```

## Rules

1. Distinguish validation from infrastructure failures.
2. Never retry non-idempotent writes without idempotency keys.
3. Prefer explicit error types/codes over string matching.
4. Map to stable public statuses; avoid silent 200-with-error unless pre-existing API law.
5. Include cleanup for partial side effects.
6. Fail closed on authorization uncertainty.

## Edge cases

- **Queues:** poison messages, dead-letter, visibility timeouts.
- **Fan-out:** partial success reporting.
- **Libraries:** do not swallow exceptions to "keep going" without policy.
