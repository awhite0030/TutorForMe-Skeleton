# Requirements: guided lesson

## User stories

As a student, I want a finished walkthrough I can open with no account and no model, so I can see the steps of a topic I already know I struggle with.

As a student, I want one check at the end, so I can tell whether I followed the path.

As a student, I want the lesson in plain English, so I can follow the path without a language switch.

## Acceptance (EARS)

- WHEN a student opens a guided lesson THE SYSTEM SHALL show the stuck point, then each step in order, including any formula and example on that step.
- WHEN a student reaches the check THE SYSTEM SHALL present exactly four choices and SHALL NOT reveal the answer index before a choice is made.
- WHEN a student chooses THE SYSTEM SHALL mark the attempt and show why, including when the choice was wrong.
- WHEN a student asks to try again THE SYSTEM SHALL clear the choice and keep the same lesson.
- WHEN a student opens a guided lesson THE SYSTEM SHALL show it in English, with no language switch.
- IF the model key is absent THEN THE SYSTEM SHALL still open every guided lesson.
