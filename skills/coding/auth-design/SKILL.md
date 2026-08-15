---
name: auth-design
description: Design authentication and authorization — sessions, OAuth/OIDC,
  JWT, MFA, cookies, and object-level access. Use whenever the user asks
  how to add login, SSO, refresh tokens, RBAC/ABAC, API keys, session
  cookies, or whether to use JWT, or is designing signup/signin flows.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Auth Design

Separate **who they are** (authn) from **what they may do to this
object** (authz). Default to boring, revocable server sessions unless
the constraint set forces something else.

For a vulnerability hunt on existing code, use `security-review`. For a
system-wide STRIDE pass, use `threat-modeling`.

## Workflow

1. Actors, clients (browser, mobile, machine), and what is being
   protected (accounts, money, PII, admin).
2. Identity: first-party password, magic link, SSO (OIDC), or passkeys.
   Password storage is argon2/bcrypt — never reversible or MD5/SHA1.
3. Session: server-side session id in an `HttpOnly; Secure; SameSite`
   cookie is the default. Say why before choosing JWT in localStorage.
4. Token lifetimes: access short; refresh rotating and reuse-detected;
   logout revokes the family.
5. Authz model: RBAC roles *plus* object/tenant checks on every mutate
   and read of another user's record (no IDOR).
6. Recovery: email change, password reset, MFA reset — treat as
   account-takeover paths.
7. Threats: CSRF, session fixation, open redirects after login, token
   leak in URLs/logs, confused-deputy OAuth redirects.

## Output format

```markdown
## Auth design: <product>

**Clients:** …
**Identity:** …
**Session / tokens:** …
**Authz model:** …
**Recovery:** …

### Decisions
| Decision | Choice | Why |

### Abuse paths still open
…

### Do not
…
```

## Rules

1. Do not put long-lived JWTs in `localStorage` for a first-party
   browser app without stating the XSS tradeoff.
2. Every resource handler checks *this* object and *this* tenant, not
   only "is logged in".
3. OAuth: exact redirect URI allowlist, `state`/`nonce`, PKCE for
   public clients, minimal scopes.
4. MFA is phishing-resistant (passkey / WebAuthn) when the account is
   high value; TOTP is a step up from nothing, not the ceiling.
5. API keys are secrets: hashed at rest, scoped, rotatable, never in
   query strings or frontend bundles.
6. Clock-skew and "alg=none" / key-confusion are findings if JWT is
   chosen; name the library and validation steps.
7. Never invent a custom crypto protocol. Use the platform or a
   well-known library and say which.

## Edge cases

- **"Just use JWT so we can scale":** ask whether a shared session
  store or split auth service is actually the constraint.
- **Machine-to-machine:** client credentials or signed requests; no
  user refresh-token pattern.
- **Impersonation / support login:** audit log, time-box, and distinct
  actor vs subject.
- **Multi-tenant:** tenant id from the session, never from an
  unchecked client header.
---
