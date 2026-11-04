import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import {
  LESSONS,
  SUBJECTS,
  clarifyMessages,
  completeTutor,
  explainMessages,
  getLesson,
  grade,
  isSubject,
  parseJson,
  payloadToClearer,
  payloadToLesson,
  t,
  type ClarifyPayload,
  type Lang,
  type Lesson,
  type TutorPayload,
} from "../../packages/tutor-core/src/index.ts";

type Session = {
  id: string;
  lesson: Lesson;
  createdAt: string;
};

const sessions = new Map<string, Session>();
const PORT = Number(process.env.PORT ?? 8787);
const HOST = process.env.HOST ?? "0.0.0.0";

function send(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function fail(res: ServerResponse, status: number, code: string, message: string): void {
  send(res, status, { error: { code, message } });
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 32_000) throw new Error("body too large");
    chunks.push(buffer);
  }
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function langOf(_value: unknown): Lang {
  return "en";
}

function publicLesson(lesson: Lesson, lang: Lang) {
  return {
    id: lesson.id,
    subject: lesson.subject,
    source: lesson.source,
    minutes: lesson.minutes,
    title: t(lesson.title, lang),
    stuckPoint: t(lesson.stuckPoint, lang),
    steps: lesson.steps.map((step) => ({
      id: step.id,
      title: t(step.title, lang),
      body: t(step.body, lang),
      formula: step.formula,
      example: step.example ? t(step.example, lang) : null,
    })),
    check: {
      prompt: t(lesson.check.prompt, lang),
      choices: lesson.check.choices.map((choice) => t(choice, lang)),
    },
  };
}

