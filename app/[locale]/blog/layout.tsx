import type React from "react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isPt = locale === "pt"
  const url = isPt ? "https://vhs4.dev/blog" : "https://vhs4.dev/en/blog"
  const title = isPt
    ? "Blog - Victor Hugo Campos | IA, Desenvolvimento e Carreira"
    : "Blog - Victor Hugo Campos | AI, Development and Career"
  const description = isPt
    ? "Artigos práticos sobre desenvolvimento, inteligência artificial, performance web e carreira para devs que querem evoluir."
    : "Practical articles on development, artificial intelligence, web performance and career for devs who want to grow."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": "https://vhs4.dev/blog", "en-US": "https://vhs4.dev/en/blog" },
    },
    openGraph: { title, description, url, type: "website" },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
