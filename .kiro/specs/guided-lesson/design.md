# Design: guided lesson

Guided lessons are data in `packages/tutor-core/src/lessons.ts`. The web app and the API both read that array.

```
student → app-web or GET /v1/lessons/:id
              ↓
        tutor-core LESSONS
              ↓
        steps + check
              ↓
        grade(check, choice)   (web: on device, API: POST .../check)
```

The three lessons are fixed on purpose:

| id | Subject | Stuck point the steps attack |
| --- | --- | --- |
| `bio-reflex-arc` | biology | Confusing the feeling of pain with the path of the signal |
| `chem-c4h10` | chemistry | Counting drawings instead of connectivities |
| `math-quadratic` | mathematics | Treating the formula as a spell and dropping signs |

`grade` compares `choiceIndex` to `answerIndex`. The API's lesson payload omits `answerIndex` until `POST /v1/sessions/:id/check`. The web bundle includes guided answers because the lessons are local data; the interface still hides them until a choice.

No new storage. The web keeps the in-progress session in `localStorage`. The API keeps a session only in memory so the check can be graded without trusting the client.
