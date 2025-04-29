import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://portfoliovhs4.vercel.app",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://portfoliovhs4.vercel.app/projetos",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://portfoliovhs4.vercel.app/contato",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ]
}
