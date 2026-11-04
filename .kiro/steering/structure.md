---
inclusion: always
---

# Structure

```
.kiro/                         steering, specs, hooks (tracked)
packages/tutor-core/src/       the skeleton
  types.ts                     Lesson, Step, Check, Lang
  lessons.ts                   guided walkthroughs + subject list
  protocol.ts                  prompts, JSON gate, grade()
  model.ts                     one completion helper
  text.ts                      bilingual strings
  index.ts                     public API for the Node app
app-web/src/                   student UI only
app-api/src/server.ts          HTTP adapter only
src/routes/                    deploy shell. index.tsx mounts app-web
```

## Rules

- Import lesson types from `tutor-core`. Do not copy them into an app.
- A new subject pack is data in `lessons.ts`, or a live prompt. It is not a new component tree.
- Web UI strings live in `app-web/src/copy.ts`. Lesson prose lives on the lesson.
- File names are lowercase with hyphens for multi-word files.
- Specs are `.kiro/specs/<feature>/{requirements,design,tasks}.md`.
- Hooks are `.kiro/hooks/*.kiro.hook`.

## Public lesson shape

`id`, `subject`, `source` (`guided` | `live`), `title`, `stuckPoint`, `steps[]` (`title`, `body`, `formula | null`, `example | null`), `check` (`prompt`, four `choices`, `answerIndex`, `why`).

Human text on a guided lesson is `{ en, ru }`. Live text is copied into both fields after validation.
