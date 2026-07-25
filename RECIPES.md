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
```

## Product & research

```bash
npx knackbox add user-interview-synthesis survey-analysis competitor-briefs
npx knackbox add decision-memos rfc-design-docs okr-drafting
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
