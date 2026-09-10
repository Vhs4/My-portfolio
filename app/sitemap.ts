import type { MetadataRoute } from "next"

const baseUrl = "https://vhs4.dev"

const paginas = [
  { path: "", priority: 1, freq: "monthly" as const },
  { path: "/sobre", priority: 0.8, freq: "monthly" as const },
  { path: "/projetos", priority: 0.9, freq: "weekly" as const },
  { path: "/blog", priority: 0.9, freq: "weekly" as const },
]

const projetos = ["iara", "questy", "esphera-glamping", "fully", "analise-fraudes"]

const posts = [
  "react-server-components",
  "performance-web-2025",
  "carreira-desenvolvedor-2025",
  "aprender-ingles-2025",
  "lideranca-na-tecnologia-2025",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()
  const entradas: MetadataRoute.Sitemap = []

  for (const p of paginas) {
    entradas.push({ url: `${baseUrl}${p.path}`, lastModified: agora, changeFrequency: p.freq, priority: p.priority })
    entradas.push({ url: `${baseUrl}/en${p.path}`, lastModified: agora, changeFrequency: p.freq, priority: p.priority * 0.9 })
  }

  for (const slug of projetos) {
    entradas.push({ url: `${baseUrl}/projetos/${slug}`, lastModified: agora, changeFrequency: "monthly", priority: 0.8 })
    entradas.push({ url: `${baseUrl}/en/projetos/${slug}`, lastModified: agora, changeFrequency: "monthly", priority: 0.7 })
  }

  for (const slug of posts) {
    entradas.push({ url: `${baseUrl}/blog/${slug}`, lastModified: agora, changeFrequency: "yearly", priority: 0.6 })
  }

  return entradas
}
