"use client"

import { useEffect, useState } from "react"

export function setTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem("theme", next)
  } catch {}
}

export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setThemeState] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    setThemeState((document.documentElement.dataset.theme as "light" | "dark") || "light")
    const mo = new MutationObserver(() => setThemeState(document.documentElement.dataset.theme as "light" | "dark"))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [])

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  )
}
