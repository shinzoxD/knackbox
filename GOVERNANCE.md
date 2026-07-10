# Governance

Knackbox is a community-maintained library of portable Agent Skills. This file
explains how project decisions are made and how responsibility is earned.

## Project goals

Knackbox prioritizes, in order:

1. Skills that measurably improve real agent work.
2. Safe, inspectable packages with explicit requirements and permissions.
3. Compatibility with the open Agent Skills specification and major clients.
4. A contribution process that is rigorous without being exclusionary.

Catalog size is not a goal by itself.

## Roles

### Contributors

Anyone who reports a reproducible problem, improves documentation, adds an
evaluation, or submits a skill is a contributor. Contributions are reviewed on
their technical merits and must follow the DCO process in `CONTRIBUTING.md`.

### Maintainers

Maintainers can merge pull requests, manage releases, assign tiers, and handle
security reports. Maintainer access is offered to contributors who consistently
demonstrate sound review judgment, respectful collaboration, and sustained
project participation. Existing maintainers approve new maintainers by lazy
consensus: approval is assumed if no maintainer raises a reasoned objection
within seven days.

## Decisions

- Questions and early proposals belong in GitHub Discussions.
- Concrete bugs and scoped work belong in GitHub Issues.
- Changes to code, skills, policy, metrics, and tiers happen through pull
  requests with reviewable history.
- Routine decisions use lazy consensus. Substantive disagreements require a
  written decision record covering options, evidence, and trade-offs.
- The repository owner is the final tie-breaker for security, legal, and project
  continuity decisions.

## Skill tiers

- Community is the default for every accepted skill.
- Verified requires published measurements that meet the thresholds in
  `METRICS.md`, plus human review of evaluation outputs.
- Core requires Verified status, active maintenance, broad usefulness, and
  maintainer approval.
- A skill can be demoted when measurements regress, compatibility breaks, or it
  is no longer maintained. Tier changes are ordinary pull requests and must cite
  evidence.

## Reviews and conflicts

Reviews should focus on user outcomes, evidence, safety, compatibility, and
maintainability. Maintainers must disclose conflicts of interest when reviewing
their own commercial products or close collaborators. A contributor may request
a second maintainer review when they disagree with a decision.

## Inactivity and succession

Maintainers who expect to be unavailable for more than 60 days should say so in
Discussions. Access may be removed after six months of inactivity when active
maintainers agree, and can be restored when participation resumes. Project
ownership should be transferred to an active maintainer rather than leaving the
repository unmaintained.
