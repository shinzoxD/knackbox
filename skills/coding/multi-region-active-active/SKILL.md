---
name: multi-region-active-active
description: Design multi-region and active-active systems — data-plane
  topology, consistency, conflict policy, traffic steering, and failover
  — and refuse invented RPO, vendor replication flags, or magic DNS.
  Use whenever the user asks for active-active, multi-region, multi-primary,
  dual-region writes, global database, cross-region failover architecture,
  "serve writes from two regions", or "users in EU and US write locally"
  — not a backup restore drill, live incident command, or Kubernetes
  manifest review.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Multi-Region Active-Active

Compute is easy to put in two regions. The **data plane** is the design.
Active-active is a consistency, conflict, and steering problem — not a
replica count.

Restore-from-backup and "can we restore" are `disaster-recovery`. Live
region-down command is `incident-command`. Manifest probes, PDBs, and
YAML are `kubernetes-review`. Availability wording alone is
`sla-slo-writing`. Fault-injection hypotheses are `chaos-experiment-design`.

## Workflow

1. **Why multi-region.** Latency, residency, or availability. These
   pick different topologies. "All three, RPO 0, no app changes" is
   not a design — it is a wish.
2. **What is written where.** Classify each store: session, identity,
   catalog, inventory, money, audit. Reads everywhere is cheap. Dual
   writers on the same row is not.
3. **Pick a topology and say why** (see below). Default is
   **home-region writes**, not "any region writes any key".
4. **Data plane per store.** Replication direction, lag tolerated,
   uniqueness / money / inventory owner, cache as local only.
5. **Conflict policy in one sentence.** LWW loses data. CRDTs only
   for mergeable types. Business merge (cart, stock) needs explicit
   rules. Silence is a defect.
6. **Steering.** How a client finds a region, how it stays after a
   write (read-your-writes), what health check removes a region.
7. **Failure + failback.** Region loss, inter-region partition
   (split-brain), stale replica, poison global config. Failback names
   the source of truth.
8. **Gaps.** Every unverified lag, RPO, TTL, or vendor claim.

### Topologies (pick one)

| Shape | Writes | Honest cost |
|---|---|---|
| Active-passive | One writer region | Failover is a cutover; often a DR event |
| Read-local / write-primary | All writes go home | Replica lag; pin after write |
| Home-region (partitioned AA) | Each key has a home | Best real-world AA; forward foreign writes |
| True multi-primary | Any region, any key | Consensus tax or defined data loss |

## Output format

```markdown
## Multi-region design: <system>

**Goal:** latency | residency | availability (pick; rank the rest)
**Topology:** active-passive | read-local | home-region | multi-primary
**Why this shape:** …

### Data plane
| Store | Writer | Replica | Lag tolerated | Conflict / uniqueness | Residency |

### Client path
Steering, sticky-after-write, health that removes a region.

### Failure
| Event | User-visible | RPO accepted | Who fences the writer | Failback source of truth |

### Do not
…

### Gaps (unverified)
- …
```

## Rules

1. Never invent measured RPO/RTO, replica lag, DNS TTL, or last
   failover evidence. Ask or mark UNVERIFIED.
2. Never invent vendor replication syntax, cluster flags, or "just
   enable Aurora Global / Spanner / Cockroach multi-region" as a
   substitute for naming the consistency model.
3. Never claim RPO 0 without a **synchronous** path and its cost
   (commit latency, availability coupling). Async replica = nonzero RPO.
4. Never treat DNS as instant failover. Resolvers cache; name the
   TTL and the fallback (anycast, app redirect, or accept minutes).
5. Never use wall-clock last-writer-wins for money, inventory, or
   unique constraints. Clocks skew; LWW drops a write.
6. Caches and CDNs are not sources of record. Region-local cache
   after a remote write is a stale-read bug unless pinned or invalidated.
7. Identity, IdP, KMS, and DNS are often a hidden single region.
   If they die with the site, the "active" replica cannot serve.
8. Data residency: some rows cannot leave a region even in failover.
   Do not silently copy them "for HA".
9. Split-brain: if both regions can write the same keys during a
   partition, require fencing (lease, quorum, or disable writes).
10. Restore drills → `disaster-recovery`. YAML → `kubernetes-review`.
    Live outage → `incident-command`.

**Good:** tenant_id 0–49 home `eu-west-1`, 50–99 home `us-east-1`;
foreign writes forwarded; unique email enforced in the home region.
**Bad:** "active-active Postgres in both regions, last write wins,
Route53 will fail over instantly."

## Edge cases

- **"Just make the database global":** ask which keys may be written
  in two regions at once. If the answer is "all of them", you do not
  have a topology yet.
- **Read-your-writes after signup:** pin the session to the writer
  region or read from the primary until lag is known.
- **Global uniqueness (email, SKU, handle):** one owner region or
  a reservation protocol. Dual INSERT is a race, not HA.
- **Inventory / balances:** reservation or single writer. Do not
  decrement stock independently in two regions.
- **One AZ vs one region:** multi-AZ is not multi-region. Do not
  upgrade the claim.
- **SaaS with no cross-region export:** vendor RPO is a claim;
  require their evidence (`disaster-recovery` for restore proof).
- **"Are we active-active?" with async replicas and one writer:**
  say no; name the actual shape (read-local or active-passive).
- **Region is on fire now:** hand the bridge to `incident-command`.
---
