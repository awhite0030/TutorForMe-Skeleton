# Design: live explanation

```
prompt + subject + lang
        ↓
explainMessages()          ← only prompt builder
        ↓
completeTutor(apiKey, …)   ← grok-4.5, json_object, max_tokens 1400
        ↓
parseJson → payloadToLesson
        ↓
   lesson | null
        ↓
web session  or  API session
```

Clarify is the same pipe with `clarifyMessages`, `max_tokens` 800, and `payloadToClearer`. The result is attached to the current step index. It does not replace the original step, so the student can compare them.

The key is read at the edge (`app-web` server function, `app-api` process). `tutor-core` receives it as an argument.

Caps: prompt 8–800 characters, clarify note 3–400, steps 2–5, exactly four choices. Strings are clipped before they are stored.

The web note under a live lesson tells the student to check biology and chemistry against the textbook. That is product copy, not a second safety model.
