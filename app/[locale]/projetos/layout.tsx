import type React from "react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isPt = locale === "pt"
  const url = isPt ? "https://vhs4.dev/projetos" : "https://vhs4.dev/en/projetos"
  const title = isPt
    ? "Projetos - Victor Hugo Campos | IA, Web e Mobile"
    : "Projects - Victor Hugo Campos | AI, Web and Mobile"
  const description = isPt
    ? "Projetos reais em produção: tutora de IA multiagente no WhatsApp, plataforma de ensino com IA, agentes de qualificação de leads, app enterprise de bem-estar e mais."
    : "Real projects in production: multi-agent AI tutor on WhatsApp, AI-powered learning platform, lead qualification agents, enterprise wellness app and more."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": "https://vhs4.dev/projetos", "en-US": "https://vhs4.dev/en/projetos" },
    },
    openGraph: { title, description, url, type: "website" },
  }
}

export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
  return children
}
