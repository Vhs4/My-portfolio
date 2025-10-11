"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, Target, Lightbulb, Code, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const projetosDetalhados = {
  "fully": {
    id: "fully",
    titulo: "Fully",
    subtitulo: "Aplicativo de bem estar e saúde (wellness)",
    descricao:
      "Atuei no back-end de um aplicativo de bem-estar completo que integra saúde física, mental e financeira, com metas personalizadas, recompensas e benefícios exclusivos.",
    imagemPrincipal: "/fully-hero.webp",
    tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Teste unitários", "Testes automatizados", "Documentação", "CI/CD"],
    categoria: "Mobile",
    ano: "Entrei em 2025",
    duracao: "",
    equipe: "+30 Pessoas na equipe",
    status: "No ar",
    cor: "from-blue-600 to-green-600",
    cliente: "Fully - Prudential",
    desafio:
      "Revolucionar o cuidado com a saúde física, mental e financeira, criando uma plataforma digital engajante, escalável e acessível para milhares de usuários e em 3 idiomas (Português, Inglês e Espanhol).",
    solucao:
      "Atuamos no desenvolvimento de soluções digitais robustas, utilizando um stack moderno (NestJS, Kotlin, PHP) e infraestrutura em cloud AWS (Lambda, S3, etc). Criamos funcionalidades voltadas ao bem-estar, com foco em usabilidade, estabilidade e performance, integradas ao ecossistema da Prudential.",
    resultados: [
      "Notas do app subiram de 2.8 para 4.3 no iOS e de 2.5 para 4.9 no Android",
      "+50 mil usuários ativos engajados na plataforma",
      "Ecossistema digital em constante crescimento e potencial de escala internacional",
      "Maior aderência e engajamento dos usuários com hábitos saudáveis"
    ],
    funcionalidades:
      [
        "Metas personalizadas de bem-estar físico, emocional e financeiro",
        "Sistema de recompensas e benefícios exclusivos",
        "Integração com serviços de nuvem AWS para escalabilidade",
        "Arquitetura modular com NestJS, Kotlin e PHP",
        "Experiência digital centrada no usuário",
        "Acompanhamento em tempo real da saúde e progresso dos usuários"
      ],
    aprendizados:
      "Esse projeto reforçou a importância de aliar tecnologia moderna à experiência do usuário para gerar impacto real em saúde e bem-estar. Além disso, aprendi a trabalhar em ambientes ágeis com squads multidisciplinares e a valorizar otimização contínua para escalabilidade e performance.",
    githubUrl: "",
    liveUrl: "https://www.prudential.com.br/fully",
  },
  "analise-fraudes": {
    id: "analise-fraudes",
    titulo: "Sistema de Análise de Fraudes",
    subtitulo: "Plataforma de prevenção e detecção de fraudes com IA",
    descricao:
      "Atuei no desenvolvimento do front-end de um sistema de análise de fraudes utilizando inteligência artificial, com interface moderna, responsiva e de alta performance.",
    imagemPrincipal: "/analise-fraudes-dashboard.webp",
    tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
    categoria: "Sistema Web",
    ano: "2024",
    duracao: "",
    equipe: "Diversas pessoas na equipe",
    status: "Concluído",
    cor: "bg-blue-600",
    cliente: "Confidencial",
    desafio:
      "Desenvolver uma plataforma intuitiva e robusta para detectar, analisar e prevenir fraudes em tempo real, garantindo escalabilidade e experiência fluida para os analistas.",
    solucao:
      "Implementei o front-end em React com TypeScript e Tailwind CSS, priorizando performance, acessibilidade e usabilidade. A integração com serviços AWS permitiu escalabilidade e suporte a grandes volumes de dados.",
    resultados: [
      "Detecção de fraudes em tempo real com apoio de IA",
      "Interface moderna e responsiva para análise detalhada",
      "Redução significativa no tempo de investigação",
      "Melhor experiência do usuário para analistas e gestores"
    ],
    funcionalidades: [
      "Dashboard em tempo real com estatísticas de análises",
      "Métricas históricas por período (15 dias, mês, semestre, ano, all time)",
      "Monitoramento de documentos invalidados com porcentagem de ocorrência",
      "Gráficos comparativos de análises validadas e invalidadas",
      "Indicadores visuais de performance e engajamento",
      "Visualização detalhada e segmentada por períodos de tempo",
      "Interface responsiva e otimizada para diferentes dispositivos"
    ],
    aprendizados:
      "Este projeto reforçou minha experiência em desenvolvimento front-end para aplicações críticas, onde performance, segurança e clareza da interface são fundamentais. Também aprofundei meus conhecimentos em integração com serviços cloud e boas práticas de UI/UX para sistemas complexos.",
    githubUrl: "",
    liveUrl: "",
  },
  "ifood-academico": {
    id: "ifood-academico",
    titulo: "Ifood Acadêmico",
    subtitulo: "Plataforma de gestão de restaurantes",
    descricao:
      "Liderei o desenvolvimento front-end de um sistema acadêmico inspirado no Ifood, voltado para gestão de restaurantes, acompanhamento de pedidos e comunicação em tempo real.",
    imagemPrincipal: "/ifood-erp.webp",
    tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    categoria: "Sistema Web",
    ano: "2024",
    duracao: "",
    equipe: "5 Pessoas na equipe",
    status: "Concluído",
    cor: "from-red-500 to-yellow-500",
    cliente: "Projeto acadêmico",
    desafio:
      "Criar um sistema de gestão de restaurantes robusto e intuitivo, que permitisse acompanhar pedidos, identificar os clientes mais ativos, analisar os pratos mais pedidos e oferecer comunicação em tempo real com os entregadores.",
    solucao:
      "Implementei o front-end com React, TypeScript e Tailwind CSS, garantindo uma interface moderna, responsiva e performática. Adicionei funcionalidades de monitoramento, permissões de acesso e chat em tempo real.",
    resultados: [
      "Sistema funcional de gestão de pedidos e clientes",
      "Interface responsiva e intuitiva para restaurantes",
      "Comunicação em tempo real com entregadores",
      "Gestão de permissões para diferentes tipos de usuários"
    ],
    funcionalidades: [
      "Dashboard com visão geral dos pedidos",
      "Top clientes que mais pedem",
      "Análise dos pratos mais pedidos",
      "Chat em tempo real com entregadores",
      "Gestão de permissões no sistema",
      "Interface moderna e responsiva"
    ],
    aprendizados:
      "Este projeto reforçou minha experiência em liderar desenvolvimento front-end e aplicar conceitos de UI/UX em sistemas de gestão. Também aprofundei meus conhecimentos em React, TypeScript e Tailwind CSS.",
    githubUrl: "",
    liveUrl: ""
  },
  "esphera-glamping": {
    id: "esphera-glamping",
    titulo: "Esphera Glamping",
    subtitulo: "Site institucional multilíngue para glamping de luxo",
    descricao: "Desenvolvimento de um site moderno para o Esphera Glamping, o maior glamping com domos geodésicos do Brasil. Construído em WordPress com Elementor Pro, totalmente responsivo e otimizado para SEO, com versões em Português, Inglês e Espanhol. Além disso, o site conta com um blog para divulgação de novidades e conteúdos relacionados à experiência do glamping.",
    imagemPrincipal: "/esphera-glamping-hero.webp",
    tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
    categoria: "Web",
    ano: "2025",
    duracao: "",
    equipe: "Equipe de 4 pessoas",
    status: "No ar",
    cor: "bg-red-950",
    cliente: "Esphera Glamping",
    desafio: "Transmitir a exclusividade da experiência de hospedagem em um site moderno, engajador e multilíngue, destacando domos geodésicos, experiências gastronômicas, spa, e reservas, além de criar um espaço para conteúdo dinâmico através do blog.",
    solucao: "Desenvolvemos o site utilizando WordPress com Elementor Pro, aplicando design responsivo, imagens de alta qualidade, navegação fluida e recursos visuais imersivos, garantindo ótima performance, SEO e experiência do usuário. Implementamos também um blog integrado para publicação de conteúdos relevantes e engajamento contínuo dos visitantes.",
    resultados: [
      "Site totalmente funcional em Português, Inglês e Espanhol",
      "Melhoria na apresentação digital da marca e aumento do engajamento de visitantes",
      "Navegação intuitiva e design que mostra a identidade visual do Esphera Glamping",
      "Projeto responsivo, otimizado para SEO e acessível em dispositivos móveis",
      "Blog ativo para geração de conteúdo e atração de visitantes"
    ],
    funcionalidades: [
      "Design responsivo para desktop e mobile",
      "Seções destacando experiências gastronômicas, spa e eventos",
      "Galeria de imagens em alta qualidade",
      "Multilíngue: Português, Inglês e Espanhol",
      "Blog integrado para publicação de conteúdos",
      "Otimização SEO para maior visibilidade orgânica"
    ],
    aprendizados: "Esse projeto reforçou a importância de combinar design moderno, experiência do usuário e otimização técnica em um site institucional, além de consolidar habilidades em WordPress, Elementor Pro e projetos multilíngues, trabalhando de forma colaborativa em equipe e integrando conteúdo dinâmico através do blog.",
    githubUrl: "",
    liveUrl: "https://espheraglamping.com.br/"
  }

}

