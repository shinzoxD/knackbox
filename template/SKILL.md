---
# REQUIRED. Lowercase-with-hyphens, max 64 chars, must equal the folder name.
name: your-skill-name
# REQUIRED. Max 1024 chars. This is the ONLY thing the model reads before
# deciding to use your skill, so state WHEN to trigger, not just what it does.
# Models under-trigger, so be a little pushy: list the phrases, situations,
# and file types that should activate this skill.
description: One sentence on what this skill does. Use whenever the user
  mentions X, asks for Y, or is doing Z — even if they don't explicitly
  ask for this skill.
---

# Your Skill Name

One short paragraph: what this skill produces and the standard it holds the
output to. Everything below is instructions written *to the model*.

## When you're activated

Describe the model's job in plain imperative language. Cover:

- The default behavior for the most common case.
- Input the model should look for (a diff, a transcript, a file type).
- The exact output format, with a concrete example.

## Rules

1. Keep rules short, specific, and testable.
2. Prefer "always/never do X" over vague guidance like "be concise".
3. Include one good and one bad example — contrast teaches better than
   description.

## Edge cases

- What to do when input is missing or ambiguous.
- When to ask the user a clarifying question instead of guessing.

<!--
Optional structure for bigger skills (delete if unused):

- references/  → long docs the model should load only when needed.
  Point to them explicitly: "For X, read references/x.md."
- scripts/     → executable helpers. Must follow SECURITY.md rules.
- assets/      → templates, fonts, or files used in the output.

Keep this file under 500 lines. If you're approaching the limit,
move detail into references/ and leave pointers here.
-->
