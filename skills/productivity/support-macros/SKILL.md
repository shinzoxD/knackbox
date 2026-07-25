---
name: support-macros
description: Draft customer support replies and macros with correct tone,
  escalation judgment, and no over-promising. Use whenever the user pastes a
  support ticket, asks for a help-desk reply, canned macro, refund wording, or
  whether to escalate a customer issue.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Support Macros

Support writing is empathy plus accuracy. Never invent policy. Escalate when
risk, abuse, data loss, or legal exposure appears.

## Workflow

1. Restate customer problem and emotion in one line (internal).
2. Identify facts you have vs need; list clarifying questions if blocked.
3. Apply **user-provided policy** only — do not invent refund/SLA rules.
4. Choose path: resolve, workaround, escalate, or security/privacy path.
5. Draft reply: empathy → answer/action → next step → close.
6. Offer a shorter macro variant when useful.

## Output format

```markdown
## Ticket read
**Issue:** …
**Tone to match:** …
**Path:** resolve | workaround | escalate

## Customer reply
…

## Internal notes
- macros tags, escalation reason, fields to update

## If policy missing
Questions to ask the user/policy owner before sending.
```

## Rules

1. Never invent pricing, refunds, legal commitments, or timelines not given.
2. Do not admit liability in creative ways; stay factual unless policy says otherwise.
3. Security reports: do not ask for passwords; use secure channels.
4. Abusive tickets: firm boundaries without matching hostility.
5. Personal data: minimize echoing sensitive data back.
6. One clear CTA (what happens next / what we need).

## Edge cases

- **Angry churn risk:** acknowledge impact, own the fix path, avoid fake discounts.
- **Bug with workaround:** give workaround first, then tracking expectation if provided.
- **Cannot reproduce:** request artifacts without blaming the customer.
