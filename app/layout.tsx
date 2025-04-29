import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const keywords = [
  "Victor Hugo",
  "vhs4",
  "programador vhs4",
  "desenvolvedor vhs4",
  "programador victor hugo",
  "desenvolvedor victor hugo",
  "programador victor hugo vhs4",
  "desenvolvedor victor hugo vhs4",
  "programador full stack",
  "desenvolvedor full stack Brasil",
  "desenvolvedor full stack vhs4",
  "desenvolvedor full stack victor hugo",
  "desenvolvedor full stack",
  "programador Rio de Janeiro",
  "programador Campos",
  "programador Campos dos Goytacazes",
  "programador Campos dos Goytacazes RJ",
  "programador Brasil",
  "programador São Paulo",
  "desenvolvedor React",
  "desenvolvedor Next.js",
  "desenvolvedor Node.js",
  "portfolio desenvolvedor",
  "NASA Space Apps Challenge",
  "desenvolvedor premiado",
  "desenvolvedor web Brasil",
]

export const metadata: Metadata = {
  title: {
    default: "Victor Hugo | Desenvolvedor Full Stack | vhs4",
    template: "%s | Victor Hugo - vhs4",
  },
  description:
    "Portfólio de Victor Hugo (vhs4), desenvolvedor full stack premiado pela NASA. Especializado em React, Next.js, Node.js e soluções digitais inovadoras para empresas como SysMap Solutions e Fully Ecosystem.",
  keywords: keywords,
  authors: [{ name: "Victor Hugo", url: "https://github.com/vhs4" }],
  creator: "Victor Hugo",
  publisher: "Victor Hugo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    siteName: "Victor Hugo | Desenvolvedor Full Stack",
    title: "Victor Hugo (vhs4) | Desenvolvedor Full Stack Premiado",
    description:
      "Desenvolvedor full stack com experiência em React, Next.js e Node.js. Líder de equipe premiada pela NASA no Space Apps Challenge.",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Victor Hugo - Desenvolvedor Full Stack",
      },
    ],
  },
  category: "technology"
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Victor Hugo",
              alternateName: "vhs4",
              description: "Desenvolvedor Full Stack especializado em React, Next.js e Node.js",
              sameAs: ["https://github.com/vhs4", "https://linkedin.com/in/vhs4"],
              jobTitle: "Desenvolvedor de Software | Full Stack",
              worksFor: {
                "@type": "Organization",
                name: "SysMap Solutions",
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "FIAP - Faculdade de Informática e Administração Paulista",
              },
              award: "NASA Space Apps Challenge Regional Winner",
              knowsAbout: ["Web Development", "React", "Next.js", "Node.js", "JavaScript", "TypeScript"],
            }),
          }}
        />

        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Victor Hugo | Desenvolvedor Full Stack",
              description:
                "Portfólio profissional de Victor Hugo (vhs4), desenvolvedor full stack premiado pela NASA.",
              author: {
                "@type": "Person",
                name: "Victor Hugo",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
