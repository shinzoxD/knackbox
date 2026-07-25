---
name: oss-maintainer-triage
description: Triage open-source issues and PRs with labels, reproduction asks,
  and maintainer-friendly replies. Use whenever the user maintains a public repo
  and needs issue triage, good-first-issue labeling, incomplete bug report
  replies, or PR intake for an open-source project.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# OSS Maintainer Triage

Maintainer time is the scarce resource. Triage creates clarity: valid bug,
needs repro, duplicate, out of scope, or ready for contribution.

## Workflow

1. Skim title/body; restate the ask in one line.
2. Classify: bug, feature, question, docs, security, spam.
3. Labels: type, area, status (needs-repro, good first issue, help wanted).
4. Repro completeness; ask for versions/OS/steps when missing.
5. PR intake: scope, tests, license/DCO, breaking changes.
6. Reply templates that are kind and boundaried.
7. Security: private reporting path, no public exploit detail.

## Output format

```markdown
## Triage: #<n or title>
**Type:** …
**Labels:** …
**Priority:** …
**Reply (public):**
…
**Internal note:** …
```

## Rules

1. Assume good intent until proven otherwise; still enforce scope.
2. Do not promise timelines you cannot keep.
3. good first issue must be actually small and well-scoped.
4. Close duplicates with links; keep one thread canonical.
5. Never dismiss security reports in public threads casually.
6. Batch triage tables when many issues provided.

## Edge cases

- **Entitled demands:** firm boundaries, link CONTRIBUTING.
- **Drive-by huge PRs:** ask to split; thank effort; state review capacity.
- **Abandoned issues:** stale bot policy suggestions.
