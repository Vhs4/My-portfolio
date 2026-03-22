"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, Target, Lightbulb, Code, Rocket, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

const projetosDetalhados = {
  pt: {
    "fully": {
      id: "fully",
      titulo: "Fully",
      subtitulo: "Aplicativo de bem estar e saúde (wellness)",
      descricao: "Atuei no back-end de um aplicativo de bem-estar completo que integra saúde física, mental e financeira, com metas personalizadas, recompensas e benefícios exclusivos.",
      imagemPrincipal: "/fully-hero.webp",
      tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Testes unitários", "Testes automatizados", "Documentação", "CI/CD"],
      categoria: "Mobile",
      ano: "Entrei em 2025",
      duracao: "",
      equipe: "+30 Pessoas na equipe",
      status: "No ar",
      cor: "from-blue-600 to-green-600",
      cliente: "Fully - Prudential",
      desafio: "Revolucionar o cuidado com a saúde física, mental e financeira, criando uma plataforma digital engajante, escalável e acessível para milhares de usuários e em 3 idiomas (Português, Inglês e Espanhol).",
      solucao: "Atuamos no desenvolvimento de soluções digitais robustas, utilizando um stack moderno (NestJS, Kotlin, PHP) e infraestrutura em cloud AWS (Lambda, S3, etc). Criamos funcionalidades voltadas ao bem-estar, com foco em usabilidade, estabilidade e performance.",
      resultados: ["Notas do app subiram de 2.8 para 4.3 no iOS e de 2.5 para 4.9 no Android", "+50 mil usuários ativos engajados na plataforma", "Ecossistema digital em constante crescimento", "Maior aderência e engajamento dos usuários com hábitos saudáveis"],
      funcionalidades: ["Metas personalizadas de bem-estar físico, emocional e financeiro", "Sistema de recompensas e benefícios exclusivos", "Integração com serviços de nuvem AWS para escalabilidade", "Arquitetura modular com NestJS, Kotlin e PHP", "Experiência digital centrada no usuário", "Acompanhamento em tempo real da saúde e progresso dos usuários"],
      aprendizados: "Esse projeto reforçou a importância de aliar tecnologia moderna à experiência do usuário para gerar impacto real em saúde e bem-estar. Aprendi a trabalhar em ambientes ágeis com squads multidisciplinares e a valorizar otimização contínua para escalabilidade e performance.",
      githubUrl: "",
      liveUrl: "https://www.prudential.com.br/fully",
    },
    "analise-fraudes": {
      id: "analise-fraudes",
      titulo: "Sistema de Análise de Fraudes",
      subtitulo: "Plataforma de prevenção e detecção de fraudes com IA",
      descricao: "Atuei no desenvolvimento do front-end de um sistema de análise de fraudes utilizando inteligência artificial.",
      imagemPrincipal: "/analise-fraudes-dashboard.webp",
      tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
      categoria: "Sistema Web",
      ano: "2024",
      duracao: "",
      equipe: "Diversas pessoas na equipe",
      status: "Concluído",
      cor: "bg-blue-600",
      cliente: "Confidencial",
      desafio: "Criar uma interface moderna e responsiva para análise de fraudes com dados em tempo real.",
      solucao: "Desenvolvimento do front-end com React e TypeScript, integração com APIs de análise, visualizações interativas de dados.",
      resultados: ["Interface responsiva com alta performance", "Visualizações em tempo real de dados de fraudes", "Experiência de usuário intuitiva para analistas"],
      funcionalidades: ["Dashboard de análise em tempo real", "Visualizações interativas de dados", "Interface responsiva e acessível", "Integração com APIs de detecção"],
      aprendizados: "Aprendi muito sobre visualização de dados complexos e criação de interfaces para usuários técnicos que precisam de informações densas de forma clara e acessível.",
      githubUrl: "",
      liveUrl: "",
    },
    "ifood-academico": {
      id: "ifood-academico",
      titulo: "Ifood Acadêmico",
      subtitulo: "Sistema de gestão de restaurantes",
      descricao: "Liderei o desenvolvimento front-end de um sistema de gestão de restaurantes em parceria com o Ifood.",
      imagemPrincipal: "/ifood-erp.webp",
      tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      categoria: "Sistema Web",
      ano: "2024",
      duracao: "",
      equipe: "5 pessoas",
      status: "Concluído",
      cor: "from-red-500 to-yellow-500",
      cliente: "Ifood / FIAP",
      desafio: "Criar um sistema de gestão de restaurantes com funcionalidades de monitoramento em tempo real e foco em usabilidade.",
      solucao: "Desenvolvimento do front-end com React e TypeScript, design inspirado no Ifood, com foco em usabilidade e performance.",
      resultados: ["Sistema completo de gestão de restaurantes", "Interface inspirada no Ifood com alta usabilidade", "Funcionalidades de monitoramento em tempo real"],
      funcionalidades: ["Gestão de pedidos em tempo real", "Dashboard de desempenho do restaurante", "Interface intuitiva para funcionários", "Relatórios e análises"],
      aprendizados: "Esse projeto foi fundamental para aprender sobre liderança técnica de equipes pequenas e entrega de projetos acadêmicos com padrão profissional.",
      githubUrl: "",
      liveUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7208981105004228610",
    },
    "esphera-glamping": {
      id: "esphera-glamping",
      titulo: "Esphera Glamping",
      subtitulo: "Site institucional multilíngue para glamping de luxo",
      descricao: "Desenvolvimento de um site moderno para o Esphera Glamping, o maior glamping com domos geodésicos do Brasil.",
      imagemPrincipal: "/esphera-glamping-hero.webp",
      tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
      categoria: "Web",
      ano: "2025",
      duracao: "",
      equipe: "4 pessoas",
      status: "No ar",
      cor: "bg-red-950",
      cliente: "Esphera Glamping",
      desafio: "Criar um site que transmitisse a exclusividade da experiência de hospedagem em domos geodésicos, com versões em 3 idiomas e otimizado para SEO.",
      solucao: "Desenvolvimento em WordPress com Elementor Pro, totalmente responsivo e com versões em Português, Inglês e Espanhol. Aplicados recursos visuais imersivos com imagens de alta qualidade.",
      resultados: ["Site no ar com +3 idiomas", "Otimização SEO implementada", "Alta performance e responsividade", "Aumento no engajamento e conversões"],
      funcionalidades: ["Design imersivo e responsivo", "Versões em PT, EN e ES", "SEO otimizado", "Integração com motor de reservas", "Galeria de fotos profissionais"],
      aprendizados: "Aprendi sobre desenvolvimento de sites para o setor de luxo e turismo, com foco em experiência visual imersiva e otimização para conversão.",
      githubUrl: "",
      liveUrl: "https://espheraglamping.com.br/",
    },
  },
  en: {
    "fully": {
      id: "fully",
      titulo: "Fully",
      subtitulo: "Wellness, health and fitness app",
      descricao: "Worked on the backend of a complete wellness app integrating physical, mental and financial health, with personalized goals, rewards and exclusive benefits.",
      imagemPrincipal: "/fully-hero.webp",
      tecnologias: ["AWS", "TypeScript", "Nest", "Prisma", "Mongo", "Kotlin", "PHP", "Unit Tests", "Automated Tests", "Documentation", "CI/CD"],
      categoria: "Mobile",
      ano: "Joined in 2025",
      duracao: "",
      equipe: "30+ team members",
      status: "Live",
      cor: "from-blue-600 to-green-600",
      cliente: "Fully - Prudential",
      desafio: "Revolutionize physical, mental and financial health care by creating an engaging, scalable and accessible digital platform for thousands of users in 3 languages (Portuguese, English and Spanish).",
      solucao: "Developed robust digital solutions using a modern stack (NestJS, Kotlin, PHP) and AWS cloud infrastructure (Lambda, S3, etc). Built wellness-focused features with emphasis on usability, stability and performance.",
      resultados: ["App ratings rose from 2.8 to 4.3 on iOS and 2.5 to 4.9 on Android", "50k+ active users engaged on the platform", "Digital ecosystem in constant growth", "Higher user engagement with healthy habits"],
      funcionalidades: ["Personalized physical, emotional and financial wellness goals", "Exclusive rewards and benefits system", "AWS cloud integration for scalability", "Modular architecture with NestJS, Kotlin and PHP", "User-centered digital experience", "Real-time health and progress tracking"],
      aprendizados: "This project reinforced the importance of combining modern technology with user experience to generate real impact. I also learned to work in agile environments with multidisciplinary squads.",
      githubUrl: "",
      liveUrl: "https://www.prudential.com.br/fully",
    },
    "analise-fraudes": {
      id: "analise-fraudes",
      titulo: "Fraud Analysis System",
      subtitulo: "AI-powered fraud prevention and detection platform",
      descricao: "Worked on the frontend development of a fraud analysis system using artificial intelligence.",
      imagemPrincipal: "/analise-fraudes-dashboard.webp",
      tecnologias: ["React", "AWS", "TypeScript", "Tailwind CSS", "HTML"],
      categoria: "Web System",
      ano: "2024",
      duracao: "",
      equipe: "Several team members",
      status: "Completed",
      cor: "bg-blue-600",
      cliente: "Confidential",
      desafio: "Build a modern, responsive interface for fraud analysis with real-time data visualization.",
      solucao: "Frontend development with React and TypeScript, API integration, interactive data visualizations.",
      resultados: ["Responsive, high-performance interface", "Real-time fraud data visualizations", "Intuitive UX for analysts"],
      funcionalidades: ["Real-time analysis dashboard", "Interactive data visualizations", "Responsive and accessible interface", "Detection API integration"],
      aprendizados: "Learned a great deal about visualizing complex data and building interfaces for technical users who need dense information presented clearly.",
      githubUrl: "",
      liveUrl: "",
    },
    "ifood-academico": {
      id: "ifood-academico",
      titulo: "Academic Ifood",
      subtitulo: "Restaurant management system",
      descricao: "Led the frontend development of a restaurant management system in partnership with Ifood.",
      imagemPrincipal: "/ifood-erp.webp",
      tecnologias: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      categoria: "Web System",
      ano: "2024",
      duracao: "",
      equipe: "5 people",
      status: "Completed",
      cor: "from-red-500 to-yellow-500",
      cliente: "Ifood / FIAP",
      desafio: "Build a restaurant management system with real-time monitoring and a strong focus on usability.",
      solucao: "Frontend with React and TypeScript, Ifood-inspired design, focused on usability and performance.",
      resultados: ["Complete restaurant management system", "High-usability Ifood-inspired interface", "Real-time monitoring features"],
      funcionalidades: ["Real-time order management", "Restaurant performance dashboard", "Intuitive staff interface", "Reports and analytics"],
      aprendizados: "This project was key to learning technical leadership of small teams and delivering academic projects to professional standards.",
      githubUrl: "",
      liveUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7208981105004228610",
    },
    "esphera-glamping": {
      id: "esphera-glamping",
      titulo: "Esphera Glamping",
      subtitulo: "Multilingual institutional website for luxury glamping",
      descricao: "Development of a modern website for Esphera Glamping, Brazil's largest glamping with geodesic domes.",
      imagemPrincipal: "/esphera-glamping-hero.webp",
      tecnologias: ["WordPress", "Elementor Pro", "PHP", "HTML", "CSS"],
      categoria: "Web",
      ano: "2025",
      duracao: "",
      equipe: "4 people",
      status: "Live",
      cor: "bg-red-950",
      cliente: "Esphera Glamping",
      desafio: "Create a website that conveys the exclusivity of the geodesic dome glamping experience, available in 3 languages and SEO-optimized.",
      solucao: "WordPress development with Elementor Pro, fully responsive with Portuguese, English and Spanish versions. Immersive visual resources with high-quality images.",
      resultados: ["Live website in 3+ languages", "SEO optimization implemented", "High performance and responsiveness", "Increased engagement and conversions"],
      funcionalidades: ["Immersive, responsive design", "PT, EN and ES versions", "SEO optimized", "Booking engine integration", "Professional photo gallery"],
      aprendizados: "Learned about luxury and tourism website development, focusing on immersive visual experience and conversion optimization.",
      githubUrl: "",
      liveUrl: "https://espheraglamping.com.br/",
    },
  },
}

