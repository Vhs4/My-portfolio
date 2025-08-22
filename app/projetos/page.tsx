"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projetos = [
  {
    id: "fully",
    titulo: "Fully",
    subtitulo: "Aplicativo de bem estar e saúde (wellness)",
    descricao:
      "Atuei no back-end de um aplicativo de bem-estar completo que integra saúde física, mental e financeira, com metas personalizadas, recompensas e benefícios exclusivos.",
    imagem: "/fully-hero-projetos.webp",
    tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Teste unitários", "Testes automatizados", "Documentação", "CI/CD"],
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
    descricao:
      "Atuei no desenvolvimento do front-end de um sistema de análise de fraudes utilizando inteligência artificial, com interface moderna, responsiva e de alta performance.",
    imagem: "/analise-fraudes-dashboard.webp",
    tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
    categoria: "Sistema Web",
    ano: "2024",
    externalLink: "",
    codeLink: "",
    duracao: "",
    equipe: "Diversas pessoas na equipe",
    status: "Concluído",
    cor: "bg-blue-600"
  },
  {
    id: "ifood-academico",
    titulo: "Ifood Acadêmico",
    subtitulo: "Sistema de gestão de restaurantes",
    descricao:
      "Liderei o desenvolvimento front-end de um sistema de gestão de restaurantes em um projeto acadêmico em parceria com o Ifood na minha graduação, o design foi inspirado no Ifood, com foco em usabilidade, performance e recursos de monitoramento em tempo real.",
    imagem: "/ifood-erp.webp",
    tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    externalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7208981105004228610",
    categoria: "Sistema Web",
    ano: "2024",
    duracao: "",
    equipe: "5 pessoas",
    status: "Concluído",
    cor: "from-red-500 to-yellow-500"
  },
  {
    id: "esphera-glamping",
    titulo: "Esphera Glamping",
    subtitulo: "Site institucional multilíngue para glamping de luxo",
    descricao:
      "Desenvolvimento de um site moderno para o Esphera Glamping, o maior glamping com domos geodésicos do Brasil. O projeto foi construído em WordPress com Elementor Pro, totalmente responsivo e otimizado para SEO, com versões em Português, Inglês e Espanhol. O objetivo foi transmitir a exclusividade da experiência de hospedagem, destacando as Espheras, experiências gastronômicas, spa, e eventos. Além disso, foram aplicados recursos visuais imersivos com imagens de alta qualidade e navegação fluida para aumentar o engajamento dos visitantes e facilitar o processo de conversão.",
    imagem: "/esphera-glamping-hero.webp",
    tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
    externalLink: "https://espheraglamping.com.br/",
    categoria: "Web",
    ano: "2025",
    duracao: "",
    equipe: "4 pessoas",
    status: "No ar",
    cor: "bg-red-950"
  }

]

