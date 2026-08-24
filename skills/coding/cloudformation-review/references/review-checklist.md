# CloudFormation review checklist

Load only the sections relevant to the template and proposed deployment.

## Lifecycle and data

- Pair stateful-resource protection with the correct control:
  `DeletionPolicy` for removal/stack deletion and `UpdateReplacePolicy` for
  replacement. Prefer snapshots where the resource type supports them.
- Flag database, volume, bucket, queue, identity, and encryption-key
  replacements. Check retained resources for ownership and cleanup plans.
- Check stack termination protection, stack policies, rollback alarms, and
  whether failed updates can leave external side effects.
- Treat condition changes and renamed logical IDs as possible delete/create
  operations until the change set proves otherwise.

## Identity, network, and secrets

- Review IAM actions, resources, conditions, trust policies, `iam:PassRole`,
  permissions boundaries, and any requested `CAPABILITY_NAMED_IAM`.
- Flag public admin ports, wildcard resource policies, public storage,
  unrestricted egress where material, and missing encryption for sensitive data.
- Prefer Secrets Manager or SSM dynamic references. `NoEcho` masks parameter
  display but does not make hard-coded values or template metadata safe.
- Check outputs, user data, logs, custom-resource responses, and metadata for
  accidental secret disclosure.

## Dependency and execution behavior

- Follow `Ref`, `Fn::GetAtt`, `Fn::Sub`, exports, and nested-stack outputs before
  adding `DependsOn`; explicit ordering does not create application readiness.
- Treat macros and custom resources as executable supply-chain boundaries.
  Review permissions, idempotency, timeout, retries, and delete handling.
- Require a stable custom-resource `PhysicalResourceId` for in-place updates;
  changing it causes replacement and a delete request for the old resource.
- Check Lambda/SAM packaging, immutable artifact versions, API deployment
  triggers, and cross-stack export compatibility.

## Deployment evidence

1. Parse and lint the template; use `cfn-lint` or `sam validate` when applicable.
2. Use `validate-template` for structural validation only, never as a safety
   verdict.
3. Create a change set with the exact parameters, capabilities, role, and tags.
4. Inspect every replacement/removal and the evaluated IAM changes.
5. Execute only with explicit authorization and a confirmed account, Region,
   and stack. Watch events and alarms, then verify service invariants.

## Special cases

- **No change set:** review static risks, but withhold an execution-safe verdict.
- **Nested stacks:** inspect nested changes, parameter propagation, and exports;
  a quiet root summary can hide destructive child-stack changes.
- **StackSets:** check organizational-unit targeting, concurrency, failure
  tolerance, delegated administration, and account/Region blast radius.
- **Import/refactor:** preserve logical identity and verify import identifiers;
  do not mix broad refactors with unrelated production changes.
- **Rollback failed:** stop repeated updates and diagnose the blocking resource
  before proposing continue-update-rollback or resource skipping.