export default function ProjetoDetalhePage({ params }: { params: { slug: string } }) {
  const [scrollY, setScrollY] = useState(0)
  const projeto = projetosDetalhados[params.slug as keyof typeof projetosDetalhados]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!projeto) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-pure-black text-pure-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/projetos" className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Projetos
          </Link>
          <div className="flex gap-8">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${projeto.cor}`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className={`bg-gradient-to-r ${projeto.cor} text-white border-0 mb-6`}>{projeto.categoria}</Badge>

              <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6 animate-kinetic-text">
                {projeto.titulo}
              </h1>

              <p className="font-body text-xl md:text-2xl text-royal-blue-light mb-6">{projeto.subtitulo}</p>

              <p className="font-body text-lg text-gray-300 leading-relaxed mb-8">{projeto.descricao}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{projeto.ano}</span>
                </div>
                {projeto.duracao && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-royal-blue" />
                    <span className="font-body text-gray-300">{projeto.duracao}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{projeto.equipe}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-semibold"
                  asChild
                >
                  <Link href={projeto.liveUrl} target="_blank">
                    Ver Projeto
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {projeto.githubUrl.length > 0 && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white bg-transparent"
                    asChild
                  >
                    <Link href={projeto.githubUrl} target="_blank">
                      <Github className="mr-2 h-5 w-5" />
                      Código
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <Image
                  src={projeto.imagemPrincipal || "/placeholder.svg"}
                  alt={projeto.titulo}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl tilt-effect"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Challenge */}
            <div className="bg-pure-black p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-royal-blue" />
                <h3 className="font-heading font-bold text-2xl">Desafio</h3>
              </div>
              <p className="font-body text-gray-300 leading-relaxed">{projeto.desafio}</p>
            </div>

            {/* Solution */}
            <div className="bg-pure-black p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-8 w-8 text-royal-blue" />
                <h3 className="font-heading font-bold text-2xl">Solução</h3>
              </div>
              <p className="font-body text-gray-300 leading-relaxed">{projeto.solucao}</p>
            </div>

            {/* Results */}
            <div className="bg-pure-black p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-8 w-8 text-royal-blue" />
                <h3 className="font-heading font-bold text-2xl">Resultados</h3>
              </div>
              <ul className="space-y-3">
                {projeto.resultados.map((resultado, index) => (
                  <li key={index} className="font-body text-gray-300 flex items-start gap-2">
                    <span className="text-royal-blue mt-1">•</span>
                    {resultado}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">TECNOLOGIAS</h2>
            <p className="font-body text-xl text-gray-300">Stack tecnológico utilizado no projeto</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {projeto.tecnologias.map((tech) => (
              <Badge
                key={tech}
                className="bg-deep-gray border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-all duration-300 text-lg py-2 px-4"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">FUNCIONALIDADES</h2>
            <p className="font-body text-xl text-gray-300">Principais recursos desenvolvidos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projeto.funcionalidades.map((funcionalidade, index) => (
              <div
                key={index}
                className="bg-pure-black p-6 rounded-xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{funcionalidade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-8">APRENDIZADOS</h2>
          <p className="font-body text-xl text-gray-300 leading-relaxed italic">"{projeto.aprendizados}"</p>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">PRÓXIMO PROJETO?</h2>
          <p className="font-body text-xl text-gray-300 mb-8 leading-relaxed">
            Vamos criar algo ainda mais extraordinário juntos.
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
