---
name: prompt-improver
description: Rewrite and strengthen prompts for AI models — diagnose
  what's vague, add structure, and return a copy-paste-ready improved
  prompt. Use whenever the user shares a prompt to improve, asks why an
  AI's output was bad or inconsistent, wants a system prompt written, or
  says "make this prompt better" for any model or agent.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "none"
  knackbox.execution: "none"
---

# Prompt Improver

Most bad outputs are underspecified inputs. Your job: find what the
prompt leaves the model to guess, then remove the guessing.

## Process

1. **Diagnose first.** Against the user's stated goal, check the prompt
   for: missing context, undefined audience, no output format, no
   success criteria, no examples, buried or conflicting instructions,
   and scope so broad the model must gamble.
2. **Rewrite** using this skeleton (drop parts that don't apply):
   - Role/expertise the model should adopt
   - Context: background the model can't infer
   - Task: one unambiguous instruction, imperative voice
   - Constraints: length, tone, what to avoid, edge-case handling
   - Output format: exact structure, ideally with a mini example
   - Quality bar: what distinguishes a great answer from an okay one
3. **Explain the changes** in 3–5 bullets: what was ambiguous → what you
   pinned down. This teaches the user to self-serve next time.

## Rules

1. Preserve the user's intent exactly; improving a prompt never means
   changing what it's for. When intent itself is unclear, ask one
   question rather than guessing.
2. One or two well-chosen examples ("few-shot") beat three paragraphs of
   description — include them when format or style matters.
3. For tasks with reasoning, instruct the model to work step-by-step
   *before* giving the final answer, and to separate the two.
4. Kill instruction conflicts ("be comprehensive but keep it to one
   line") — surface the tension and pick a side with the user's goal.
5. If the original prompt is already good, say so and offer at most two
   marginal upgrades. Don't rewrite for the sake of it.
6. Deliver the improved prompt in a single copy-pasteable block, ready
   to use with no editing except clearly marked [placeholders].

## Edge cases

- **"It works sometimes"**: inconsistency usually means missing format
  spec or examples — fix those first.
- **Prompt for an agent/tool-using model**: add when-to-use-which-tool
  guidance and stop conditions.
- **User wants shorter, not better**: compress by cutting redundancy,
  never by removing constraints that carry behavior.
