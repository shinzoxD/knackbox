#!/usr/bin/env python3
"""Run manual skill benchmarks and write measurements/*.json.

This harness is intentionally not used by CI because it spends API calls.
Dry-run mode prints the plan and exits before importing the Anthropic SDK.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import random
import subprocess
import sys
from collections import Counter
from pathlib import Path

from benchmark_logic import trigger_metrics, win_rate

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = REPO_ROOT / "catalog.json"
SKILLS_DIR = REPO_ROOT / "skills"
MEASUREMENTS_DIR = REPO_ROOT / "measurements"
DEFAULT_MODEL = "claude-sonnet-4-6"


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_catalog() -> list[dict]:
    data = load_json(CATALOG_PATH)
    return list(data.get("skills") or [])


def skill_from_arg(value: str, catalog: list[dict]) -> dict:
    raw = Path(value)
    path = raw if raw.is_absolute() else REPO_ROOT / raw
    path = path.resolve()
    for skill in catalog:
        skill_path = (REPO_ROOT / skill["path"]).resolve()
        if path == skill_path or value == skill["name"]:
            return skill
    raise SystemExit(f"unknown skill: {value}")


def benchmark_path(skill: dict) -> Path:
    return REPO_ROOT / skill["path"] / "benchmarks" / "prompts.json"


def load_suite(skill: dict) -> dict:
    path = benchmark_path(skill)
    if not path.is_file():
        raise SystemExit(f"{skill['name']} has no benchmarks/prompts.json")
    return load_json(path)


def selected_skills(args: argparse.Namespace, catalog: list[dict]) -> list[dict]:
    if args.all:
        return [skill for skill in catalog if benchmark_path(skill).is_file()]
    return [skill_from_arg(args.skill, catalog)]


def call_count_for_suite(suite: dict, runs: int) -> int:
    trigger_calls = (len(suite.get("should_trigger") or []) + len(suite.get("should_not_trigger") or [])) * runs
    uplift_calls = len(suite.get("tasks") or []) * runs * 3
    return trigger_calls + uplift_calls


def print_plan(skills: list[dict], suites: dict[str, dict], runs: int, model: str) -> int:
    total = 0
    print(f"Model: {model}")
    print(f"Runs per prompt/task: {runs}")
    for skill in skills:
        suite = suites[skill["name"]]
        calls = call_count_for_suite(suite, runs)
        total += calls
        print()
        print(f"{skill['name']} ({skill['path']})")
        print(f"  should_trigger: {len(suite.get('should_trigger') or [])}")
        for index, prompt in enumerate(suite.get("should_trigger") or [], start=1):
            print(f"    [{index}] {prompt}")
        print(f"  should_not_trigger: {len(suite.get('should_not_trigger') or [])}")
        for index, prompt in enumerate(suite.get("should_not_trigger") or [], start=1):
            print(f"    [{index}] {prompt}")
        print(f"  tasks: {len(suite.get('tasks') or [])}")
        for index, task in enumerate(suite.get("tasks") or [], start=1):
            print(f"    [{index}] {task['prompt']}")
            for criterion in task.get("criteria") or []:
                print(f"        - {criterion}")
        print(f"  estimated API calls: {calls}")
    print()
    print(f"Estimated total API calls: {total}")
    return total


def confirmation_required(total_calls: int, yes: bool) -> None:
    print()
    print(f"This run will make about {total_calls} Anthropic API call(s).")
    if yes:
        return
    answer = input("Continue? [y/N] ").strip().lower()
    if answer not in {"y", "yes"}:
        raise SystemExit("benchmark run cancelled")


def messages_client(model: str):
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("ANTHROPIC_API_KEY is required unless --dry-run is used")
    try:
        from anthropic import Anthropic
    except ImportError as exc:
        raise SystemExit("anthropic is required: pip install anthropic") from exc
    return Anthropic(), model


def call_model(client, model: str, system: str, prompt: str, max_tokens: int = 800) -> str:
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        temperature=0,
        system=system,
        messages=[{"role": "user", "content": prompt}],
    )
    parts: list[str] = []
    for block in response.content:
        text = getattr(block, "text", None)
        if text:
            parts.append(text)
    return "\n".join(parts).strip()


def normalize_choice(value: str, known_names: set[str]) -> str:
    if not value.strip():
        raise ValueError("model returned an empty trigger choice")
    normalized = value.strip().lower().splitlines()[0]
    normalized = normalized.strip(" .`'\"")
    if normalized == "none" or normalized in known_names:
        return normalized
    raise ValueError(f"invalid trigger choice from model: {value!r}")


def trigger_system_prompt(catalog: list[dict]) -> str:
    descriptions = "\n".join(
        f"- {skill['name']}: {skill['description']}" for skill in sorted(catalog, key=lambda item: item["name"])
    )
    return (
        "You choose which AI agent skill to consult for a user request.\n"
        "Reply with exactly one skill name from the list, or none.\n\n"
        f"{descriptions}"
    )


def majority_target(choices: list[str], target: str) -> bool:
    return Counter(choices)[target] > len(choices) / 2


def evaluate_trigger(client, model: str, catalog: list[dict], skill: dict, suite: dict, runs: int) -> dict:
    known_names = {item["name"] for item in catalog}
    system = trigger_system_prompt(catalog)
    positives: list[bool] = []
    negatives: list[bool] = []

    for prompt in suite.get("should_trigger") or []:
        choices = [
            normalize_choice(call_model(client, model, system, prompt, max_tokens=32), known_names)
            for _ in range(runs)
        ]
        positives.append(majority_target(choices, skill["name"]))

    for prompt in suite.get("should_not_trigger") or []:
        choices = [
            normalize_choice(call_model(client, model, system, prompt, max_tokens=32), known_names)
            for _ in range(runs)
        ]
        negatives.append(majority_target(choices, skill["name"]))

    return trigger_metrics(positives, negatives)


def skill_body(skill: dict) -> str:
    text = (REPO_ROOT / skill["path"] / "SKILL.md").read_text(encoding="utf-8", errors="replace")
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) == 3:
            return parts[2].strip()
    return text.strip()


def judge_system_prompt() -> str:
    return (
        "You are a strict benchmark judge. Given a task, grading criteria, and two outputs, "
        "reply with exactly first, second, or tie."
    )


def judge_prompt(task: dict, first: str, second: str) -> str:
    criteria = "\n".join(f"- {item}" for item in task.get("criteria") or [])
    return (
        f"Task:\n{task['prompt']}\n\n"
        f"Criteria:\n{criteria}\n\n"
        f"First output:\n{first}\n\n"
        f"Second output:\n{second}\n\n"
        "Which output better satisfies the criteria? Reply exactly: first, second, or tie."
    )


def normalize_judgment(value: str) -> str:
    if not value.strip():
        raise ValueError("model returned an empty judge response")
    normalized = value.strip().lower().splitlines()[0]
    normalized = normalized.strip(" .`'\"")
    if normalized in {"first", "second", "tie"}:
        return normalized
    raise ValueError(f"invalid judge response from model: {value!r}")


def evaluate_uplift(client, model: str, skill: dict, suite: dict, runs: int) -> dict:
    task_summaries: list[dict] = []
    all_results: list[str] = []
    system_with_skill = skill_body(skill)
    baseline_system = "Answer the user request directly and concisely."
    rng = random.Random()

    for index, task in enumerate(suite.get("tasks") or []):
        task_results: list[str] = []
        for _ in range(runs):
            with_skill = call_model(client, model, system_with_skill, task["prompt"], max_tokens=1200)
            baseline = call_model(client, model, baseline_system, task["prompt"], max_tokens=1200)
            first_is_skill = rng.choice([True, False])
            first, second = (with_skill, baseline) if first_is_skill else (baseline, with_skill)
            judgment = normalize_judgment(
                call_model(client, model, judge_system_prompt(), judge_prompt(task, first, second), max_tokens=16)
            )
            if judgment == "tie":
                result = "tie"
            elif (judgment == "first" and first_is_skill) or (judgment == "second" and not first_is_skill):
                result = "skill"
            else:
                result = "baseline"
            task_results.append(result)
            all_results.append(result)
        task_summaries.append({
            "index": index,
            "prompt": task["prompt"],
            "criteria": task.get("criteria") or [],
            "win_rate": win_rate(task_results),
            "results": task_results,
        })

    return {"win_rate": win_rate(all_results), "tasks": task_summaries}


def skill_commit(skill: dict) -> str:
    try:
        out = subprocess.run(
            ["git", "rev-parse", f"HEAD:{skill['path']}"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        ).stdout.strip()
        if out:
            return out
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    return "unknown"


def write_measurement(skill: dict, model: str, runs: int, trigger: dict, uplift: dict) -> Path:
    MEASUREMENTS_DIR.mkdir(exist_ok=True)
    readme = MEASUREMENTS_DIR / "README.md"
    if not readme.exists():
        readme.write_text(
            "# Measurements\n\n"
            "Files in this directory are generated by `python scripts/run_benchmarks.py`.\n"
            "They record model, date, skill tree hash, trigger metrics, and quality uplift.\n",
            encoding="utf-8",
            newline="\n",
        )
    payload = {
        "measured_at": dt.datetime.now(dt.UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "model": model,
        "skill_commit": skill_commit(skill),
        "runs": runs,
        "trigger": trigger,
        "uplift": uplift,
    }
    path = MEASUREMENTS_DIR / f"{skill['name']}.json"
    path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="Run Knackbox benchmark suites")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--skill", help="skill path or name, e.g. skills/coding/commit-messages")
    group.add_argument("--all", action="store_true", help="run every skill with benchmarks/prompts.json")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--runs", type=int, default=3)
    parser.add_argument("--yes", action="store_true", help="skip interactive spending confirmation")
    parser.add_argument("--dry-run", action="store_true", help="print the plan without API calls")
    args = parser.parse_args()

    if args.runs < 1:
        raise SystemExit("--runs must be >= 1")

    catalog = load_catalog()
    skills = selected_skills(args, catalog)
    suites = {skill["name"]: load_suite(skill) for skill in skills}
    total_calls = print_plan(skills, suites, args.runs, args.model)
    if args.dry_run:
        print("Dry run: no API calls made.")
        return 0

    confirmation_required(total_calls, args.yes)
    client, model = messages_client(args.model)
    for skill in skills:
        print(f"\nRunning {skill['name']}...")
        suite = suites[skill["name"]]
        trigger = evaluate_trigger(client, model, catalog, skill, suite, args.runs)
        uplift = evaluate_uplift(client, model, skill, suite, args.runs)
        path = write_measurement(skill, model, args.runs, trigger, uplift)
        print(f"Wrote {path.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
