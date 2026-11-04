import { useState } from "react";
import { t } from "../../packages/tutor-core/src/text.ts";
import type { Lesson } from "../../packages/tutor-core/src/types.ts";
import type { Copy } from "./copy";
import { Rich } from "./formula";
import type { Mastery } from "./storage";

const lang = "en" as const;

export function PracticeView({
  copy,
  path,
  mastery,
  onGrade,
}: {
  copy: Copy;
  path: Lesson[];
  mastery: Mastery;
  onGrade: (lessonId: string, held: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const lesson = path[index] ?? path[0];
  if (!lesson) return null;
  const graded = choice !== null;
  const correct = graded && choice === lesson.check.answerIndex;

  function pick(next: number) {
    if (graded) return;
    setChoice(next);
    onGrade(lesson.id, next === lesson.check.answerIndex);
  }

  function move(to: number) {
    setIndex(to);
    setChoice(null);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{copy.practice}</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted">{copy.practiceLede}</p>
      </header>

      <section className="rounded-2xl border border-line bg-sheet p-5 sm:p-6">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          {copy.questionOf(index + 1, path.length)} · {copy.fromStation} {t(lesson.title, lang)}
          {mastery[lesson.id] === "held" ? ` · ${copy.held}` : ""}
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-balance text-ink">{t(lesson.check.prompt, lang)}</h2>
        <p className="mt-2 text-sm text-muted">{copy.choices}</p>
        <ul className="mt-5 flex flex-col gap-2">
          {lesson.check.choices.map((item, choiceIndex) => {
            const picked = choice === choiceIndex;
            const isAnswer = graded && choiceIndex === lesson.check.answerIndex;
            const tone = !graded
              ? "border-line bg-paper"
              : isAnswer
                ? "border-pine bg-paper"
                : picked
                  ? "border-ink bg-paper"
                  : "border-line bg-paper opacity-70";
            return (
              <li key={item.en + choiceIndex}>
                <button
                  type="button"
                  disabled={graded}
                  onClick={() => pick(choiceIndex)}
                  className={`flex min-h-11 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-base text-ink ${tone}`}
                >
                  <span className="font-semibold tabular-nums">{choiceIndex + 1}</span>
                  <span>{t(item, lang)}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {graded ? (
          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4">
            <p className="text-sm font-semibold text-pine">{correct ? copy.correct : copy.wrong}</p>
            <Rich text={t(lesson.check.why, lang)} />
            <button
              type="button"
              onClick={() => setChoice(null)}
              className="self-start min-h-11 text-sm font-medium text-ink underline decoration-line underline-offset-4"
            >
              {copy.tryAgain}
            </button>
          </div>
        ) : null}
      </section>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => move(index - 1)}
          className="inline-flex min-h-11 items-center text-sm font-medium text-ink disabled:opacity-40"
        >
          {copy.previous}
        </button>
        <button
          type="button"
          disabled={index >= path.length - 1}
          onClick={() => move(index + 1)}
          className="inline-flex min-h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-on disabled:opacity-40"
        >
          {copy.nextQuestion}
        </button>
      </div>
    </div>
  );
}
