import type { FormEvent } from "react";
import { ArrowUp, Lightbulb, ListChecks, Route, Sigma } from "lucide-react";
import { SUBJECTS } from "../../packages/tutor-core/src/lessons.ts";
import { t } from "../../packages/tutor-core/src/text.ts";
import type { Lesson, SubjectId } from "../../packages/tutor-core/src/types.ts";
import type { Copy } from "./copy";
import type { Shelf } from "./shell";
import type { Mastery, SavedSession, SessionMode } from "./storage";

const lang = "en" as const;

export function DeskView({
  copy,
  subject,
  path,
  sessions,
  mastery,
  mode,
  prompt,
  pending,
  error,
  onMode,
  onPrompt,
  onAsk,
  onOpen,
  onOpenShelf,
}: {
  copy: Copy;
  subject: SubjectId;
  path: Lesson[];
  sessions: SavedSession[];
  mastery: Mastery;
  mode: SessionMode;
  prompt: string;
  pending: boolean;
  error: string | null;
  onMode: (mode: SessionMode) => void;
  onPrompt: (value: string) => void;
  onAsk: (event: FormEvent) => void;
  onOpen: (lesson: Lesson) => void;
  onOpenShelf: (shelf: Shelf) => void;
}) {
  const subjectMeta = SUBJECTS.find((item) => item.id === subject);
  const label = subjectMeta ? t(subjectMeta.label, lang) : subject;
  const next = path.find((lesson) => mastery[lesson.id] !== "held") ?? path[0];
  const existing = next ? sessions.find((item) => item.lesson.id === next.id && item.lesson.source === "guided") : undefined;
  const chips: Array<{ id: string; label: string; icon: typeof Lightbulb; onClick: () => void; on: boolean }> = [
    { id: "walk", label: copy.walk, icon: Lightbulb, onClick: () => onMode("walk"), on: mode === "walk" },
    { id: "solve", label: copy.solve, icon: Sigma, onClick: () => onMode("solve"), on: mode === "solve" },
    { id: "practice", label: copy.practice, icon: ListChecks, onClick: () => onOpenShelf("practice"), on: false },
    { id: "path", label: copy.path, icon: Route, onClick: () => onOpenShelf("path"), on: false },
  ];

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-2xl flex-col items-center">
        <h1 className="flex items-center gap-3 text-center font-serif text-3xl leading-tight text-balance text-ink sm:text-4xl">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-pine text-sm font-semibold text-on">
            T
          </span>
          {label} — where did you stop?
        </h1>

        <form onSubmit={onAsk} className="mt-8 w-full rounded-2xl border border-line bg-sheet">
          <label className="sr-only" htmlFor="stuck">
            {mode === "walk" ? copy.askWalk : copy.askSolve}
          </label>
          <textarea
            id="stuck"
            value={prompt}
            onChange={(event) => onPrompt(event.target.value)}
            placeholder={copy.askPlaceholder[subject][mode]}
            rows={3}
            maxLength={800}
            className="w-full resize-none bg-transparent px-4 pt-4 text-base leading-relaxed text-ink outline-none placeholder:text-muted"
          />
          <div className="flex items-center justify-between gap-3 px-3 pb-3">
            <div className="flex items-center gap-1 text-sm text-muted" role="tablist" aria-label={copy.askWalk}>
              <span className="px-2">Mode</span>
              {(["walk", "solve"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={mode === item}
                  onClick={() => onMode(item)}
                  className={
                    "min-h-9 rounded-lg px-2.5 text-sm " + (mode === item ? "bg-paper text-ink" : "text-muted")
                  }
                >
                  {item === "walk" ? copy.walk : copy.solve}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={pending || prompt.trim().length < 8}
              aria-label={copy.askAction}
              className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </button>
          </div>
        </form>
        {error ? <p className="mt-3 self-start text-sm text-pine">{error}</p> : null}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={chip.onClick}
                className={
                  "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm " +
                  (chip.on ? "border-pine bg-pine/10 text-pine" : "border-pine/80 text-pine")
                }
              >
                <Icon className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                {chip.label}
              </button>
            );
          })}
        </div>

        {next ? (
          <button
            type="button"
            onClick={() => onOpen(next)}
            className="mt-8 flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-sheet px-4 py-3 text-left"
          >
            <span className="min-w-0">
              <span className="block text-xs text-muted">{copy.upNext}</span>
              <span className="mt-0.5 block truncate text-sm text-ink">{t(next.title, lang)}</span>
            </span>
            <span className="shrink-0 text-sm text-pine">{existing ? copy.continue : copy.start}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
