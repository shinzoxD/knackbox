---
name: cli-design
description: Design developer CLIs with clear UX, exit codes, flags, and help
  text. Use whenever the user builds a command-line tool, debates flags vs
  subcommands, stdout vs stderr, or asks how to structure a CLI for engineers.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# CLI Design

Great CLIs are boring: predictable flags, scriptable output, useful errors, and
stable exit codes.

## Principles

1. Subcommands for verbs; flags for options.
2. stdout for data; stderr for logs/progress.
3. `--help` accurate; examples in help.
4. Exit 0 success; non-zero for classes of failure.
5. `--json` or stable machine output when automation matters.
6. Sensible defaults; prompt only when interactive and needed.
7. Never break scripts with decorative Unicode unless optional.

## Output format

```markdown
## CLI: <name>
### Commands
### Global flags
### Output contract
### Exit codes
### Examples
```

## Rules

1. Prefer composition over god flags.
2. Document config file precedence.
3. Color auto-detect; `--no-color`.
4. Version with `--version`.
5. Destructive commands need `--force` or confirm.

## Edge cases

- **Pipes:** behave well in CI.
- **Windows paths:** accept both separators when reasonable.
- **Plugins:** discovery and naming.
