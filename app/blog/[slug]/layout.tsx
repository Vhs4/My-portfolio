import type React from "react"
import type { Metadata } from "next"
import { carreiraDesenvolvedorHeroData } from "../posts/carreira-desenvolvedor"
import { performanceWeb2025HeroData } from "../posts/performance-web-2025"
import { reactServerComponentsHeroData } from "../posts/react-server-components"
import { aprenderInglesHeroData } from "../posts/aprender-ingles-2025"
import { liderancaNaTecnologiaHeroData } from "../posts/lideranca-na-tecnologia"

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostData(params.slug)

  if (!post) {
    return {
      title: "Post não encontrado - Victor Hugo Blog",
      description: "O post que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${post.titulo} - Victor Hugo Blog`,
    description: post.resumo,
    keywords: "desenvolvimento web, programação, tecnologia, next.js, react, javascript, victor hugo",
    authors: [{ name: post.autor }],
    creator: post.autor,
    publisher: "Victor Hugo",
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      type: "article",
      locale: "pt_BR",
      url: `https://vhs4.dev/blog/${params.slug}`,
      siteName: "Victor Hugo Blog",
      publishedTime: post.dataPublicacao,
      authors: [post.autor],
      images: [
        {
          url: `https://vhs4.dev${post.imagem}`,
          width: 1200,
          height: 630,
          alt: post.titulo,
        },
      ],
    },
    alternates: {
      canonical: `https://vhs4.dev/blog/${params.slug}`,
    },
  }
}

export default function BlogPostLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  const post = getPostData(params.slug)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.titulo,
            description: post.resumo,
            author: {
              "@type": "Person",
              name: post.autor,
              url: "https://vhs4.dev",
            },
            datePublished: post.dataPublicacao,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://vhs4.dev/blog/${post.id}`,
            },
          }),
        }}
      />
      {children}
    </>
  )
}