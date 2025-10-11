import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const VICTOR_CONFIG = {
    hourlyRate: 40, // R$ por hora

    // Sistema de estimativa baseado em funcionalidades reais
    projectTypes: {
        "Website/Landing Page": {
            base: 24, // 3 dias
            features: {
                "Design responsivo": 8,
                "Formulário de contato": 4,
                "Integração com WhatsApp": 2,
                "SEO básico": 6,
                "Animações": 8,
                "CMS básico": 12,
                "Múltiplas páginas": 6,
                "Galeria de imagens": 4,
                "Mapa integrado": 3,
                "Blog simples": 16
            }
        },
        "E-commerce": {
            base: 120, // 15 dias
            features: {
                "Catálogo de produtos": 24,
                "Carrinho de compras": 16,
                "Sistema de pagamento": 32,
                "Painel administrativo": 40,
                "Gestão de estoque": 24,
                "Sistema de frete": 20,
                "Cupons/Promoções": 16,
                "Avaliações de produtos": 12,
                "Relatórios de vendas": 16,
                "Multi-idiomas": 20,
                "App mobile": 80
            }
        },
        "App Mobile": {
            base: 160, // 20 dias
            features: {
                "Autenticação": 16,
                "Interface nativa": 32,
                "Push notifications": 12,
                "Geolocalização": 16,
                "Camera/Fotos": 12,
                "Pagamentos in-app": 24,
                "Chat/Mensagens": 24,
                "Sincronização offline": 20,
                "Publicação nas lojas": 16,
                "Analytics": 8
            }
        },
        "Sistema Web": {
            base: 200, // 25 dias
            features: {
                "Dashboard completo": 48,
                "Autenticação/Permissões": 24,
                "CRUD complexo": 32,
                "API REST": 24,
                "Relatórios avançados": 32,
                "Integração terceiros": 20,
                "Backup/Restore": 16,
                "Multi-tenant": 40,
                "Workflow/Aprovações": 32,
                "Auditoria/Logs": 16
            }
        },
        "Dashboard/Analytics": {
            base: 80, // 10 dias
            features: {
                "Gráficos interativos": 24,
                "Filtros avançados": 16,
                "Exportação dados": 12,
                "Real-time updates": 20,
                "KPIs personalizados": 16,
                "Alertas/Notificações": 12,
                "Comparativos": 8,
                "Drill-down": 16
            }
        },
        "API/Backend": {
            base: 80, // 10 dias
            features: {
                "Autenticação JWT": 12,
                "CRUD endpoints": 24,
                "Documentação": 8,
                "Testes automatizados": 16,
                "Rate limiting": 8,
                "Logs estruturados": 6,
                "Deploy automatizado": 12,
                "Monitoramento": 8,
                "Cache Redis": 12,
                "WebSockets": 16
            }
        },
        "WordPress/Blog": {
            base: 32, // 4 dias
            features: {
                "Tema personalizado": 24,
                "Plugin custom": 16,
                "WooCommerce": 32,
                "Elementor Pro": 8,
                "SEO avançado": 8,
                "Backup automático": 4,
                "Performance": 12,
                "Segurança": 8,
                "Multi-idiomas": 16,
                "Membership": 24
            }
        },
        "Automação": {
            base: 40, // 5 dias
            features: {
                "Web scraping": 16,
                "APIs integração": 12,
                "Processamento dados": 16,
                "Relatórios automáticos": 12,
                "Email marketing": 8,
                "Webhooks": 8,
                "Scheduler/Cron": 6,
                "Notificações": 8,
                "Interface admin": 16
            }
        },
        "Outro": {
            base: 60, // 7.5 dias
            features: {
                "Interface customizada": 20,
                "Lógica de negócio": 24,
                "Integrações": 16,
                "Testes": 12,
                "Deploy": 8,
                "Documentação": 6
            }
        }
    },

    // Multiplicadores baseados em complexidade REAL
    complexityAdjustments: {
        "Muito Baixa": 0.7, // Projeto muito simples
        Baixa: 0.85,        // Algumas customizações
        Média: 1.0,         // Padrão
        Alta: 1.4,          // Funcionalidades avançadas
        "Muito Alta": 2.0,  // Arquitetura complexa
    },

    technologies: {
        frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        backend: ["Node.js", "PostgreSQL", "Redis", "Prisma", "tRPC"],
        mobile: ["React Native", "Expo", "Firebase"],
        cloud: ["Vercel", "AWS", "Docker", "Supabase"],
        ai: ["OpenAI API", "Langchain", "Pinecone", "Hugging Face"],
        cms: ["WordPress", "WooCommerce", "Elementor", "Custom Themes", "Plugin Development"],
    },
}

