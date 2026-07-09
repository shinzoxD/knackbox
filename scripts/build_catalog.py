#!/usr/bin/env python3
"""Generate catalog.json and refresh the README catalog table.

Run from the repo root:  python scripts/build_catalog.py

catalog.json is the machine-readable index of every skill, including the
leaderboard fields defined in METRICS.md. It is consumed by the project
website at build time and regenerated automatically by CI on every merge
to main, so never edit it (or the README table) by hand.

Automated fields: tier, context_tokens, reference_tokens, efficiency,
has_scripts, has_benchmarks, updated. Measured fields (trigger_accuracy,
quality_uplift, skill_score, installs_30d) stay null until the benchmark
harness publishes results.
"""

from __future__ import annotations

import datetime as dt
import json
import re
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML is required: pip install pyyaml")

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"
TIERS_PATH = REPO_ROOT / "tiers.yaml"
CATALOG_PATH = REPO_ROOT / "catalog.json"
README_PATH = REPO_ROOT / "README.md"
START_MARK = "<!-- CATALOG:START -->"
END_MARK = "<!-- CATALOG:END -->"
TABLE_DESC_LIMIT = 110
EFFICIENCY_BUDGET_TOKENS = 1500  # see METRICS.md
SCORE_VERSION = "v0"
TIER_BADGE = {"core": "⭐ core", "verified": "✅ verified", "community": "🧪 community"}
TIER_RANK = {"core": 0, "verified": 1, "community": 2}


def split_frontmatter(text: str):
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    return parts[1], parts[2]


def frontmatter(skill_md: Path) -> tuple[dict, str]:
    text = skill_md.read_text(encoding="utf-8", errors="replace")
    fm_str, body = split_frontmatter(text)
    if fm_str is None:
        return {}, text
    data = yaml.safe_load(fm_str)
    return (data if isinstance(data, dict) else {}), body


def load_tiers() -> dict[str, str]:
    """Map skill name -> tier from tiers.yaml (default: community)."""
    if not TIERS_PATH.exists():
        return {}
    data = yaml.safe_load(TIERS_PATH.read_text(encoding="utf-8")) or {}
    mapping: dict[str, str] = {}
    for tier in ("core", "verified"):
        for name in data.get(tier) or []:
            mapping[str(name)] = tier
    return mapping


def estimate_tokens(text: str) -> int:
    """Rough token estimate (~4 chars per token)."""
    return max(1, len(text) // 4)


def last_updated(path: Path) -> str:
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", str(path)],
            capture_output=True, text=True, cwd=REPO_ROOT, check=True,
        ).stdout.strip()
        if out:
            return out
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    return dt.date.fromtimestamp(path.stat().st_mtime).isoformat()


def collect_skills(tiers: dict[str, str]) -> list[dict]:
    skills = []
    if not SKILLS_DIR.is_dir():
        return skills
    for category_dir in sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir()):
        for skill_dir in sorted(p for p in category_dir.iterdir() if p.is_dir()):
            skill_md = skill_dir / "SKILL.md"
            if not skill_md.exists():
                continue
            fm, body = frontmatter(skill_md)
            name = str(fm.get("name", skill_dir.name))
            description = " ".join(str(fm.get("description", "")).split())

            context_tokens = estimate_tokens(body)
            reference_tokens = sum(
                estimate_tokens(f.read_text(encoding="utf-8", errors="replace"))
                for f in skill_dir.glob("references/**/*")
                if f.is_file()
            )
            efficiency = round(
                100 * min(1.0, EFFICIENCY_BUDGET_TOKENS / context_tokens), 1
            )

            skills.append({
                "name": name,
                "description": description,
                "category": category_dir.name,
                "path": skill_dir.relative_to(REPO_ROOT).as_posix(),
                "tier": tiers.get(name, "community"),
                "updated": last_updated(skill_dir),
                "context_tokens": context_tokens,
                "reference_tokens": reference_tokens,
                "has_scripts": (skill_dir / "scripts").is_dir(),
                "has_benchmarks": (skill_dir / "benchmarks" / "prompts.json").is_file(),
                "metrics": {
                    "efficiency": efficiency,
                    "trigger_accuracy": None,
                    "quality_uplift": None,
                    "skill_score": None,
                    "installs_30d": None,
                },
            })
    skills.sort(key=lambda s: (TIER_RANK[s["tier"]], s["category"], s["name"]))
    return skills


def write_catalog(skills: list[dict]) -> None:
    payload = {
        "generated": dt.date.today().isoformat(),
        "score_version": SCORE_VERSION,
        "count": len(skills),
        "skills": skills,
    }
    CATALOG_PATH.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"Wrote {CATALOG_PATH.name} with {len(skills)} skill(s)")


def render_table(skills: list[dict]) -> str:
    if not skills:
        return "_No skills yet — [add the first one](CONTRIBUTING.md)!_"
    lines = [
        "| Tier | Skill | Category | Context (tok) | Description |",
        "|---|---|---|---|---|",
    ]
    for s in skills:
        desc = s["description"]
        if len(desc) > TABLE_DESC_LIMIT:
            desc = desc[:TABLE_DESC_LIMIT - 1].rstrip() + "…"
        desc = desc.replace("|", "\\|")
        lines.append(
            f"| {TIER_BADGE[s['tier']]} | [{s['name']}]({s['path']}) "
            f"| {s['category']} | {s['context_tokens']} | {desc} |"
        )
    return "\n".join(lines)


def update_readme(skills: list[dict]) -> None:
    if not README_PATH.exists():
        return
    text = README_PATH.read_text(encoding="utf-8")
    if START_MARK not in text or END_MARK not in text:
        print("README markers not found — skipping table update")
        return
    table = f"{START_MARK}\n{render_table(skills)}\n{END_MARK}"
    new_text = re.sub(
        re.escape(START_MARK) + r".*?" + re.escape(END_MARK),
        lambda _: table,
        text,
        flags=re.DOTALL,
    )
    if new_text != text:
        README_PATH.write_text(new_text, encoding="utf-8")
        print("Updated README catalog table")
    else:
        print("README catalog table already up to date")


def main() -> int:
    skills = collect_skills(load_tiers())
    write_catalog(skills)
    update_readme(skills)
    return 0


if __name__ == "__main__":
    sys.exit(main())
