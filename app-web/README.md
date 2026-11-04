# app-web

The first Skeleton Crew application: the student-facing tutor.

Each subject is a workspace. The desk shows the next station on a fixed path. The path, the practice bank, and the notebook stay on this device. A walk or a solve — the box at the bottom of the desk — is how you leave the path when a problem is not one of the stations. Guided stations ship inside the web app and `@tutorforme/core` and work with no model key. The key never reaches the browser.

This folder holds the interface. The repository root is the deploy shell (TanStack Start) so `npm run dev` and the hosted build can serve it. Do not fork the lesson type here — import it from `packages/tutor-core`.

## Run

From the repository root:

```bash
npm run dev
```

The same command is `npm run dev --prefix app-web`.

## What a session stores

The browser keeps recent sessions in `localStorage` under `tutorforme.sessions.v1`. Nothing is sent except when you explicitly ask for a live explanation.