// Schema mais flexível e robusto
const ProjectEstimateSchema = z.object({
    timeEstimateWeeks: z.number().min(0.5).max(104).default(4),
    complexityLevel: z.enum(["Muito Baixa", "Baixa", "Média", "Alta", "Muito Alta"]).default("Média"),
    estimatedHours: z.number().min(5).max(5000).default(80),
    technologies: z.array(z.string()).min(1).max(15).default(["Next.js", "TypeScript"]),
    features: z.array(z.string()).min(1).max(20).default(["Funcionalidade básica"]),
    challenges: z.array(z.string()).min(0).max(12).default([]),
    nextSteps: z.array(z.string()).min(2).max(12).default(["Análise detalhada", "Desenvolvimento"]),
    description: z.string().min(20).max(1000).default("Projeto de desenvolvimento web personalizado"),
    recommendations: z.string().min(50).max(1500).default("Recomendações serão fornecidas após análise detalhada do projeto."),
})

// Função para sanitizar e validar entrada
function sanitizeInput(input: any): string {
    if (typeof input !== 'string') return String(input || '').trim()
    return input.trim().substring(0, 2000) // Limita tamanho
}

// Função inteligente para calcular horas baseado em funcionalidades
function calculateSmartEstimate(
    projectType: string,
    features: string[],
    complexityLevel: string,
    description: string
): number {
    const config = VICTOR_CONFIG.projectTypes[projectType as keyof typeof VICTOR_CONFIG.projectTypes]
    if (!config) {
        return 80 // Fallback padrão
    }

    let totalHours = config.base

    // Analisa as funcionalidades mencionadas
    features.forEach(feature => {
        const featureLower = feature.toLowerCase()

        // Busca funcionalidades similares na configuração
        Object.entries(config.features).forEach(([configFeature, hours]) => {
            const configFeatureLower = configFeature.toLowerCase()

            // Correspondência por palavras-chave
            const keywords = configFeatureLower.split(/[\s/]+/)
            const hasMatch = keywords.some(keyword =>
                featureLower.includes(keyword) ||
                keyword.includes(featureLower) ||
                featureLower.includes(configFeatureLower)
            )

            if (hasMatch) {
                totalHours += hours
            }
        })
    })

    // Análise do texto da descrição para funcionalidades não listadas
    const descriptionLower = description.toLowerCase()

    // Palavras-chave que indicam complexidade adicional
    const complexityKeywords = {
        "integração": 12,
        "api": 8,
        "automação": 16,
        "inteligência artificial": 24,
        "machine learning": 32,
        "tempo real": 16,
        "chat": 20,
        "video": 16,
        "streaming": 24,
        "blockchain": 40,
        "multi-tenant": 32,
        "microservices": 24,
        "elasticsearch": 16,
        "websocket": 12,
        "notificação": 8,
        "geolocalização": 12,
        "pagamento": 20,
        "relatório": 12,
        "dashboard": 16,
        "analytics": 12,
        "seo": 6,
        "performance": 8,
        "segurança": 10,
        "deploy": 6,
        "ci/cd": 12,
        "docker": 8,
        "kubernetes": 16
    }

    Object.entries(complexityKeywords).forEach(([keyword, hours]) => {
        if (descriptionLower.includes(keyword)) {
            totalHours += hours
        }
    })

    // Aplica multiplicador de complexidade
    const multiplier = VICTOR_CONFIG.complexityAdjustments[complexityLevel as keyof typeof VICTOR_CONFIG.complexityAdjustments] || 1.0
    const finalHours = totalHours * multiplier

    // Limites mínimo e máximo baseados no tipo de projeto
    const minHours = config.base * 0.8
    const maxHours = config.base * 10 // Máximo 10x o básico

    return Math.max(minHours, Math.min(finalHours, maxHours))
}

