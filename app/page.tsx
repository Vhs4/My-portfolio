"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Code, Rocket, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Image from "next/image"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 500)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-pure-black text-pure-white overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-300 ${scrollY > 10 ? "backdrop-blur-md bg-pure-black/80" : "bg-transparent"
        }`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/" className="font-heading font-bold text-xl hover-underline">
            VHS4
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8">
            <a href="/projetos" className="font-body hover-underline">
              Projetos
            </a>
            <a href="/sobre" className="font-body hover-underline">
              Sobre
            </a>
            <a href="/blog" className="font-body hover-underline">
              Blog
            </a>
            <a href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto" className="font-body hover-underline">
              Contato
            </a>
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
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pure-black via-deep-gray to-pure-black" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 md:mt-24 md:mb-24">
          {/* Avatar com efeito glitch */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className={`w-full h-full rounded-full overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}>
                <div>
                  <Image
                    src="/fotoperfil.webp"
                    alt="Victor Hugo - Desenvolvedor"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 96px, 128px"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-royal-blue opacity-20 animate-glitch" />
            </div>
          </div>

          {/* Kinetic Typography */}
          <div
            className={`transition-all duration-1500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl mb-6 animate-kinetic-text">
              <span className="block">EU NÃO APENAS</span>
              <span className="block text-royal-blue">DESENVOLVO</span>
              <span className="block">EU CONSTRUO</span>
              <span className="block text-royal-blue-light">O FUTURO</span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1500 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <p className="font-body text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Aos 20 anos, já <span className="text-royal-blue font-semibold">liderei o time campeão regional do  NASA Space Apps Challenge</span> e além disso já impactei +50 mil pessoas. Transformo ideias em experiências digitais que impactam milhares de vidas.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1500 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <Button
              size="lg"
              className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/projetos">
                Ver Projetos
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 bg-transparent cursor-pointer"
              onClick={() => {
                window.open("/curriculo.pdf", "_blank");
              }}
            >
              Baixar CV
            </Button>
          </div>

          {/* Social Links */}
          <div
            className={`flex justify-center gap-6 mt-12 transition-all duration-1500 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <Link
              href="https://github.com/vhs4"
              className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/vhs4"
              className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:contato@vhs4.dev"
              className="p-3 rounded-full border border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white transition-all duration-300 hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-royal-blue" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="min-h-screen bg-pure-black text-pure-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8">
              PROJETOS QUE
              <span className="block text-royal-blue">FAZEM A DIFERENÇA</span>
            </h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cada projeto é uma oportunidade de inovar e impactar. Aqui estão algumas das minhas criações mais
              significativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Projeto 1 - App Fully */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Code className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">
                  App Fully
                </h3>

                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  Aplicativo investido pela Prudential com 200 milhões. Melhorei as avaliações de 2.8 para 4.3 no iOS e
                  de 2.5 para 4.9 no Android.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    React Native
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    AWS
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">Milhares</span> de usuários impactados
                  </div>
                  <Link href={"https://www.prudential.com.br/fully"} className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Projeto 2 - NASA Space Apps */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">
                  NASA Challenge
                </h3>

                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  Campeão regional do NASA Space Apps Challenge aos 18 anos. Líder da equipe nominada globalmente entre
                  milhares de participantes.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    Space Tech
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">Campeão</span> Regional NASA
                  </div>
                  <Link href={"https://www.linkedin.com/posts/vhs4_%C3%A9-chegou-ao-fim-depois-de-mais-de-30-horas-activity-7117274359827722242-ZPQg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD34IVsBb5YwZnnoY8ccYA75_4c-7b2n6lE"} className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Projeto 3 - CAPES Hackathon */}
            <div className="group relative bg-gradient-to-br from-deep-gray to-pure-black rounded-2xl p-8 border border-royal-blue/20 hover:border-royal-blue/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-royal-blue-light rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-heading font-bold text-2xl mb-4 text-white group-hover:text-royal-blue-light transition-colors">
                  CAPES Governo Brasileiro
                </h3>

                <p className="font-body text-gray-300 mb-6 leading-relaxed">
                  Segundo melhor projeto do Brasil na maratona CAPES aos 19 anos. Solução inovadora para educação
                  digital.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    AI/ML
                  </span>
                  <span className="px-3 py-1 bg-royal-blue/20 text-royal-blue-light rounded-full text-sm font-body">
                    EdTech
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="text-royal-blue font-semibold">2º Lugar</span> Nacional
                  </div>
                  <Link href={"https://www.linkedin.com/feed/update/urn:li:activity:7265471300293304320/"} className="cursor-pointer">
                    <ExternalLink className="h-5 w-5 text-royal-blue group-hover:text-royal-blue-light transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>



          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="font-heading font-bold text-4xl md:text-5xl text-royal-blue mb-2">+50 MIL</div>
              <div className="font-body text-gray-300">Usuários impactados</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-4xl md:text-5xl text-royal-blue mb-2">+4.8★</div>
              <div className="font-body text-gray-300">Avaliação App Store</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-4xl md:text-5xl text-royal-blue mb-2">500+</div>
              <div className="font-body text-gray-300">Pessoas lideradas</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-4xl md:text-5xl text-royal-blue mb-2">2x</div>
              <div className="font-body text-gray-300">Certificado AWS</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/projetos">
                Ver Todos os Projetos
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="min-h-screen bg-pure-white text-pure-black flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6 mt-8 md:mt-0">
          <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8">SOBRE MIM</h2>
          <p className="font-body text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
            Desenvolvedor Full Stack de 20 anos, campeão regional do NASA Space Apps Challenge e Domain Leader of
            Technology no Aspire Leaders Program. Especialista em transformar ideias inovadoras em soluções tecnológicas de
            impacto global.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Campeão NASA</h3>
              <p className="font-body text-gray-600">Space Apps Challenge 2023</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">2º Melhor Projeto do Brasil</h3>
              <p className="font-body text-gray-600">Hackathon CAPES 2024</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Milhares de Pessoas Impactados</h3>
              <p className="font-body text-gray-600">através do app Fully</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 mb-8 md:mb-0"
            asChild
          >
            <Link href="/sobre">
              Conhecer Minha História
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contato"
        className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center py-32"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-20">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-8 text-royal-blue">VAMOS CRIAR ALGO</h2>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-12">EXTRAORDINÁRIO JUNTOS?</h2>
            <p className="font-body text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto">
              Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
