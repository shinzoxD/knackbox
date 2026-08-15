---
name: message-queue-design
description: Design queue and pub/sub systems — Kafka, SQS, Rabbit, NATS —
  with poison messages, retries, ordering, and exactly-once caveats. Use
  whenever the user designs consumers, dead-letter queues, outbox, Kafka
  partitions, SQS visibility, or asks if delivery is at-least-once.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Message Queue Design

Queues move work you can afford to do later. Default is **at-least-once**.
Exactly-once is a property of the *handler + store*, not the broker logo.

For HTTP callbacks, use `webhook-design`. For sockets, use
`websocket-design`. For API contracts, use `api-design`.

## Workflow

1. Work type: command vs event, latency budget, loss tolerance.
2. Broker shape: competing consumers (queue) vs fan-out (pub/sub).
3. Keying / partition / shard: what must stay ordered, what can race.
4. Payload: schema, version, PII, size, idempotency key.
5. Producer: transactional outbox if the DB write and publish must
   not diverge.
6. Consumer: visibility timeout / ack, retry + backoff, poison /
   DLQ, idempotent handler on the event id.
7. Failure: replay, rewind, and who pages when the DLQ grows.
8. Ops: lag, oldest-unacked, poison rate, schema-compat checks.

## Output format

```markdown
## Queue design: <workflow>

**Broker / pattern:** queue | bus | log
**Delivery promise:** at-least-once (state how you make it safe)

### Topics / queues
…

### Keys / ordering
…

### Producer
outbox? schema?

### Consumer
ack, retry, DLQ, idempotency

### Failure / replay
…

### Metrics
lag, poison, age
```

## Rules

1. Do not promise exactly-once from the broker alone.
2. Handlers must be idempotent on a stable event id.
3. Retry without a DLQ is how you infinite-loop a bad payload.
4. Visibility timeout > p99 handler time, or you double-process
   healthy work.
5. Ordering is per key/partition, never global, unless the user
   accepts a single-threaded consumer.
6. PII in payloads needs retention and redaction like any store.
7. Do not invent broker-specific settings you cannot see; name the
   control (retention, DLQ redrive, IAM).

## Edge cases

- **"Just use Kafka":** ask the delivery and replay needs first.
- **Huge payloads:** store a pointer; do not stuff 50MB into the
  broker.
- **Request/reply over a queue:** usually the wrong tool; prefer
  a sync API with a job id.
- **Poison that used to work:** version the schema; do not silently
  drop.
---
