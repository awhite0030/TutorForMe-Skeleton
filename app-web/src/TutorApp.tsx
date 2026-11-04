import { useEffect, useState, type FormEvent } from "react";
import { t } from "../../packages/tutor-core/src/text.ts";
import type { Lesson, SubjectId } from "../../packages/tutor-core/src/types.ts";
import { pathFor } from "./catalog";
import { stringsFor } from "./copy";
import { DeskView } from "./desk-view";
import { NotebookView } from "./notebook-view";
import { PathView } from "./path-view";
import { PracticeView } from "./practice-view";
import { SessionView } from "./session-view";
import { Shell, type Shelf } from "./shell";
import {
  loadMastery,
  loadNotes,
  loadSessions,
  loadSubject,
  saveMastery,
  saveNotes,
  saveSessions,
  saveSubject,
  type Mastery,
  type Note,
  type SavedSession,
  type SessionMode,
} from "./storage";
import { explainStuck } from "./tutor.functions";

function newSession(lesson: Lesson, mode: SessionMode = "walk"): SavedSession {
  return {
    id: crypto.randomUUID(),
    lesson,
    step: 0,
    choice: null,
    clearer: null,
    updatedAt: Date.now(),
    mode,
  };
}

export function TutorApp() {
  const copy = stringsFor();
  const [ready, setReady] = useState(false);
  const [subject, setSubject] = useState<SubjectId>("biology");
  const [shelf, setShelf] = useState<Shelf>("desk");
  const [returnShelf, setReturnShelf] = useState<Shelf>("desk");
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [mastery, setMastery] = useState<Mastery>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<SessionMode>("walk");
  const [prompt, setPrompt] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSubject(loadSubject());
    setSessions(loadSessions());
    setNotes(loadNotes());
    setMastery(loadMastery());
    setReady(true);
  }, []);

  function persistSessions(next: SavedSession[]) {
    setSessions(next);
    saveSessions(next);
  }

  function mark(lessonId: string, held: boolean) {
    const next = { ...mastery, [lessonId]: held ? "held" : "missed" } as Mastery;
    setMastery(next);
    saveMastery(next);
  }

  function upsert(session: SavedSession) {
    const next = [session, ...sessions.filter((item) => item.id !== session.id)];
    persistSessions(next);
    if (session.choice !== null) mark(session.lesson.id, session.choice === session.lesson.check.answerIndex);
    setActiveId(session.id);
  }

  function openLesson(lesson: Lesson, from: Shelf) {
    setError(null);
    setReturnShelf(from);
    const existing = sessions.find((item) => item.lesson.id === lesson.id && item.lesson.source === "guided");
    if (existing) {
      setActiveId(existing.id);
      return;
    }
    upsert(newSession(lesson));
  }

  function addNote(title: string, body: string) {
    const duplicate = notes.find((item) => item.subject === subject && item.title === title && item.body === body);
    if (duplicate) return;
    const next = [
      { id: crypto.randomUUID(), subject, title, body, createdAt: Date.now() },
      ...notes,
    ];
    setNotes(next);
    saveNotes(next);
  }

  async function ask(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await explainStuck({ data: { subject, prompt, intent: mode } });
      if (!result.ok) {
        setError(copy.errors[result.error]);
        return;
      }
      setPrompt("");
      setReturnShelf("desk");
      upsert(newSession(result.lesson, mode));
    } catch {
      setError(copy.errors.upstream);
    } finally {
      setPending(false);
    }
  }

  const path = pathFor(subject);
  const active = sessions.find((item) => item.id === activeId) ?? null;
  const viewing = active ? "session" : shelf;

  if (!ready) {
    return <div className="min-h-screen bg-paper" />;
  }

  return (
    <Shell
      copy={copy}
      subject={subject}
      shelf={viewing}
      sessions={sessions}
      onSubject={(next) => {
        setSubject(next);
        saveSubject(next);
        setActiveId(null);
        setError(null);
        setShelf("desk");
      }}
      onShelf={(next) => {
        setActiveId(null);
        setShelf(next);
      }}
      onOpenSession={(id) => {
        setReturnShelf(shelf);
        setActiveId(id);
      }}
      onRemoveSession={(id) => {
        persistSessions(sessions.filter((item) => item.id !== id));
        if (activeId === id) setActiveId(null);
      }}
    >
      {active ? (
        <SessionView
          copy={copy}
          session={active}
          onBack={() => {
            setActiveId(null);
            setShelf(returnShelf);
          }}
          onChange={upsert}
          onFile={(title, body) => addNote(title, `${body}\n\n— ${t(active.lesson.title, "en")}`)}
        />
      ) : shelf === "path" ? (
        <PathView
          copy={copy}
          path={path}
          sessions={sessions}
          mastery={mastery}
          onOpen={(lesson) => openLesson(lesson, "path")}
        />
      ) : shelf === "practice" ? (
        <PracticeView
          key={subject}
          copy={copy}
          path={path}
          mastery={mastery}
          onGrade={mark}
        />
      ) : shelf === "notebook" ? (
        <NotebookView
          copy={copy}
          notes={notes.filter((item) => item.subject === subject)}
          onAdd={addNote}
          onRemove={(id) => {
            const next = notes.filter((item) => item.id !== id);
            setNotes(next);
            saveNotes(next);
          }}
        />
      ) : (
        <DeskView
          copy={copy}
          subject={subject}
          path={path}
          sessions={sessions}
          mastery={mastery}
          mode={mode}
          prompt={prompt}
          pending={pending}
          error={error}
          onMode={setMode}
          onPrompt={setPrompt}
          onAsk={ask}
          onOpen={(lesson) => openLesson(lesson, "desk")}
          onOpenShelf={setShelf}
        />
      )}
    </Shell>
  );
}
