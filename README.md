# TutorForMe

**TutorForMe: Learn smarter. Grow faster.**

A personal tutor for the step you are actually stuck on. Built as a lean skeleton for [Kiroween 2026](https://kiroween.devpost.com/), category **Skeleton Crew**: one shared lesson protocol, two applications.

Subjects in the guided set: biology (the reflex arc), chemistry (structural isomers of C₄H₁₀), mathematics (the quadratic formula). A free-text prompt uses the same protocol when a model key is present.

Inspired by the shape of [DeepTutor](https://github.com/HKUDS/DeepTutor) — one learning workspace, a step loop, explanations you can inspect — and then cut down until a second app can sit on it without copying a platform.

## Two applications

| App | Folder | What it proves |
| --- | --- | --- |
| Student web tutor | [`app-web/`](app-web/) | The protocol as a session: steps, LaTeX, a check, “say this more plainly” |
| Tutor HTTP API | [`app-api/`](app-api/) | The same protocol over the network, including guided lessons with no model |

The skeleton both import is [`packages/tutor-core/`](packages/tutor-core/). Neither app redefines a lesson.

```
tutorforme-skeleton/
├── LICENSE                      # MIT
├── README.md
├── .kiro/                       # steering, specs, hooks — not gitignored
│   ├── steering/
│   ├── specs/
│   └── hooks/
├── packages/tutor-core/         # the lean skeleton
├── app-web/                     # application 1
└── app-api/                     # application 2
```

The repository root is the deploy shell for the web app (so the hosted build can serve `app-web`). Run and deploy from here.

## Run the web app

```bash
npm install
npm run dev
```

`npm run dev --prefix app-web` does the same thing. Guided walkthroughs need no key. Live explanations read `XAI_API_KEY` on the server only.

## Run the API

```bash
npm run start --prefix app-api
```

Listens on `0.0.0.0:8787`. See [app-api/README.md](app-api/README.md) for routes. Example:

```bash
curl -s http://127.0.0.1:8787/v1/lessons/math-quadratic?lang=en
```

## Deploy

The web app is the one to deploy. `npm run build` produces the hosted bundle. The API is a small Node process for local or any host that can run `node --experimental-strip-types app-api/src/server.ts`. It does not share a database with the web app. Sessions in the API are in memory. Sessions in the web app stay in the browser.

## Formulas

Inline example: the quadratic formula is \( x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \).

Displayed equation:

$$
E = mc^2
$$

# About the Project TutorForMe

## What Inspired Me

I often struggled to understand certain topics on my own — especially when the material felt dense or needed a clear step-by-step breakdown. I wanted a tool that would help me figure out exactly where I was stuck, rather than just giving a ready-made answer. That’s how the idea for **TutorForMe** came about: a personal AI assistant that makes it easier to work through difficult topics.

## What I Learned

While building this, I got better at formulating questions for AI models so they give useful explanations instead of generic replies. I also learned the basics of structuring a dialogue with AI: how to break a big topic into smaller parts, ask follow-up questions, and check my understanding.

## How I Built the Project

I started with a simple idea — an interface where you can ask about a topic and get a clear explanation. I used available AI models to generate the breakdowns and added the ability to ask for clarification or examples. The interaction logic is straightforward: the user describes what’s unclear, and the system helps move through it step by step.

For math and chemistry I included support for formulas. Inline example: the quadratic formula is \( x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \).

Displayed equation:

$$
E = mc^2
$$

## Problems I Faced

The main challenge was getting the AI to produce genuinely helpful explanations instead of surface-level answers. Sometimes the model gave overly general responses or skipped important details. I had to refine the prompts and add clarifying questions. It was also tricky to keep the explanations at a school level without overloading them. On top of that, some topics (especially in biology and chemistry) require precise wording, and the model could occasionally get details wrong — I had to account for that and double-check.

The project grew out of a personal need to understand difficult topics more easily. **TutorForMe** is my attempt to make that process smoother with the help of AI.

## How Kiro fits this skeleton

Steering in [`.kiro/steering/`](.kiro/steering/) is the standing context: product, stack, and the rule that both apps share `tutor-core`. Specs in [`.kiro/specs/`](.kiro/specs/) use EARS for the guided lesson and the live explanation. Hooks in [`.kiro/hooks/`](.kiro/hooks/) keep school-level wording and stop a second lesson protocol from appearing inside one app.

Do not add `.kiro` to `.gitignore`. The license file at the root is MIT so the repository About panel can detect it.

## License

[MIT](LICENSE)
