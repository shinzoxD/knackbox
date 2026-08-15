# Install recipes

Copy-paste workflows for common jobs. Requires Node 18+ and system `tar`.

```bash
# Prefer published package when available:
npx knackbox <command>

# From a clone of this repo:
node packages/cli/bin/knackbox.js <command>
# or: npm start --prefix packages/cli -- <command>
```

## Everyday engineering

```bash
npx knackbox pack developer-essentials
# or a thinner set:
npx knackbox add commit-messages code-review pr-descriptions debugging test-generation
```

## Ship safely

```bash
npx knackbox add security-review prompt-injection-hardening code-review
npx knackbox add database-migrations terraform-review kubernetes-review
```

## Platform / DevOps day

```bash
npx knackbox pack platform-and-infra
npx knackbox add load-test-planning logging-observability ci-cd-pipelines container-review
npx knackbox add pulumi-review cloudformation-review terraform-review
```

## Identity, webhooks, and threat models

```bash
npx knackbox pack identity-and-trust
npx knackbox add auth-design webhook-design threat-modeling security-review
```

## Ship a mobile train

```bash
npx knackbox pack mobile-shipping
npx knackbox add mobile-release desktop-release feature-flags ci-cd-pipelines release-notes
```

## Live incident

```bash
npx knackbox add incident-command incident-comms runbook-writing
npx knackbox pack ops-reliability
```

## Cloud bill / FinOps

```bash
npx knackbox add finops-review terraform-review kubernetes-review
```

## Prompt and agent eval

```bash
npx knackbox pack ai-builders
npx knackbox add prompt-evaluation prompt-improver prompt-injection-hardening
```

## Incident mode

```bash
npx knackbox pack ops-reliability
npx knackbox add incident-comms runbook-writing issue-triage
```

## Data & experiments

```bash
npx knackbox pack data-workbench
npx knackbox add sql-analytics ab-test-analysis metrics-definitions
npx knackbox add sql-query-review database-indexing
```

## Accessibility build + review

```bash
npx knackbox add accessibility-implementation accessibility-review design-system-contribution
```

## Enterprise security questionnaires

```bash
npx knackbox add security-questionnaire threat-modeling privacy-request-playbook rfp-response
```

## Product & research

```bash
npx knackbox add user-interview-synthesis survey-analysis competitor-briefs
npx knackbox add decision-memos rfc-design-docs okr-drafting product-requirements
```

## Writing & GTM

```bash
npx knackbox pack clear-writing
npx knackbox add product-announcements social-posts internal-comms
```

## Support & privacy

```bash
npx knackbox pack customer-facing
npx knackbox add privacy-request-playbook support-macros incident-comms
```

## Discover before installing

```bash
npx knackbox search security
npx knackbox search "load test"
npx knackbox list --category coding
npx knackbox packs
npx knackbox doctor
```

## Target another agent

```bash
npx knackbox add commit-messages --agent cursor
npx knackbox add commit-messages --agent codex
npx knackbox add commit-messages --dest "$HOME/my-skills/commit-messages"
```

More: [packages/cli/README.md](packages/cli/README.md) · [COMMUNITY.md](COMMUNITY.md) · [knackbox.pages.dev](https://knackbox.pages.dev)

## OSS maintainers

```bash
npx knackbox pack oss-maintainers
npx knackbox add oss-maintainer-triage onboarding-guides code-review
```

## Product & GTM

```bash
npx knackbox pack product-gtm
npx knackbox add case-studies market-sizing rfp-response
```

## Secure delivery

```bash
npx knackbox add secrets-management feature-flags security-review ci-cd-pipelines
```
