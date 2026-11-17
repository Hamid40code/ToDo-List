import type { Task } from "../types/task";

// Keep these keys stable so existing saved data remains available after updates.
export const DRAFT_STORAGE_KEY = "tasks";
export const SUBMITTED_STORAGE_KEY = "submittedTasks";
export const THEME_STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

function readStoredValue(key: string): unknown {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? null : (JSON.parse(storedValue) as unknown);
  } catch {
    // Invalid JSON or unavailable storage should not prevent the app from loading.
    return null;
  }
}

function readTaskText(value: unknown): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && "text" in value) {
    const text = value.text;
    return typeof text === "string" ? text : "";
  }

  return "";
}

export function loadDraftTasks(): string[] {
  const storedValue = readStoredValue(DRAFT_STORAGE_KEY);
  if (!Array.isArray(storedValue)) return [];

  return storedValue
    .map(readTaskText)
    .filter((text) => text.trim().length > 0);
}

export function loadSubmittedTasks(): Task[] {
  const storedValue = readStoredValue(SUBMITTED_STORAGE_KEY);
  if (!Array.isArray(storedValue)) return [];

  return storedValue
    .map((item: unknown, index): Task | null => {
      // Support the string-only format used by the earliest app version.
      if (typeof item === "string") {
        const text = item.trim();
        return text
          ? { id: `legacy-${index}`, text, done: false }
          : null;
      }

      if (!item || typeof item !== "object" || !("text" in item)) {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const text = typeof candidate.text === "string" ? candidate.text.trim() : "";
      if (!text) return null;

      const storedId = typeof candidate.id === "string" ? candidate.id.trim() : "";

      return {
        id: storedId || `restored-${index}`,
        text,
        done: candidate.done === true,
      };
    })
    .filter((task): task is Task => task !== null);
}

export function saveJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the app usable for the current session if storage is blocked or full.
  }
}

export function readThemePreference(): Theme {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function saveThemePreference(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still works for the current session.
  }
}

export function createTaskId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