export default function ProjetosPage() {
  const [scrollY, setScrollY] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-pure-black text-pure-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/#projetos" className="font-body hover-underline text-royal-blue">
              Projetos
            </Link>
            <Link href="/sobre" className="font-body hover-underline">
              Sobre
            </Link>
            <Link href="/blog" className="font-body hover-underline">
              Blog
            </Link>
            <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto" className="font-body hover-underline">
              Contato
            </Link>
          </div>
          {isMenuOpen ? (
            <button
              onClick={toggleMenu}
              className="md:hidden"
            >
              <X />
            </button>
          ) : (

            <button
              onClick={toggleMenu}
              className="md:hidden"
            >
              <Menu />
            </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a
              href="/projetos"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Projetos
            </a>
            <a
              href="/sobre"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Sobre
            </a>
            <a
              href="/blog"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Blog
            </a>
            <a
              href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Contato
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading font-bold text-6xl md:text-8xl mb-6 animate-kinetic-text">
            <span className="block">ALGUNS DOS MEUS</span>
            <span className="block text-royal-blue">PROJETOS</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cada projeto é uma jornada única de <span className="text-royal-blue">inovação</span> e{" "}
            <span className="text-royal-blue">excelência técnica</span>
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-20 sm:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projetos.map((projeto, index) => (
              <div
                key={projeto.id}
                className="group relative"
                onMouseEnter={() => setHoveredProject(projeto.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  transform: !isMobile
                    ? `translateY(${scrollY * 0.1 * (index % 2 === 0 ? 1 : -1)}px)`
                    : "none",
                }}

              >
                {/* Project Card */}
                <div className="bg-deep-gray rounded-2xl overflow-hidden border border-transparent group-hover:border-royal-blue transition-all duration-500 md:tilt-effect">
                  {/* Project Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${projeto.cor} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    />
                    <Image
                      src={projeto.imagem || "/placeholder.svg"}
                      alt={projeto.titulo}
                      fill
                      className={`object-cover transition-transform duration-700 ${!isMobile ? "group-hover:scale-110" : ""
                        }`}
                    />
                    <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={`bg-gradient-to-r ${projeto.cor} text-white border-0 md:animate-float`}
                      >
                        {projeto.categoria}
                      </Badge>
                    </div>

                    {/* Mobile Action Button - Always visible */}
                    <div className="md:hidden absolute bottom-4 right-4">
                      <Button
                        size="sm"
                        className="bg-royal-blue hover:bg-royal-blue-light text-white font-semibold shadow-lg"
                        asChild
                      >
                        <Link href={`/projetos/${projeto.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>

                    {/* Desktop Hover Overlay */}
                    <div className="hidden md:flex absolute inset-0 bg-royal-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
                      <div className="text-center">
                        <Button
                          size="lg"
                          className="bg-pure-white text-royal-blue hover:bg-gray-100 font-semibold mb-4"
                          asChild
                        >
                          <Link href={`/projetos/${projeto.id}`}>
                            Ver Detalhes
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        {(projeto.codeLink || projeto.externalLink) && (
                          <div className="flex gap-4 justify-center">
                            {projeto.codeLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-royal-blue bg-transparent"
                                asChild
                              >
                                <Link href={projeto.codeLink}>
                                  <Github className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            {projeto.externalLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-royal-blue bg-transparent"
                                asChild
                              >
                                <Link href={projeto.externalLink}>
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="h-4 w-4 text-royal-blue" />
                      <span className="font-body text-sm text-gray-400">{projeto.ano}</span>
                      <Users className="h-4 w-4 text-royal-blue ml-4" />
                      <span className="font-body text-sm text-gray-400">{projeto.equipe}</span>
                    </div>

                    <Link href={`/projetos/${projeto.id}`}>
                      <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-royal-blue transition-colors duration-300">
                        {projeto.titulo}
                      </h3>
                    </Link>
                    <p className="font-body text-royal-blue-light mb-4">{projeto.subtitulo}</p>
                    <p className="font-body text-gray-300 leading-relaxed mb-6">{projeto.descricao}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projeto.tecnologias.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${projeto.status === "Concluído" || projeto.status === "No ar"
                          ? "bg-green-600"
                          : projeto.status === "Em produção"
                            ? "bg-blue-600"
                            : "bg-orange-600"
                          } text-white`}
                      >
                        {projeto.status}
                      </Badge>
                      <span className="font-body text-sm text-gray-400">{projeto.duracao}</span>
                    </div>

                    {/* Mobile External Links */}
                    <div className="md:hidden mt-6 flex gap-3 justify-start">
                      {projeto.codeLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                          asChild
                        >
                          <Link href={projeto.codeLink}>
                            <Github className="h-4 w-4 mr-2" />
                            Código
                          </Link>
                        </Button>
                      )}
                      {projeto.externalLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                          asChild
                        >
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">GOSTOU DO QUE VIU?</h2>
          <p className="font-body text-xl text-gray-300 mb-8 leading-relaxed">
            Vamos conversar sobre seu próximo projeto e criar algo extraordinário juntos.
          </p>
          <Button
            size="lg"
            className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto">
              Iniciar Conversa
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}