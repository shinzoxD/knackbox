---
name: meeting-notes
description: Turn raw meeting transcripts, chat logs, or rough notes into
  clean, structured meeting notes with decisions and action items. Use
  whenever the user shares a transcript or messy notes, asks for meeting
  minutes, wants action items extracted, or says things like "clean up my
  notes from the standup" — even if they don't say the word "minutes".
---

# Meeting Notes

Convert raw meeting input into notes a person who missed the meeting can act
on in under two minutes of reading. Optimize for decisions and action items,
not a play-by-play of who said what.

## Process

1. Read the full input first. Identify: attendees, topics, **decisions
   made**, **action items** (with owner and due date if stated), and open
   questions.
2. Discard filler: greetings, scheduling chatter, repeated points, verbal
   tics. Keep disagreements — note both positions and how (or whether) they
   were resolved.
3. Pick the output format. Default to **standard minutes**. If the user asks
   for "action items", "a digest", or "a summary for my boss", read
   `references/formats.md` and use the matching format there.
4. Render the notes, then list anything you could not determine (missing
   owners, unclear decisions) under **Needs clarification** rather than
   guessing.

## Rules

1. Never invent owners, dates, or decisions that aren't in the source. An
   action item without a stated owner is written as `Owner: unassigned`.
2. Decisions are written as outcomes, not discussion: "Decided to ship v2
   behind a feature flag", not "Talked about feature flags".
3. Attribute contested opinions ("Priya argued for X; Sam preferred Y"), but
   don't attribute routine facts.
4. Keep the whole output shorter than the input. If your notes are longer,
   you're transcribing, not summarizing.
5. Preserve exact figures, dates, and names verbatim from the source.

## Default output: standard minutes

```markdown
# <Meeting name> — <date>
**Attendees:** ...

## Decisions
- ...

## Action items
- [ ] <task> — Owner: <name>, Due: <date or "not set">

## Discussion
- <topic>: 2–3 sentence summary

## Needs clarification
- ...
```

## Edge cases

- **Input is an audio-transcript with speaker labels missing**: group by
  topic instead of speaker and note that attribution wasn't possible.
- **Multiple meetings in one paste**: ask whether to split into separate
  notes before proceeding.
- **User just wants actions**: skip everything except the action-item digest
  format in `references/formats.md`.
