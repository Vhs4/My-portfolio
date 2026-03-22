import type { ReactNode } from "react"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { getLocale } from "next-intl/server"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en-US"}
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
