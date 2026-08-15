---
name: partner-api-integration
description: >-
  Plan integrating a third-party or partner HTTP API: auth, retries,
  idempotency keys, sandbox vs prod keys, versioning, pagination, and
  field mapping. Use whenever the user wants to integrate Stripe, Twilio,
  or a partner API, build a third-party API client, compare sandbox vs
  prod keys, handle partner pagination, or asks "how do we wrap this
  vendor API" — even if they only share a vendor doc snippet and do not
  name this skill.
license: Apache-2.0
compatibility: Portable instructions.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Partner API Integration

Wrap a vendor HTTP API as a reliable internal client. You do **not**
design the partner's surface. Work from their docs; do not invent
endpoints, fields, status codes, or auth schemes.

For APIs *we* publish, use `api-design`. For specs we author, use
`openapi-spec-design`. For inbound partner callbacks, use
`webhook-design`. For how keys are stored and rotated, use
`secrets-management`.

## Workflow

1. **Contract source:** vendor docs, sandbox console, or a file they
   gave you. Quote methods, paths, and fields from that source only.
2. **Auth:** the scheme they document (API key, OAuth client
   credentials, HMAC). Separate sandbox vs production credentials and
   base URLs.
3. **Surface we need:** our operations mapped to *their* methods and
   paths. Drop unused vendor endpoints.
4. **Client policy:** connect and request timeouts on every call;
   retries with exponential backoff only when the call is safe to
   repeat; honor `Retry-After` and 429.
5. **Idempotency:** send their documented idempotency-key header (or
   equivalent) on creates and money-moving calls; persist the key with
   our request id so a retry is the same attempt.
6. **Mapping:** vendor types → our domain. Money/currency, timestamps,
   IDs, enums, and nullability get explicit conversion rules.
7. **Pagination and versioning:** pin the API version they support;
   page with *their* cursor, token, offset, or `Link` header — not ours.
8. **Failure and ops:** map their error codes to ours; metrics for
   latency, 4xx/5xx, retries, and rate-limit hits. Never log secrets
   or full payment/PII payloads.

## Output format

```markdown
## Partner integration: <vendor / product>

**Source of truth:** docs URL or file (no invented paths)
**Environments:** sandbox vs prod base URL + key slots (placeholders)
**Auth:** …

### Operations we wrap
| Our use | Their method/path | Idempotent? | Timeout | Retry |

### Mapping
vendor field → ours (money, time, nulls, IDs)

### Client policy
timeouts, backoff, idempotency key, 429 / Retry-After

### Version pin
header or path they document; when we upgrade

### Test plan
sandbox cases; what we will not hit in prod first

### Open questions
only questions that change the wrapper
```

## Rules

1. Never invent vendor endpoints, query params, or headers. If the
   doc is missing, say so and ask — do not guess a REST shape.
2. Secrets stay out of the repo, examples, CI logs, and chat. Use
   placeholders such as `${PARTNER_SECRET}`. Storage, injection, and
   rotation belong in `secrets-management`.
3. Every outbound call has a connect timeout and a request timeout.
   No infinite wait on a hung partner.
4. Do not retry non-idempotent POSTs unless an idempotency key (or
   the vendor's documented equivalent) is sent and stored.
5. Pin the vendor API version. An unversioned client is a defect.
6. Inbound webhooks from the partner are `webhook-design`, not this
   skill. Point there instead of designing signatures here.
7. Sandbox and production keys, accounts, and webhooks stay isolated.
   Never use live keys in CI, shared fixtures, or sample configs.

## Edge cases

- **Sandbox drift:** features or error shapes that exist only in
  sandbox. Call them out; test the prod-only path before launch.
- **Pagination:** follow their cursor, page token, or `Link` header.
  Do not assume offset pages are stable under concurrent writes.
- **Partial success:** multi-step vendor flows need a recorded vendor
  id and a resume or reconcile path, not a blind re-POST.
- **SDK vs raw HTTP:** an official SDK is fine if it exposes timeouts,
  retries, and idempotency; wrap it so we can still pin versions.
---
