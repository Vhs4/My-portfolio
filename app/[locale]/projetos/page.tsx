"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

const projetos = {
  pt: [
    {
      id: "fully",
      titulo: "Fully",
      subtitulo: "Aplicativo de bem estar e saúde (wellness)",
      descricao: "Atuei no back-end de um aplicativo de bem-estar completo que integra saúde física, mental e financeira, com metas personalizadas, recompensas e benefícios exclusivos.",
      imagem: "/fully-hero-projetos.webp",
      tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Testes unitários", "Testes automatizados", "Documentação", "CI/CD"],
      categoria: "Mobile",
      ano: "Entrei em 2025",
      externalLink: "https://www.prudential.com.br/fully",
      codeLink: "",
      duracao: "",
      equipe: "+30 Pessoas na equipe",
      status: "No ar",
      cor: "from-blue-600 to-green-600",
    },
    {
      id: "analise-fraudes",
      titulo: "Sistema de Análise de Fraudes",
      subtitulo: "Plataforma de prevenção e detecção de fraudes com IA",
      descricao: "Atuei no desenvolvimento do front-end de um sistema de análise de fraudes utilizando inteligência artificial, com interface moderna, responsiva e de alta performance.",
      imagem: "/analise-fraudes-dashboard.webp",
      tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
      categoria: "Sistema Web",
      ano: "2024",
      externalLink: "",
      codeLink: "",
      duracao: "",
      equipe: "Diversas pessoas na equipe",
      status: "Concluído",
      cor: "bg-blue-600",
    },
    {
      id: "ifood-academico",
      titulo: "Ifood Acadêmico",
      subtitulo: "Sistema de gestão de restaurantes",
      descricao: "Liderei o desenvolvimento front-end de um sistema de gestão de restaurantes em um projeto acadêmico em parceria com o Ifood na minha graduação.",
      imagem: "/ifood-erp.webp",
      tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      externalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7208981105004228610",
      categoria: "Sistema Web",
      ano: "2024",
      duracao: "",
      equipe: "5 pessoas",
      status: "Concluído",
      cor: "from-red-500 to-yellow-500",
    },
    {
      id: "esphera-glamping",
      titulo: "Esphera Glamping",
      subtitulo: "Site institucional multilíngue para glamping de luxo",
      descricao: "Desenvolvimento de um site moderno para o Esphera Glamping, o maior glamping com domos geodésicos do Brasil. Totalmente responsivo e otimizado para SEO, com versões em Português, Inglês e Espanhol.",
      imagem: "/esphera-glamping-hero.webp",
      tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
      externalLink: "https://espheraglamping.com.br/",
      categoria: "Web",
      ano: "2025",
      duracao: "",
      equipe: "4 pessoas",
      status: "No ar",
      cor: "bg-red-950",
    },
  ],
  en: [
    {
      id: "fully",
      titulo: "Fully",
      subtitulo: "Wellness, health and fitness app",
      descricao: "Worked on the backend of a complete wellness app that integrates physical, mental and financial health, with personalized goals, rewards and exclusive benefits.",
      imagem: "/fully-hero-projetos.webp",
      tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Unit Tests", "Automated Tests", "Documentation", "CI/CD"],
      categoria: "Mobile",
      ano: "Joined in 2025",
      externalLink: "https://www.prudential.com.br/fully",
      codeLink: "",
      duracao: "",
      equipe: "30+ team members",
      status: "Live",
      cor: "from-blue-600 to-green-600",
    },
    {
      id: "analise-fraudes",
      titulo: "Fraud Analysis System",
      subtitulo: "AI-powered fraud prevention and detection platform",
      descricao: "Worked on the frontend development of a fraud analysis system using artificial intelligence, with a modern, responsive, high-performance interface.",
      imagem: "/analise-fraudes-dashboard.webp",
      tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
      categoria: "Web System",
      ano: "2024",
      externalLink: "",
      codeLink: "",
      duracao: "",
      equipe: "Several team members",
      status: "Completed",
      cor: "bg-blue-600",
    },
    {
      id: "ifood-academico",
      titulo: "Academic Ifood",
      subtitulo: "Restaurant management system",
      descricao: "Led the frontend development of a restaurant management system in an academic project in partnership with Ifood during my degree.",
      imagem: "/ifood-erp.webp",
      tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      externalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7208981105004228610",
      categoria: "Web System",
      ano: "2024",
      duracao: "",
      equipe: "5 people",
      status: "Completed",
      cor: "from-red-500 to-yellow-500",
    },
    {
      id: "esphera-glamping",
      titulo: "Esphera Glamping",
      subtitulo: "Multilingual institutional website for luxury glamping",
      descricao: "Development of a modern website for Esphera Glamping, Brazil's largest glamping with geodesic domes. Fully responsive and SEO-optimized, with Portuguese, English and Spanish versions.",
      imagem: "/esphera-glamping-hero.webp",
      tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
      externalLink: "https://espheraglamping.com.br/",
      categoria: "Web",
      ano: "2025",
      duracao: "",
      equipe: "4 people",
      status: "Live",
      cor: "bg-red-950",
    },
  ],
}

