import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import ProjectCalculatorChatbot from "@/components/calculator-with-chatbot"
import ClarityClient from "@/lib/clarity"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isPt = locale === "pt"

  return {
    title: isPt
      ? "Victor Hugo Campos - Desenvolvedor Full Stack | Portfólio & Blog"
      : "Victor Hugo Campos - Full Stack Developer | Portfolio & Blog",
    description: isPt
      ? "Desenvolvedor Full Stack & AI, liderei o time campeão regional do NASA Space Apps Challenge. Transformo ideias em experiências digitais que impactam milhares de pessoas."
      : "20-year-old Full Stack Developer, led the regional champion team at NASA Space Apps Challenge. I turn ideas into digital experiences that impact thousands of lives.",
    keywords: isPt
      ? "victor hugo, victor hugo campos, vhs4, desenvolvedor full stack, react, nextjs, nodejs, portfólio, blog, typescript, nasa space apps, aws certificado"
      : "victor hugo, victor hugo campos, vhs4, full stack developer, react, nextjs, nodejs, portfolio, blog, typescript, nasa space apps, aws certified",
    icons: {
      icon: "/fotoperfil.webp",
      shortcut: "/fotoperfil.webp",
    },
    authors: [{ name: "Victor Hugo" }],
    creator: "Victor Hugo",
    publisher: "Victor Hugo",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL("https://vhs4.dev"),
    alternates: {
      canonical: isPt ? "https://vhs4.dev" : "https://vhs4.dev/en",
      languages: {
        "pt-BR": "https://vhs4.dev",
        "en-US": "https://vhs4.dev/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      alternateLocale: isPt ? "en_US" : "pt_BR",
      url: isPt ? "https://vhs4.dev" : "https://vhs4.dev/en",
      title: isPt
        ? "Victor Hugo Campos - Desenvolvedor Full Stack"
        : "Victor Hugo Campos - Full Stack Developer",
      description: isPt
        ? "Liderei o time campeão regional do NASA Space Apps Challenge aos 18 anos. Código que transforma o futuro."
        : "Led the regional champion team at NASA Space Apps Challenge at 18. Code that shapes the future.",
      siteName: "Victor Hugo Campos Portfolio",
      images: [
        {
          url: "/fotoperfil.webp",
          width: 1200,
          height: 630,
          alt: isPt
            ? "Victor Hugo Campos - Desenvolvedor Full Stack"
            : "Victor Hugo Campos - Full Stack Developer",
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
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <>
      <ClarityClient />
      <link rel="alternate" hrefLang="pt-BR" href="https://vhs4.dev" />
      <link rel="alternate" hrefLang="en-US" href="https://vhs4.dev/en" />
      <link rel="alternate" hrefLang="x-default" href="https://vhs4.dev" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Victor Hugo Campos",
            jobTitle: locale === "pt" ? "Desenvolvedor Full Stack" : "Full Stack Developer",
            description:
              locale === "pt"
                ? "Desenvolvedor Full Stack & AI, liderei o time campeão regional do NASA Space Apps Challenge."
                : "20-year-old Full Stack Developer, led the regional champion team at NASA Space Apps Challenge.",
            url: "https://vhs4.dev",
            sameAs: ["https://github.com/vhs4", "https://linkedin.com/in/vhs4"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Campos dos Goytacazes, RJ",
              addressCountry: "BR",
            },
            email: "contato@vhs4.dev",
            knowsAbout: [
              "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
              "AWS", "React Native", "Full Stack Development", "Machine Learning",
              "Space Technology", "Web Security", "Performance Optimization",
            ],
          }),
        }}
      />
      <link rel="canonical" href={locale === "pt" ? "https://vhs4.dev" : "https://vhs4.dev/en"} />
      <NextIntlClientProvider messages={messages}>
        {children}
        <ProjectCalculatorChatbot />
      </NextIntlClientProvider>
    </>
  )
}
