# app-api

The second Skeleton Crew application. It serves the TutorForMe lesson protocol over HTTP. It does not render a page and it does not own a second copy of the lessons.

Guided walkthroughs come from `@tutorforme/core`. A free-text prompt uses the same prompt contract and the same JSON gate as the web app. Sessions live in memory for the process lifetime.

## Run

From the repository root, with Node 22:

```bash
npm run start --prefix app-api
```

Default bind is `0.0.0.0:8787`. Override with `PORT` and `HOST`.

`XAI_API_KEY` is optional. Without it, `GET` routes and guided `POST /v1/sessions` still work. Live prompts return `503 unavailable` instead of a made-up explanation.

## Routes

| Method | Path | Body |
| --- | --- | --- |
| `GET` | `/health` | — |
| `GET` | `/v1/subjects` | — |
| `GET` | `/v1/lessons` | — |
| `GET` | `/v1/lessons/:id` | — |
| `POST` | `/v1/sessions` | `{ "lessonId": "math-quadratic" }` or `{ "subject": "biology", "prompt": "..." }` |
| `GET` | `/v1/sessions/:id` | — |
| `POST` | `/v1/sessions/:id/check` | `{ "choiceIndex": 1 }` |
| `POST` | `/v1/sessions/:id/clarify` | `{ "stepIndex": 0, "note": "I still mix up the arrows" }` |

Errors are `{ "error": { "code", "message" } }`. The check response does not include `answerIndex` until you submit a choice.

## Example

```bash
curl -s http://127.0.0.1:8787/v1/lessons/math-quadratic
curl -s -X POST http://127.0.0.1:8787/v1/sessions \
  -H 'content-type: application/json' \
  -d '{"lessonId":"bio-reflex-arc"}'
```
