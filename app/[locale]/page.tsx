"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Code, Rocket, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

export default function HomePage() {
  const t = useTranslations("home")
  const nav = useTranslations("nav")
  const locale = useLocale()
  const prefix = locale === "en" ? "/en" : ""

  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    setTimeout(() => setIsVisible(true), 500)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-pure-black text-pure-white overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-300 ${scrollY > 10 ? "backdrop-blur-md bg-pure-black/80" : "bg-transparent"}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href={prefix + "/"} className="font-heading font-bold text-xl hover-underline">VHS4</a>

          <div className="hidden md:flex items-center gap-8">
            <a href={prefix + "/projetos"} className="font-body hover-underline">{nav("projects")}</a>
            <a href={prefix + "/sobre"} className="font-body hover-underline">{nav("about")}</a>
            <a href={prefix + "/blog"} className="font-body hover-underline">{nav("blog")}</a>
            <a href={locale === "en" ? "https://wa.me/+5522999018809?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} className="font-body hover-underline">{nav("contact")}</a>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            {isMenuOpen ? (
              <button onClick={toggleMenu}><X /></button>
            ) : (
              <button onClick={toggleMenu}><Menu /></button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a href={prefix + "/projetos"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("projects")}</a>
            <a href={prefix + "/sobre"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("about")}</a>
            <a href={prefix + "/blog"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("blog")}</a>
            <a href={locale === "en" ? "https://wa.me/+5522999018809?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("contact")}</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pure-black via-deep-gray to-pure-black" />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 md:mt-24 md:mb-24">
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className={`w-full h-full rounded-full overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                <Image
                  src="/fotoperfil.webp"
                  alt="Victor Hugo - Developer"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 96px, 128px"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-royal-blue opacity-20 animate-glitch" />
            </div>
          </div>

          <div className={`transition-all duration-1500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl mb-6 animate-kinetic-text">
              <span className="block">{t("hero.line1")}</span>
              <span className="block text-royal-blue">{t("hero.line2")}</span>
              <span className="block">{t("hero.line3")}</span>
              <span className="block text-royal-blue-light">{t("hero.line4")}</span>
            </h1>
          </div>

          <div className={`transition-all duration-1500 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="font-body text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {locale === "pt" ? (
                <>Aos 20 anos, já <span className="text-royal-blue font-semibold">liderei o time campeão regional do NASA Space Apps Challenge</span> e além disso já impactei +50 mil pessoas. Transformo ideias em experiências digitais que impactam milhares de vidas.</>
              ) : (
                <>At 20, I already <span className="text-royal-blue font-semibold">led the regional champion team at the NASA Space Apps Challenge</span> and have already impacted 50k+ people. I turn ideas into digital experiences that impact thousands of lives.</>
              )}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1500 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105" asChild>
              <Link href={prefix + "/projetos"}>
                {t("hero.cta_projects")}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="lg" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 bg-transparent cursor-pointer">
                  {t("hero.cta_cv")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4">
                <p className="text-sm font-semibold mb-3 text-center">{t("hero.cv_choose_lang")}</p>
                <div className="flex gap-2">
                  <a href="/curriculo_victor_hugo_campos_oficial.pdf" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="cursor-pointer">🇧🇷 Português</Button>
                  </a>
                  <a href="/resume_victor_hugo_campos_oficial.pdf" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="cursor-pointer">🇺🇸 English</Button>
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className={`flex justify-center gap-6 mt-12 transition-all duration-1500 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Link href="https://github.com/vhs4" className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com/in/vhs4" className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="mailto:contato@vhs4.dev" className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110">
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-royal-blue" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="min-h-screen bg-pure-black text-pure-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8">
              {locale === "pt" ? "PROJETOS QUE" : "PROJECTS THAT"}
              <span className="block text-royal-blue">{locale === "pt" ? "FAZEM A DIFERENÇA" : "MAKE A DIFFERENCE"}</span>
            </h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {locale === "pt"
                ? "Cada projeto é uma oportunidade de inovar e impactar. Aqui estão algumas das minhas criações mais significativas."
                : "Each project is an opportunity to innovate and impact. Here are some of my most meaningful works."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* App Fully */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">App Fully</h3>
                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  {locale === "pt"
                    ? "Aplicativo investido pela Prudential com 200 milhões. Melhorei as avaliações de 2.8 para 4.3 no iOS e de 2.5 para 4.9 no Android."
                    : "Prudential-backed app with $200M investment. Improved ratings from 2.8 to 4.3 on iOS and 2.5 to 4.9 on Android."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "TypeScript", "AWS"].map(t => (
                    <span key={t} className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">{locale === "pt" ? "Milhares" : "Thousands"}</span> {locale === "pt" ? "de usuários impactados" : "of users impacted"}
                  </div>
                  <Link href="https://www.prudential.com.br/fully" className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* NASA */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">NASA Challenge</h3>
                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  {locale === "pt"
                    ? "Campeão regional do NASA Space Apps Challenge aos 18 anos. Líder da equipe nominada globalmente entre milhares de participantes."
                    : "Regional champion at NASA Space Apps Challenge at 18. Led the globally nominated team among thousands of participants."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "Machine Learning", "Space Tech"].map(t => (
                    <span key={t} className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">{locale === "pt" ? "Campeão" : "Champion"}</span> Regional NASA
                  </div>
                  <Link href="https://www.linkedin.com/posts/vhs4_%C3%A9-chegou-ao-fim-depois-de-mais-de-30-horas-activity-7117274359827722242-ZPQg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD34IVsBb5YwZnnoY8ccYA75_4c-7b2n6lE" className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* CAPES */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">
                  {locale === "pt" ? "CAPES Governo Brasileiro" : "CAPES — Brazilian Gov"}
                </h3>
                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  {locale === "pt"
                    ? "Segundo melhor projeto do Brasil na maratona CAPES aos 19 anos. Solução inovadora para educação digital."
                    : "Second best project in Brazil at the CAPES hackathon at 19. Innovative solution for digital education."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Next.js", "AI/ML", "EdTech"].map(t => (
                    <span key={t} className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">{locale === "pt" ? "2º Lugar" : "2nd Place"}</span> {locale === "pt" ? "Nacional" : "Nationwide"}
                  </div>
                  <Link href="https://www.linkedin.com/feed/update/urn:li:activity:7265471300293304320/" className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "+50 MIL", label: locale === "pt" ? "Usuários impactados" : "Users impacted" },
              { value: "+4.8★", label: locale === "pt" ? "Avaliação App Store" : "App Store rating" },
              { value: "500+", label: locale === "pt" ? "Pessoas lideradas" : "People led" },
              { value: "2x", label: locale === "pt" ? "Certificado AWS" : "AWS Certified" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-4xl md:text-5xl text-royal-blue mb-2">{stat.value}</div>
                <div className="font-body text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105" asChild>
              <Link href={prefix + "/projetos"}>
                {locale === "pt" ? "Ver Todos os Projetos" : "View All Projects"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="min-h-screen bg-pure-white text-pure-black flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6 mt-8 md:mt-0">
          <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8">
            {locale === "pt" ? "SOBRE MIM" : "ABOUT ME"}
          </h2>
          <p className="font-body text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
            {locale === "pt"
              ? "Desenvolvedor Full Stack & AI, campeão regional do NASA Space Apps Challenge e Domain Leader of Technology no Aspire Leaders Program. Especialista em transformar ideias inovadoras em soluções tecnológicas de impacto global."
              : "20-year-old Full Stack Developer, regional champion at NASA Space Apps Challenge and Domain Leader of Technology at the Aspire Leaders Program. Specialist in turning innovative ideas into globally impactful tech solutions."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">{locale === "pt" ? "Campeão NASA" : "NASA Champion"}</h3>
              <p className="font-body text-gray-600">Space Apps Challenge 2023</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">
                {locale === "pt" ? "2º Melhor Projeto do Brasil" : "2nd Best Project in Brazil"}
              </h3>
              <p className="font-body text-gray-600">Hackathon CAPES 2024</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">
                {locale === "pt" ? "Milhares de Pessoas Impactados" : "Thousands of People Impacted"}
              </h3>
              <p className="font-body text-gray-600">{locale === "pt" ? "através do app Fully" : "through the Fully app"}</p>
            </div>
          </div>

          <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 mb-8 md:mb-0" asChild>
            <Link href={prefix + "/sobre"}>
              {locale === "pt" ? "Conhecer Minha História" : "My Full Story"}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center py-32">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-20">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-8 text-royal-blue">
              {locale === "pt" ? "VAMOS CRIAR ALGO" : "LET'S CREATE SOMETHING"}
            </h2>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-12">
              {locale === "pt" ? "EXTRAORDINÁRIO JUNTOS?" : "EXTRAORDINARY TOGETHER?"}
            </h2>
            <p className="font-body text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto">
              {locale === "pt"
                ? "Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade."
                : "Have a project in mind? Let's talk about how I can help turn your idea into reality."}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
