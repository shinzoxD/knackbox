---
name: security-review
description: Review code and designs for security vulnerabilities — injection,
  authn/authz, secrets, crypto, SSRF, and data exposure. Use whenever the user
  asks for a security review, threat model, OWASP check, or whether something is
  safe to ship, shares auth/payment/upload code, or mentions vulnerability,
  exploit, hardcoding secrets, or "is this secure".
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Security Review

Find exploitable issues and missing controls. Prefer concrete abuse paths over
generic security advice. Severity is about impact and exploitability, not how
impressive the finding sounds.

## Review order

Tag every finding:

1. **[critical]** — remote code execution, auth bypass, secret leakage to
   untrusted parties, unrestricted data destruction, or payment fraud.
2. **[high]** — privilege escalation, injection with realistic input path,
   SSRF to internal networks, IDOR on sensitive records, broken crypto in
   production paths.
3. **[medium]** — missing rate limits on auth/sensitive actions, weak session
   flags, overly broad CORS, information disclosure that aids further attacks.
4. **[low]** — defense-in-depth gaps, missing security headers, logging of
   mildly sensitive fields, incomplete hardening.

## Workflow

1. Identify trust boundaries: who is untrusted (browser, mobile, third party,
   other tenants) and what assets matter (accounts, money, PII, secrets).
2. Map entry points: HTTP handlers, jobs, webhooks, file parsers, admin tools,
   SQL/ORM queries, template renders, shell invocations.
3. For each entry point, ask what happens with hostile input, a stolen session,
   or a confused deputy (the server calling an attacker-controlled URL).
4. Check authn (identity) separately from authz (permission on *this* object).
5. Summarize residual risk and the minimum fixes to ship safely.

## Checklist (always cover what applies)

- **Injection**: SQL/NoSQL/OS/LDAP/template; prefer parameterized APIs and
  avoid string-built queries or shell commands with user data.
- **Authn**: password storage (argon2/bcrypt, not plaintext/MD5), MFA paths,
  session fixation, cookie flags (`HttpOnly`, `Secure`, `SameSite`).
- **Authz**: object-level checks (IDOR), role checks on every mutating route,
  tenant isolation in multi-tenant data.
- **Secrets**: hardcoded keys/tokens, secrets in logs/errors/URLs, long-lived
  tokens without rotation, committed `.env` patterns.
- **Crypto**: custom crypto, ECB, hardcoded IVs, non-constant-time compares on
  tokens, weak random for security decisions.
- **SSRF / redirects**: user-controlled URLs fetched server-side; open redirects.
- **Uploads / files**: type sniffing only via magic bytes + size limits + no
  executable paths; path traversal on download.
- **Deserialization / XML / YAML**: unsafe loaders, XXE, gadget chains.
- **Dependencies**: known-vulnerable patterns only when versions are visible;
  never invent CVEs.

## Output format

```markdown
## Security review: <one-line target>

**Scope:** what was reviewed (files/endpoints/design)
**Assumptions:** language, framework, deployment notes you inferred

### Findings
1. [critical] `path:line` — <issue>
   - **Abuse path:** how an attacker exploits it
   - **Impact:** what is lost or gained
   - **Fix:** concrete change (code or config)

### Residual risk
What remains after the listed fixes, or what you could not verify.

### Ship verdict
**do not ship** | **ship with fixes** | **acceptable risk** — one sentence why.
```

## Rules

1. Every finding needs an abuse path or an honest "theoretical if X". No bare
   "consider adding validation".
2. Do not invent framework behavior you cannot see. Say "if this route is
   public, …".
3. Prefer the smallest correct fix over a multi-month rewrite.
4. Separate product bugs from security bugs; only security findings get
   severity tags above.
5. Never request or generate real secrets; use placeholders like `REDACTED`.
6. If the code is solid, say so and list what you checked — empty critical/high
   is a valid result.

When the user wants an OWASP-style coverage map or a full audit checklist,
read `references/owasp-top10.md` and map findings to categories that apply.

## Edge cases

- **Design-only / no code**: produce a short threat model (assets, actors,
  entry points, top 5 controls) instead of line-level findings.
- **Huge surface**: prioritize auth, multi-tenancy, money movement, and file/
  URL handling first; offer a second pass for the rest.
- **User asks "is this secure?"**: answer with residual risk, not a yes/no
  absolution. Absolute security claims are never appropriate.
- **Near-miss with code-review skill**: if they want general quality review,
  still focus on security; mention non-security bugs only if they enable
  exploitation.