export default function ProjetosPage() {
  const locale = useLocale() as "pt" | "en"
  const nav = useTranslations("nav")
  const t = useTranslations("projects")
  const prefix = locale === "en" ? "/en" : ""

  const [scrollY, setScrollY] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentProjetos = projetos[locale]

  return (
    <main className="min-h-screen bg-pure-black text-pure-white">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href={prefix + "/"} className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href={prefix + "/projetos"} className="font-body hover-underline text-royal-blue">{nav("projects")}</Link>
            <Link href={prefix + "/sobre"} className="font-body hover-underline">{nav("about")}</Link>
            <Link href={prefix + "/blog"} className="font-body hover-underline">{nav("blog")}</Link>
            <Link href={locale === "en" ? "https://wa.me/+5522999018809?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} className="font-body hover-underline">{nav("contact")}</Link>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            {isMenuOpen ? <button onClick={toggleMenu}><X /></button> : <button onClick={toggleMenu}><Menu /></button>}
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

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading font-bold text-6xl md:text-8xl mb-6 animate-kinetic-text">
            <span className="block">{locale === "pt" ? "ALGUNS DOS MEUS" : "SOME OF MY"}</span>
            <span className="block text-royal-blue">{locale === "pt" ? "PROJETOS" : "PROJECTS"}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {locale === "pt" ? (
              <>Cada projeto é uma jornada única de <span className="text-royal-blue">inovação</span> e <span className="text-royal-blue">excelência técnica</span></>
            ) : (
              <>Each project is a unique journey of <span className="text-royal-blue">innovation</span> and <span className="text-royal-blue">technical excellence</span></>
            )}
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentProjetos.map((projeto, index) => (
              <div
                key={projeto.id}
                className="group relative"
                onMouseEnter={() => setHoveredProject(projeto.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ transform: !isMobile ? `translateY(${scrollY * 0.1 * (index % 2 === 0 ? 1 : -1)}px)` : "none" }}
              >
                <div className="bg-deep-gray rounded-2xl overflow-hidden border border-transparent group-hover:border-royal-blue transition-all duration-500 md:tilt-effect">
                  <div className="relative h-80 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${projeto.cor} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    <Image
                      src={projeto.imagem || "/placeholder.svg"}
                      alt={projeto.titulo}
                      fill
                      className={`object-cover transition-transform duration-700 ${!isMobile ? "group-hover:scale-110" : ""}`}
                    />
                    <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className={`bg-gradient-to-r ${projeto.cor} text-white border-0 md:animate-float`}>
                        {projeto.categoria}
                      </Badge>
                    </div>
                    <div className="md:hidden absolute bottom-4 right-4">
                      <Button size="sm" className="bg-royal-blue hover:bg-royal-blue-light text-white font-semibold shadow-lg" asChild>
                        <Link href={`${prefix}/projetos/${projeto.id}`}>
                          {locale === "pt" ? "Ver Detalhes" : "View Details"}
                        </Link>
                      </Button>
                    </div>
                    <div className="hidden md:flex absolute inset-0 bg-royal-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
                      <div className="text-center">
                        <Button size="lg" className="bg-pure-white text-royal-blue hover:bg-gray-100 font-semibold mb-4" asChild>
                          <Link href={`${prefix}/projetos/${projeto.id}`}>
                            {locale === "pt" ? "Ver Detalhes" : "View Details"}
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        {(projeto.codeLink || projeto.externalLink) && (
                          <div className="flex gap-4 justify-center">
                            {projeto.codeLink && (
                              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-royal-blue bg-transparent" asChild>
                                <Link href={projeto.codeLink}><Github className="h-4 w-4" /></Link>
                              </Button>
                            )}
                            {projeto.externalLink && (
                              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-royal-blue bg-transparent" asChild>
                                <Link href={projeto.externalLink}><ExternalLink className="h-4 w-4" /></Link>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="h-4 w-4 text-royal-blue" />
                      <span className="font-body text-sm text-gray-400">{projeto.ano}</span>
                      <Users className="h-4 w-4 text-royal-blue ml-4" />
                      <span className="font-body text-sm text-gray-400">{projeto.equipe}</span>
                    </div>
                    <Link href={`${prefix}/projetos/${projeto.id}`}>
                      <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-royal-blue transition-colors duration-300">{projeto.titulo}</h3>
                    </Link>
                    <p className="font-body text-royal-blue-light mb-4">{projeto.subtitulo}</p>
                    <p className="font-body text-gray-300 leading-relaxed mb-6">{projeto.descricao}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projeto.tecnologias.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors duration-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-600 text-white">{projeto.status}</Badge>
                      <span className="font-body text-sm text-gray-400">{projeto.duracao}</span>
                    </div>
                    <div className="md:hidden mt-6 flex gap-3 justify-start">
                      {projeto.codeLink && (
                        <Button size="sm" variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white" asChild>
                          <Link href={projeto.codeLink}>
                            <Github className="h-4 w-4 mr-2" />
                            {locale === "pt" ? "Código" : "Code"}
                          </Link>
                        </Button>
                      )}
                      {projeto.externalLink && (
                        <Button size="sm" variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white" asChild>
                          <Link href={projeto.externalLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Site
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
