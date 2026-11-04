---
inclusion: fileMatch
fileMatchPattern: "{packages/tutor-core,app-web,app-api}/**/*.{ts,tsx}"
---

# Lesson protocol

When you edit the core or either app:

- A step teaches one idea. The check is not a step.
- `formula` is LaTeX without dollar signs, or null.
- `answerIndex` is 0–3 and matches exactly one choice.
- Prompts go through `explainMessages` / `clarifyMessages`. Do not paste a second system prompt in the web app or the API.
- Reject model JSON that fails `payloadToLesson` or `payloadToClearer`. Show the failure. Do not fill the gap with a canned paragraph.
