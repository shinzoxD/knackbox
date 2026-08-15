---
name: disaster-recovery
description: Write and review disaster recovery and backup restore playbooks.
  Use whenever the user asks for a DR plan, RPO/RTO targets with restore
  evidence, a failover drill, ransomware restore steps, or "can we restore"
  — not a single-alert runbook, live incident command, or SLA wording alone.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Disaster Recovery

DR playbooks survive region loss, data corruption, ransomware, and operator
delete. Not a single-alert procedure (`runbook-writing`), not live bridge
command (`incident-command`), not availability targets alone (`sla-slo-writing`).

A backup is a copy. A restore is a working system. Untested is unverified.

## Workflow

1. Scope: systems, data classes, disaster classes (region, corruption,
   ransomware, vendor, operator delete).
2. Inventory from evidence: method, location, encryption, retention,
   immutability, last *verified* success. Missing proof → UNVERIFIED.
3. Objectives: declared RPO/RTO and who set them. Ask if unknown; never
   invent. Separate declared target from last *measured* restore time.
4. Decision tree: fail over vs restore in place vs accept data loss. Who
   may declare DR.
5. Procedures: verification, restore, failover, failback. One action per
   step. Mark overwrite / cutover **danger**.
6. Dependencies: DNS, IdP, secrets, keys, network, vendors. Cannot decrypt
   or re-point DNS → failed restore.
7. Drill: tabletop plus an actual restore. Success criteria and evidence.
   Never skip the restore test.
8. Gaps: every unverified claim. First action is often a scoped drill.

## Output format

```markdown
# DR plan: <scope>
**Owner:** …
**Last reviewed:** …
**Last successful restore drill:** <date + evidence> | never
**Declared RPO / RTO:** … (source: …)
**Disaster classes:** …

## Inventory
| System | Data class | Backup | Location | Encryption | Retention | Immutable | Last verified |

## Objectives
| System | RPO | RTO | Who set it | Last measured restore |

## Decision tree
Fail over vs restore in place vs declare loss. Declarer / executor.

## Backup verification
How we prove the copy exists and is not empty/corrupt.

## Restore
1. …

## Failover / failback
1. …

## Ransomware / integrity
Isolate. Preserve forensic copy. Restore from known-good, not "latest".

## Dependencies & access
…

## Communications
Who, channel, customer facts (no invented ETAs).

## Drill plan
Cadence, scope, success criteria, evidence to retain.

## Gaps (unverified)
- …

## Related
runbooks / SLOs / owners
```

## Rules

1. Never invent restore times, backup success, or last-test dates. Ask
   or mark UNVERIFIED.
2. Never recommend skipping restore tests. Paper drills are not a restore.
3. Always treat RPO/RTO as requirements and measured restore as evidence.
4. Always separate "backup exists" from "we restored a working system".
5. Always name who declares DR and who may execute destructive failover.
6. Mark overwrite, failback, and production cutover **danger**.
7. Ransomware: isolate first; latest backup may be dirty; prefer immutable
   / offline known-good. Do not overwrite good copies.
8. Single-alert steps → `runbook-writing`. Live outage → `incident-command`.
   Targets-only wording → `sla-slo-writing`.
9. Missing evidence still gets a plan — Gaps stays red; no green checkmarks.

## Edge cases

- **Never restored:** draft only; first action is a scoped restore drill.
- **Ransomware / integrity:** do not assume latest snapshot is clean.
- **One AZ / partial region:** failover may beat full restore; still need RPO.
- **SaaS with no export:** vendor RPO/RTO are claims; require their evidence.
- **Keys died with the site:** call out escrow; restore without keys fails.
- **"Are we DR ready?" with no tests:** refuse the claim; list what would make it true.
- **Disaster is happening now:** hand the bridge to `incident-command`.
