"""Pure benchmark math shared by the harness, catalog builder, and tests."""

from __future__ import annotations

from collections.abc import Iterable, Sequence


def pct(numerator: float, denominator: float) -> float:
    if denominator == 0:
        return 0.0
    return round(100 * numerator / denominator, 1)


def trigger_metrics(positive_matches: Sequence[bool], negative_matches: Sequence[bool]) -> dict:
    """Return precision, recall, and F1 from majority trigger outcomes.

    positive_matches contains should-trigger prompts where True means the target
    skill was selected. negative_matches contains should-not-trigger prompts
    where True means the target skill was incorrectly selected.
    """
    true_positive = sum(1 for value in positive_matches if value)
    false_negative = len(positive_matches) - true_positive
    false_positive = sum(1 for value in negative_matches if value)

    precision = pct(true_positive, true_positive + false_positive)
    recall = pct(true_positive, true_positive + false_negative)
    f1_denominator = 2 * true_positive + false_positive + false_negative
    f1 = pct(2 * true_positive, f1_denominator)
    return {"precision": precision, "recall": recall, "f1": f1}


def win_rate(results: Iterable[str]) -> float:
    """Return with-skill win rate. Ties count as half a win."""
    values = list(results)
    if not values:
        return 0.0
    score = 0.0
    for value in values:
        if value == "skill":
            score += 1.0
        elif value == "tie":
            score += 0.5
        elif value != "baseline":
            raise ValueError(f"unknown uplift result: {value}")
    return pct(score, len(values))


def skill_score(uplift: float | None, trigger_f1: float | None, efficiency: float | None) -> float | None:
    if uplift is None or trigger_f1 is None or efficiency is None:
        return None
    return round(0.5 * uplift + 0.3 * trigger_f1 + 0.2 * efficiency, 1)
