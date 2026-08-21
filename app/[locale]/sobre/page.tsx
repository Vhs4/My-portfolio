"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
import { useTranslations, useLocale } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

const stackTecnologico = [
  {
    categoria: { pt: "IA & Agentes", en: "AI & Agents" },
    icon: Zap,
    cor: "from-violet-500 to-purple-600",
    tecnologias: [
      { nome: { pt: "Sistemas Multi-Agentes", en: "Multi-Agent Systems" } },
      { nome: "LangChain / LangGraph" },
      { nome: "OpenAI / Gemini APIs" },
      { nome: "Vertex AI" },
      { nome: "Google ADK" },
      { nome: "Agno" },
      { nome: "RAG" },
      { nome: "N8N" },
    ],
  },
  {
    categoria: { pt: "Cloud & DevOps", en: "Cloud & DevOps" },
    icon: Cloud,
    cor: "from-orange-500 to-red-500",
    tecnologias: [
      { nome: "AWS (Lambda, S3, ECS)" },
      { nome: "GCP (Cloud Run, Cloud SQL)" },
      { nome: "Docker" },
      { nome: "Vercel" },
    ],
  },
  {
    categoria: { pt: "Frontend", en: "Frontend" },
    icon: Monitor,
    cor: "from-blue-500 to-cyan-500",
    tecnologias: [
      { nome: "React" },
      { nome: "Next.js" },
      { nome: "TypeScript" },
      { nome: "Tailwind CSS" },
    ],
  },
  {
    categoria: { pt: "Backend", en: "Backend" },
    icon: Database,
    cor: "from-green-500 to-emerald-500",
    tecnologias: [
      { nome: "Node.js" },
      { nome: "NestJS / Fastify" },
      { nome: "Python" },
      { nome: "PostgreSQL / Prisma" },
      { nome: "Kotlin" },
    ],
  },
  {
    categoria: { pt: "Mobile", en: "Mobile" },
    icon: Smartphone,
    cor: "from-purple-500 to-pink-500",
    tecnologias: [
      { nome: "React Native" },
      { nome: "Expo" },
    ],
  },
]

