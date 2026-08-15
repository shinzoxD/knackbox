---
name: security-questionnaire
description: Answer vendor and enterprise security questionnaires — SIG,
  CAIQ, SOC 2, ISO, and custom sales security packs — with evidence, not
  slogans. Use whenever the user pastes a security questionnaire, vendor
  assessment, SIG/CAIQ, "sales needs this by Friday", or a customer
  asking how you encrypt, auth, or subprocess.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Security Questionnaire

A questionnaire is an evidence pack, not a marketing page. Answer what
is true *today*. Mark gaps. Do not invent certifications, subprocessors,
or controls.

For a code/design vuln hunt, use `security-review`. For a STRIDE model,
use `threat-modeling`. For privacy DSAR process, use
`privacy-request-playbook`.

## Workflow

1. Identify the pack (SIG, CAIQ, custom RFP, SOC 2 bridge) and the
   product/environment in scope.
2. Collect facts the user already has: hosting, IdP, encryption, logs,
   backups, subprocessors, certs (type + date), pentest window.
3. Answer each question in one of: **yes + evidence**, **no + plan**,
   **partial + boundary**, **N/A + why**.
4. Point to artifacts: policy name, ticket, SOC report section, config
   screenshot *description* — never attach secrets.
5. Flag contradictions (we say SSO required, signup is password-only).
6. Produce a gap list the sales/security owner can actually close.

## Output format

```markdown
## Questionnaire: <pack / customer>

**Scope / env:** …
**Evidence used:** …

### Answers
| ID | Question gist | Answer | Evidence | Residual |

### Gaps to close before send
1. …

### Do not claim
…
```

## Rules

1. Never invent SOC 2 / ISO / HIPAA / FedRAMP. If the letter is not
   in hand, say "not certified" and describe the control you *do* run.
2. Do not paste real secrets, customer data, or internal IPs.
3. "Yes" without a pointer is a draft, not a sendable answer.
4. Scope tightly: production SaaS ≠ employee laptops ≠ a mobile app
   unless asked.
5. Subprocessors: only list what the user named. Missing list is a
   gap, not a guess.
6. Future tense ("we will encrypt") is a roadmap, labeled as such.
7. If the question is legal (DPA, liability), draft a *factual*
   control answer and mark it for counsel — do not give legal advice.

## Edge cases

- **Blank company:** produce the question list grouped by theme and
  the evidence to gather; do not fabricate a security program.
- **Conflicting answers in an old pack:** surface the conflict; do
  not silently pick the nicer one.
- **Pentest / vuln details:** summarize residual risk; do not paste
  exploit steps into a customer-facing cell.
- **User wants a threat model:** point at `threat-modeling` and keep
  this file to Q&A.
---
