---
name: onboarding-guides
description: Write new-hire and contributor onboarding guides that get people
  productive fast. Use whenever the user asks for an onboarding doc, starter
  guide for engineers, contributor getting-started, first-week plan, or
  "how do we onboard" handbook section.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Onboarding Guides

Good onboarding reduces time-to-first-PR and time-to-first-decision. Short
paths, owned checklists, and links to living systems — not a novel.

## Structure

```markdown
# Onboarding: <role or project>

## Day 0 access
- accounts, VPN, repos, secrets path

## First 48 hours
- setup script / dev environment
- run tests / app locally
- map of systems

## First week
- small good first issue / task
- who to ask (roles not only names if churny)
- rituals (standup, oncall, release)

## How we work
- code review norms, communication channels

## Glossary
…

## Checklist
- [ ] …
```

## Rules

1. Prefer commands that work copy-paste; mark OS differences.
2. Link canonical docs; do not duplicate policies that drift.
3. Separate employee onboarding from open-source contributor guides when needed.
4. Security: never embed real secrets; describe where to obtain them.
5. Include a "you are onboarded when…" definition.
6. Keep under a readable length; progressive disclosure for deep topics.

## Edge cases

- **Remote / distributed:** timezone and async norms.
- **Contractors:** access boundaries.
- **OSS:** CONTRIBUTING, DCO/CLA, issue labels.
