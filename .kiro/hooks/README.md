# Hooks

Kiro reads each `.kiro.hook` file in this folder. They are tracked on purpose.

| File | When | Then |
| --- | --- | --- |
| `school-level.kiro.hook` | A prompt is submitted | Remind the agent: stuck point, short steps, school wording, no dumped answer |
| `keep-one-protocol.kiro.hook` | A file under `packages/tutor-core` is edited | Check that both apps still import the skeleton |

Schema used by the IDE:

```json
{
  "enabled": true,
  "name": "Hook name",
  "description": "What it protects",
  "version": "1",
  "when": { "type": "promptSubmit" },
  "then": { "type": "askAgent", "prompt": "..." }
}
```

`when.type` may also be `fileEdited`, `fileCreated`, `fileDeleted`, or `userTriggered`. `then.type` may be `askAgent` or `runCommand`.
