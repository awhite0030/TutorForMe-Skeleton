import { createServerFn } from "@tanstack/react-start";
import {
  clarifyMessages,
  completeTutor,
  explainMessages,
  isSubject,
  parseJson,
  payloadToClearer,
  payloadToLesson,
  type ClarifyPayload,
  type Lesson,
  type SubjectId,
  type TutorPayload,
} from "../../packages/tutor-core/src/index.ts";

type Failure = { ok: false; error: "too_short" | "bad_subject" | "unavailable" | "bad_response" | "upstream" };

function key(): string | null {
  const value = process.env.XAI_API_KEY;
  return value && value.trim() ? value : null;
}

export const explainStuck = createServerFn({ method: "POST" })
  .validator((input: { subject: string; prompt: string; intent?: "walk" | "solve" }) => input)
  .handler(async ({ data }): Promise<{ ok: true; lesson: Lesson } | Failure> => {
    if (!isSubject(data.subject)) return { ok: false, error: "bad_subject" };
    const prompt = data.prompt.trim();
    if (prompt.length < 8 || prompt.length > 800) return { ok: false, error: "too_short" };
    const apiKey = key();
    if (!apiKey) return { ok: false, error: "unavailable" };
    const subject: SubjectId = data.subject;
    const intent = data.intent === "solve" ? "solve" : "walk";
    try {
      const raw = await completeTutor(apiKey, explainMessages({ subject, prompt, lang: "en", intent }), 1400);
      const lesson = payloadToLesson(subject, parseJson(raw) as TutorPayload, crypto.randomUUID());
      if (!lesson) return { ok: false, error: "bad_response" };
      return { ok: true, lesson };
    } catch (error) {
      console.error("[tutorforme] explain failed", error);
      return { ok: false, error: "upstream" };
    }
  });

export const clarifyStep = createServerFn({ method: "POST" })
  .validator(
    (input: {
      subject: SubjectId;
      lessonTitle: string;
      stepTitle: string;
      stepBody: string;
      note: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const note = data.note.trim();
    if (note.length < 3 || note.length > 400) return { ok: false as const, error: "too_short" as const };
    const apiKey = key();
    if (!apiKey) return { ok: false as const, error: "unavailable" as const };
    try {
      const raw = await completeTutor(
        apiKey,
        clarifyMessages({
          subject: data.subject,
          lessonTitle: data.lessonTitle.slice(0, 160),
          stepTitle: data.stepTitle.slice(0, 160),
          stepBody: data.stepBody.slice(0, 1200),
          note,
          lang: "en",
        }),
        800,
      );
      const step = payloadToClearer(parseJson(raw) as ClarifyPayload);
      if (!step) return { ok: false as const, error: "bad_response" as const };
      return { ok: true as const, step };
    } catch (error) {
      console.error("[tutorforme] clarify failed", error);
      return { ok: false as const, error: "upstream" as const };
    }
  });
