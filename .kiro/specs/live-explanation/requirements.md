# Requirements: live explanation

## User stories

As a student, I want to describe a stuck point in my own words, so the steps match my question rather than only the three guided topics.

As a student, I want one step rewritten more plainly, so I do not have to restart the whole topic.

As a reviewer, I want a bad model reply rejected, so the student never sees a half-parsed explanation presented as a lesson.

## Acceptance (EARS)

- WHEN a student submits a subject and a stuck point of at least 8 characters THE SYSTEM SHALL ask the model for one lesson in English.
- WHEN the model returns JSON that passes the skeleton gate THE SYSTEM SHALL show it with the same step and check UI as a guided lesson.
- IF the model key is missing THEN THE SYSTEM SHALL say that live explanations are unavailable and SHALL leave guided lessons working.
- IF the model reply is not a valid lesson THEN THE SYSTEM SHALL refuse it and SHALL NOT substitute a canned explanation.
- WHEN a student asks to clarify the current step THE SYSTEM SHALL request one replacement step and SHALL NOT skip to the final answer of the topic.
- WHEN either app builds a model request THE SYSTEM SHALL use the prompts exported by `tutor-core`.
