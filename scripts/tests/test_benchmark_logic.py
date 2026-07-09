from __future__ import annotations

import sys
import unittest
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS_DIR))

from benchmark_logic import skill_score, trigger_metrics, win_rate
from build_catalog import apply_measurement


class BenchmarkLogicTests(unittest.TestCase):
    def test_trigger_metrics_uses_precision_recall_f1(self) -> None:
        metrics = trigger_metrics(
            positive_matches=[True, True, False],
            negative_matches=[True, False],
        )

        self.assertEqual(metrics, {"precision": 66.7, "recall": 66.7, "f1": 66.7})

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


if __name__ == "__main__":
    unittest.main()
