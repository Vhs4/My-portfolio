import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import ProjectCalculatorChatbot from "@/components/calculator-with-chatbot"

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

export const metadata: Metadata = {
  title: "Victor Hugo - Desenvolvedor Full Stack | Portfólio & Blog",
  description:
    "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do  NASA Space Apps Challenge. Transformo ideias em experiências digitais que impactam milhares de pessoas.",
  keywords:
    "victor hugo, desenvolvedor full stack, react, nextjs, nodejs, portfolio, blog, javascript, typescript, nasa space apps, aws certified, fully app",
  icons: {
    icon: "/fotoperfil.webp",
    shortcut: "/fotoperfil.webp",
  },
  authors: [{ name: "Victor Hugo" }],
  creator: "Victor Hugo",
  publisher: "Victor Hugo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vhs4.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vhs4.dev",
    title: "Victor Hugo - Desenvolvedor Full Stack",
    description: "liderei o time campeão regional do  NASA Space Apps Challenge aos 18 anos. Código que transforma o futuro.",
    siteName: "Victor Hugo Portfolio",
    images: [
      {
        url: "/fotoperfil.webp",
        width: 1200,
        height: 630,
        alt: "Victor Hugo - Desenvolvedor Full Stack",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Victor Hugo",
              jobTitle: "Desenvolvedor Full Stack",
              description:
                "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do  NASA Space Apps Challenge e especialista em transformar ideias em soluções tecnológicas de impacto global.",
              url: "https://vhs4.dev",
              sameAs: [
                "https://github.com/victorhugo",
                "https://linkedin.com/in/victorhugo",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressCountry: "BR",
              },
              email: "contato@vhs4.dev",
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "AWS",
                "React Native",
                "Full Stack Development",
                "Machine Learning",
                "Space Technology",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">{children}
        <ProjectCalculatorChatbot />
      </body>
    </html>
  )
}
