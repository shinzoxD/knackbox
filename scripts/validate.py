#!/usr/bin/env python3
"""Validate every skill in the repository.

Run from the repo root:  python scripts/validate.py

Checks, per skill folder (skills/<category>/<skill-name>/):
  - SKILL.md exists and has YAML frontmatter with `name` and `description`
  - name: lowercase-with-hyphens, <= 64 chars, equals the folder name
  - description: non-empty, <= 1024 chars (warns if suspiciously short)
  - category folder: lowercase-with-hyphens
  - SKILL.md body <= 500 lines
  - relative markdown links resolve to real files
  - basic secret/credential scan across all text files in the skill

Exits 1 if any errors were found. Warnings never fail the build.
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML is required: pip install pyyaml")

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"
TIERS_PATH = REPO_ROOT / "tiers.yaml"
MEASUREMENTS_DIR = REPO_ROOT / "measurements"
PACKS_PATH = REPO_ROOT / "packs.json"
JOBS_PATH = REPO_ROOT / "jobs.json"
MIN_TRIGGER_PROMPTS = 5
EVALUATION_PROTOCOL = "knackbox-eval-v1"

NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
MAX_NAME_LEN = 64
MAX_DESC_LEN = 1024
MIN_DESC_WARN = 50
MAX_BODY_LINES = 500
REQUIRED_LICENSE = "Apache-2.0"
PERMISSION_FIELDS = {
    "knackbox.network": {"none", "optional", "required"},
    "knackbox.filesystem": {"none", "read", "read-write"},
    "knackbox.execution": {"none", "optional", "required"},
}

LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
SKIP_LINK_PREFIXES = ("http://", "https://", "mailto:", "#", "data:")

TEXT_EXTENSIONS = {".md", ".py", ".sh", ".js", ".ts", ".json",
                   ".yaml", ".yml", ".txt", ".toml", ".css", ".html"}

SECRET_PATTERNS = [
    ("AWS access key", re.compile(r"AKIA[0-9A-Z]{16}")),
    ("GitHub token", re.compile(r"gh[pousr]_[A-Za-z0-9]{36,}")),
    ("Anthropic API key", re.compile(r"sk-ant-[A-Za-z0-9-]{20,}")),
    ("Slack token", re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}")),
    ("Private key block", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
]

errors: list[str] = []
warnings: list[str] = []


def err(path: Path, msg: str) -> None:
    errors.append(f"ERROR   {path.relative_to(REPO_ROOT)}: {msg}")


def warn(path: Path, msg: str) -> None:
    warnings.append(f"WARNING {path.relative_to(REPO_ROOT)}: {msg}")


def skill_digest(skill_dir: Path) -> str:
    """Return the package digest used by catalog and measurement files."""
    digest = hashlib.sha256()
    for path in sorted(item for item in skill_dir.rglob("*") if item.is_file()):
        relative = path.relative_to(skill_dir).as_posix().encode("utf-8")
        digest.update(relative)
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return f"sha256:{digest.hexdigest()}"


def split_frontmatter(text: str) -> tuple[str | None, str]:
    """Return (frontmatter_str, body) or (None, full_text) if missing."""
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    return parts[1], parts[2]


def check_links(md_file: Path) -> None:
    text = md_file.read_text(encoding="utf-8", errors="replace")
    for target in LINK_RE.findall(text):
        if target.startswith(SKIP_LINK_PREFIXES):
            continue
        clean = target.split("#", 1)[0]
        if not clean:
            continue
        resolved = (md_file.parent / clean).resolve()
        if not resolved.exists():
            err(md_file, f"broken relative link: {target}")


def scan_secrets(skill_dir: Path) -> None:
    for f in skill_dir.rglob("*"):
        if not f.is_file() or f.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        text = f.read_text(encoding="utf-8", errors="replace")
        for label, pattern in SECRET_PATTERNS:
            if pattern.search(text):
                err(f, f"possible {label} committed — remove it and rotate the credential")


def validate_skill(skill_dir: Path, category: str) -> None:
    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        err(skill_dir, "missing SKILL.md")
        return

    text = skill_md.read_text(encoding="utf-8", errors="replace")
    fm_str, body = split_frontmatter(text)
    if fm_str is None:
        err(skill_md, "missing YAML frontmatter (file must start with ---)")
        return

    try:
        fm = yaml.safe_load(fm_str) or {}
    except yaml.YAMLError as exc:
        err(skill_md, f"frontmatter is not valid YAML: {exc}")
        return
    if not isinstance(fm, dict):
        err(skill_md, "frontmatter must be a YAML mapping of key: value pairs")
        return

    name = fm.get("name")
    desc = fm.get("description")

    if not name:
        err(skill_md, "frontmatter is missing required field: name")
    else:
        name = str(name)
        if len(name) > MAX_NAME_LEN:
            err(skill_md, f"name exceeds {MAX_NAME_LEN} characters")
        if not NAME_RE.match(name):
            err(skill_md, "name must be lowercase-with-hyphens (a-z, 0-9, -)")
        if name != skill_dir.name:
            err(skill_md, f"name '{name}' does not match folder name '{skill_dir.name}'")

    if not desc:
        err(skill_md, "frontmatter is missing required field: description")
    else:
        desc = " ".join(str(desc).split())
        if len(desc) > MAX_DESC_LEN:
            err(skill_md, f"description exceeds {MAX_DESC_LEN} characters ({len(desc)})")
        elif len(desc) < MIN_DESC_WARN:
            warn(skill_md, "description is very short — say when to trigger, "
                           "not just what the skill does")

    license_name = fm.get("license")
    if license_name != REQUIRED_LICENSE:
        err(skill_md, f"license must be '{REQUIRED_LICENSE}'")

    compatibility = fm.get("compatibility")
    if compatibility is not None:
        if not isinstance(compatibility, str) or not compatibility.strip():
            err(skill_md, "compatibility must be a non-empty string when provided")
        elif len(compatibility) > 500:
            err(skill_md, "compatibility exceeds 500 characters")

    metadata = fm.get("metadata")
    if not isinstance(metadata, dict):
        err(skill_md, "metadata must declare Knackbox permission fields")
        metadata = {}
    for field, allowed in PERMISSION_FIELDS.items():
        value = metadata.get(field)
        if value not in allowed:
            choices = ", ".join(sorted(allowed))
            err(skill_md, f"metadata.{field} must be one of: {choices}")

    has_scripts = (skill_dir / "scripts").is_dir()
    if has_scripts and metadata.get("knackbox.execution") == "none":
        err(skill_md, "skills with scripts cannot declare knackbox.execution: none")

    body_lines = body.strip().count("\n") + 1
    if body_lines > MAX_BODY_LINES:
        err(skill_md, f"body is {body_lines} lines (max {MAX_BODY_LINES}); "
                      "move detail into references/")

    if not NAME_RE.match(category):
        err(skill_dir, f"category folder '{category}' must be lowercase-with-hyphens")

    for md in skill_dir.rglob("*.md"):
        check_links(md)
    scan_secrets(skill_dir)
    check_benchmarks(skill_dir)


def check_benchmarks(skill_dir: Path) -> None:
    """Validate benchmarks/prompts.json if the skill ships one (see METRICS.md)."""
    bench = skill_dir / "benchmarks" / "prompts.json"
    if not bench.exists():
        return
    try:
        data = json.loads(bench.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        err(bench, f"invalid JSON: {exc}")
        return
    for key in ("should_trigger", "should_not_trigger"):
        prompts = data.get(key)
        if not isinstance(prompts, list) or not all(isinstance(p, str) for p in prompts):
            err(bench, f"'{key}' must be a list of strings")
        elif len(prompts) < MIN_TRIGGER_PROMPTS:
            warn(bench, f"'{key}' has {len(prompts)} prompt(s); "
                        f"{MIN_TRIGGER_PROMPTS}+ needed for a meaningful measurement")
        elif any("TODO" in prompt.upper() for prompt in prompts):
            err(bench, f"'{key}' still contains TODO placeholder prompts")
    tasks = data.get("tasks", [])
    if not isinstance(tasks, list):
        err(bench, "'tasks' must be a list")
    else:
        for i, task in enumerate(tasks):
            if not isinstance(task, dict) or not task.get("prompt"):
                err(bench, f"tasks[{i}] must be an object with a 'prompt'")
            elif not task.get("criteria"):
                warn(bench, f"tasks[{i}] has no 'criteria' — graders need them")
            elif "TODO" in str(task.get("prompt", "")).upper() or any(
                "TODO" in str(criterion).upper() for criterion in task.get("criteria") or []
            ):
                err(bench, f"tasks[{i}] still contains TODO placeholders")


def check_tiers(known_skills: dict[str, Path]) -> None:
    """tiers.yaml may only reference real skills, each in at most one tier."""
    if not TIERS_PATH.exists():
        return
    try:
        data = yaml.safe_load(TIERS_PATH.read_text(encoding="utf-8")) or {}
    except yaml.YAMLError as exc:
        err(TIERS_PATH, f"not valid YAML: {exc}")
        return
    if not isinstance(data, dict):
        err(TIERS_PATH, "must be a mapping with 'core' and/or 'verified' lists")
        return
    for key in data:
        if key not in ("core", "verified"):
            err(TIERS_PATH, f"unknown tier '{key}' (allowed: core, verified)")
    seen: dict[str, str] = {}
    for tier in ("core", "verified"):
        for name in data.get(tier) or []:
            name = str(name)
            if name not in known_skills:
                err(TIERS_PATH, f"'{name}' in tier '{tier}' is not an existing skill")
            elif not (known_skills[name] / "benchmarks" / "prompts.json").exists():
                warn(TIERS_PATH, f"'{name}' is tier '{tier}' but ships no "
                                 "benchmarks/prompts.json (required by METRICS.md)")
            if name in seen:
                err(TIERS_PATH, f"'{name}' appears in both '{seen[name]}' and '{tier}'")
            seen[name] = tier


def check_measurements(known_skills: dict[str, Path]) -> None:
    """Measurement files are generated, but must point at real skills."""
    if not MEASUREMENTS_DIR.is_dir():
        return
    for path in sorted(MEASUREMENTS_DIR.glob("*.json")):
        if path.stem not in known_skills:
            err(path, f"measurement references unknown skill '{path.stem}'")
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            err(path, f"invalid JSON: {exc}")
            continue
        if not isinstance(data, dict):
            err(path, "measurement file must contain a JSON object")
            continue
        for key in (
            "protocol_version", "measured_at", "model", "skill_commit",
            "content_digest", "runs", "trigger", "uplift"
        ):
            if key not in data:
                err(path, f"measurement is missing required field: {key}")
        if data.get("protocol_version") != EVALUATION_PROTOCOL:
            err(path, f"protocol_version must be '{EVALUATION_PROTOCOL}'")
        if not isinstance(data.get("runs"), int) or data.get("runs", 0) < 3:
            err(path, "published measurements require at least 3 runs")
        skill_dir = known_skills.get(path.stem)
        if skill_dir and data.get("content_digest") != skill_digest(skill_dir):
            err(path, "content_digest is stale; rerun the benchmark for the current skill package")


def check_packs(known_skills: dict[str, Path]) -> None:
    """Validate curated pack names and references."""
    if not PACKS_PATH.is_file():
        err(PACKS_PATH, "missing starter-pack catalog")
        return
    try:
        data = json.loads(PACKS_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        err(PACKS_PATH, f"invalid JSON: {exc}")
        return
    packs = data.get("packs") if isinstance(data, dict) else None
    if data.get("version") != 1 or not isinstance(packs, list):
        err(PACKS_PATH, "must contain version 1 and a packs list")
        return
    seen: set[str] = set()
    for index, pack in enumerate(packs):
        if not isinstance(pack, dict):
            err(PACKS_PATH, f"packs[{index}] must be an object")
            continue
        slug = pack.get("slug")
        if not isinstance(slug, str) or not NAME_RE.fullmatch(slug):
            err(PACKS_PATH, f"packs[{index}].slug must be lowercase-with-hyphens")
        elif slug in seen:
            err(PACKS_PATH, f"duplicate pack slug: {slug}")
        else:
            seen.add(slug)
        if not pack.get("name") or not pack.get("description"):
            err(PACKS_PATH, f"packs[{index}] requires name and description")
        skill_names = pack.get("skills")
        if not isinstance(skill_names, list) or len(skill_names) < 2:
            err(PACKS_PATH, f"packs[{index}].skills must list at least two skills")
            continue
        if len(skill_names) != len(set(skill_names)):
            err(PACKS_PATH, f"packs[{index}] contains duplicate skills")
        for name in skill_names:
            if name not in known_skills:
                err(PACKS_PATH, f"pack '{slug}' references unknown skill '{name}'")


def check_jobs(known_skills: dict[str, Path]) -> None:
    """Validate job guides used by `knackbox for` and the Start page."""
    if not JOBS_PATH.is_file():
        err(JOBS_PATH, "missing job-guide catalog")
        return
    try:
        data = json.loads(JOBS_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        err(JOBS_PATH, f"invalid JSON: {exc}")
        return
    jobs = data.get("jobs") if isinstance(data, dict) else None
    if data.get("version") != 1 or not isinstance(jobs, list) or not jobs:
        err(JOBS_PATH, "must contain version 1 and a non-empty jobs list")
        return
    seen: set[str] = set()
    for index, job in enumerate(jobs):
        if not isinstance(job, dict):
            err(JOBS_PATH, f"jobs[{index}] must be an object")
            continue
        slug = job.get("slug")
        if not isinstance(slug, str) or not NAME_RE.fullmatch(slug):
            err(JOBS_PATH, f"jobs[{index}].slug must be lowercase-with-hyphens")
        elif slug in seen:
            err(JOBS_PATH, f"duplicate job slug: {slug}")
        else:
            seen.add(slug)
        if not job.get("title") or not job.get("blurb"):
            err(JOBS_PATH, f"jobs[{index}] requires title and blurb")
        keywords = job.get("keywords")
        if not isinstance(keywords, list) or len(keywords) < 2:
            err(JOBS_PATH, f"jobs[{index}].keywords must list at least two phrases")
        skill_names = job.get("skills")
        if not isinstance(skill_names, list) or len(skill_names) < 2:
            err(JOBS_PATH, f"jobs[{index}].skills must list at least two skills")
            continue
        if len(skill_names) != len(set(skill_names)):
            err(JOBS_PATH, f"jobs[{index}] contains duplicate skills")
        for name in skill_names:
            if name not in known_skills:
                err(JOBS_PATH, f"job '{slug}' references unknown skill '{name}'")


def main() -> int:
    if not SKILLS_DIR.is_dir():
        print(f"No skills/ directory found at {SKILLS_DIR}")
        return 1

    skill_count = 0
    known_skills: dict[str, Path] = {}
    for category_dir in sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir()):
        entries = sorted(p for p in category_dir.iterdir())
        if not entries:
            warn(category_dir, "empty category folder")
        for entry in entries:
            if entry.is_dir():
                skill_count += 1
                known_skills[entry.name] = entry
                validate_skill(entry, category_dir.name)
            else:
                err(entry, "files must live inside a skill folder "
                           "(skills/<category>/<skill-name>/)")

    # Stray files directly under skills/
    for entry in SKILLS_DIR.iterdir():
        if entry.is_file():
            err(entry, "files are not allowed directly under skills/")

    check_tiers(known_skills)
    check_measurements(known_skills)
    check_packs(known_skills)
    check_jobs(known_skills)

    for line in errors + warnings:
        print(line)
    print(f"\nChecked {skill_count} skill(s): "
          f"{len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
