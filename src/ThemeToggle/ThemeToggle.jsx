
import { useState, useEffect } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("light-root", "dark-root");
        root.classList.add(`${theme}-root`);

        localStorage.setItem("theme", theme);
    }, [theme]);

    function handleThemeToggle() {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
        );
    }

    return (
        <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
            {theme === "dark" ? "☀" : "☾"}
        </button>
    );
}

export default ThemeToggle;
