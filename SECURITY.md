# Security Policy

## Reporting a vulnerability

Please report security issues privately via **GitHub → Security → Report a vulnerability** on this repository rather than opening a public issue. We'll acknowledge reports within 72 hours.

## Skills that contain scripts

Some skills bundle executable code in `scripts/`. Because users may run these on their own machines, every script goes through review before merge. Maintainers check that scripts:

1. Do exactly what the skill's documentation says, and nothing else.
2. Make **no network calls** that aren't explicitly disclosed in the SKILL.md.
3. Contain no obfuscated, encoded, or minified logic — code must be readable as-is.
4. Never read, collect, or transmit credentials, tokens, or personal data.
5. Don't write outside the working directory without clearly documenting it.

PRs whose scripts can't be fully understood on review will be rejected regardless of how useful the skill is. Reviewers may ask you to simplify.

## For users

Review is a strong filter, not a guarantee. Before installing any skill that contains `scripts/`, skim the code yourself — the whole library is plain text, so this takes a minute. The validator (`python scripts/validate.py`) also runs a basic secret/credential scan on every PR, but it is a heuristic, not a substitute for review.

## Scope

This policy covers the contents of this repository only. Issues in Claude, Claude Code, or other agent runtimes should be reported to their respective vendors.
