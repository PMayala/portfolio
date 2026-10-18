"use client"

import { useState } from "react"

export default function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1800)
        } catch {
          window.location.href = `mailto:${email}`
        }
      }}
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  )
}
