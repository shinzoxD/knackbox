---
name: finops-review
description: Review cloud spend and FinOps plans — idle resources, rightsizing,
  commitment discounts, and unit-cost metrics. Use whenever the user shares a
  bill, Cost Explorer export, asks why AWS/GCP/Azure is expensive, wants a
  savings plan, or reviews infra for cost before scaling.
license: Apache-2.0
compatibility: Portable instructions; may interpret cost exports or invoices when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# FinOps Review

Treat spend as a product metric. Cut waste first, then buy commitments,
then redesign architecture. Do not recommend reserved capacity on a
workload you have not seen stabilize.

For IaC blast radius, use `terraform-review` / `pulumi-review` /
`cloudformation-review`. For load that drives cost, use
`load-test-planning`.

## Workflow

1. Scope: account/project, env, time window, currency, who owns the bill.
2. Split the bill: compute, storage, data transfer, managed DB, logs,
   support, marketplace. Name the top 5 line items.
3. Classify each: **idle / oversized / correctly busy / unknown**.
4. Unit cost: spend ÷ a real driver (active users, requests, GB stored,
   jobs). A cheaper month with 2× traffic is a win.
5. Quick wins: unattached volumes, idle load balancers, unused IPs,
   forgotten snapshots, always-on non-prod, log ingest without retention
   caps, NAT/egress surprises.
6. Rightsizing: use *observed* CPU/mem/IOPS, not instance family folklore.
7. Commitments (RI / SP / CUD) only after 30+ days of stable baseline
   and an owner who will use them.
8. Guardrails: budgets, anomaly alerts, tags/labels required to ship.

## Severity tags

- **[blocking]** prod data-loss path proposed as a saving (delete the
  only backup, turn off Multi-AZ with no RPO)
- **[important]** idle spend >10% of the bill, missing tags, uncapped
  logs/egress, non-prod = prod size 24/7
- **[nit]** naming, dashboard cosmetics

## Output format

```markdown
## FinOps review: <account / window>

**Total:** …
**Unit cost:** … / <driver>
**Top drivers:** …

### Findings
1. [important] …

### Savings backlog
| Item | Est. monthly | Effort | Risk | Owner |

### Do not do
…

### Measurement
budget, anomaly alert, tag policy
```

## Rules

1. Never invent dollar amounts. If the bill is missing, give *relative*
   actions and ask for the export.
2. Do not recommend deleting backups, dropping Multi-AZ, or turning off
   encryption to save money.
3. Separate one-time cleanup from recurring architecture cost.
4. Tag/label gaps are findings: unallocated spend cannot be owned.
5. Egress and cross-AZ traffic are first-class; "compute looks fine"
   is not a complete review.
6. Spot/preemptible only for interruptible work, with a fallback.
7. Distinguish list price from the user's actual discount/EDP if shown.

## Edge cases

- **"Make it 50% cheaper":** refuse a number without a bill; offer the
  measurement + top-waste hunt instead.
- **K8s / shared clusters:** allocate by namespace/label; do not blame
  the control plane for app replicas.
- **AI / GPU:** utilization and batching beat instance shopping.
- **FinOps theater:** a pretty dashboard with no owner and no budget
  page is not a control.
---
