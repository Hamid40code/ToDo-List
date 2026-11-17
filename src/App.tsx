import { useCallback, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import type { Task } from "./types/task";
import {
  createTaskId,
  loadSubmittedTasks,
  saveJson,
  SUBMITTED_STORAGE_KEY,
} from "./utils/storage";

type AppView = "add" | "list";

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("add");
  const [tasks, setTasks] = useState<Task[]>(loadSubmittedTasks);

  useEffect(() => {
    saveJson(SUBMITTED_STORAGE_KEY, tasks);
  }, [tasks]);

  const handleSubmitTasks = useCallback((draftTasks: string[]): void => {
    const newTasks: Task[] = draftTasks
      .map((text) => text.trim())
      .filter((text) => text.length > 0)
      .map((text) => ({
        id: createTaskId(),
        text,
        done: false,
      }));

    if (newTasks.length === 0) return;

    setTasks((currentTasks) => [...currentTasks, ...newTasks]);
    setActiveView("list");
  }, []);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[var(--bg-dark)] px-3 py-5 text-[var(--text)] transition-colors duration-300">
      <ThemeToggle />

      <main
        aria-label="Task manager"
        className="flex h-[min(620px,86dvh)] min-h-[420px] w-[min(90vw,600px)] shrink-0 flex-col items-center justify-center motion-safe:animate-[page-enter_.5s_ease_both] max-[480px]:h-[min(700px,90dvh)] max-[480px]:min-h-[400px] max-[480px]:w-[94vw]"
      >
        <nav aria-label="Main navigation" className="flex w-full shrink-0 gap-2">
          <button
            type="button"
            className={`flex-1 rounded-t-xl border border-b-0 px-5 py-3 text-base font-semibold text-[var(--text)] transition max-[480px]:px-2.5 max-[480px]:py-[11px] ${activeView === "add" ? "border-[var(--accent)] bg-[var(--bg)]" : "border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-light)]"}`}
            onClick={() => setActiveView("add")}
            aria-pressed={activeView === "add"}
          >
            Add Task
          </button>
          <button
            type="button"
            className={`flex-1 rounded-t-xl border border-b-0 px-5 py-3 text-base font-semibold text-[var(--text)] transition max-[480px]:px-2.5 max-[480px]:py-[11px] ${activeView === "list" ? "border-[var(--accent)] bg-[var(--bg)]" : "border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-light)]"}`}
            onClick={() => setActiveView("list")}
            aria-pressed={activeView === "list"}
          >
            List
          </button>
        </nav>

        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-b-[14px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] shadow-[var(--shadow)] transition-colors duration-300 [&>section]:h-full [&>section]:min-h-0 [&>section]:w-full">
          {activeView === "add" ? (
            <AddTask onSubmitTasks={handleSubmitTasks} />
          ) : (
            <TaskList tasks={tasks} onTasksChange={setTasks} />
          )}
        </div>
      </main>
    </div>
  );
}
