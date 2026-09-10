import type React from "react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isPt = locale === "pt"
  const url = isPt ? "https://vhs4.dev/sobre" : "https://vhs4.dev/en/sobre"
  const title = isPt
    ? "Sobre - Victor Hugo Campos | Engenheiro de IA & Software"
    : "About - Victor Hugo Campos | AI & Software Engineer"
  const description = isPt
    ? "Engenheiro de IA & Software: sistemas multi-agentes em produção, GCP e AWS, 2x certificado AWS, campeão regional do NASA Space Apps e 2º lugar nacional no hackathon CAPES."
    : "AI & Software Engineer: multi-agent systems in production, GCP and AWS, 2x AWS Certified, NASA Space Apps regional champion and 2nd place in Brazil at the CAPES hackathon."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": "https://vhs4.dev/sobre", "en-US": "https://vhs4.dev/en/sobre" },
    },
    openGraph: { title, description, url, type: "profile" },
  }
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children
}
