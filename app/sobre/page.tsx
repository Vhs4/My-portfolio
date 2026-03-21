"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Code,
  Rocket,
  Heart,
  Monitor,
  Smartphone,
  Database,
  Cloud,
  Zap,
  Award,
  Calendar,
  MapPin,
  Download,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stackTecnologico = [
  {
    categoria: "Cloud & Certificações",
    icon: Cloud,
    cor: "from-orange-500 to-red-500",
    tecnologias: [
      { nome: "AWS", nivel: 80, anos: 2 },
      { nome: "Vercel", nivel: 88, anos: 2 },
      { nome: "Docker", nivel: 85, anos: 2 },
    ],
  },
  {
    categoria: "Frontend",
    icon: Monitor,
    cor: "from-blue-500 to-cyan-500",
    tecnologias: [
      { nome: "React", nivel: 95, anos: 3 },
      { nome: "Next.js", nivel: 90, anos: 3 },
      { nome: "TypeScript", nivel: 88, anos: 3 },
      { nome: "Tailwind CSS", nivel: 92, anos: 3 },
    ],
  },
  {
    categoria: "Backend & IA",
    icon: Database,
    cor: "from-green-500 to-emerald-500",
    tecnologias: [
      { nome: "Node.js", nivel: 90, anos: 3 },
      { nome: "Python", nivel: 85, anos: 3 },
      { nome: "Inteligência Artificial", nivel: 80, anos: 2 },
      { nome: "PostgreSQL", nivel: 85, anos: 2 },
      { nome: "Firebase", nivel: 55, anos: 1 },
    ],
  },
  {
    categoria: "Mobile",
    icon: Smartphone,
    cor: "from-purple-500 to-pink-500",
    tecnologias: [
      { nome: "React Native", nivel: 55, anos: 1 },
      { nome: "Expo", nivel: 55, anos: 1 },
    ],
  },
]

