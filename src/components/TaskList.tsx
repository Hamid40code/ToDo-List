import { useState, type Dispatch, type SetStateAction } from "react";
import type { Task, TaskFilter } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onTasksChange: Dispatch<SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, onTasksChange }: TaskListProps) {
  const [filter, setFilter] = useState<TaskFilter>("active");

  const activeCount = tasks.filter((task) => !task.done).length;
  const completedCount = tasks.length - activeCount;
  const visibleTasks = tasks.filter((task) =>
    filter === "completed" ? task.done : !task.done,
  );

  function updateTaskStatus(id: string, done: boolean): void {
    onTasksChange((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, done } : task)),
    );
  }

  function deleteTask(id: string): void {
    onTasksChange((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }

  return (
    <section
      className="flex h-full min-h-0 flex-col gap-4 p-5 text-[var(--text)] max-[480px]:gap-3 max-[480px]:p-3.5"
      aria-label="Submitted tasks"
    >
      <div
        className="flex shrink-0 gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-dark)] p-1"
        role="group"
        aria-label="Task filters"
      >
        <button
          type="button"
          aria-pressed={filter === "active"}
          className={`flex flex-1 items-center justify-center gap-2 rounded-[9px] border px-3 py-2.5 font-bold transition max-[480px]:px-1.5 max-[480px]:py-[9px] max-[480px]:text-[.9rem] ${filter === "active" ? "border-[var(--border)] bg-[var(--bg-light)] text-[var(--text)] shadow-sm" : "border-transparent bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"}`}
          onClick={() => setFilter("active")}
        >
          Active
          <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[var(--border)] px-1.5 text-xs">
            {activeCount}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={filter === "completed"}
          className={`flex flex-1 items-center justify-center gap-2 rounded-[9px] border px-3 py-2.5 font-bold transition max-[480px]:px-1.5 max-[480px]:py-[9px] max-[480px]:text-[.9rem] ${filter === "completed" ? "border-[var(--border)] bg-[var(--bg-light)] text-[var(--text)] shadow-sm" : "border-transparent bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
          <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[var(--border)] px-1.5 text-xs">
            {completedCount}
          </span>
        </button>
      </div>

      {visibleTasks.length > 0 ? (
        <ul
          className="task-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-auto"
          aria-label={`${filter} tasks`}
        >
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className={`flex shrink-0 items-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-light)] p-2.5 text-[var(--text)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow)] max-[480px]:gap-[5px] max-[480px]:p-2 ${task.done ? "opacity-75" : ""}`}
            >
              <span
                className={`min-w-0 flex-1 [overflow-wrap:anywhere] ${task.done ? "relative text-[var(--text-muted)] after:absolute after:left-0 after:top-1/2 after:h-0.5 after:w-full after:origin-left after:bg-green-500 after:content-[''] after:animate-[draw-strike_.35s_ease_both]" : ""}`}
              >
                {task.text}
              </span>

              {task.done ? (
                <button
                  className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-[var(--accent)] text-[1.35rem] font-bold text-white transition hover:-translate-y-0.5 hover:brightness-110 max-[480px]:size-8"
                  type="button"
                  onClick={() => updateTaskStatus(task.id, false)}
                  aria-label={`Move ${task.text} back to Active`}
                  title="Move back to Active"
                >
                  ↶
                </button>
              ) : (
                <button
                  className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-green-600 text-white transition hover:-translate-y-0.5 hover:bg-green-700 max-[480px]:size-8"
                  type="button"
                  onClick={() => updateTaskStatus(task.id, true)}
                  aria-label={`Mark ${task.text} as completed`}
                  title="Mark as completed"
                >
                  <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
                    <path
                      d="M4.5 12.5 9.5 17 19.5 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="26"
                      strokeDashoffset="26"
                      className="[animation:draw-small-check_.35s_.05s_ease_forwards]"
                    />
                  </svg>
                </button>
              )}

              <button
                className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-red-600 text-2xl leading-none text-white transition hover:-translate-y-0.5 hover:bg-red-700 max-[480px]:size-8"
                type="button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
                title="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[150px] flex-1 flex-col items-center justify-center gap-2 text-center text-[var(--text-muted)]">
          <span
            className="mb-1 grid size-[52px] place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[1.7rem] text-[var(--accent)]"
            aria-hidden="true"
          >
            {filter === "completed" ? "✓" : "✦"}
          </span>
          <p className="font-bold text-[var(--text)]">
            {filter === "completed"
              ? "No completed tasks yet."
              : "Your active list is empty."}
          </p>
          <span className="text-sm">
            {filter === "completed"
              ? "Completed tasks will appear here."
              : "Submit tasks from Add Task to see them here."}
          </span>
        </div>
      )}
    </section>
  );
}
