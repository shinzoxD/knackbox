#!/usr/bin/env python3
"""Scaffold a Knackbox skill and benchmark suite.

Run from the repository root:
  python scripts/new_skill.py <category> <name> --description "What and when"

The generated TODO prompts intentionally fail validation until replaced with
real cases. This prevents an unreviewed scaffold from being merged as a skill.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
NETWORK_VALUES = ("none", "optional", "required")
FILESYSTEM_VALUES = ("none", "read", "read-write")
EXECUTION_VALUES = ("none", "optional", "required")


def known_categories(root: Path) -> set[str]:
    skills_dir = root / "skills"
    return {path.name for path in skills_dir.iterdir() if path.is_dir()}


def scaffold(
    root: Path,
    category: str,
    name: str,
    description: str,
    network: str = "none",
    filesystem: str = "none",
    execution: str = "none",
) -> Path:
    if category not in known_categories(root):
        raise ValueError(f"unknown category: {category}")
    if not NAME_RE.fullmatch(name) or len(name) > 64:
        raise ValueError("name must be lowercase-with-hyphens and at most 64 characters")
    if len(description.strip()) < 50 or len(description) > 1024:
        raise ValueError("description must be 50-1024 characters and say when to trigger")
    if network not in NETWORK_VALUES:
        raise ValueError(f"invalid network permission: {network}")
    if filesystem not in FILESYSTEM_VALUES:
        raise ValueError(f"invalid filesystem permission: {filesystem}")
    if execution not in EXECUTION_VALUES:
        raise ValueError(f"invalid execution permission: {execution}")

    skill_dir = root / "skills" / category / name
    if skill_dir.exists():
        raise FileExistsError(f"skill already exists: {skill_dir.relative_to(root)}")

    benchmark_dir = skill_dir / "benchmarks"
    benchmark_dir.mkdir(parents=True)
    quoted_description = json.dumps(description.strip(), ensure_ascii=False)
    skill_md = f"""---
name: {name}
description: {quoted_description}
license: Apache-2.0
compatibility: Portable instructions; document any required product, binary, or environment here.
metadata:
  knackbox.network: \"{network}\"
  knackbox.filesystem: \"{filesystem}\"
  knackbox.execution: \"{execution}\"
---

# {name.replace('-', ' ').title()}

TODO: State the outcome this skill produces and the standard it holds.

## Workflow

1. TODO: Add concrete, ordered instructions.
2. TODO: Include validation and failure behavior.

## Output format

TODO: Provide a copy-paste-ready output template.

## Rules

1. TODO: Add specific, testable rules.

## Edge cases

- TODO: Explain how to handle missing or ambiguous input.
"""
    (skill_dir / "SKILL.md").write_text(skill_md, encoding="utf-8", newline="\n")

    suite = {
        "should_trigger": [f"TODO should-trigger prompt {index}" for index in range(1, 6)],
        "should_not_trigger": [f"TODO near-miss prompt {index}" for index in range(1, 6)],
        "tasks": [
            {
                "prompt": f"TODO realistic evaluation task {index}",
                "criteria": ["TODO observable success criterion"],
            }
            for index in range(1, 4)
        ],
    }
    (benchmark_dir / "prompts.json").write_text(
        json.dumps(suite, indent=2) + "\n", encoding="utf-8", newline="\n"
    )
    return skill_dir


def main() -> int:
    parser = argparse.ArgumentParser(description="Scaffold a Knackbox skill")
    parser.add_argument("category", choices=sorted(known_categories(REPO_ROOT)))
    parser.add_argument("name")
    parser.add_argument("--description", required=True)
    parser.add_argument("--network", choices=NETWORK_VALUES, default="none")
    parser.add_argument("--filesystem", choices=FILESYSTEM_VALUES, default="none")
    parser.add_argument("--execution", choices=EXECUTION_VALUES, default="none")
    args = parser.parse_args()

    path = scaffold(
        REPO_ROOT,
        args.category,
        args.name,
        args.description,
        args.network,
        args.filesystem,
        args.execution,
    )
    print(f"Created {path.relative_to(REPO_ROOT)}")
    print("Replace every TODO, then run: python scripts/validate.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
