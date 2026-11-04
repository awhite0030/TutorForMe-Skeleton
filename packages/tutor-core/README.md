# `@tutorforme/core`

The lean skeleton. Both apps import this package and neither one redefines the lesson shape.

## Contract

A **lesson** is a stuck point, 2–5 steps, optional LaTeX on a step, one worked example, and a four-choice check with a single `answerIndex`.

| Export | Used for |
| --- | --- |
| `LESSONS`, `getLesson`, `SUBJECTS` | Hand-written guided walkthroughs (biology, chemistry, mathematics) |
| `explainMessages`, `clarifyMessages` | The only prompts either app may send |
| `payloadToLesson`, `payloadToClearer`, `parseJson` | Validate model JSON before it reaches a student |
| `completeTutor` | One chat completion. The caller passes the key. The core never reads the environment |
| `grade` | Check a choice against `answerIndex` |

Guided lessons are written in English. The `{ en, ru }` text fields remain so a string always has a fallback; the apps only read `en`. Live lessons copy the model's English into both fields.

## What this skeleton refuses to be

No accounts, no database, no hidden memory, no second tutor protocol inside an app. A new client — a bot, a CLI, a third subject pack — should add data or a thin adapter, not a new step format.