export default function ProjectDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const locale = useLocale() as "pt" | "en"
  const nav = useTranslations("nav")
  const t = useTranslations("projects")
  const prefix = locale === "en" ? "/en" : ""

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const projeto = projetosDetalhados[locale][params.slug as keyof (typeof projetosDetalhados)["pt"]]

  if (!projeto) notFound()

  return (
    <main className="min-h-screen bg-pure-black text-pure-white">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href={prefix + "/projetos"} className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            {t("back")}
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-royal-blue text-white mb-4">{projeto.categoria}</Badge>
              <h1 className="font-heading font-bold text-5xl md:text-7xl mb-4">{projeto.titulo}</h1>
              <p className="font-body text-xl text-royal-blue-light mb-6">{projeto.subtitulo}</p>
              <p className="font-body text-gray-300 leading-relaxed mb-8">{projeto.descricao}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-royal-blue" />
                  <span className="font-body text-gray-400">{projeto.ano}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-royal-blue" />
                  <span className="font-body text-gray-400">{projeto.equipe}</span>
                </div>
              </div>
              <div className="flex gap-4">
                {projeto.liveUrl && (
                  <Button className="bg-royal-blue hover:bg-royal-blue-light text-white" asChild>
                    <Link href={projeto.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("external_link")}
                    </Link>
                  </Button>
                )}
                {projeto.githubUrl && (
                  <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white bg-transparent" asChild>
                    <Link href={projeto.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t("code_link")}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image src={projeto.imagemPrincipal || "/placeholder.svg"} alt={projeto.titulo} fill className="object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-br ${projeto.cor} opacity-30`} />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl mb-8 flex items-center gap-3">
            <Code className="h-8 w-8 text-royal-blue" />
            {locale === "pt" ? "Tecnologias Utilizadas" : "Technologies Used"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {projeto.tecnologias.map((tech) => (
              <Badge key={tech} variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors text-sm px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge, Solution, Results */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-deep-gray p-8 rounded-2xl border border-royal-blue/20">
            <Target className="h-10 w-10 text-royal-blue mb-4" />
            <h3 className="font-heading font-bold text-2xl mb-4">{locale === "pt" ? "O Desafio" : "The Challenge"}</h3>
            <p className="font-body text-gray-300 leading-relaxed">{projeto.desafio}</p>
          </div>
          <div className="bg-deep-gray p-8 rounded-2xl border border-royal-blue/20">
            <Lightbulb className="h-10 w-10 text-royal-blue mb-4" />
            <h3 className="font-heading font-bold text-2xl mb-4">{locale === "pt" ? "A Solução" : "The Solution"}</h3>
            <p className="font-body text-gray-300 leading-relaxed">{projeto.solucao}</p>
          </div>
          <div className="bg-deep-gray p-8 rounded-2xl border border-royal-blue/20">
            <Rocket className="h-10 w-10 text-royal-blue mb-4" />
            <h3 className="font-heading font-bold text-2xl mb-4">{locale === "pt" ? "Resultados" : "Results"}</h3>
            <ul className="space-y-2">
              {projeto.resultados.map((resultado, i) => (
                <li key={i} className="font-body text-gray-300 flex items-start gap-2">
                  <span className="text-royal-blue mt-1">→</span>
                  {resultado}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl mb-8">{locale === "pt" ? "Funcionalidades" : "Features"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projeto.funcionalidades.map((func, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-pure-black rounded-xl border border-royal-blue/20">
                <Clock className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                <span className="font-body text-gray-300 text-sm">{func}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">{locale === "pt" ? "Aprendizados" : "Key Takeaways"}</h2>
          <p className="font-body text-gray-300 text-lg leading-relaxed">{projeto.aprendizados}</p>
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-16 px-6 bg-deep-gray">
        <div className="max-w-4xl mx-auto text-center">
          <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-white" asChild>
            <Link href={prefix + "/projetos"}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              {locale === "pt" ? "Ver Todos os Projetos" : "View All Projects"}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
