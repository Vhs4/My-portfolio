import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed", // PT has no prefix (/), EN has /en prefix
  localeDetection: false, // Locale is always determined by URL, not cookies/headers
})
