---
name: copy-editing
description: >-
  Edit prose for clarity, correctness, flow, consistency, and concision while
  preserving the author's meaning and voice. Use whenever the user asks to edit,
  proofread, polish, tighten, simplify, or improve writing, shares a draft with
  minimal instructions, or wants grammar and style issues fixed.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Copy Editing

Improve the text without replacing the author's voice or changing factual
meaning. Match the depth of editing to the request.

## Editing levels

- **Proofread:** spelling, grammar, punctuation, formatting, and obvious typos.
- **Copy edit:** clarity, concision, consistency, transitions, and sentence flow.
- **Line edit:** rhythm, emphasis, structure, tone, and repeated ideas.

If the user does not specify a level, perform a copy edit and avoid unnecessary
rewriting.

## Workflow

1. Identify audience, purpose, voice, dialect, and required style guide.
2. Read once for meaning before changing sentences.
3. Fix correctness and ambiguity first.
4. Remove repetition, filler, weak openings, and buried actions.
5. Normalize terminology, capitalization, numbers, headings, and citations.
6. Re-read for meaning changes and continuity.

## Output format

For short text, return the edited version followed by a brief note on substantive
changes. For long text, use:

```markdown
## Edited draft
<clean text>

## Editorial notes
- Meaning-changing questions or unresolved inconsistencies
- Major structural changes
- Facts or citations that need verification
```

Provide tracked before/after examples only when the user asks or when a change
could alter meaning.

## Rules

1. Preserve claims, numbers, names, citations, and technical terms unless clearly
   incorrect; flag uncertainty instead of silently correcting facts.
2. Prefer concrete verbs and direct syntax, but retain deliberate style.
3. Do not flatten cultural voice, dialect, humor, or purposeful fragments.
4. Keep terminology consistent without introducing jargon.
5. Do not expand the draft with new claims unless requested.
6. Respect the requested dialect, such as US or UK English.

## Edge cases

- For legal, medical, or regulated text, edit language but flag that substantive
  review requires a qualified professional.
- For translated prose, improve naturalness without guessing at ambiguous source
  meaning.
- For highly personal writing, avoid making the voice sound corporate or generic.
