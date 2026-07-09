# Alternate output formats

Load this file only when the user's request maps to one of these formats.
Otherwise use the standard minutes format in SKILL.md.

## Action-item digest

Use when the user asks for "action items", "todos", or "who's doing what".
Nothing but the actions, grouped by owner:

```markdown
# Action items — <meeting name>, <date>

**Priya**
- [ ] Draft the migration plan — Due: Fri 12 Jul

**Sam**
- [ ] Confirm vendor pricing — Due: not set

**Unassigned**
- [ ] Decide on staging environment (flag for next meeting)
```

Rules: one line per action, verb-first, owner headings sorted with
`Unassigned` last. No discussion section at all.

## Executive summary

Use when the notes are "for my boss", "for leadership", or "a summary to
send up". Five sentences maximum, prose not bullets:

1. What the meeting was about and who was there (one sentence).
2. The one or two decisions that matter.
3. The single biggest risk or open question.
4. What happens next and by when.

No sub-headings, no action-item checklist — link or attach the full notes
instead.

## Follow-up email

Use when the user wants to "send this to the team" or "recap over email".
Take the standard minutes, then:

- Open with one sentence of thanks + purpose.
- Decisions and action items stay as short bullet lists.
- Drop the Discussion section entirely.
- Close by asking recipients to flag corrections by a specific time.
- Subject line: `Notes + actions: <meeting name>, <date>`.
