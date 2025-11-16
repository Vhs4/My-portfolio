import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import ProjectCalculatorChatbot from "@/components/calculator-with-chatbot"
import ClarityClient from "@/lib/clarity"

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
  title: "Victor Hugo Campos - Desenvolvedor Full Stack | Portfólio & Blog",
  description:
    "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do NASA Space Apps Challenge. Transformo ideias em experiências digitais que impactam milhares de pessoas.",
  keywords:
    "victor hugo, victor hugo campos, vhs4, victor vhs4, victor hugo vhs4, victor hugo campos vhs4, vhs4 dev, victor hugo dev, victor hugo campos dev, victor hugo desenvolvedor, victor hugo campos desenvolvedor, desenvolvedor full stack, react, nextjs, nodejs, portfolio, blog, javascript, typescript, nasa space apps, aws certified",
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
    title: "Victor Hugo Campos - Desenvolvedor Full Stack",
    description: "liderei o time campeão regional do NASA Space Apps Challenge aos 18 anos. Código que transforma o futuro.",
    siteName: "Victor Hugo Campos Portfolio",
    images: [
      {
        url: "/fotoperfil.webp",
        width: 1200,
        height: 630,
        alt: "Victor Hugo Campos - Desenvolvedor Full Stack",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
        <ClarityClient />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Victor Hugo Campos",
              jobTitle: "Desenvolvedor Full Stack",
              description:
                "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do NASA Space Apps Challenge e especialista em transformar ideias em soluções tecnológicas de impacto global.",
              url: "https://vhs4.dev",
              sameAs: [
                "https://github.com/vhs4",
                "https://linkedin.com/in/vhs4",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Campos dos Goytacazes, RJ",
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
                "Web Security",
                "Performance Optimization",
              ],
              securityContact: "contato@vhs4.dev",
            }),
          }}
        />

        <link rel="canonical" href="https://vhs4.dev" />
      </head>

      <body className="font-sans">

        {children}
        <ProjectCalculatorChatbot />
      </body>
    </html>
  )
}