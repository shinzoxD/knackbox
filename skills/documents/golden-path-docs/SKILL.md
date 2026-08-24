---
name: golden-path-docs
description: Write internal developer-portal and golden-path docs — the
  blessed, supported way to create a service, ship, and observe it. Use
  whenever the user asks for a golden path, paved road, developer portal,
  internal platform docs, IDP Backstage docs, or "how do we start a new
  service here" — even if they call it a handbook page or TechDocs template.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Golden Path Docs

The golden path is the blessed, supported way to create a service, ship,
and observe it. One path, named owners, copy-paste commands. A person's
first week is `onboarding-guides`. Alert response is `runbook-writing`.
Generic tutorials are `technical-documentation`. Design RFCs are
`rfc-design-docs`.

## Workflow

1. **Name the job.** Create, ship, or observe. Split pages if they
   diverge. Audience is engineers using the platform, not new hires.
2. **Owner the path.** IDP/platform team plus who is paged when the
   template or pipeline breaks. No owner → not a golden path.
3. **Blessed tools only.** Template, CI, deploy, catalog, telemetry.
   Use names the user gave; do not invent Backstage or vendor APIs.
4. **Copy-paste commands** with `<placeholders>`. Expected result
   after each step. Mark OS differences.
5. **Secrets.** Point at vault/portal/IdP. Never embed tokens, keys,
   kubeconfigs, or production credentials — including "examples".
6. **What is not the golden path.** Fork-and-rename, laptop kubectl
   apply, personal gists, CI that bypasses required checks.
7. **Done when.** Catalog entity, green pipeline, golden signals on
   the blessed dashboard. Reading the page is not done.

## Output format

```markdown
# Golden path: <create a service | ship | observe>

**Owner:** <team>  **Pager:** <alias>  **Reviewed:** YYYY-MM-DD
**Portal:** <Backstage / IDP URL or unknown>
**Audience:** engineers creating or operating a service

## You are done when
- [ ] in the catalog  [ ] blessed pipeline shipped  [ ] dashboard live

## Create
Prereqs (access, not credentials): portal, org, vault role.
    <portal-create> --template <svc-node> --name <service> --owner <group>
Expected: repo, CI, catalog entity, default dashboard.

## Ship
    <platform-ship> --service <service> --env <staging|prod>
Promote the immutable artifact; do not rebuild per environment.

## Observe
Blessed dashboard and required metrics. Link alert runbooks; do not
paste 3 a.m. diagnosis (`runbook-writing`).

## Owners
| Piece | Team | Contact |
| --- | --- | --- |
| Template / CI / deploy / telemetry | … | … |

## Not the golden path
- Fork last quarter's service and rename
- kubectl apply from a laptop
- Personal Helm gist; unsigned `latest` tags
- Ad-hoc CI that skips required checks

## Secrets
Obtain `<SECRET_NAME>` from <vault or portal path>. Rotate via
<process>. Never commit `.env` values or paste live tokens here.

## Related
- First week at the company → `onboarding-guides`
- Alert is firing → `runbook-writing`
- Changing what is blessed → RFC, then update this page
```

## Rules

1. One blessed path per job. Two paths need two owners.
2. Commands are copy-pasteable; placeholders in `<angle-brackets>`.
3. Never embed real secrets or sample production credentials.
4. Owners are teams/aliases; people churn.
5. Do not write a new-hire week-1 plan (`onboarding-guides`).
6. Do not write alert diagnosis steps (`runbook-writing`).
7. Do not invent IDP template names, cluster DNS, or vendor APIs.
8. Mark untested commands **unverified**. Always include **Not the
   golden path** — otherwise people keep forking.

**Good:** `<portal-create> --template service-node --name payments-api`
then `<platform-ship>`; owner `@platform-idp`.
**Bad:** "Copy checkout-api, apply YAML, here is a prod token."

## Edge cases

- **No template yet:** label the interim path *unsupported*; name who
  will replace it. Do not call it golden.
- **Backstage / IDP:** template + TechDocs + catalog; still include
  owners, commands, and anti-patterns.
- **Monorepo vs many repos:** say which the path produces.
- **Wrong sibling:** week-1 → `onboarding-guides`; alert playbook → `runbook-writing`; RFC for a service type → `rfc-design-docs` first.
