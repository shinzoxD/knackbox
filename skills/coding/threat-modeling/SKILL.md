---
name: threat-modeling
description: Build a structured threat model — assets, actors, trust
  boundaries, STRIDE, and mitigations — before or beside a code review.
  Use whenever the user asks for a threat model, attack tree, STRIDE
  analysis, abuse cases, trust boundaries, or "who can attack this
  system" rather than a line-by-line security review.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Threat Modeling

Map how the system can be abused *before* arguing about individual
lines. Prefer a short, decision-ready model over a novel.

For findings in a concrete diff, use `security-review`. For prompt /
tool-using agents, also use `prompt-injection-hardening`. For auth
mechanics, use `auth-design`.

## Workflow

1. **Scope:** what is in, what is out, and the business consequence
   of failure (money, PII, safety, integrity, availability).
2. **Assets:** data stores, secrets, admin actions, model weights,
   outbound capabilities.
3. **Actors:** anonymous, user, other tenant, insider, supplier,
   compromised dependency, bot.
4. **Diagram in words:** clients → edges → app → data → third
   parties. Mark trust boundaries (browser, VPC, vendor, tenant).
5. **STRIDE per boundary / flow** (only what applies):
   Spoofing, Tampering, Repudiation, Information disclosure,
   Denial of service, Elevation of privilege.
6. **Top threats:** likelihood × impact in plain language; skip
   theater (nation-state on a weekend side project unless asked).
7. **Mitigations:** existing control, gap, owner. Residual risk last.

## Output format

```markdown
## Threat model: <system>

**Scope / out of scope:** …
**Assumptions:** …

### Assets
…

### Actors
…

### Trust boundaries
…

### Threats
| ID | STRIDE | Flow / component | Abuse | Impact | Mitigation | Residual |

### What to build or review next
1. …
```

## Rules

1. Every threat names an actor, a path, and a lost asset. No bare
   "consider adding WAF".
2. Do not invent architecture. If the diagram is missing, state
   assumptions or ask one clarifying question.
3. Mitigations must be specific (control + where it lives). "Use
   security best practices" is not a mitigation.
4. Rank. A 30-row STRIDE table with no priority is a failed model.
5. Data classification drives impact. Public marketing pages are not
   PII stores.
6. Include supply chain and admin/support paths when they can mint
   or read the same assets as users.
7. Never claim "no residual risk".

## Edge cases

- **Code-only request:** still produce the model first, then list
  the 3–5 reviews that would falsify it (`security-review` targets).
- **AI / tool agents:** treat tools, retrieval corpora, and prompt
  channels as trust boundaries.
- **Regulated data:** name the obligation (retention, access logs)
  as a threat if missing; do not give legal advice.
- **Tiny change:** a one-endpoint model is fine; do not expand to
  the whole company.
---
