import type React from "react"
import type { Metadata } from "next"
import { carreiraDesenvolvedorHeroData } from "../../../blog/posts/carreira-desenvolvedor"
import { performanceWeb2025HeroData } from "../../../blog/posts/performance-web-2025"
import { reactServerComponentsHeroData } from "../../../blog/posts/react-server-components"
import { aprenderInglesHeroData } from "../../../blog/posts/aprender-ingles-2025"
import { liderancaNaTecnologiaHeroData } from "../../../blog/posts/lideranca-na-tecnologia"

function getPostData(slug: string) {
  const posts = {
    "carreira-desenvolvedor-2025": carreiraDesenvolvedorHeroData,
    "performance-web-2025": performanceWeb2025HeroData,
    "react-server-components": reactServerComponentsHeroData,
    "aprender-ingles-2025": aprenderInglesHeroData,
    "lideranca-na-tecnologia-2025": liderancaNaTecnologiaHeroData,
  }
  return posts[slug as keyof typeof posts]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const isPt = locale === "pt"
  const post = getPostData(slug)

  if (!post) {
    return { title: isPt ? "Post não encontrado - Victor Hugo Blog" : "Post not found - Victor Hugo Blog" }
  }

  const url = isPt ? `https://vhs4.dev/blog/${slug}` : `https://vhs4.dev/en/blog/${slug}`

  return {
    title: `${post.titulo} - Victor Hugo Blog`,
    description: post.resumo,
    authors: [{ name: post.autor }],
    alternates: {
      canonical: `https://vhs4.dev/blog/${slug}`,
      languages: {
        "pt-BR": `https://vhs4.dev/blog/${slug}`,
        "en-US": `https://vhs4.dev/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      type: "article",
      url,
      publishedTime: post.dataPublicacao,
      images: [{ url: `https://vhs4.dev${post.imagem}`, width: 1200, height: 630, alt: post.titulo }],
    },
  }
}

export default function BlogPostLocaleLayout({ children }: { children: React.ReactNode }) {
  return children
}
