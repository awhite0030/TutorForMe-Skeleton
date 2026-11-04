import { t } from "../../packages/tutor-core/src/text.ts";
import type { Lesson } from "../../packages/tutor-core/src/types.ts";
import type { Copy } from "./copy";
import type { Mastery, SavedSession } from "./storage";

const lang = "en" as const;

export function PathView({
  copy,
  path,
  sessions,
  mastery,
  onOpen,
}: {
  copy: Copy;
  path: Lesson[];
  sessions: SavedSession[];
  mastery: Mastery;
  onOpen: (lesson: Lesson) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{copy.path}</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted">{copy.pathLede}</p>
      </header>
      <ol className="flex flex-col">
        {path.map((lesson, index) => {
          const session = sessions.find((item) => item.lesson.id === lesson.id);
          const state =
            mastery[lesson.id] === "held"
              ? copy.held
              : mastery[lesson.id] === "missed"
                ? copy.missed
                : session
                  ? copy.inProgress
                  : copy.openStatus;
          return (
            <li key={lesson.id} className="grid grid-cols-[2.5rem_1fr] gap-3">
              <div className="flex flex-col items-center">
                <span className="flex size-10 items-center justify-center rounded-full bg-pine font-serif text-on tabular-nums">
                  {index + 1}
                </span>
                {index < path.length - 1 ? <span className="w-px flex-1 bg-line" /> : null}
              </div>
              <article className="mb-4 rounded-2xl border border-line bg-sheet p-5">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">
                  {lesson.minutes} {copy.minutes} · {state}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight text-ink">{t(lesson.title, lang)}</h2>
                <p className="mt-2 text-pretty text-base leading-relaxed text-muted">{t(lesson.stuckPoint, lang)}</p>
                <button
                  type="button"
                  onClick={() => onOpen(lesson)}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine"
                >
                  {session ? copy.continue : copy.start}
                </button>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
