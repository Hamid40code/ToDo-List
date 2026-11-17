import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import arrowDownImage from "../assets/arrow-big-down-dash.png";
import arrowUpImage from "../assets/arrow-big-up-dash.png";
import deleteImage from "../assets/circle-x.png";
import {
  DRAFT_STORAGE_KEY,
  loadDraftTasks,
  saveJson,
} from "../utils/storage";

interface AddTaskProps {
  onSubmitTasks: (tasks: string[]) => void;
}

type MoveDirection = -1 | 1;

export default function AddTask({ onSubmitTasks }: AddTaskProps) {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>(loadDraftTasks);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    saveJson(DRAFT_STORAGE_KEY, items);
  }, [items]);

  useEffect(() => {
    if (!showSuccess) return;

    // Allow the success animation to finish before submitting the draft.
    const timerId = window.setTimeout(() => {
      saveJson(DRAFT_STORAGE_KEY, []);
      onSubmitTasks(items);
    }, 1050);

    return () => window.clearTimeout(timerId);
  }, [items, onSubmitTasks, showSuccess]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleAdd(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newTask = inputValue.trim();
    if (!newTask || showSuccess) return;

    setItems((currentItems) => [...currentItems, newTask]);
    setInputValue("");
  }

  function handleDelete(index: number): void {
    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function handleMove(index: number, direction: MoveDirection): void {
    setItems((currentItems) => {
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= currentItems.length) {
        return currentItems;
      }

      const updatedItems = [...currentItems];
      const currentItem = updatedItems[index];
      const nextItem = updatedItems[nextIndex];

      if (currentItem === undefined || nextItem === undefined) {
        return currentItems;
      }

      updatedItems[index] = nextItem;
      updatedItems[nextIndex] = currentItem;
      return updatedItems;
    });
  }

  function handleSubmit(): void {
    if (showSuccess || items.length === 0) return;
    setShowSuccess(true);
  }

  return (
    <section className="relative flex h-full min-h-0 flex-col items-stretch gap-4 p-6 text-[var(--text)] max-[480px]:p-3.5">
      <form className="flex w-full shrink-0 gap-2.5" onSubmit={handleAdd}>
        <input
          type="text"
          className="min-w-0 flex-1 rounded-[9px] border border-[var(--border)] bg-[var(--bg-light)] px-3.5 py-[11px] text-base text-[var(--text)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent)_18%,transparent)] max-[480px]:text-[.95rem]"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Write a task..."
          aria-label="New task"
          autoComplete="off"
          disabled={showSuccess}
        />
        <button
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-green-600 px-3 py-[9px] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={showSuccess || inputValue.trim().length === 0}
        >
          Add
        </button>
      </form>

      <ul
        className="task-scrollbar flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-auto px-0.5 py-1 text-left"
        aria-label="Tasks ready to submit"
      >
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-light)] p-2.5 text-[var(--text)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow)] motion-safe:animate-[task-enter_.28s_ease_both] max-[480px]:gap-[5px] max-[480px]:p-2"
          >
            <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{item}</span>

            <button
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-[var(--accent)] px-3 py-[9px] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 max-[480px]:p-2"
              type="button"
              onClick={() => handleMove(index, -1)}
              disabled={index === 0 || showSuccess}
              aria-label={`Move ${item} up`}
            >
              <img
                className="pointer-events-none size-[18px] object-contain"
                src={arrowUpImage}
                alt=""
              />
            </button>

            <button
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-red-600 px-3 py-[9px] transition hover:-translate-y-0.5 hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 max-[480px]:p-2"
              type="button"
              onClick={() => handleDelete(index)}
              disabled={showSuccess}
              aria-label={`Delete ${item}`}
            >
              <img
                className="pointer-events-none size-[18px] object-contain"
                src={deleteImage}
                alt=""
              />
            </button>

            <button
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-[var(--accent)] px-3 py-[9px] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 max-[480px]:p-2"
              type="button"
              onClick={() => handleMove(index, 1)}
              disabled={index === items.length - 1 || showSuccess}
              aria-label={`Move ${item} down`}
            >
              <img
                className="pointer-events-none size-[18px] object-contain"
                src={arrowDownImage}
                alt=""
              />
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="pointer-events-none absolute left-6 right-6 top-1/2 -translate-y-1/2 text-center text-sm text-[var(--text-muted)] max-[480px]:left-3.5 max-[480px]:right-3.5">
          Your task queue is empty. Add a task to get started.
        </p>
      )}

      <button
        className="mx-auto min-w-[74px] shrink-0 rounded-lg bg-neutral-600 px-[18px] py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        onClick={handleSubmit}
        disabled={showSuccess || items.length === 0}
      >
        Submit
      </button>

      {showSuccess && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] font-bold text-[var(--text)] motion-safe:animate-[success-overlay-in_.25s_ease_both]"
          role="status"
          aria-live="polite"
        >
          <div className="size-[100px] drop-shadow-[0_0_16px_rgba(34,197,94,.24)]">
            <svg viewBox="0 0 72 72" className="size-full overflow-visible" aria-hidden="true">
              <circle
                className="fill-[rgba(34,197,94,0.12)] stroke-[#22c55e] [stroke-width:3] [stroke-dasharray:195] [stroke-dashoffset:195] [animation:draw-circle_.55s_ease_forwards,success-pulse_.7s_.55s_ease_both]"
                cx="36"
                cy="36"
                r="31"
              />
              <path
                className="fill-none stroke-[#22c55e] [stroke-width:5] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:48] [stroke-dashoffset:48] [animation:draw-tick_.35s_.48s_ease_forwards]"
                d="M20 37 L30 47 L52 25"
              />
            </svg>
          </div>
          <span>Tasks submitted!</span>
        </div>
      )}
    </section>
  );
}
