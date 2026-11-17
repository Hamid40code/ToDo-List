import { useEffect, useState } from "react";
import {
  readThemePreference,
  saveThemePreference,
  type Theme,
} from "../utils/storage";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readThemePreference);
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-root", theme === "light");
    root.classList.toggle("dark-root", theme === "dark");
    saveThemePreference(theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="fixed left-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] p-0 text-2xl text-[var(--text)] transition duration-300 hover:rotate-[15deg] hover:border-[var(--accent)] active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