const experiencias = {
  pt: [
    {
      cargo: "Engenheiro de Software & IA | Forward Deployed Engineer",
      empresa: "Barkus (EdTech)",
      periodo: "maio de 2026 - Presente",
      descricao:
        "Único engenheiro responsável pela arquitetura e desenvolvimento end-to-end da Iara 2.0 — plataforma de educação financeira conversacional via WhatsApp com sistema multi-agente de IA, em produção com +6.000 alunos de escolas públicas e particulares e +1,5 milhão de mensagens processadas. Como Forward Deployed Engineer, além da engenharia presto suporte técnico a alunos e ao time de operação direto em produção.",
      conquistas: [
        "Arquitetei um sistema multi-agente com agentes de IA especializados, coordenados por uma máquina de estados que conduz toda a jornada de aprendizagem",
        "Construí 3 serviços backend independentes: engine de IA (Express), CMS com autoria de conteúdo por IA via Gemini 2.5 Flash (Next.js 14) e Portal do Professor (Fastify 5 + Prisma 6)",
        "Desenvolvi personalização em tempo real que adapta tom pedagógico, dificuldade, conteúdo e a própria gamificação para cada aluno",
        "Projetei arquitetura SaaS multi-tenant no PostgreSQL com gamificação própria (XP, moedas, badges), rankings e painel admin cross-tenant com trilha de auditoria completa",
        "Criei a Central de Suporte da Iara, usada diariamente pelo time não técnico para resolver problemas do dia a dia da operação",
        "Liderei a migração para a API oficial da Meta (WhatsApp Cloud API), removendo o Chatwoot da arquitetura sem downtime — com fila assíncrona no Cloud Tasks, observabilidade de LLM com Langfuse e otimização contínua do custo de IA",
      ],
      tecnologias: [
        { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
        { nome: "Next.js 14", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Fastify / Express", cor: "bg-gray-700", icon: "⚡" },
        { nome: "Prisma + PostgreSQL 16", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "Google ADK + GPT-4.1", cor: "bg-emerald-600", icon: "🧠" },
        { nome: "Gemini 2.5 Flash", cor: "bg-violet-600", icon: "✨" },
        { nome: "OpenAI Whisper", cor: "bg-teal-600", icon: "🎙️" },
        { nome: "GCP Cloud Run + Cloud Tasks", cor: "bg-sky-600", icon: "☁️" },
        { nome: "Langfuse", cor: "bg-indigo-600", icon: "📊" },
        { nome: "Meta WhatsApp Cloud API", cor: "bg-green-600", icon: "🤖" },
      ],
    },
    {
      cargo: "Engenheiro de Software & IA",
      empresa: "Codrix",
      periodo: "abril de 2026 - julho de 2026",
      descricao:
        "Responsável por toda a stack no desenvolvimento de dois produtos completos baseados em IA — da arquitetura ao deploy em produção.",
      conquistas: [
        "Construí plataforma de prospecção B2B com enriquecimento de dados em dois estágios e qualificação de leads por IA (Apify + agente verificador com Agno Framework + GPT-4o-mini)",
        "Implementei sistema ICP com geração automatizada por IA, filtros por segmento, porte e estado, e prospecção no LinkedIn com fila assíncrona (Supabase + worker Python)",
        "Desenvolvi SaaS de geração de vídeos comerciais (9:16) com pipeline de 12 agentes especializados orquestrados em LangGraph, com estado persistente e recuperação de falhas",
        "Criei quality gates com agentes críticos e mecanismo self-healing que detecta falhas e regenera artefatos — vídeos completos em ~5-10 minutos com narração e consistência de personagens",
      ],
      tecnologias: [
        { nome: "LangGraph", cor: "bg-violet-600", icon: "🕸️" },
        { nome: "Next.js + NestJS", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Python", cor: "bg-yellow-600", icon: "🐍" },
        { nome: "BullMQ + Redis", cor: "bg-red-600", icon: "📮" },
        { nome: "Postgres + pgvector", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "Supabase", cor: "bg-emerald-600", icon: "⚡" },
        { nome: "Docker Swarm + Traefik", cor: "bg-sky-600", icon: "🐳" },
        { nome: "Imagen / Veo / Claude / Gemini", cor: "bg-indigo-600", icon: "🎬" },
      ],
    },
    {
      cargo: "Engenheiro de Software",
      empresa: "Freelance",
      periodo: "março de 2026 - Presente",
      descricao:
        "Arquitetura e entrega solo de projetos fullstack em produção, com responsabilidade técnica total — do modelagem de dados ao deploy — em colaboração com designer UX/UI.",
      conquistas: [
        "Projetou e entregou sozinho um LMS com IA (frontend, backend, infra e deploy) para uma professora doutora de universidade de renome no Brasil",
        "Integrou GPT-4o da OpenAI para geração de questões de múltipla escolha a partir de PDFs, retornando JSON estruturado e editável",
        "Construiu pipeline de detecção de lacunas de aprendizagem com diagnósticos personalizados via OpenAI",
        "Implementou motor de gamificação com XP, badges e conquistas, além de autenticação JWT multi-perfil com Argon2id + pepper server-side",
        "Construiu e fez deploy da Espherinha — agente de IA conversacional via WhatsApp para hotelaria de luxo com +70k seguidores no Instagram, automatizando qualificação de leads",
        "Arquitetou e fez deploy de Concierge Interno de IA baseado em RAG, treinado nas políticas e FAQs da propriedade, reduzindo carga operacional manual",
      ],
      tecnologias: [
        { nome: "React / Next.js", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "NestJS", cor: "bg-blue-600", icon: "💻" },
        { nome: "PostgreSQL", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "GPT-4o / OpenAI", cor: "bg-emerald-600", icon: "🧠" },
        { nome: "Docker / Traefik", cor: "bg-sky-600", icon: "🐳" },
        { nome: "Cloudflare", cor: "bg-orange-500", icon: "☁️" },
        { nome: "N8N + WhatsApp API", cor: "bg-green-600", icon: "🤖" },
        { nome: "RAG / LangChain", cor: "bg-violet-600", icon: "🔗" },
      ],
    },
    {
      cargo: "Desenvolvedor Full Stack - Trainee",
      empresa: "SysMap Solutions — Fully (Prudential, R$200M investidos)",
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
      cargo: "Tech Lead & Desenvolvedor Full-Stack",
      empresa: "Freelance",
      periodo: "junho de 2024 - abril de 2025",
      descricao:
        "Liderei a entrega end-to-end de produtos digitais de alto impacto para clientes nos setores de inovação e hospitalidade de luxo, com ownership de arquitetura, desenvolvimento e decisões técnicas.",
      conquistas: [
        "Esphera Glamping — Website: entreguei um site premium responsivo e multilíngue (PT/EN/ES), focado em SEO, performance e conversão",
        "Plataforma de Hackathon & Inovação Aberta: liderei o desenvolvimento full-stack de features — novas funcionalidades de engajamento, melhorias de escalabilidade e arquitetura frontend",
      ],
      tecnologias: [
        { nome: "Liderança Técnica", cor: "bg-green-600", icon: "🎯" },
        { nome: "WordPress + Elementor", cor: "bg-indigo-600", icon: "🌐" },
        { nome: "SEO & Performance", cor: "bg-orange-500", icon: "⚡" },
        { nome: "Arquitetura Frontend", cor: "bg-cyan-500", icon: "⚛️" },
      ],
    },
    {
      cargo: "Estagiário de Desenvolvimento Front-End",
      empresa: "Elastic Code",
      periodo: "janeiro de 2024 - junho de 2024",
      descricao:
        "Liderei a arquitetura frontend e implementação de um ERP de Gestão de Frotas e Fretes — gerenciamento de motoristas, relatórios de custo/peso de viagens e dashboards em tempo real.",
      conquistas: [
        "Gerenciei estado global em múltiplas views não relacionadas com Redux — dados de viagens acessíveis em perfis de motoristas, listagens e relatórios financeiros sem acoplamento pai-filho",
        "Contribuí com componentes frontend para uma Plataforma de Análise de Arquivos com IA integrada à AWS",
      ],
      tecnologias: [
        { nome: "React", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
        { nome: "Tailwind CSS", cor: "bg-sky-600", icon: "🎨" },
        { nome: "NextUI + Styled Components", cor: "bg-pink-600", icon: "💅" },
        { nome: "Redux", cor: "bg-violet-600", icon: "🔄" },
      ],
    },
    {
      cargo: "Desenvolvedor Front-End / E-Commerce",
      empresa: "Freelance — Shopify",
      periodo: "agosto de 2023 - janeiro de 2024",
      descricao:
        "Construí e customizei lojas virtuais completas usando Shopify Liquid — páginas de produto, coleções, design responsivo e identidade de marca.",
      conquistas: [
        "Entreguei storefronts focados em conversão, alinhados com objetivos de negócio e consistentes em mobile/desktop",
      ],
      tecnologias: [
        { nome: "Shopify Liquid", cor: "bg-green-600", icon: "🛍️" },
        { nome: "E-commerce", cor: "bg-emerald-600", icon: "🛒" },
        { nome: "Design Responsivo", cor: "bg-purple-600", icon: "📱" },
      ],
    },
    {
      cargo: "Estagiário de Desenvolvimento Front-End",
      empresa: "Campos Developers",
      periodo: "abril de 2023 - maio de 2023",
      descricao:
        "Primeira experiência profissional em desenvolvimento de software — construí interfaces com Vue 2, Nuxt, Bootstrap, Buefy, JavaScript, HTML e CSS.",
      conquistas: [
        "Implementei funcionalidades CRUD e integrações com APIs REST",
        "Apliquei Swagger e Redoc para documentação de API",
      ],
      tecnologias: [
        { nome: "Vue 2", cor: "bg-green-600", icon: "💚" },
        { nome: "Nuxt", cor: "bg-emerald-600", icon: "⛰️" },
        { nome: "Bootstrap + Buefy", cor: "bg-purple-600", icon: "🎨" },
        { nome: "Swagger + Redoc", cor: "bg-yellow-600", icon: "📄" },
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
  ],
  en: [
    {
      cargo: "Software & AI Engineer | Forward Deployed Engineer",
      empresa: "Barkus (EdTech)",
      periodo: "May 2026 - Present",
      descricao:
        "Sole engineer responsible for the end-to-end architecture and development of Iara 2.0 — a conversational financial education platform on WhatsApp powered by a multi-agent AI system, in production with 6,000+ public and private school students and 1.5M+ messages processed. As a Forward Deployed Engineer, beyond engineering I provide technical support to students and the operations team directly in production.",
      conquistas: [
        "Architected a multi-agent system with specialized AI agents, coordinated through a state machine that drives the entire learning journey",
        "Built 3 independent backend services: core AI engine (Express), CMS with AI-powered content authoring via Gemini 2.5 Flash (Next.js 14) and Teacher Portal (Fastify 5 + Prisma 6)",
        "Developed real-time personalization that adapts pedagogical tone, difficulty, content and the gamification itself for each student",
        "Designed a multi-tenant SaaS architecture on PostgreSQL with custom gamification (XP, coins, badges), rankings and a cross-tenant admin panel with a full audit trail",
        "Created Iara's Support Center, used daily by the non-technical team to solve day-to-day operational issues",
        "Led the migration to Meta's official WhatsApp Cloud API, removing Chatwoot from the architecture with zero downtime — async queue on Cloud Tasks, LLM observability with Langfuse and continuous AI cost optimization",
      ],
      tecnologias: [
        { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
        { nome: "Next.js 14", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Fastify / Express", cor: "bg-gray-700", icon: "⚡" },
        { nome: "Prisma + PostgreSQL 16", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "Google ADK + GPT-4.1", cor: "bg-emerald-600", icon: "🧠" },
        { nome: "Gemini 2.5 Flash", cor: "bg-violet-600", icon: "✨" },
        { nome: "OpenAI Whisper", cor: "bg-teal-600", icon: "🎙️" },
        { nome: "GCP Cloud Run + Cloud Tasks", cor: "bg-sky-600", icon: "☁️" },
        { nome: "Langfuse", cor: "bg-indigo-600", icon: "📊" },
        { nome: "Meta WhatsApp Cloud API", cor: "bg-green-600", icon: "🤖" },
      ],
    },
    {
      cargo: "Software & AI Engineer",
      empresa: "Codrix",
      periodo: "April 2026 - July 2026",
      descricao:
        "Owned the entire stack while developing two complete AI-based products — from architecture to production deployment.",
      conquistas: [
        "Built an AI-powered B2B prospecting platform with a two-stage data enrichment pipeline and AI lead qualification (Apify + verifier agent with Agno Framework + GPT-4o-mini)",
        "Implemented an ICP system with automated AI generation, filters by segment, company size and state, plus LinkedIn prospecting with an async job queue (Supabase + Python worker)",
        "Developed a commercial video generation SaaS (9:16) with a pipeline of 12 specialized agents orchestrated in LangGraph, with persistent state and failure recovery",
        "Created quality gates with critic agents and a self-healing mechanism that detects failures and regenerates artifacts — full videos in ~5-10 minutes with narration and character consistency",
      ],
      tecnologias: [
        { nome: "LangGraph", cor: "bg-violet-600", icon: "🕸️" },
        { nome: "Next.js + NestJS", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Python", cor: "bg-yellow-600", icon: "🐍" },
        { nome: "BullMQ + Redis", cor: "bg-red-600", icon: "📮" },
        { nome: "Postgres + pgvector", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "Supabase", cor: "bg-emerald-600", icon: "⚡" },
        { nome: "Docker Swarm + Traefik", cor: "bg-sky-600", icon: "🐳" },
        { nome: "Imagen / Veo / Claude / Gemini", cor: "bg-indigo-600", icon: "🎬" },
      ],
    },
    {
      cargo: "Software Engineer",
      empresa: "Freelance",
      periodo: "March 2026 - Present",
      descricao:
        "Solo architecture and delivery of fullstack projects in production, with full technical ownership — from data modeling to deployment — in collaboration with a UX/UI designer.",
      conquistas: [
        "Designed and delivered solo a full LMS with AI (frontend, backend, infra and deployment) for a PhD professor at a renowned Brazilian university",
        "Integrated OpenAI GPT-4o to generate multiple-choice questions from PDFs, returning structured and editable JSON before persistence",
        "Built a learning-gap detection pipeline — compiles student quiz performance and sends to OpenAI, returning personalized textual diagnostics with weak topics and recommended review areas",
        "Implemented a gamification engine with XP, badges and achievements, plus multi-profile JWT auth with Argon2id + server-side pepper",
        "Built and deployed Espherinha — a conversational AI agent via WhatsApp for a luxury glamping brand with 70k+ Instagram followers, automating lead qualification",
        "Architected and deployed an internal AI Concierge based on RAG, trained on the property's amenities, policies, prices and FAQs, reducing manual operational load",
      ],
      tecnologias: [
        { nome: "React / Next.js", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "NestJS", cor: "bg-blue-600", icon: "💻" },
        { nome: "PostgreSQL", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "GPT-4o / OpenAI", cor: "bg-emerald-600", icon: "🧠" },
        { nome: "Docker / Traefik", cor: "bg-sky-600", icon: "🐳" },
        { nome: "Cloudflare", cor: "bg-orange-500", icon: "☁️" },
        { nome: "N8N + WhatsApp API", cor: "bg-green-600", icon: "🤖" },
        { nome: "RAG / LangChain", cor: "bg-violet-600", icon: "🔗" },
      ],
    },
    {
      cargo: "Full Stack Developer - Trainee",
      empresa: "SysMap Solutions — Fully (Prudential, R$200M invested)",
      periodo: "April 2025 – March 2026",
      descricao:
        "Development and optimization of a wellness, health and fitness app with direct impact on ratings and user experience.",
      conquistas: [
        "Raised iOS rating from 2.8 to 4.3 stars",
        "Raised Android rating from 2.5 to 4.9 stars",
        "Implemented the user digital wallet — a high-impact module with financial transactions, balance and history in production with 50k+ active users",
        "Participated in a strategic project that saved millions of reais by internalizing critical features previously outsourced, requiring reverse engineering and custom architecture",
        "Created and documented an automated testing standard adopted internally as the team's main guide",
      ],
      tecnologias: [
        { nome: "NestJS", cor: "bg-blue-500", icon: "💻" },
        { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
        { nome: "Node.js", cor: "bg-green-500", icon: "🟢" },
        { nome: "AWS (Lambda, S3, EC2...)", cor: "bg-orange-500", icon: "☁️" },
        { nome: "PostgreSQL", cor: "bg-blue-700", icon: "🗄️" },
        { nome: "MongoDB", cor: "bg-green-700", icon: "🤖" },
        { nome: "BFF (Backend For Frontend)", cor: "bg-yellow-400", icon: "🔗" },
        { nome: "Jest / Testing Library", cor: "bg-red-600", icon: "✅" },
        { nome: "PHP", cor: "bg-indigo-600", icon: "🐘" },
        { nome: "Kotlin", cor: "bg-teal-600", icon: "📱" },
      ],
    },
    {
      cargo: "Tech Lead & Full-Stack Developer",
      empresa: "Freelance",
      periodo: "June 2024 - April 2025",
      descricao:
        "Led end-to-end delivery of high-impact digital products for clients in the innovation and luxury hospitality sectors, owning architecture, development and technical decisions.",
      conquistas: [
        "Esphera Glamping — Website: delivered a premium responsive multilingual website (PT/EN/ES), focused on SEO, performance and conversion",
        "Hackathon & Open Innovation Platform: led full-stack feature development — new engagement features, scalability improvements and frontend architecture",
      ],
      tecnologias: [
        { nome: "Technical Leadership", cor: "bg-green-600", icon: "🎯" },
        { nome: "WordPress + Elementor", cor: "bg-indigo-600", icon: "🌐" },
        { nome: "SEO & Performance", cor: "bg-orange-500", icon: "⚡" },
        { nome: "Frontend Architecture", cor: "bg-cyan-500", icon: "⚛️" },
      ],
    },
    {
      cargo: "Front-End Development Intern",
      empresa: "Elastic Code",
      periodo: "January 2024 - June 2024",
      descricao:
        "Led the frontend architecture and implementation of a Truck Fleet & Freight Management ERP — driver management, trip cost/weight reports and real-time dashboards.",
      conquistas: [
        "Managed global state across multiple unrelated views with Redux — trip data simultaneously accessible in driver profiles, trip listings and financial reports without parent-child coupling",
        "Contributed frontend components to an AI File Analysis Platform integrated with AWS",
      ],
      tecnologias: [
        { nome: "React", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "TypeScript", cor: "bg-blue-600", icon: "🔷" },
        { nome: "Tailwind CSS", cor: "bg-sky-600", icon: "🎨" },
        { nome: "NextUI + Styled Components", cor: "bg-pink-600", icon: "💅" },
        { nome: "Redux", cor: "bg-violet-600", icon: "🔄" },
      ],
    },
    {
      cargo: "Front-End / E-Commerce Developer",
      empresa: "Freelance — Shopify",
      periodo: "August 2023 - January 2024",
      descricao:
        "Built and customized complete e-commerce storefronts using Shopify Liquid — product pages, collections, responsive design and brand identity.",
      conquistas: [
        "Delivered conversion-focused storefronts aligned with business goals and consistent across mobile/desktop",
      ],
      tecnologias: [
        { nome: "Shopify Liquid", cor: "bg-green-600", icon: "🛍️" },
        { nome: "E-commerce", cor: "bg-emerald-600", icon: "🛒" },
        { nome: "Responsive Design", cor: "bg-purple-600", icon: "📱" },
      ],
    },
    {
      cargo: "Front-End Development Intern",
      empresa: "Campos Developers",
      periodo: "April 2023 - May 2023",
      descricao:
        "First professional software development experience — built interfaces with Vue 2, Nuxt, Bootstrap, Buefy, JavaScript, HTML and CSS.",
      conquistas: [
        "Implemented CRUD features and REST API integrations",
        "Applied Swagger and Redoc for API documentation",
      ],
      tecnologias: [
        { nome: "Vue 2", cor: "bg-green-600", icon: "💚" },
        { nome: "Nuxt", cor: "bg-emerald-600", icon: "⛰️" },
        { nome: "Bootstrap + Buefy", cor: "bg-purple-600", icon: "🎨" },
        { nome: "Swagger + Redoc", cor: "bg-yellow-600", icon: "📄" },
      ],
    },
    {
      cargo: "Team Leader — Regional Champion",
      empresa: "NASA Space Apps Challenge",
      periodo: "2023",
      descricao: "Led the regional winning team in Campos dos Goytacazes, globally nominated by NASA.",
      conquistas: [
        "Regional champion of the world's largest hackathon",
        "Team globally nominated by NASA",
        "Trophy from the Brazilian Space Agency",
      ],
      tecnologias: [
        { nome: "React", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Python", cor: "bg-yellow-600", icon: "🐍" },
        { nome: "Scientists Social Network MVP", cor: "bg-blue-600", icon: "🚀" },
        { nome: "Leadership", cor: "bg-green-600", icon: "🎯" },
      ],
    },
    {
      cargo: "Project Leader",
      empresa: "CAPES Hackathon",
      periodo: "2024",
      descricao:
        "Led the development of the second best project in Brazil to improve the CAPES academic portal with AI.",
      conquistas: [
        "2nd best project in Brazil",
        "Led the creation of an AI assistant to help write articles by recommending reliable sources",
        "Improved the academic research system without AI, creating new search filters",
      ],
      tecnologias: [
        { nome: "Artificial Intelligence", cor: "bg-violet-500", icon: "🧠" },
        { nome: "NLP (Natural Language Processing)", cor: "bg-teal-500", icon: "💬" },
        { nome: "Next.js", cor: "bg-cyan-500", icon: "⚛️" },
        { nome: "Academic Research", cor: "bg-blue-600", icon: "📚" },
        { nome: "Filter Creation", cor: "bg-blue-600", icon: "🔍" },
      ],
    },
  ],
}

const valores = {
  pt: [
    { titulo: "Código Limpo", descricao: "Acredito que código bem escrito é poesia em movimento. Cada linha deve contar uma história clara.", icon: Code },
    { titulo: "Inovação Constante", descricao: "Sempre em busca das tecnologias mais modernas e práticas que realmente agregam valor.", icon: Rocket },
    { titulo: "Experiência do Usuário", descricao: "Todo código que escrevo tem um propósito: criar experiências que as pessoas amem usar.", icon: Heart },
    { titulo: "Aprendizado Contínuo", descricao: "O mundo tech evolui rapidamente. Dedico tempo diário para aprender algo novo.", icon: Zap },
  ],
  en: [
    { titulo: "Clean Code", descricao: "I believe well-written code is poetry in motion. Every line should tell a clear story.", icon: Code },
    { titulo: "Constant Innovation", descricao: "Always looking for modern technologies and practices that truly add value.", icon: Rocket },
    { titulo: "User Experience", descricao: "Every line of code I write has a purpose: to create experiences people love to use.", icon: Heart },
    { titulo: "Continuous Learning", descricao: "The tech world evolves fast. I dedicate daily time to learning something new.", icon: Zap },
  ],
}

export default function SobrePage() {
  const locale = useLocale() as "pt" | "en"
  const t = useTranslations("about")
  const nav = useTranslations("nav")
  const prefix = locale === "en" ? "/en" : ""

  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentExperiencias = experiencias[locale]
  const currentValores = valores[locale]

  return (
    <main className="min-h-screen bg-pure-black text-pure-white p-4 md:p-0">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-pure-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href={prefix + "/"} className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href={prefix + "/projetos"} className="font-body hover-underline">{nav("projects")}</Link>
            <Link href={prefix + "/sobre"} className="font-body hover-underline text-royal-blue">{nav("about")}</Link>
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
      <section data-section="0" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="w-full h-full bg-gradient-to-br from-royal-blue to-royal-blue-light" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-6 animate-kinetic-text">
                <span className="block">{t("hero.greeting")}</span>
                <span className="block text-royal-blue">{t("hero.name")}</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-royal-blue-light mb-6">{t("hero.subtitle")}</p>
              <p className="font-body text-lg text-gray-300 leading-relaxed mb-8">{t("hero.description")}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{t("hero.location")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{t("hero.role_label")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-royal-blue" />
                  <span className="font-body text-gray-300">{t("hero.aws")}</span>
                </div>
              </div>
              {locale === "en" ? (
                <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 cursor-pointer" asChild>
                  <a href="/resume_victor_hugo_campos_oficial.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    {t("hero.download_cv")}
                  </a>
                </Button>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-body font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <Download className="mr-2 h-5 w-5" />
                      {t("hero.download_cv")}
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
              )}
            </div>
            <div className="relative">
              <div className="animate-float">
                <Image
                  src="/fotoperfil.webp"
                  alt="Victor Hugo"
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

      {/* Stack */}
      <section data-section="1" className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">{t("stack_section.title")}</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">{t("stack_section.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stackTecnologico.map((categoria, index) => {
              const IconComponent = categoria.icon
              return (
                <div
                  key={index}
                  className="bg-pure-black p-8 pb-12 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300 h-fit"
                  style={{ transform: windowWidth >= 1024 ? `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)` : "none" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${categoria.cor}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl">
                      {typeof categoria.categoria === "string" ? categoria.categoria : categoria.categoria[locale]}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {categoria.tecnologias.map((tech) => {
                      const nome = typeof tech.nome === "string" ? tech.nome : tech.nome[locale]
                      return (
                        <div
                          key={nome}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-royal-blue/15 bg-deep-gray/40 px-4 py-3 transition-all duration-300 hover:border-royal-blue/40 hover:bg-deep-gray/70"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-royal-blue shadow-[0_0_8px_theme(colors.royal-blue)]" />
                            <span className="font-body font-semibold text-lg">{nome}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section data-section="2" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">{t("experience_section.title")}</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">{t("experience_section.subtitle")}</p>
          </div>
          <div className="space-y-12">
            {currentExperiencias.map((exp, index) => (
              <div key={index} className="relative bg-deep-gray p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300">
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
                        <h4 className="font-heading font-semibold text-lg mb-4 text-blue-400">{t("experience_section.tech_used")}</h4>
                        <div className="flex flex-wrap gap-3">
                          {exp.tecnologias.map((tech, i) => (
                            <div key={i} className={`${tech.cor} px-4 py-2 rounded-full text-white font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform duration-200 shadow-lg`}>
                              <span className="text-base">{tech.icon}</span>
                              <span>{tech.nome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-4 text-royal-blue">{t("experience_section.achievements")}</h4>
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

      {/* Values */}
      <section data-section="3" className="py-20 px-6 bg-deep-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">{t("values_section.title")}</h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">{t("values_section.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentValores.map((valor) => {
              const IconComponent = valor.icon
              return (
                <div key={valor.titulo} className="bg-pure-black p-8 rounded-2xl border border-royal-blue/20 hover:border-royal-blue/40 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-royal-blue/20 group-hover:bg-royal-blue/30 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-royal-blue transition-colors duration-300">{valor.titulo}</h3>
                      <p className="font-body text-gray-300 leading-relaxed">{valor.descricao}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Beyond Code */}
      <section data-section="4" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-12">{t("beyond_section.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-heading font-bold text-lg mb-2">{t("beyond_section.innovation")}</h3>
              <p className="font-body text-gray-300 text-sm">{t("beyond_section.innovation_desc")}</p>
            </div>
            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-heading font-bold text-lg mb-2">{t("beyond_section.education")}</h3>
              <p className="font-body text-gray-300 text-sm">{t("beyond_section.education_desc")}</p>
            </div>
            <div className="bg-deep-gray p-6 rounded-xl">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-heading font-bold text-lg mb-2">{t("beyond_section.impact")}</h3>
              <p className="font-body text-gray-300 text-sm">{t("beyond_section.impact_desc")}</p>
            </div>
          </div>
          <blockquote className="font-body text-2xl text-gray-300 italic leading-relaxed">
            {t("beyond_section.quote")}
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-deep-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">{t("cta_section.title")}</h2>
          <p className="font-body text-xl text-gray-300 mb-8 leading-relaxed">{t("cta_section.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-semibold px-8 py-4" asChild>
              <Link href={locale === "en" ? "https://wa.me/+5511947720129?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5511947720129?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"}>{t("cta_section.start")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white bg-transparent px-8 py-4" asChild>
              <Link href={prefix + "/projetos"}>{t("cta_section.projects")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
