"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, Target, Lightbulb, Code, Rocket, Menu, X, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

const projetosDetalhados = {
  pt: {
    "iara": {
      id: "iara",
      titulo: "Iara",
      subtitulo: "Tutora de IA multiagente que ensina educação financeira pelo WhatsApp",
      descricao:
        "A Iara é uma tutora de inteligência artificial que conversa com alunos de escolas públicas e particulares direto no WhatsApp, sem precisar de aplicativo. Ela conduz uma jornada completa de educação financeira com narrativa personalizada, gamificação e certificado. Em produção, atende mais de 6.000 alunos e já processou mais de 1,5 milhão de mensagens.",
      imagemPrincipal: "",
      galeria: [],
      tecnologias: ["TypeScript", "Node.js", "Express", "Google ADK", "Next.js", "Fastify", "PostgreSQL", "Prisma", "OpenAI", "Whisper", "Meta WhatsApp Cloud API", "Google Cloud Run", "Cloud Tasks", "Langfuse"],
      categoria: "IA Multiagente",
      ano: "2026",
      duracao: "",
      equipe: "Engenharia de ponta a ponta",
      status: "No ar",
      cor: "from-emerald-900 to-emerald-500",
      cliente: "Edtech de educação financeira",
      desafio:
        "Levar educação financeira de qualidade a alunos de escolas públicas e particulares onde eles já estão: no WhatsApp, muitas vezes num celular compartilhado e com internet limitada. O sistema precisava conversar com naturalidade, personalizar o ensino por aluno, funcionar em escala com custo de IA controlado e dar visibilidade real para professores e parceiros.",
      solucao:
        "Arquitetei um sistema multiagente em produção no Google Cloud, com agentes de IA especializados orquestrados por uma máquina de estados que conduz toda a jornada do aluno, personalização em tempo real e validação automática de qualidade. Fila com Cloud Tasks absorve picos com DLQ para nenhuma mensagem se perder, e a arquitetura multi-tenant no PostgreSQL isola cada parceiro com conteúdo global reutilizável. Em volta do núcleo: CMS administrativo, portal do professor e central de suporte para operação não técnica.",
      resultados: [
        "Mais de 6.000 alunos atendidos em produção",
        "Mais de 1,5 milhão de mensagens processadas",
        "Trilha completa de conteúdo com certificado automático em PDF",
        "Transcrição de áudio dos alunos com Whisper",
        "Custo de IA otimizado com cache de prompt, amostragem de observabilidade e fila resiliente",
      ],
      funcionalidades: [
        "Conversa natural no WhatsApp com texto, áudio e botões interativos",
        "Orquestração de agentes de IA especializados em cada etapa da jornada",
        "Experiência adaptada em tempo real ao progresso e à dificuldade de cada aluno",
        "Gamificação com moedas, níveis, badges e ranking de turma",
        "CMS multi-tenant, portal do professor e central de suporte para operação não técnica",
        "Fila resiliente com reprocesso de mensagens (DLQ) e observabilidade com Langfuse",
      ],
      aprendizados:
        "Operar IA em produção de verdade é outro esporte: filas, idempotência de crédito, custo por token, observabilidade e migrações sem downtime importam tanto quanto o prompt. Este projeto consolidou minha visão de arquitetura de sistemas multiagente em escala real, atendendo milhares de alunos todos os dias.",
      githubUrl: "",
      liveUrl: "",
    },
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
    "questy": {
      id: "questy",
      titulo: "Questy",
      subtitulo: "Plataforma de ensino online com IA para professores e alunos",
      descricao: "Plataforma de ensino online completa — onde a professora cria turmas, disponibiliza materiais, aplica provas e acompanha o desempenho de cada aluno — desenvolvida de ponta a ponta para uma professora doutora de uma universidade de renome no Brasil. Fui responsável por toda a parte tecnológica: arquitetura, front-end (Next.js 15), back-end (NestJS com DDD + Clean Architecture), infraestrutura e deploy em produção com Docker Compose, Traefik e Cloudflare. A plataforma une gestão acadêmica, avaliações ao vivo em tempo real, gamificação e inteligência artificial: geração automática de questões via GPT-4o a partir de PDFs e textos, e análise de déficit de aprendizagem com diagnóstico personalizado por aluno.",
      imagemPrincipal: "/questy-live-professor.webp",
      galeria: [
        { src: "/questy-analise-professor.webp", titulo: "Análise do professor — KPIs, acerto por matéria e alunos em risco" },
        { src: "/questy-live-professor.webp", titulo: "Sala de quiz ao vivo — controle do professor em tempo real" },
        { src: "/questy-quiz-aluno.webp", titulo: "Quiz ao vivo — visão do aluno respondendo" },
        { src: "/questy-dashboard-professor.webp", titulo: "Painel inicial do professor" },
        { src: "/questy-analise-aluno.webp", titulo: "Análise de desempenho do aluno" },
        { src: "/questy-perfil-aluno.webp", titulo: "Perfil e gamificação do aluno" },
      ],
      tecnologias: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "TypeORM", "GPT-4o", "Docker", "Traefik", "Cloudflare", "Argon2id"],
      categoria: "Plataforma Web",
      ano: "2026",
      duracao: "",
      equipe: "Projeto full stack (solo)",
      status: "No ar",
      cor: "from-blue-900 to-blue-500",
      cliente: "Professora doutora — universidade de renome (Brasil)",
      desafio: "Entregar uma plataforma de aprendizagem completa e pronta para produção para uma professora doutora — unificando gestão acadêmica, avaliações ao vivo em tempo real, gamificação e IA — com segurança, escalabilidade e infraestrutura própria.",
      solucao: "Desenvolvi a solução de ponta a ponta e assumi toda a camada tecnológica: front-end em Next.js 15 (App Router) e back-end em NestJS com DDD + Clean Architecture. Integrei o GPT-4o para gerar questões automaticamente a partir de PDFs e textos e para diagnosticar déficits de aprendizagem por aluno. Autenticação com JWT + Argon2id + pepper server-side, storage intercambiável (Cloudflare R2) e deploy em produção com Docker Compose + Traefik (TLS automático) atrás da Cloudflare.",
      resultados: ["Plataforma completa em produção", "Geração de questões por IA (GPT-4o) a partir de PDF e texto", "Diagnóstico de déficit de aprendizagem personalizado por aluno", "Infraestrutura própria com Docker Compose + Traefik (TLS) + Cloudflare"],
      funcionalidades: ["Geração automática de questões via GPT-4o (PDF/texto)", "Análise de déficit de aprendizagem por IA, por aluno", "Salas de quiz ao vivo em tempo real (estilo Kahoot)", "Gamificação com pontos (XP) e badges", "Autenticação JWT + Argon2id + pepper server-side", "Gestão de turmas, matérias, conteúdo e analytics (export Excel)"],
      aprendizados: "Projeto que consolidou minha capacidade de entregar um produto full stack de ponta a ponta — da arquitetura de back-end (DDD, eventos, inversão de dependência) e integração de IA (GPT-4o) até a infraestrutura em produção com Docker Compose, Traefik e Cloudflare. Reforçou também decisões de segurança (Argon2id + pepper) e de arquitetura, como upload e IA direto do navegador para a API para contornar limites de serverless.",
      githubUrl: "",
      liveUrl: "",
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
    "iara": {
      id: "iara",
      titulo: "Iara",
      subtitulo: "Multi-agent AI tutor teaching financial literacy over WhatsApp",
      descricao:
        "Iara is an AI tutor that talks to public and private school students directly on WhatsApp, no app required. She guides a complete financial literacy journey with personalized narratives, gamification and certificates. In production, she serves 6,000+ students and has processed over 1.5M messages.",
      imagemPrincipal: "",
      galeria: [],
      tecnologias: ["TypeScript", "Node.js", "Express", "Google ADK", "Next.js", "Fastify", "PostgreSQL", "Prisma", "OpenAI", "Whisper", "Meta WhatsApp Cloud API", "Google Cloud Run", "Cloud Tasks", "Langfuse"],
      categoria: "Multi-agent AI",
      ano: "2026",
      duracao: "",
      equipe: "End-to-end engineering",
      status: "Live",
      cor: "from-emerald-900 to-emerald-500",
      cliente: "Financial education edtech",
      desafio:
        "Bring quality financial education to public and private school students where they already are: on WhatsApp, often on a shared phone with limited data. The system had to converse naturally, personalize teaching per student, run at scale with controlled AI costs and give teachers and partners real visibility.",
      solucao:
        "I architected a multi-agent system in production on Google Cloud, with specialized AI agents orchestrated by a state machine that drives the entire student journey, real-time personalization and automated quality validation. A Cloud Tasks queue absorbs spikes with a DLQ so no message is ever lost, and the multi-tenant PostgreSQL architecture isolates each partner with reusable global content. Around the core: an admin CMS, a teacher portal and a support center built for non-technical operators.",
      resultados: [
        "6,000+ students served in production",
        "1.5M+ messages processed",
        "Complete content track with automatic PDF certificates",
        "Student audio transcription with Whisper",
        "AI costs optimized with prompt caching, observability sampling and a resilient queue",
      ],
      funcionalidades: [
        "Natural WhatsApp conversation with text, audio and interactive buttons",
        "Orchestration of specialized AI agents across the learning journey",
        "Experience adapted in real time to each student's progress and difficulty level",
        "Gamification with coins, levels, badges and class ranking",
        "Multi-tenant CMS, teacher portal and support center for non-technical operations",
        "Resilient queue with message reprocessing (DLQ) and Langfuse observability",
      ],
      aprendizados:
        "Running AI in production is a different sport: queues, credit idempotency, cost per token, observability and zero-downtime migrations matter as much as the prompt. This project consolidated my view of multi-agent system architecture at real scale, serving thousands of students every day.",
      githubUrl: "",
      liveUrl: "",
    },
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
    "questy": {
      id: "questy",
      titulo: "Questy",
      subtitulo: "AI-powered online learning platform for teachers and students",
      descricao: "Complete online learning platform — where the professor creates classes, shares materials, runs assessments and tracks each student's performance — built end to end for a PhD professor at a renowned Brazilian university. I owned the entire technical layer: architecture, front-end (Next.js 15), back-end (NestJS with DDD + Clean Architecture), infrastructure and production deployment with Docker Compose, Traefik and Cloudflare. The platform unifies academic management, real-time live assessments, gamification and AI: automatic question generation via GPT-4o from PDFs and text, plus learning-gap analysis with personalized per-student diagnostics.",
      imagemPrincipal: "/questy-live-professor.webp",
      galeria: [
        { src: "/questy-analise-professor.webp", titulo: "Teacher analytics — KPIs, accuracy by subject and at-risk students" },
        { src: "/questy-live-professor.webp", titulo: "Live quiz room — real-time teacher control" },
        { src: "/questy-quiz-aluno.webp", titulo: "Live quiz — student answering view" },
        { src: "/questy-dashboard-professor.webp", titulo: "Teacher home dashboard" },
        { src: "/questy-analise-aluno.webp", titulo: "Student performance analytics" },
        { src: "/questy-perfil-aluno.webp", titulo: "Student profile and gamification" },
      ],
      tecnologias: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "TypeORM", "GPT-4o", "Docker", "Traefik", "Cloudflare", "Argon2id"],
      categoria: "Web Platform",
      ano: "2026",
      duracao: "",
      equipe: "Full stack (solo)",
      status: "Live",
      cor: "from-blue-900 to-blue-500",
      cliente: "PhD professor — renowned university (Brazil)",
      desafio: "Deliver a complete, production-ready learning platform for a PhD professor — unifying academic management, real-time live assessments, gamification and AI — with security, scalability and self-managed infrastructure.",
      solucao: "Built the solution end to end and owned the entire technical layer: a Next.js 15 (App Router) front-end and a NestJS back-end with DDD + Clean Architecture. Integrated GPT-4o to automatically generate questions from PDFs and text and to diagnose per-student learning gaps. JWT + Argon2id + server-side pepper authentication, swappable storage (Cloudflare R2), and production deployment with Docker Compose + Traefik (automatic TLS) behind Cloudflare.",
      resultados: ["Complete platform in production", "AI question generation (GPT-4o) from PDF and text", "Personalized per-student learning-gap diagnostics", "Self-managed infrastructure with Docker Compose + Traefik (TLS) + Cloudflare"],
      funcionalidades: ["Automatic question generation via GPT-4o (PDF/text)", "Per-student AI learning-gap analysis", "Real-time live quiz rooms (Kahoot-style)", "Gamification with points (XP) and badges", "JWT + Argon2id + server-side pepper authentication", "Class, subject, content management and analytics (Excel export)"],
      aprendizados: "This project consolidated my ability to ship a full-stack product end to end — from back-end architecture (DDD, events, dependency inversion) and AI integration (GPT-4o) to production infrastructure with Docker Compose, Traefik and Cloudflare. It also reinforced security decisions (Argon2id + pepper) and architecture calls like browser-direct uploads and AI to bypass serverless limits.",
      githubUrl: "",
      liveUrl: "",
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

  const galeria = (projeto as { galeria?: { src: string; titulo: string }[] }).galeria ?? []

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
            <Link href={locale === "en" ? "https://wa.me/+5511947720129?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5511947720129?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} className="font-body hover-underline">{nav("contact")}</Link>
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
            <a href={locale === "en" ? "https://wa.me/+5511947720129?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5511947720129?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("contact")}</a>
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
              {projeto.imagemPrincipal ? (
                <>
                  <Image src={projeto.imagemPrincipal} alt={projeto.titulo} fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${projeto.cor} opacity-30`} />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${projeto.cor} opacity-70 flex items-center justify-center`}>
                  <span className="font-heading font-bold text-6xl text-white/90">{projeto.titulo}</span>
                </div>
              )}
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

      {/* Gallery */}
      {galeria.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-bold text-3xl mb-8 flex items-center gap-3">
              <ImageIcon className="h-8 w-8 text-royal-blue" />
              {locale === "pt" ? "Telas do Produto" : "Product Screens"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galeria.map((shot, i) => (
                <figure
                  key={shot.src}
                  className={`group overflow-hidden rounded-2xl border border-royal-blue/20 bg-deep-gray transition-all duration-500 hover:border-royal-blue/50 ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                    <Image
                      src={shot.src}
                      alt={shot.titulo}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="font-body text-sm text-gray-300 px-5 py-4 border-t border-royal-blue/10">
                    {shot.titulo}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

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
