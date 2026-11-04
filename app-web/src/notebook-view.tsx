import { useState, type FormEvent } from "react";
import type { Copy } from "./copy";
import type { Note } from "./storage";

export function NotebookView({
  copy,
  notes,
  onAdd,
  onRemove,
}: {
  copy: Copy;
  notes: Note[];
  onAdd: (title: string, body: string) => void;
  onRemove: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (body.trim().length < 3) return;
    onAdd(title.trim() || "Note", body.trim());
    setTitle("");
    setBody("");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{copy.notebook}</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted">{copy.notebookLede}</p>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border border-line bg-sheet p-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">{copy.noteTitle}</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            className="min-h-11 w-full rounded-xl border border-line bg-paper px-4 text-base text-ink outline-none focus-visible:border-pine"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">{copy.noteBody}</span>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={4}
            maxLength={2000}
            className="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-base leading-relaxed text-ink outline-none focus-visible:border-pine"
          />
        </label>
        <button
          type="submit"
          disabled={body.trim().length < 3}
          className="self-start inline-flex min-h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-on disabled:opacity-50"
        >
          {copy.noteSave}
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted">{copy.noteEmpty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {notes.map((note) => (
            <li key={note.id} className="rounded-2xl border border-line bg-sheet p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-2xl leading-tight text-ink">{note.title}</h2>
                <button
                  type="button"
                  onClick={() => onRemove(note.id)}
                  className="min-h-11 shrink-0 text-sm text-muted"
                >
                  {copy.noteDelete}
                </button>
              </div>
              <p className="mt-3 text-pretty text-base leading-relaxed whitespace-pre-wrap text-ink">{note.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
