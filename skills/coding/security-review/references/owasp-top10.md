# OWASP-oriented checklist (load on demand)

Use this when the user asks for an OWASP pass, a broad security audit, or
coverage mapping. Map findings to categories; do not force every category
if the surface does not include it.

| Area | What to verify |
|---|---|
| Broken access control | Object-level authz, tenant isolation, CORS, forced browsing |
| Cryptographic failures | Password hashing, TLS assumptions, secrets at rest, token entropy |
| Injection | SQL/NoSQL/OS/LDAP/template; parameterized APIs |
| Insecure design | Missing threat model for money, admin, multi-tenant, webhooks |
| Security misconfiguration | Default creds, verbose errors, directory listing, debug in prod |
| Vulnerable components | Only when versions are visible; never invent CVEs |
| Auth failures | Credential stuffing resistance, session fixation, MFA bypass |
| Software/data integrity | Unsigned updates, unsafe deserialization, CI supply chain |
| Logging/monitoring failures | Auth events, admin actions; no secrets in logs |
| SSRF | Server-side fetches of user URLs; cloud metadata endpoints |

Prefer concrete abuse paths in the main review output; this table is a
coverage aid, not the user-facing format.
