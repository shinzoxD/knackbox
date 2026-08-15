---
name: mobile-release
description: Plan and review iOS and Android store releases — versioning,
  signing, store listings, staged rollout, and rollback. Use whenever the
  user asks about TestFlight, Play Console tracks, App Store submit,
  build numbers, signing, privacy nutrition labels, or a mobile release
  checklist.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Mobile Release

A store release is a one-way public change with slow rollback. Optimize
for a reversible staged rollout and evidence that the build is the one
you intended.

This skill covers *shipping the binary and listing*. For CI shape, also
use `ci-cd-pipelines`. For feature exposure, use `feature-flags`.

## Workflow

1. Identify platform(s), track (internal / closed / open / production),
   and whether this is first release or a train.
2. Confirm version identity: user-facing version *and* monotonically
   increasing build / versionCode. Same git SHA as CI artifact.
3. Signing: release keystore / App Store Connect API key / Play App
   Signing. Who can mint a prod build.
4. Store listing delta: screenshots, copy, privacy nutrition, data-safety,
   permissions justification, age rating.
5. Quality gates: crash-free, ANR, startup, paywall/login smoke on the
   *release* build, not only debug.
6. Rollout plan: staged % , hold hours, kill switch / remote config,
   store halt vs forced update.
7. Rollback: what you can undo in 30 minutes (flag, halt rollout) vs
   what needs a new binary.

## Output format

```markdown
## Mobile release: <app> <version> (<build>)

**Platforms / tracks:** …
**Git SHA / artifact:** …

### Preflight
- [ ] version + build increment
- [ ] signed with release identity
- [ ] release notes (user + store)
- [ ] privacy / data-safety still true
- [ ] smoke on release build

### Rollout
…

### Halt / rollback
…

### Blockers
1. …
```

## Rules

1. Never reuse a build number. Stores reject or confuse trains.
2. Do not ship a locally signed "I built it on my laptop" prod binary
   when CI already produces signed artifacts.
3. Permissions and privacy answers must match *this* binary. New SDK
   → revisit data-safety / nutrition labels.
4. Staged rollout starts small on weekdays with an owner watching
   crash/ANR, not Friday 6pm at 100%.
5. A store "halt rollout" is not an uninstall. Critical bugs need a
   flag or a follow-up binary.
6. Distinguish TestFlight / internal testing (signal) from production
   (customers). Do not treat TF crash-free as prod-proof.
7. Do not invent Apple/Google console UI labels that you cannot see;
   describe the control.

## Edge cases

- **Hotfix:** smallest binary delta; skip listing copy changes; keep
  the same rollout owner.
- **First launch:** extra pass on age rating, encryption export, and
  login/paywall on a clean device.
- **Cross-platform:** keep user-facing version aligned unless there is
  a stated reason; never couple build numbers across stores.
- **Expo / RN / Flutter:** review native version files and store
  metadata, not only JS bundle hash.
---
