---
name: api-design
description: >-
  Design and review HTTP, REST, GraphQL, and internal service APIs with clear
  contracts, errors, pagination, security, and evolution rules. Use whenever
  the user is planning endpoints, reviewing an API specification, naming
  resources, defining request or response shapes, or asking how services
  should communicate, even if they only share a rough route list.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# API Design

Design an interface that is predictable for consumers and maintainable for
producers. Start from user operations and invariants, not from database tables.

## Workflow

1. Identify consumers, trust boundaries, latency needs, and the operations they
   must complete.
2. Model stable resources or domain operations. Separate commands from queries
   when their semantics differ.
3. Define the happy-path contract with concrete request and response examples.
4. Define validation, authorization, concurrency, and failure behavior.
5. Add pagination, filtering, idempotency, and rate-limit behavior where needed.
6. Check how the contract can evolve without breaking existing consumers.

## Contract checklist

- Use nouns for resources and explicit verbs only for domain commands.
- Match HTTP methods to semantics; do not mutate state through `GET`.
- Return consistent status codes and a machine-readable error envelope.
- Distinguish missing, unauthenticated, unauthorized, invalid, and conflicting
  requests.
- Make retry behavior explicit. Mutation retries need idempotency or a stable
  operation identifier.
- Use cursor pagination when records can change while a client pages through
  them. Define ordering and maximum page size.
- State authentication, object-level authorization, and sensitive-field rules.
- Define timestamps, identifiers, money, units, nullability, and enum behavior.

## Output format

```markdown
## API proposal

**Consumers:** ...
**Key decisions:** ...

### Operations
| Operation | Method and path | Purpose | Auth |
|---|---|---|---|

### Contracts
Request and response examples for each operation.

### Errors and retries
Status, code, meaning, retryable, client action.

### Evolution risks
Breaking changes, compatibility strategy, and open questions.
```

## Rules

1. Never invent requirements silently. Label assumptions and ask only questions
   that would materially change the contract.
2. Prefer the smallest coherent surface. Do not add speculative endpoints.
3. Show payload examples, not only prose or type names.
4. Treat authorization as part of every operation, not a separate afterthought.
5. Flag distributed-transaction, race, and duplicate-request risks explicitly.
6. If reviewing an existing API, separate breaking defects from optional design
   improvements.

## Edge cases

- For event or webhook APIs, define delivery guarantees, signatures, ordering,
  retries, deduplication, and replay windows.
- For GraphQL, cover field authorization, nullability, pagination, query cost,
  and deprecation.
- For internal APIs, do not lower the contract quality bar; internal consumers
  still need versioning and observability.
