import { useState } from 'react';

function ThemeToggle() {
    const [theme, setTheme] = useState(
        () => document.documentElement.dataset.theme || "light"
    );

    const next = theme === "dark" ? "light" : "dark";

    function handleClick() {
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch (err) {
            console.error(err);
        }
        setTheme(next);
    }

    return (
        <button type="button" className="theme-toggle" aria-label={`Switch to ${next} mode`} onClick={handleClick}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
            </svg>
        </button>
    )
}

export default ThemeToggle;