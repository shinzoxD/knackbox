# Pulumi review checklist

Load only the sections relevant to the program and preview.

## Identity and refactors

- Pulumi identity includes stack, project, type, name, and parent path. Renaming,
  reparenting, or changing a type can replace a resource.
- Require `aliases` for intentional identity-preserving refactors and confirm in
  previews for every affected stack. Matching cloud names are not sufficient.
- Check imports, explicit providers, provider inheritance, component parents,
  and default-provider changes for replacement cascades.
- Treat edits to loops, keys, generated names, or component child names as
  identity changes until the preview proves otherwise.

## Lifecycle and availability

- Review `protect`, `retainOnDelete`, `deleteBeforeReplace`, `replaceOnChanges`,
  `ignoreChanges`, `customTimeouts`, `dependsOn`, and import options by intent.
- Default to create-before-delete where supported. Flag `deleteBeforeReplace`
  when it creates downtime or removes the rollback target.
- `protect` blocks deletion; it is not a backup. `retainOnDelete` can orphan the
  cloud resource from Pulumi ownership and needs a handoff plan.
- Check quotas, unique names, dependencies, and traffic cutover before assuming
  create-before-delete will succeed.

## Inputs, outputs, and secrets

- Preserve `Input`/`Output` dependency tracking; avoid blocking, stringifying,
  or escaping the graph with ad hoc promises/futures.
- Use secret configuration and `pulumi.secret` for sensitive inputs. Use
  `additionalSecretOutputs` where provider-generated sensitive values are not
  already marked secret.
- Trace secrets through exports, StackReferences, logs, exceptions, command
  resources, CI output, and state export. Propagation does not protect logging.
- Never request `pulumi stack export --show-secrets` without explicit need,
  authorization, and sensitive-output handling.

## State and execution

- Confirm backend and stack before any command. Shared stacks need locking,
  access control, history, backups, and a secrets provider.
- Pulumi programs execute during preview. Flag top-level cloud API calls, file
  writes, network mutations, nondeterminism, and untracked side effects.
- Decide explicitly whether to refresh. Normal preview compares the program with
  recorded state; out-of-band drift may require a reviewed refresh first.
- Avoid manual state editing. Prefer aliases, imports, refresh, and targeted
  state commands with backups and expert review when recovery demands them.

## Preview and update evidence

1. Record CLI, runtime, dependency, and provider plugin versions.
2. Confirm identity with `pulumi whoami -v`, project, and selected stack.
3. Run tests/type checks and policy packs before infrastructure commands.
4. Produce `pulumi preview --diff`; use `--refresh` only after deciding how drift
   should be reconciled.
5. Review all replacements, deletes, and unknowns; re-preview after fixes.
6. Run `pulumi up` only with explicit authorization, then verify cloud and
   service invariants. Never mutate state or infrastructure on implied consent.

## Special cases

- **No preview:** provide a static review, but withhold an update-safe verdict.
- **Component rename:** verify parent and child aliases and the resulting preview.
- **Import/adoption:** confirm provider, parent, name, and import ID, then require
  a no-op or expected preview after import.
- **Automation API:** add concurrency, cancellation, event logging, credential
  isolation, and explicit stack selection checks.
- **Dynamic providers/command resources:** review serialized code, secrets,
  idempotency, side effects, timeout, and delete behavior.
- **Partial failure:** preserve logs and checkpoints, diagnose before retrying,
  and prefer reviewed roll-forward over speculative state edits.
