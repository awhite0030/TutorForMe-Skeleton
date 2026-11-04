import { useState, type ReactNode } from "react";
import { BookOpen, ChevronDown, ListChecks, Menu, NotebookPen, Plus, Route, X } from "lucide-react";
import { SUBJECTS } from "../../packages/tutor-core/src/lessons.ts";
import { t } from "../../packages/tutor-core/src/text.ts";
import type { SubjectId } from "../../packages/tutor-core/src/types.ts";
import type { Copy } from "./copy";
import type { SavedSession } from "./storage";

export type Shelf = "desk" | "path" | "practice" | "notebook";

const lang = "en" as const;

function Mark() {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-pine text-[11px] font-semibold text-on">
      T
    </span>
  );
}

export function Shell({
  copy,
  subject,
  shelf,
  sessions,
  children,
  onSubject,
  onShelf,
  onOpenSession,
  onRemoveSession,
}: {
  copy: Copy;
  subject: SubjectId;
  shelf: Shelf | "session";
  sessions: SavedSession[];
  children: ReactNode;
  onSubject: (subject: SubjectId) => void;
  onShelf: (shelf: Shelf) => void;
  onOpenSession: (id: string) => void;
  onRemoveSession: (id: string) => void;
}) {
  const [menu, setMenu] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const here = sessions.filter((item) => item.lesson.subject === subject).slice(0, 8);
  const current = SUBJECTS.find((item) => item.id === subject);
  const items: Array<{ id: Shelf; label: string; icon: typeof BookOpen }> = [
    { id: "desk", label: copy.desk, icon: BookOpen },
    { id: "path", label: copy.path, icon: Route },
    { id: "practice", label: copy.practice, icon: ListChecks },
    { id: "notebook", label: copy.notebook, icon: NotebookPen },
  ];
  const crumb = shelf === "session" ? copy.session : items.find((item) => item.id === shelf)?.label ?? copy.desk;

  function go(next: Shelf) {
    setMenu(false);
    setSubjectsOpen(false);
    onShelf(next);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-paper text-ink">
      {menu ? (
        <button
          type="button"
          aria-label="Close"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMenu(false)}
        />
      ) : null}
      <aside
        className={
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-line bg-rail px-3 py-3 transition-transform duration-150 lg:static lg:translate-x-0 " +
          (menu ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => setSubjectsOpen((value) => !value)}
            className="flex min-h-11 w-full items-center gap-2 rounded-lg px-2 text-left hover:bg-paper"
            aria-expanded={subjectsOpen}
          >
            <Mark />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{current ? t(current.label, lang) : "TutorForMe"}</span>
            <ChevronDown className="size-4 text-muted" aria-hidden="true" />
          </button>
          {subjectsOpen ? (
            <div className="absolute top-12 right-0 left-0 z-10 rounded-xl border border-line bg-sheet p-1 shadow-lg">
              {SUBJECTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSubject(item.id);
                    setSubjectsOpen(false);
                    setMenu(false);
                  }}
                  className={
                    "flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm " +
                    (item.id === subject ? "bg-paper text-ink" : "text-muted")
                  }
                >
                  {t(item.label, lang)}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <nav className="mt-3 flex flex-col gap-0.5" aria-label="Workspace">
          {items.map((item) => {
            const Icon = item.icon;
            const selected = shelf === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={
                  "inline-flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 text-sm " +
                  (selected ? "bg-paper text-ink" : "text-muted hover:bg-paper hover:text-ink")
                }
              >
                <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-1">
          <p className="px-2.5 text-xs text-muted">
            {copy.recent}
            <span className="float-right tabular-nums">{here.length}</span>
          </p>
          {here.length === 0 ? (
            <p className="px-2.5 py-2 text-sm text-muted">{copy.recentEmpty}</p>
          ) : (
            <ul className="flex flex-col overflow-y-auto">
              {here.map((session) => (
                <li key={session.id} className="group flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMenu(false);
                      onOpenSession(session.id);
                    }}
                    className="min-h-10 min-w-0 flex-1 truncate px-2.5 text-left text-sm text-ink"
                  >
                    {t(session.lesson.title, lang)}
                  </button>
                  <button
                    type="button"
                    aria-label={copy.remove}
                    onClick={() => onRemoveSession(session.id)}
                    className="inline-flex size-9 items-center justify-center text-muted opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={() => go("desk")}
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink"
        >
          <Plus className="size-4" aria-hidden="true" />
          {copy.newSession}
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-3 text-sm sm:px-4">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-ink lg:hidden"
            aria-label="Menu"
            onClick={() => setMenu(true)}
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
          <span className="text-muted">{crumb}</span>
          <span className="text-muted">/</span>
          <span className="truncate">{current ? t(current.label, lang) : "TutorForMe"}</span>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
