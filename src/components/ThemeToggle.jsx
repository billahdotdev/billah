"use client"

import { FaMoon, FaSun } from "react-icons/fa"
import "../styles/ThemeToggle.css"

function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button neo-button-small"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <FaSun className="theme-icon sun animate-spin-slow" /> : <FaMoon className="theme-icon moon" />}
    </button>
  )
}

export default ThemeToggle

