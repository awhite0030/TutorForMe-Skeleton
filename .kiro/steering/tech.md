---
inclusion: always
---

# Tech

## Skeleton

`packages/tutor-core` is plain TypeScript. No React, no HTTP, no environment variables. Node 22 runs it with type stripping. The web bundler imports the same files.

The model call lives in `completeTutor(apiKey, messages, maxTokens)`. The caller owns the key. Default model is `grok-4.5` against `https://api.x.ai/v1/chat/completions`, JSON object mode, capped tokens. If the key is missing, say so. Do not invent an explanation.

## app-web

React 19, TanStack Start, Tailwind CSS v4, KaTeX. The deploy shell is the repository root (`npm run dev`, `npm run build`) because that is what the host serves. UI source stays in `app-web/src`. Server functions call the core. The key is read with `process.env.XAI_API_KEY` inside the server function only. Sessions persist in `localStorage`. No database and no auth.

## app-api

Node `http`, no framework. `npm run start --prefix app-api`. Port `8787`. In-memory sessions. Errors are `{ "error": { "code", "message" } }`. CORS is open so a third client can try the protocol. Do not add a second lesson schema.

## Constraints

- Do not gitignore `.kiro`.
- Do not put secrets in the repo or in a `VITE_` variable.
- Guided lesson facts are hand-written. Do not “improve” them with an unverified rewrite.
- Keep the palette and type already in `src/styles.css` when you touch the web UI: paper, ink, one pine accent, Fraunces + Figtree.
