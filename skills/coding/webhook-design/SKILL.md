---
name: webhook-design
description: Design outbound and inbound webhooks with signatures, retries,
  idempotency, and replay defense. Use whenever the user builds Stripe-like
  webhooks, Slack events, GitHub hooks, partner callbacks, or asks how to
  sign, verify, retry, or version webhook payloads.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Webhook Design

Webhooks are untrusted HTTP with delayed, duplicated, and reordered
delivery. Authenticate the *sender*, make handlers idempotent, and
never fetch attacker-controlled URLs without SSRF controls.

For persistent sockets, use `websocket-design`. For public HTTP APIs,
use `api-design`.

## Workflow

1. Direction: inbound (you receive) vs outbound (you send) vs both.
2. Event catalog: type, version, payload schema, PII, ordering needs.
3. Auth: HMAC over the raw body + timestamp (or mTLS / public-key).
   Reject stale signatures (clock skew window, e.g. 5 minutes).
4. Idempotency: event id as the dedupe key; store processed ids; safe
   to retry.
5. Retries: exponential backoff, give-up budget, dead-letter, and
   what "success" means (2xx only).
6. Receiver rules: verify first, parse second; constant-time compare;
   no work before auth.
7. Sender rules: timeout, follow-redirects off by default, SSRF allow
   list if user-supplied URLs, secret rotation with dual-key overlap.

## Output format

```markdown
## Webhook design: <integration>

**Direction:** inbound | outbound | both
**Events:** …

### Signing
…

### Receiver contract
status codes, idempotency, time limit

### Retry / DLQ
…

### Versioning
…

### Abuse cases
replay, SSRF, secret leak, poison payload
```

## Rules

1. Sign the **raw body**, not a re-serialized JSON object.
2. Include a timestamp and reject old signatures (replay).
3. Deduplicate on a unique event id, not on "looks the same".
4. Outbound delivery to customer URLs is an SSRF problem: block link-
   local / metadata / private ranges unless explicitly required.
5. Secrets rotate with two valid keys during overlap. Never log the
   signing secret or full payload if it contains PII/tokens.
6. Version events (`type` + `api_version` or schema id). Additive
   fields first; breaking changes get a new type.
7. Do not use GET for delivery. POST (or the platform's documented
   method) with a bounded body size.

## Edge cases

- **At-least-once is the default.** Design for duplicates; do not
  promise exactly-once unless a transactional outbox is real.
- **Fan-out storms:** one user action → N hooks; budget and coalesce.
- **Signature schemes you did not invent:** follow Stripe/GitHub/Slack
  docs when integrating *their* platform; do not "improve" them.
- **Private network receivers:** prefer allowlisted egress and mTLS
  over "shared secret in a query param".
---
