import type React from "react"
import type { Metadata } from "next"

const projetos: Record<string, { pt: { title: string; description: string }; en: { title: string; description: string } }> = {
  iara: {
    pt: {
      title: "Iara - Tutora de IA Multiagente no WhatsApp | Victor Hugo Campos",
      description:
        "Tutora de IA multiagente de educação financeira no WhatsApp: mais de 7.000 alunos, mais de 1,5 milhão de mensagens, personalização em tempo real e infraestrutura no Google Cloud (GCP).",
    },
    en: {
      title: "Iara - Multi-agent AI Tutor on WhatsApp | Victor Hugo Campos",
      description:
        "Multi-agent AI tutor teaching financial literacy on WhatsApp: 7,000+ students, 1.5M+ messages processed, real-time personalization and Google Cloud (GCP) infrastructure.",
    },
  },
  questy: {
    pt: {
      title: "Questy - Plataforma de Ensino com IA | Victor Hugo Campos",
      description:
        "Plataforma completa de ensino com IA: geração de questões com GPT-4o a partir de PDFs, quiz ao vivo estilo Kahoot, gamificação e análise de déficit de aprendizagem por aluno.",
    },
    en: {
      title: "Questy - AI-powered Learning Platform | Victor Hugo Campos",
      description:
        "Complete AI-powered learning platform: GPT-4o question generation from PDFs, Kahoot-style live quizzes, gamification and per-student learning gap analysis.",
    },
  },
  "esphera-glamping": {
    pt: {
      title: "Esphera Glamping - Site e Agentes de IA | Victor Hugo Campos",
      description:
        "Site multilíngue e agentes de IA no WhatsApp para o maior glamping de domos geodésicos do Brasil: qualificação autônoma de leads e concierge interno com RAG.",
    },
    en: {
      title: "Esphera Glamping - Website and AI Agents | Victor Hugo Campos",
      description:
        "Multilingual website and WhatsApp AI agents for Brazil's largest geodesic dome glamping: autonomous lead qualification and a RAG-powered internal concierge.",
    },
  },
  fully: {
    pt: {
      title: "Fully (Prudential) - App de Bem-estar | Victor Hugo Campos",
      description:
        "App enterprise de bem-estar físico, mental e financeiro com mais de 100 mil usuários: backend NestJS, AWS serverless e notas elevadas para 4.3 no iOS e 4.9 no Android.",
    },
    en: {
      title: "Fully (Prudential) - Wellness App | Victor Hugo Campos",
      description:
        "Enterprise wellness app covering physical, mental and financial health with 100k+ users: NestJS backend, serverless AWS and ratings raised to 4.3 on iOS and 4.9 on Android.",
    },
  },
  "analise-fraudes": {
    pt: {
      title: "Sistema de Análise de Fraudes com IA | Victor Hugo Campos",
      description:
        "Front-end de plataforma de prevenção e detecção de fraudes com inteligência artificial: dashboards em tempo real com React, TypeScript e AWS.",
    },
    en: {
      title: "AI Fraud Analysis System | Victor Hugo Campos",
      description:
        "Front-end for an AI-powered fraud prevention and detection platform: real-time dashboards built with React, TypeScript and AWS.",
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const isPt = locale === "pt"
  const projeto = projetos[slug]

  if (!projeto) {
    return { title: isPt ? "Projeto não encontrado | Victor Hugo Campos" : "Project not found | Victor Hugo Campos" }
  }

  const meta = isPt ? projeto.pt : projeto.en
  const url = isPt ? `https://vhs4.dev/projetos/${slug}` : `https://vhs4.dev/en/projetos/${slug}`

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `https://vhs4.dev/projetos/${slug}`,
        "en-US": `https://vhs4.dev/en/projetos/${slug}`,
      },
    },
    openGraph: { title: meta.title, description: meta.description, url, type: "article" },
  }
}

export default function ProjetoLayout({ children }: { children: React.ReactNode }) {
  return children
}
