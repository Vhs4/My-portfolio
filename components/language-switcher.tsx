"use client"

import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  const switchLocale = (newLocale: "pt" | "en") => {
    if (newLocale === locale) return
    // Strip any /en or /pt prefix, then prepend the new locale prefix
    const stripped = pathname.replace(/^\/(en|pt)(\/|$)/, "/") || "/"
    if (newLocale === "en") {
      window.location.href = `/en${stripped === "/" ? "" : stripped}`
    } else {
      window.location.href = stripped
    }
  }

  return (
    <div className="flex items-center gap-1 border border-royal-blue/30 rounded-full p-1">
      <button
        onClick={() => switchLocale("pt")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          locale === "pt"
            ? "bg-royal-blue text-white"
            : "text-gray-400 hover:text-royal-blue"
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          locale === "en"
            ? "bg-royal-blue text-white"
            : "text-gray-400 hover:text-royal-blue"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
