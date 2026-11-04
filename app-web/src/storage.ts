import type { Lesson, SubjectId } from "../../packages/tutor-core/src/types.ts";

const SESSIONS = "tutorforme.sessions.v1";
const NOTES = "tutorforme.notes.v1";
const MASTERY = "tutorforme.mastery.v1";
const SUBJECT = "tutorforme.subject";

export type Clearer = {
  step: number;
  title: Lesson["steps"][number]["title"];
  body: Lesson["steps"][number]["body"];
  formula: string | null;
  example: Lesson["steps"][number]["example"];
};

export type SessionMode = "walk" | "solve";

export type SavedSession = {
  id: string;
  lesson: Lesson;
  step: number;
  choice: number | null;
  clearer: Clearer | null;
  updatedAt: number;
  mode?: SessionMode;
};

export type Note = {
  id: string;
  subject: SubjectId;
  title: string;
  body: string;
  createdAt: number;
};

export type Mastery = Record<string, "held" | "missed">;

function isSession(value: unknown): value is SavedSession {
  if (!value || typeof value !== "object") return false;
  const session = value as SavedSession;
  return typeof session.id === "string" && !!session.lesson && Array.isArray(session.lesson.steps);
}

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") return false;
  const note = value as Note;
  return typeof note.id === "string" && typeof note.title === "string" && typeof note.body === "string";
}

export function loadSessions(): SavedSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSession).sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveSessions(sessions: SavedSession[]): void {
  const next = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 24);
  localStorage.setItem(SESSIONS, JSON.stringify(next));
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isNote).sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(NOTES, JSON.stringify(notes.slice(0, 40)));
}

export function loadMastery(): Mastery {
  try {
    const raw = localStorage.getItem(MASTERY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Mastery;
  } catch {
    return {};
  }
}

export function saveMastery(mastery: Mastery): void {
  localStorage.setItem(MASTERY, JSON.stringify(mastery));
}

export function loadSubject(): SubjectId {
  const stored = localStorage.getItem(SUBJECT);
  if (stored === "biology" || stored === "chemistry" || stored === "mathematics") return stored;
  return "biology";
}

export function saveSubject(subject: SubjectId): void {
  localStorage.setItem(SUBJECT, subject);
}