const experiencias = [
  {
    cargo: "Desenvolvedor Full Stack",
    empresa: "Fully (Prudential - 200M investidos)",
    periodo: "abril de 2025 - março de 2026",
    descricao:
      "Desenvolvimento e otimização de aplicativo de bem-estar, saúde e fitness com impacto direto nas avaliações e experiência do usuário.",
    conquistas: [
      "Elevou avaliação iOS de 2.8 para 4.3 estrelas",
      "Aumentou avaliação Android de 2.5 para 4.9 estrelas",
      "Implementou a carteira digital do usuário — módulo de alto impacto com transações financeiras, saldo e histórico em produção com +50k usuários ativos",
      "Participou de projeto estratégico que gerou economia na casa de milhões de reais ao internalizar funcionalidades críticas antes terceirizadas, exigindo engenharia reversa e arquitetura própria",
      "Criou e documentou padrão de testes automatizados adotado internamente como guia principal da equipe",
    ],
    tecnologias: [
      { nome: "Nest", cor: "bg-blue-500", icon: "💻" },
      { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
      { nome: "Node.js", cor: "bg-green-500", icon: "🟢" },
      { nome: "AWS (LAMBDA, S3, EC2 e etc...)", cor: "bg-orange-500", icon: "☁️" },
      { nome: "PostgreSQL", cor: "bg-blue-700", icon: "🗄️" },
      { nome: "MongoDB", cor: "bg-green-700", icon: "🤖" },
      { nome: "BFF (Back-end For Front-end)", cor: "bg-yellow-400", icon: "🔗" },
      { nome: "Jest/Testing Library", cor: "bg-red-600", icon: "✅" },
      { nome: "PHP", cor: "bg-indigo-600", icon: "🐘" },
      { nome: "Kotlin", cor: "bg-teal-600", icon: "📱" },
    ],
  },
  {
    cargo: "Domain Leader of Technology",
    empresa: "Aspire Leaders Program (Cofundado Harvard)",
    periodo: "maio de 2025 - Presente",
    descricao:
      "Liderança de domínio tecnológico no Brasil para programa de formação de líderes globais fundado por professores da Harvard Business School.",
    conquistas: [
      "Sou líder de domínio de tecnologia no Brasil",
      "Quando fui aluno criei uma comunidade de +500 alunos e fui convidado para ser Domain Leader",
      "Jovens alunos de +150 países",
      "O programa possui parceria com USP, Insper, UFF e diversas instituições",
    ],
  },
  {
    cargo: "Líder de Equipe - Campeão Regional",
    empresa: "NASA Space Apps Challenge",
    periodo: "2023",
    descricao: "Liderança da equipe vencedora regional em Campos dos Goytacazes, nominada globalmente pela NASA.",
    conquistas: [
      "Campeão regional da maior hackathon do mundo",
      "Equipe nominada globalmente pela NASA",
      "Troféu da Agência Espacial Brasileira",
    ],
    tecnologias: [
      { nome: "React", cor: "bg-cyan-500", icon: "⚛️" },
      { nome: "Python", cor: "bg-yellow-600", icon: "🐍" },
      { nome: "MVP Rede social para cientistas", cor: "bg-blue-600", icon: "🚀" },
      { nome: "Liderança", cor: "bg-green-600", icon: "🎯" },
    ],
  },
  {
    cargo: "Líder de Projeto",
    empresa: "Hackathon CAPES",
    periodo: "2024",
    descricao:
      "Liderei o desenvolvimento do segundo melhor projeto do Brasil para aprimorar o portal de periódicos da CAPES com IA.",
    conquistas: [
      "2º melhor projeto do Brasil",
      "Liderei a criação de um assistente de IA para auxiliar na escrita de artigos recomendando artigos confiáveis",
      "Melhoria do sistema de pesquisa acadêmica sem utilização de I.A, criando novos filtros de pesquisa",
    ],
    tecnologias: [
      { nome: "Inteligência Artificial", cor: "bg-violet-500", icon: "🧠" },
      { nome: "NLP (Natural Language Processing)", cor: "bg-teal-500", icon: "💬" },
      { nome: "Next.js", cor: "bg-cyan-500", icon: "⚛️" },
      { nome: "Pesquisa acadêmica", cor: "bg-blue-600", icon: "📚" },
      { nome: "Criação de filtros", cor: "bg-blue-600", icon: "🔍" },
    ],
  },
]

const valores = [
  {
    titulo: "Código Limpo",
    descricao: "Acredito que código bem escrito é poesia em movimento. Cada linha deve contar uma história clara.",
    icon: Code,
  },
  {
    titulo: "Inovação Constante",
    descricao: "Sempre em busca das tecnologias mais modernas e práticas que realmente agregam valor.",
    icon: Rocket,
  },
  {
    titulo: "Experiência do Usuário",
    descricao: "Todo código que escrevo tem um propósito: criar experiências que as pessoas amem usar.",
    icon: Heart,
  },
  {
    titulo: "Aprendizado Contínuo",
    descricao: "O mundo tech evolui rapidamente. Dedico tempo diário para aprender algo novo.",
    icon: Zap,
  },
]

export default function SobrePage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = document.querySelectorAll("section[data-section]")
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-pure-black text-pure-white p-4 md:p-0">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/projetos" className="font-body hover-underline">
              Projetos
            </Link>
            <Link href="#sobre" className="font-body hover-underline text-royal-blue">
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
              href="#sobre"
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
      <section data-section="0" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-royal-blue to-royal-blue-light" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6 animate-kinetic-text">
                <span className="block">OLÁ, EU SOU</span>
                <span className="block text-royal-blue">VICTOR HUGO</span>
              </h1>

              <p className="font-body text-xl md:text-2xl text-royal-blue-light mb-6">
                Desenvolvedor Full Stack, liderei o time campeão regional do  NASA Space Apps Challenge e hoje na Fully impacto a vida de +50 mil pessoas
              </p>

              <p className="font-body text-lg text-gray-300 leading-relaxed mb-8">
                Aos 20 anos, já conquistei reconhecimento global como campeão regional do NASA Space Apps Challenge,
                liderei o 2º melhor projeto do Brasil no hackathon CAPES e atuo como Domain Leader of Technology no
                programa de liderança global fundado por professores de Harvard. Cada projeto é uma oportunidade de criar soluções que impactam milhares de pessoas.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">Campos dos Goytacazes, RJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">20 anos, Domain Leader Aspire Leaders Program</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">2x Certificado AWS</span>
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar CV
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <p className="text-sm font-semibold mb-3 text-center">Escolha o idioma:</p>
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

            <div className="relative">
              <div className="animate-float">
                <Image
                  src="/fotoperfil.webp"
                  alt="Minha foto animada"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl shadow-2xl tilt-effect"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section data-section="1" className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">STACK TECNOLÓGICO</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">
              Ferramentas e tecnologias que domino para criar soluções completas e escaláveis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stackTecnologico.map((categoria, index) => {
              const IconComponent = categoria.icon
              return (
                <div
                  key={categoria.categoria}
                  className="bg-pure-black p-8 pb-12 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300 h-fit"
                  style={{
                    transform: windowWidth >= 1024
                      ? `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`
                      : 'none',
                  }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${categoria.cor}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl">{categoria.categoria}</h3>
                  </div>

                  <div className="space-y-6">
                    {categoria.tecnologias.map((tech) => (
                      <div key={tech.nome} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-body font-semibold text-lg">{tech.nome}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-body text-sm text-gray-400">
                              {tech.anos > 1 ? `${tech.anos} anos` : `${tech.anos} ano`}
                            </span>
                            <span className="font-body text-sm text-royal-blue">{tech.nivel}%</span>
                          </div>
                        </div>
                        <Progress value={tech.nivel} className="h-2 bg-deep-gray" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experiência Profissional */}
      <section data-section="2" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">EXPERIÊNCIA</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">
              Jornada profissional construindo soluções que impactam milhares de pessoas
            </p>
          </div>

          <div className="space-y-12">
            {experiencias.map((exp, index) => (
              <div
                key={index}
                className="relative bg-deep-gray p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300"
              >
                {/* Timeline indicator */}
                <div className="absolute -left-4 top-8 w-8 h-8 bg-royal-blue rounded-full border-4 border-pure-black" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2">{exp.cargo}</h3>
                    <p className="font-body text-royal-blue text-lg mb-2">{exp.empresa}</p>
                    <p className="font-body text-gray-400">{exp.periodo}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="font-body text-gray-300 leading-relaxed mb-6">{exp.descricao}</p>
                    {exp.tecnologias && (
                      <div className="mb-6">
                        <h4 className="font-heading font-semibold text-lg mb-4 text-blue-400">Tecnologias Utilizadas:</h4>
                        <div className="flex flex-wrap gap-3">
                          {exp.tecnologias.map((tech, i) => (
                            <div
                              key={i}
                              className={`${tech.cor} px-4 py-2 rounded-full text-white font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform duration-200 shadow-lg`}
                            >
                              <span className="text-base">{tech.icon}</span>
                              <span>{tech.nome}</span>
                            </div>
                          ))}

                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-4 text-royal-blue">
                        Principais Conquistas:
                      </h4>
                      <ul className="space-y-2">
                        {exp.conquistas.map((conquista, i) => (
                          <li key={i} className="font-body text-gray-300 flex items-start gap-2">
                            <Award className="h-5 w-5 text-royal-blue mt-0.5 flex-shrink-0" />
                            {conquista}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores e Filosofia */}
      <section data-section="3" className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">MINHA FILOSOFIA</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">
              Os valores que guiam cada linha de código que escrevo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon
              return (
                <div
                  key={valor.titulo}
                  className="bg-pure-black p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-royal-blue/20 group-hover:bg-royal-blue/30 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-royal-blue transition-colors duration-300">
                        {valor.titulo}
                      </h3>
                      <p className="font-body text-gray-300 leading-relaxed">{valor.descricao}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curiosidades Pessoais */}
      <section data-section="4" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-12">ALÉM DO CÓDIGO</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-heading font-bold text-lg mb-2">Inovação Espacial</h3>
              <p className="font-body text-gray-300 text-sm">Apaixonado por tecnologia espacial</p>
            </div>

            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-heading font-bold text-lg mb-2">Educação Contínua</h3>
              <p className="font-body text-gray-300 text-sm">USP, Alura, certificações AWS</p>
            </div>

            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-heading font-bold text-lg mb-2">Impacto Global</h3>
              <p className="font-body text-gray-300 text-sm">Liderança em +150 países</p>
            </div>
          </div>

          <blockquote className="font-body text-2xl text-gray-300 italic leading-relaxed">
            "Aos 20 anos, já aprendi que a tecnologia não é apenas sobre código - é sobre criar soluções que transformam
            vidas. Cada linha que escrevo tem o potencial de impactar diversas pessoas ao redor do mundo."
          </blockquote>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">VAMOS TRABALHAR JUNTOS?</h2>
          <p className="font-body text-xl text-gray-300 mb-8 leading-relaxed">
            Se você chegou até aqui, provavelmente temos muito em comum. Vamos conversar sobre seu próximo projeto!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-semibold px-8 py-4"
              asChild
            >
              <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto">Iniciar Conversa</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white bg-transparent px-8 py-4"
              asChild
            >
              <Link href="/projetos">Ver Meus Projetos</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
