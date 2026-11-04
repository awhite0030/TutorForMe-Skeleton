import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { grade } from "../../packages/tutor-core/src/protocol.ts";
import { t } from "../../packages/tutor-core/src/text.ts";
import type { Copy } from "./copy";
import { Formula, Rich } from "./formula";
import type { SavedSession } from "./storage";
import { clarifyStep } from "./tutor.functions";

const lang = "en" as const;

export function SessionView({
  copy,
  session,
  onBack,
  onChange,
  onFile,
}: {
  copy: Copy;
  session: SavedSession;
  onBack: () => void;
  onChange: (session: SavedSession) => void;
  onFile: (title: string, body: string) => void;
}) {
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lesson = session.lesson;
  const total = lesson.steps.length;
  const onCheck = session.step >= total;
  const step = lesson.steps[Math.min(session.step, total - 1)];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [session.id]);

  function patch(partial: Partial<SavedSession>) {
    onChange({ ...session, ...partial, updatedAt: Date.now() });
  }

  async function clarify(event: FormEvent) {
    event.preventDefault();
    if (!step) return;
    setError(null);
    setPending(true);
    try {
      const result = await clarifyStep({
        data: {
          subject: lesson.subject,
          lessonTitle: t(lesson.title, lang),
          stepTitle: t(step.title, lang),
          stepBody: t(step.body, lang),
          note,
        },
      });
      if (!result.ok) {
        setError(copy.errors[result.error]);
        return;
      }
      setNote("");
      patch({
        clearer: {
          step: session.step,
          title: result.step.title,
          body: result.step.body,
          formula: result.step.formula,
          example: result.step.example,
        },
      });
    } catch {
      setError(copy.errors.upstream);
    } finally {
      setPending(false);
    }
  }

  const graded = session.choice !== null;
  const correct = graded && grade(lesson.check, session.choice ?? -1);
  const clearer = session.clearer && session.clearer.step === session.step ? session.clearer : null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
        <header>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </button>
        </header>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {session.mode === "solve" ? copy.solve : lesson.source === "live" ? copy.sourceLive : copy.sourceGuided}
          </p>
          <h1 className="font-serif text-4xl leading-tight text-balance text-ink sm:text-5xl">
            {t(lesson.title, lang)}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted">
            {t(lesson.stuckPoint, lang)}
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={t(lesson.title, lang)}>
          {lesson.steps.map((item, index) => {
            const selected = !onCheck && session.step === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${index + 1}. ${t(item.title, lang)}`}
                onClick={() => patch({ step: index })}
                className={
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-150 " +
                  (selected ? "bg-pine text-on" : "bg-sheet text-muted")
                }
              >
                {index + 1}
              </button>
            );
          })}
          <button
            type="button"
            role="tab"
            aria-selected={onCheck}
            onClick={() => patch({ step: total })}
            className={
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-150 " +
              (onCheck ? "bg-pine text-on" : "bg-sheet text-muted")
            }
          >
            {copy.checkLabel}
          </button>
        </div>

        {onCheck ? (
          <section className="rounded-2xl border border-line bg-sheet p-5 sm:p-6">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">{copy.checkLabel}</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-balance text-ink">
              {t(lesson.check.prompt, lang)}
            </h2>
            <p className="mt-2 text-sm text-muted">{copy.choices}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {lesson.check.choices.map((choice, index) => {
                const picked = session.choice === index;
                const isAnswer = graded && index === lesson.check.answerIndex;
                const tone = !graded
                  ? "border-line bg-paper"
                  : isAnswer
                    ? "border-pine bg-paper"
                    : picked
                      ? "border-ink bg-paper"
                      : "border-line bg-paper opacity-70";
                return (
                  <li key={choice.en + index}>
                    <button
                      type="button"
                      disabled={graded}
                      onClick={() => patch({ choice: index })}
                      className={`flex min-h-11 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-base text-ink ${tone}`}
                    >
                      <span className="font-semibold tabular-nums">{index + 1}</span>
                      <span>{t(choice, lang)}</span>
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
                  onClick={() => patch({ choice: null })}
                  className="self-start min-h-11 text-sm font-medium text-ink underline decoration-line underline-offset-4"
                >
                  {copy.tryAgain}
                </button>
              </div>
            ) : null}
          </section>
        ) : step ? (
          <article className="rounded-2xl border border-line bg-sheet p-5 sm:p-6">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              {copy.stepOf(session.step + 1, total)}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-balance text-ink">{t(step.title, lang)}</h2>
            <div className="mt-4">
              <Rich text={t(step.body, lang)} />
            </div>
            {step.formula ? <Formula tex={step.formula} display /> : null}
            {step.example ? (
              <aside className="mt-5 border-l-2 border-pine pl-4">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">{copy.example}</p>
                <div className="mt-2">
                  <Rich text={t(step.example, lang)} />
                </div>
              </aside>
            ) : null}

            {clearer ? (
              <aside className="mt-6 rounded-xl bg-paper p-4">
                <p className="text-xs font-medium tracking-wide text-pine uppercase">{copy.clearer}</p>
                <h3 className="mt-2 font-serif text-xl text-ink">{t(clearer.title, lang)}</h3>
                <div className="mt-3">
                  <Rich text={t(clearer.body, lang)} />
                </div>
                {clearer.formula ? <Formula tex={clearer.formula} display /> : null}
                {clearer.example ? (
                  <div className="mt-3">
                    <Rich text={t(clearer.example, lang)} />
                  </div>
                ) : null}
              </aside>
            ) : null}

            <form onSubmit={clarify} className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-ink">{copy.muddy}</span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={copy.muddyPlaceholder}
                  rows={3}
                  maxLength={400}
                  className="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-base leading-relaxed text-ink outline-none placeholder:text-muted focus-visible:border-pine"
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={pending || note.trim().length < 3}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-sheet px-5 text-sm font-semibold text-ink transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50"
                >
                  {pending ? copy.asking : copy.muddyAction}
                </button>
                <button
                  type="button"
                  onClick={() => onFile(t(step.title, lang), t(step.body, lang))}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-ink"
                >
                  {copy.fileStep}
                </button>
                {error ? <p className="text-sm text-ink">{error}</p> : null}
              </div>
            </form>
          </article>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={session.step === 0}
            onClick={() => patch({ step: Math.max(0, session.step - 1) })}
            className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-ink disabled:opacity-40"
          >
            {copy.previous}
          </button>
          {!onCheck ? (
            <button
              type="button"
              onClick={() => patch({ step: session.step + 1 })}
              className="inline-flex min-h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-on transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              {session.step === total - 1 ? copy.toCheck : copy.next}
            </button>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-muted">
          {lesson.source === "live" ? copy.liveNote : copy.guidedNote}
        </p>
    </div>
  );
}
