---
name: websocket-design
description: Design WebSocket and realtime channels with auth, backpressure, and
  reconnect semantics. Use whenever the user builds realtime features, sockets,
  presence, live updates, or streaming over persistent connections.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# WebSocket Design

Realtime needs auth on connect, heartbeats, reconnect/resume, and backpressure.
Do not treat sockets as free unlimited fan-out.

## Workflow

1. Use cases: notifications, collab, trading, presence.
2. Auth: ticket/token on connect; revalidate on resume.
3. Protocol: message types, versioning, compression.
4. Scaling: sticky sessions, pub/sub fan-out, room design.
5. Reliability: heartbeats, backoff reconnect, offline buffer.
6. Backpressure and max message size.
7. Observability: connects, drops, lag.

## Output format

```markdown
## Realtime design
**Channels:** …
**Auth:** …
**Message schema:** …
**Reconnect/resume:** …
**Scale plan:** …
**Limits:** …
```

## Rules

1. Authenticate before subscribing to private rooms.
2. Validate every client message; never trust client as authority for money.
3. Document idle timeouts and ping/pong.
4. Prefer idempotent event ids for delivery.
5. Separate public broadcast from private streams.

## Edge cases

- **Mobile networks:** aggressive reconnect.
- **Horizontal scale:** avoid single-node presence without store.
- **Browser limits:** connection count per origin.
