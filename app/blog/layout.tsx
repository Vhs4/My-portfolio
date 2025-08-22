import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Victor Hugo Campos | Desenvolvedor Full Stack",
  description:
    "Artigos sobre desenvolvimento web, tecnologia e carreira. Conteúdo prático para desenvolvedores que querem evoluir constantemente.",
  keywords:
    "blog desenvolvimento, artigos programação, next.js, react, javascript, typescript, carreira desenvolvedor, tecnologia",
  openGraph: {
    title: "Blog - Victor Hugo Campos | Desenvolvedor Full Stack",
    description:
      "Artigos sobre desenvolvimento web, tecnologia e carreira. Conteúdo prático para desenvolvedores que querem evoluir constantemente.",
    type: "website",
    locale: "pt_BR",
    url: "https://vhs4.dev/blog",
    siteName: "Victor Hugo Campos Portfolio",
  },
  alternates: {
    canonical: "https://vhs4.dev/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
