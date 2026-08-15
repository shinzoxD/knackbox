---
name: desktop-release
description: Plan and review desktop app releases — Electron, Tauri, and
  native installers, code signing, auto-update, and rollback. Use whenever
  the user asks about shipping a desktop build, Sparkle/Squirrel/electron-
  updater, notarization, MSI/DMG/AppImage, or a desktop release checklist.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Desktop Release

A desktop release is a signed artifact plus an update channel. Users
keep old binaries. Optimize for a staged channel, a working revert, and
a build you can prove matches git.

Mobile stores are `mobile-release`. CI shape is `ci-cd-pipelines`.
Feature exposure is `feature-flags`.

## Workflow

1. Identify stack (Electron / Tauri / native), platforms (macOS / Windows /
   Linux), and channel (dev / beta / stable).
2. Version identity: user-facing version *and* a monotonic build /
   update revision. Same git SHA as the CI artifact.
3. Signing: Developer ID + notarization (macOS), Authenticode (Windows),
   optional Linux packaging keys. Who can mint a stable build.
4. Installers: DMG/zip + Gatekeeper, MSI/EXE + SmartScreen, AppImage/
   deb/rpm. Fresh install *and* upgrade from N-1.
5. Auto-update: feed URL, code-signed update payload, delta vs full,
   what happens if the update fails mid-apply.
6. Privileges: do not require admin for a per-user app; declare if you
   must. Auto-start, helpers, and protocol handlers are review items.
7. Rollout: percentage or channel promotion, crash/session gates,
   kill switch / remote config, how to halt a bad feed.
8. Rollback: previous feed version, or instructions to download N-1.
   Auto-update that cannot go backwards is a finding.

## Output format

```markdown
## Desktop release: <app> <version> (<build>)

**Stack / platforms / channel:** …
**Git SHA / artifact:** …

### Preflight
- [ ] version + build increment
- [ ] signed + notarized / Authenticode
- [ ] upgrade from N-1 smoked
- [ ] update feed points at this build
- [ ] crash/session gate owner

### Rollout
…

### Halt / rollback
…

### Blockers
1. …
```

## Rules

1. Never ship an unsigned stable build "just this once".
2. Do not update by downloading an unsigned executable over HTTP.
3. Pin the updater's certificate / publisher checks; a flipped feed
   host must not be enough to run code.
4. Staged channel or percentage first; do not push 100% Friday 6pm.
5. Renderer / webview apps: treat the shipped Chromium/WebView2
   version as a security input, not wallpaper.
6. Secrets used to sign stay in CI/HSM. A laptop-exported p12 in the
   repo is blocking.
7. Do not invent Apple/Microsoft console labels you cannot see.

## Edge cases

- **Hotfix:** smallest binary delta; skip marketing copy; keep the
  same channel owner watching crashes.
- **First stable:** extra pass on Gatekeeper, SmartScreen reputation
  (new certs look scary), and a clean-machine install.
- **Offline / air-gapped:** document the manual installer path; do
  not pretend the updater works.
- **Auto-update loops:** pin a minimum OS; failing updates must not
  retry so hard they DOS the user's boot.
---
