---
name: cost-anomaly-investigation
description: Investigate a sudden cloud, bill, or cost spike — isolate the
  time window, rank hypotheses, and name the next checks. Use whenever the
  user reports a cost spike, bill doubled overnight, Cost Explorer anomaly,
  AWS Cost Anomaly Detection alert, asks "why did spend jump", or has a GPU
  bill surprise. Not a cheaper-bill program (use finops-review) and not a
  generic metric or log spike that is not money (use anomaly-detection).
license: Apache-2.0
compatibility: Portable instructions; may interpret cost exports when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Cost Anomaly Investigation

Find what changed in the bill, when, and what to check next. Do not turn
a spike into a rightsizing or commitment plan.

For idle waste, rightsizing, and Savings Plans, use `finops-review`. For
metric or log spikes that are not money, use `anomaly-detection`.

## Workflow

1. Confirm the signal: account/project, currency, payer vs linked, charge
   type (usage, tax, credit, amortized commitment). Invoice, Cost Explorer,
   CUR, or an AWS Cost Anomaly Detection line — say which.
2. Pin the window: first hour or day the delta appears; timezone; hourly
   vs daily. Never treat month-to-date vs a full prior month as the same
   window without saying so.
3. Slice movers: service, usage type, account/OU, region, tag, operation.
   Name the top two or three only.
4. Classify: usage up | price or discount change | billing artifact |
   unknown. Credits/EDP expiry can look like a spike with flat usage.
5. Rank hypotheses against a change calendar: deploy, autoscaling, batch
   or GPU job, log ingest, NAT/egress, new marketplace SKU, support plan,
   forgotten resource.
6. Next two or three checks that would disconfirm (CUR filter, create
   events, utilization, job IDs). Do not declare root cause from one
   service total.
7. Containment is stop-the-bleed only (pause a runaway job, scale down
   a forgotten fleet). Structural savings go to `finops-review`.

## Output format

```markdown
## Cost anomaly: <account / window>

**Real?** likely | unclear | billing artifact
**Window:** first seen … through … (granularity, tz)
**Delta:** <quoted from input only; else relative / unknown>
**Top movers:** service / usage type / account / region
**Class:** usage | price-or-discount | artifact | unknown

### Hypotheses
1. …

### Next checks
1. …

### Containment (stop-the-bleed)
…

### Out of scope here
`finops-review` for rightsizing / commitments
`anomaly-detection` if the spike is not money
```

## Rules

1. Never invent dollar amounts, bill percentages, or "you will save $X".
   Missing export → stay relative and ask for Cost Explorer or CUR.
2. Do not recommend deleting backups, dropping Multi-AZ, or turning off
   encryption to offset a spike.
3. Separate unblended usage from amortized RI/SP, tax, credits, refunds.
4. Do not name a root cause from a single service total or one Cost
   Anomaly Detection row.
5. Cheaper-bill, rightsizing, and commitment questions → `finops-review`.
6. Non-money metric or log anomalies → `anomaly-detection`.
7. Incomplete "today" Cost Explorer data is not a close.

## Edge cases

- **Credits / discount ended:** check charge type before hunting resources.
- **MTD vs last calendar month:** refuse until both windows have the same
  number of complete days.
- **GPU / AI:** job start, idle endpoints, spot-to-on-demand fallback,
  token APIs — utilization before instance shopping.
- **Transfer hiding under EC2/NAT:** split usage types; do not stop at
  the service rollup.
- **Shared or untagged account:** ownership is unknown; do not blame the
  first tagged app.
- **"Make the bill cheaper" mid-investigation:** finish window +
  hypotheses, then point to `finops-review`.