export async function POST(request: Request) {
    try {
        // Parse do body com tratamento de erro
        let body: any = {}
        try {
            body = await request.json()
        } catch (parseError) {
            return Response.json({
                error: "Dados inválidos. Envie um JSON válido.",
                success: false
            }, { status: 400 })
        }

        const { projectDescription, projectType, budget, timeline } = body

        // Validação com valores padrão
        const cleanDescription = sanitizeInput(projectDescription) || "Projeto de desenvolvimento web"
        const cleanProjectType = sanitizeInput(projectType) || "Outro"
        const cleanBudget = sanitizeInput(budget) || "Não especificado"
        const cleanTimeline = sanitizeInput(timeline) || "Flexível"

        if (cleanDescription.length < 10) {
            return Response.json({
                error: "Descrição do projeto muito curta. Forneça pelo menos 10 caracteres.",
                success: false
            }, { status: 400 })
        }

        if (!process.env.OPENAI_API_KEY) {
            return Response.json({
                error: "Serviço temporariamente indisponível. Tente novamente em alguns minutos.",
                success: false
            }, { status: 503 })
        }

        // Prompt melhorado e mais específico
        const systemPrompt = `Você é Victor Hugo, desenvolvedor full-stack experiente. Analise projetos e forneça estimativas precisas.

IMPORTANTE: Sempre retorne dados válidos, mesmo para projetos vagos.

Configurações:
- Taxa: R$ ${VICTOR_CONFIG.hourlyRate}/hora
- Complexidades: ${JSON.stringify(VICTOR_CONFIG.complexityAdjustments)}
- Horas base: ${JSON.stringify(Object.fromEntries(Object.entries(VICTOR_CONFIG.projectTypes).map(([type, config]) => [type, config.base])))}

Tecnologias disponíveis (Se for algo simples considere wordpress, ex: landing page, site institucional e etc... E além disso se for wordpress não usarei vercel):
${Object.entries(VICTOR_CONFIG.technologies)
                .map(([cat, techs]) => `${cat}: ${techs.join(", ")}`)
                .join("\n")}

REGRAS DE ESTIMATIVA:
1. Use o sistema baseado em funcionalidades para estimar horas
2. Landing Page simples: 24-40h base + funcionalidades
3. E-commerce: 120h base + funcionalidades específicas  
4. App Mobile: 160h base + features nativas
5. Sistema Web: 200h base + complexidade do negócio
6. SEMPRE some as horas de cada funcionalidade mencionada
7. Ajuste pela complexidade: Baixa (0.85x), Média (1.0x), Alta (1.4x), Muito Alta (2.0x)`

        const userPrompt = `Analise este projeto:

Descrição: ${cleanDescription}
Tipo: ${cleanProjectType}
Orçamento: ${cleanBudget}
Prazo: ${cleanTimeline}

Forneça análise completa com estimativas realistas (se for landing page ou site simples seja mais flexível e sem preço muito careiro, baseado em quem cobra 40 reais a hora).
`

        // Tentativa de geração com retry
        let result: any = null
        let attempts = 0
        const maxAttempts = 3

        while (attempts < maxAttempts && !result) {
            try {
                const generation = await generateObject({
                    model: openai("gpt-4o-mini"), // Modelo mais estável
                    system: systemPrompt,
                    prompt: userPrompt,
                    schema: ProjectEstimateSchema,
                    temperature: 0.3, // Menor variabilidade
                })

                result = generation.object
                break
            } catch (aiError) {
                attempts++
                console.error(`Tentativa ${attempts} falhou:`, aiError)

                if (attempts === maxAttempts) {
                    // Fallback com dados padrão
                    result = {
                        timeEstimateWeeks: 2,
                        complexityLevel: "Média" as const,
                        estimatedHours: 60,
                        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
                        features: [
                            "Interface responsiva",
                            "Funcionalidades básicas",
                            "Integração com APIs"
                        ],
                        challenges: [
                            "Definição de requisitos detalhados"
                        ],
                        nextSteps: [
                            "Reunião para definir escopo detalhado",
                            "Criação de wireframes",
                            "Desenvolvimento do MVP",
                            "Testes e deploy"
                        ],
                        description: `Projeto de ${cleanProjectType.toLowerCase()} com funcionalidades personalizadas baseado na descrição fornecida.`,
                        recommendations: `Baseado na análise inicial, recomendo uma abordagem iterativa para este ${cleanProjectType.toLowerCase()}. Sugiro começar com um MVP para validar as funcionalidades principais antes de expandir para recursos mais avançados.`
                    }
                }
            }
        }

        // Cálculo inteligente de horas ANTES da validação
        const smartHours = calculateSmartEstimate(
            cleanProjectType,
            result?.features || [],
            result?.complexityLevel || "Média",
            cleanDescription
        )

        // Força o uso do cálculo inteligente
        if (result) {
            result.estimatedHours = Math.round(smartHours)
            result.timeEstimateWeeks = Math.max(0.5, Math.ceil(smartHours / 40)) // 40h por semana
        }

        // Validação final com schema
        const validatedResult = ProjectEstimateSchema.parse(result)

        // Cálculos finais para custos
        const totalCost = validatedResult.estimatedHours * VICTOR_CONFIG.hourlyRate
        const minCost = Math.round(totalCost * 0.85) // Margem menor
        const maxCost = Math.round(totalCost * 1.15)

        const baseConfig = VICTOR_CONFIG.projectTypes[cleanProjectType as keyof typeof VICTOR_CONFIG.projectTypes]
        const baseHours = baseConfig?.base || 60

        const response = {
            success: true,
            timeEstimate: `${Math.ceil(validatedResult.timeEstimateWeeks)} semana${validatedResult.timeEstimateWeeks > 1 ? "s" : ""}`,
            costRange: `R$ ${minCost.toLocaleString("pt-BR")} - R$ ${maxCost.toLocaleString("pt-BR")}`,
            complexity: validatedResult.complexityLevel,
            estimatedHours: validatedResult.estimatedHours,
            technologies: validatedResult.technologies,
            features: validatedResult.features,
            challenges: validatedResult.challenges,
            nextSteps: validatedResult.nextSteps,
            description: validatedResult.description,
            recommendations: validatedResult.recommendations,
            analysis: {
                baseHours: baseHours,
                complexityMultiplier: VICTOR_CONFIG.complexityAdjustments[validatedResult.complexityLevel] || 1.0,
                finalHours: validatedResult.estimatedHours,
                hourlyRate: VICTOR_CONFIG.hourlyRate,
                totalCost: Math.round(totalCost),
                calculationMethod: "smart_feature_based"
            },
            metadata: {
                projectType: cleanProjectType,
                hasAIAnalysis: attempts < maxAttempts,
                processingAttempts: attempts
            }
        }

        return Response.json(response, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        console.error("Erro crítico na análise:", error)

        // Resposta de fallback garantida
        return Response.json({
            success: false,
            error: "Erro interno do servidor. Tente novamente.",
            timeEstimate: "2-4 semanas",
            costRange: "R$ 2.000 - R$ 5.000",
            complexity: "Média",
            estimatedHours: 80,
            technologies: ["A definir"],
            features: ["Análise pendente"],
            challenges: ["Definição de requisitos"],
            nextSteps: ["Contato para esclarecimentos"],
            description: "Análise temporariamente indisponível",
            recommendations: "Entre em contato para uma análise personalizada do seu projeto.",
            fallback: true
        }, {
            status: 200
        })
    }
}