async function liveLesson(subject: "biology" | "chemistry" | "mathematics", prompt: string, lang: Lang) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return { ok: false as const, status: 503, code: "unavailable", message: "Live explanations need XAI_API_KEY." };
  }
  try {
    const raw = await completeTutor(apiKey, explainMessages({ subject, prompt, lang }), 1400);
    const lesson = payloadToLesson(subject, parseJson(raw) as TutorPayload, crypto.randomUUID());
    if (!lesson) {
      return { ok: false as const, status: 502, code: "bad_response", message: "The model returned a lesson the skeleton rejected." };
    }
    return { ok: true as const, lesson };
  } catch (error) {
    console.error("[app-api] explain failed", error);
    return { ok: false as const, status: 502, code: "upstream", message: "The model request failed." };
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  try {
    if (req.method === "GET" && url.pathname === "/health") {
      send(res, 200, { ok: true, service: "tutorforme-api" });
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/subjects") {
      const lang = langOf(url.searchParams.get("lang"));
      send(
        res,
        200,
        {
          subjects: SUBJECTS.map((subject) => ({
            id: subject.id,
            label: t(subject.label, lang),
            blurb: t(subject.blurb, lang),
          })),
        },
      );
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/lessons") {
      const lang = langOf(url.searchParams.get("lang"));
      send(
        res,
        200,
        {
          lessons: LESSONS.map((lesson) => ({
            id: lesson.id,
            subject: lesson.subject,
            minutes: lesson.minutes,
            title: t(lesson.title, lang),
            stuckPoint: t(lesson.stuckPoint, lang),
          })),
        },
      );
      return;
    }

    const lessonMatch = url.pathname.match(/^\/v1\/lessons\/([^/]+)$/);
    if (req.method === "GET" && lessonMatch) {
      const lesson = getLesson(decodeURIComponent(lessonMatch[1] ?? ""));
      if (!lesson) {
        fail(res, 404, "not_found", "No guided lesson with that id.");
        return;
      }
      send(res, 200, { lesson: publicLesson(lesson, langOf(url.searchParams.get("lang"))) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/v1/sessions") {
      const body = (await readJson(req)) as {
        lessonId?: unknown;
        subject?: unknown;
        prompt?: unknown;
        lang?: unknown;
      };
      const lang = langOf(body.lang);
      if (typeof body.lessonId === "string") {
        const lesson = getLesson(body.lessonId);
        if (!lesson) {
          fail(res, 404, "not_found", "No guided lesson with that id.");
          return;
        }
        const session: Session = { id: crypto.randomUUID(), lesson, createdAt: new Date().toISOString() };
        sessions.set(session.id, session);
        send(res, 201, { session: { id: session.id, createdAt: session.createdAt, lesson: publicLesson(lesson, lang) } });
        return;
      }
      if (typeof body.subject !== "string" || !isSubject(body.subject)) {
        fail(res, 400, "bad_request", "Send lessonId, or subject plus prompt.");
        return;
      }
      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      if (prompt.length < 8 || prompt.length > 800) {
        fail(res, 400, "bad_request", "prompt must be between 8 and 800 characters.");
        return;
      }
      const live = await liveLesson(body.subject, prompt, lang);
      if (!live.ok) {
        fail(res, live.status, live.code, live.message);
        return;
      }
      const session: Session = { id: crypto.randomUUID(), lesson: live.lesson, createdAt: new Date().toISOString() };
      sessions.set(session.id, session);
      send(res, 201, { session: { id: session.id, createdAt: session.createdAt, lesson: publicLesson(live.lesson, lang) } });
      return;
    }

    const checkMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)\/check$/);
    if (req.method === "POST" && checkMatch) {
      const session = sessions.get(decodeURIComponent(checkMatch[1] ?? ""));
      if (!session) {
        fail(res, 404, "not_found", "Session expired or unknown. The API keeps sessions in memory.");
        return;
      }
      const body = (await readJson(req)) as { choiceIndex?: unknown; lang?: unknown };
      const choice = body.choiceIndex;
      if (typeof choice !== "number" || choice < 0 || choice > 3) {
        fail(res, 400, "bad_request", "choiceIndex must be 0, 1, 2, or 3.");
        return;
      }
      const lang = langOf(body.lang);
      const correct = grade(session.lesson.check, choice);
      send(res, 200, {
        correct,
        answerIndex: session.lesson.check.answerIndex,
        why: t(session.lesson.check.why, lang),
      });
      return;
    }

    const clarifyMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)\/clarify$/);
    if (req.method === "POST" && clarifyMatch) {
      const session = sessions.get(decodeURIComponent(clarifyMatch[1] ?? ""));
      if (!session) {
        fail(res, 404, "not_found", "Session expired or unknown.");
        return;
      }
      const apiKey = process.env.XAI_API_KEY;
      if (!apiKey) {
        fail(res, 503, "unavailable", "Live explanations need XAI_API_KEY.");
        return;
      }
      const body = (await readJson(req)) as { stepIndex?: unknown; note?: unknown; lang?: unknown };
      const stepIndex = body.stepIndex;
      const note = typeof body.note === "string" ? body.note.trim() : "";
      if (typeof stepIndex !== "number" || stepIndex < 0 || stepIndex >= session.lesson.steps.length) {
        fail(res, 400, "bad_request", "stepIndex is out of range.");
        return;
      }
      if (note.length < 3 || note.length > 400) {
        fail(res, 400, "bad_request", "note must be between 3 and 400 characters.");
        return;
      }
      const lang = langOf(body.lang);
      const step = session.lesson.steps[stepIndex];
      if (!step) {
        fail(res, 400, "bad_request", "stepIndex is out of range.");
        return;
      }
      try {
        const raw = await completeTutor(
          apiKey,
          clarifyMessages({
            subject: session.lesson.subject,
            lessonTitle: t(session.lesson.title, lang),
            stepTitle: t(step.title, lang),
            stepBody: t(step.body, lang),
            note,
            lang,
          }),
          800,
        );
        const clearer = payloadToClearer(parseJson(raw) as ClarifyPayload);
        if (!clearer) {
          fail(res, 502, "bad_response", "The model returned a step the skeleton rejected.");
          return;
        }
        send(res, 200, {
          step: {
            title: t(clearer.title, lang),
            body: t(clearer.body, lang),
            formula: clearer.formula,
            example: clearer.example ? t(clearer.example, lang) : null,
          },
        });
      } catch (error) {
        console.error("[app-api] clarify failed", error);
        fail(res, 502, "upstream", "The model request failed.");
      }
      return;
    }

    const sessionMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)$/);
    if (req.method === "GET" && sessionMatch) {
      const session = sessions.get(decodeURIComponent(sessionMatch[1] ?? ""));
      if (!session) {
        fail(res, 404, "not_found", "Session expired or unknown.");
        return;
      }
      send(res, 200, {
        session: {
          id: session.id,
          createdAt: session.createdAt,
          lesson: publicLesson(session.lesson, langOf(url.searchParams.get("lang"))),
        },
      });
      return;
    }

    fail(res, 404, "not_found", "No route for that path.");
  } catch (error) {
    console.error("[app-api]", error);
    fail(res, 400, "bad_request", "Could not read that request.");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`TutorForMe API listening on http://${HOST}:${PORT}`);
});
