#!/usr/bin/env python3
"""Print a quality coverage report for the Knackbox catalog (no API calls)."""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    catalog = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
    skills = catalog["skills"]
    n = len(skills)
    tiers = Counter(s.get("tier", "community") for s in skills)
    benches = sum(1 for s in skills if s.get("has_benchmarks"))
    digests = sum(1 for s in skills if s.get("content_digest"))
    instr = sum(1 for s in skills if s.get("security_profile") == "instructions-only")
    scripts = sum(1 for s in skills if s.get("security_profile") == "includes-scripts")
    measured = sum(
        1
        for s in skills
        if (s.get("metrics") or {}).get("skill_score") is not None
    )
    cats = Counter(s.get("category", "?") for s in skills)
    avg_ctx = sum(s.get("context_tokens") or 0 for s in skills) / n if n else 0

    print("Knackbox quality report")
    print("=" * 40)
    print(f"skills:              {n}")
    print(f"benchmark suites:    {benches}/{n} ({100 * benches / n:.0f}%)")
    print(f"content digests:     {digests}/{n}")
    print(f"instructions-only:   {instr}")
    print(f"includes-scripts:    {scripts}")
    print(f"measured skill_score:{measured}/{n}")
    print(f"avg context tokens:  {avg_ctx:.0f}")
    print("tiers:")
    for tier in ("core", "verified", "community"):
        print(f"  {tier:12} {tiers.get(tier, 0)}")
    print("categories:")
    for cat, count in sorted(cats.items()):
        print(f"  {cat:14} {count}")
    print()
    print("Differentiators vs popularity boards:")
    print("  - 100% suite coverage required by CI")
    print("  - scores stay null until EVALUATION.md protocol runs")
    print("  - digests + permissions published for every skill")
    if measured == 0:
        print()
        print("Next gap to close: publish measurements for core skills")
        print("  python scripts/run_benchmarks.py --skill commit-messages --dry-run")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
