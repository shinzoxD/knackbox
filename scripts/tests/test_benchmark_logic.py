from __future__ import annotations

import sys
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS_DIR))

from benchmark_logic import skill_score, trigger_metrics, win_rate
from build_catalog import apply_measurement
from run_benchmarks import (
    majority_target,
    normalize_choice,
    normalize_judgment,
    print_plan,
)


class BenchmarkLogicTests(unittest.TestCase):
    def test_trigger_metrics_uses_precision_recall_f1(self) -> None:
        metrics = trigger_metrics(
            positive_matches=[True, True, False],
            negative_matches=[True, False],
        )

        self.assertEqual(metrics, {"precision": 66.7, "recall": 66.7, "f1": 66.7})

    def test_trigger_f1_is_calculated_before_rounding(self) -> None:
        metrics = trigger_metrics(
            positive_matches=[True, False, False, False, False, False, False, False, False],
            negative_matches=[True, True],
        )

        self.assertEqual(metrics, {"precision": 33.3, "recall": 11.1, "f1": 16.7})

    def test_majority_target_rejects_ties(self) -> None:
        self.assertFalse(majority_target(["target", "other"], "target"))
        self.assertTrue(majority_target(["target", "other", "target"], "target"))

    def test_invalid_model_choices_fail_instead_of_affecting_scores(self) -> None:
        with self.assertRaises(ValueError):
            normalize_choice("target because it fits", {"target"})
        with self.assertRaises(ValueError):
            normalize_choice("", {"target"})
        with self.assertRaises(ValueError):
            normalize_judgment("probably first")
        with self.assertRaises(ValueError):
            normalize_judgment("")

    def test_win_rate_counts_ties_as_half_wins(self) -> None:
        self.assertEqual(win_rate(["skill", "baseline", "tie", "skill"]), 62.5)

    def test_skill_score_uses_v0_formula(self) -> None:
        self.assertEqual(skill_score(uplift=70.0, trigger_f1=80.0, efficiency=100.0), 79.0)

    def test_apply_measurement_merges_catalog_metrics(self) -> None:
        skill = {
            "metrics": {
                "efficiency": 90.0,
                "trigger_accuracy": None,
                "quality_uplift": None,
                "skill_score": None,
                "installs_30d": None,
                "measured_at": None,
                "model": None,
            }
        }
        measurement = {
            "measured_at": "2026-07-09T00:00:00Z",
            "model": "claude-sonnet-4-6",
            "trigger": {"precision": 75.0, "recall": 88.9, "f1": 81.4},
            "uplift": {"win_rate": 66.7, "tasks": []},
        }

        apply_measurement(skill, measurement)

        self.assertEqual(skill["metrics"]["trigger_accuracy"], 81.4)
        self.assertEqual(skill["metrics"]["quality_uplift"], 66.7)
        self.assertEqual(skill["metrics"]["skill_score"], 75.8)
        self.assertEqual(skill["metrics"]["measured_at"], "2026-07-09T00:00:00Z")
        self.assertEqual(skill["metrics"]["model"], "claude-sonnet-4-6")

    def test_apply_measurement_leaves_missing_measurements_null(self) -> None:
        skill = {"metrics": {"efficiency": 100.0, "skill_score": None}}
        apply_measurement(skill, None)
        self.assertIsNone(skill["metrics"]["skill_score"])

    def test_dry_run_plan_lists_prompts_and_criteria(self) -> None:
        skill = {"name": "example", "path": "skills/test/example"}
        suite = {
            "should_trigger": ["trigger prompt"],
            "should_not_trigger": ["near miss"],
            "tasks": [{"prompt": "task prompt", "criteria": ["criterion"]}],
        }
        output = StringIO()

        with redirect_stdout(output):
            calls = print_plan([skill], {"example": suite}, runs=3, model="test-model")

        self.assertEqual(calls, 15)
        self.assertIn("trigger prompt", output.getvalue())
        self.assertIn("near miss", output.getvalue())
        self.assertIn("task prompt", output.getvalue())
        self.assertIn("criterion", output.getvalue())


if __name__ == "__main__":
    unittest.main()
