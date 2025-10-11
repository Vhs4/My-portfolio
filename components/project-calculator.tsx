"use client"

import type React from "react"

import { useState } from "react"
import {
    Calculator,
    Clock,
    DollarSign,
    Code,
    X,
    ArrowRight,
    CheckCircle,
    Brain,
    Zap,
    Target,
    AlertCircle,
    MessageCircle,
} from "lucide-react"

interface ProjectEstimate {
    timeEstimate: string
    costRange: string
    complexity: string
    estimatedHours: number
    technologies: string[]
    features: string[]
    challenges: string[]
    nextSteps: string[]
    description: string
    recommendations: string
    analysis: {
        baseHours: number
        complexityMultiplier: number
        finalHours: number
        hourlyRate: number
        totalCost: number
    }
}

export default function ProjectCalculator() {
    const [isOpen, setIsOpen] = useState(false)
    const [projectDescription, setProjectDescription] = useState("")
    const [projectType, setProjectType] = useState("")
    const [budget, setBudget] = useState("")
    const [timeline, setTimeline] = useState("")
    const [estimate, setEstimate] = useState<ProjectEstimate | null>(null)
    const [isCalculating, setIsCalculating] = useState(false)
    const [error, setError] = useState("")

    const projectTypes = [
        "Website/Landing Page",
        "E-commerce",
        "App Mobile",
        "Sistema Web",
        "Dashboard/Analytics",
        "API/Backend",
        "WordPress/Blog",
        "Automação",
        "Outro",
    ]

    const budgetRanges = [
        "R$ 1.000 - R$ 5.000",
        "R$ 5.000 - R$ 15.000",
        "R$ 15.000 - R$ 50.000",
        "R$ 50.000+",
        "Não sei ainda",
    ]

    const timelineOptions = ["1-2 semanas", "1 mês", "2-3 meses", "6+ meses", "Flexível"]

    const calculateProject = async () => {
        setIsCalculating(true)
        setError("")

        try {
            const response = await fetch("/api/calculate-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectDescription,
                    projectType,
                    budget,
                    timeline,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Erro na análise do projeto")
            }

            const result = await response.json()
            setEstimate(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido")
            console.error("Erro ao calcular projeto:", err)
        } finally {
            setIsCalculating(false)
        }
    }

    const resetCalculator = () => {
        setProjectDescription("")
        setProjectType("")
        setBudget("")
        setTimeline("")
        setEstimate(null)
    }

    const generateWhatsAppMessage = () => {
        if (!estimate) return ""

        const message = `*SOLICITACAO DE PROJETO*

*DESCRICAO DO PROJETO:*
${projectDescription}

*DETALHES:*
- Tipo: ${projectType}
- Orcamento estimado: ${budget || "A definir"}
- Prazo desejado: ${timeline || "Flexivel"}

*ANALISE IA:*
- Tempo estimado: ${estimate.timeEstimate}
- Investimento: ${estimate.costRange}
- Complexidade: ${estimate.complexity}
- Horas estimadas: ${estimate.estimatedHours}h

*TECNOLOGIAS:*
${estimate.technologies.join(", ")}

*FUNCIONALIDADES PRINCIPAIS:*
${estimate.features.map((f) => `- ${f}`).join("\n")}

*DESAFIOS TECNICOS:*
${estimate.challenges.map((c) => `- ${c}`).join("\n")}

Gostaria de agendar uma reuniao para discutir os detalhes e definir o escopo final do projeto.`

        return encodeURIComponent(message)
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="cursor-pointer fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
            >
                <Calculator className="w-6 h-6" />
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity">
                    Precisando de um projeto? Calcule aqui!
                </div>
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Calculadora de Projeto
                </div>
            </button>
        )
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Calculadora IA de Projetos</h2>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">Powered by OpenAI</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {!estimate ? (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Análise Inteligente com IA</h3>
                                <p className="text-gray-400">
                                    IA treinada com experiência real do Victor Hugo para estimativas precisas
                                </p>
                                <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mt-4">
                                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="font-semibold">Importante</span>
                                    </div>
                                    <p className="text-yellow-200 text-sm">
                                        Esta é uma estimativa inicial baseada em IA. O preço e prazo final podem sofrer alterações após
                                        reunião detalhada para definição completa do escopo.
                                    </p>
                                </div>
                            </div>

                            {/* Project Description */}
                            <div>
                                <label className="block text-white font-medium mb-2">Descreva seu projeto *</label>
                                <textarea
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Ex: Preciso de um e-commerce para vender roupas online com pagamento por cartão..."
                                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                                    rows={4}
                                />
                            </div>

                            {/* Project Type */}
                            <div>
                                <label className="block text-white font-medium mb-2">Tipo de projeto *</label>
                                <select
                                    value={projectType}
                                    onChange={(e) => setProjectType(e.target.value)}
                                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                                >
                                    <option value="">Selecione o tipo</option>
                                    {projectTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-white font-medium mb-2">Orçamento estimado</label>
                                <select
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                                >
                                    <option value="">Selecione uma faixa</option>
                                    {budgetRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Timeline */}
                            <div>
                                <label className="block text-white font-medium mb-2">Prazo desejado</label>
                                <select
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                                >
                                    <option value="">Selecione um prazo</option>
                                    {timelineOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {error && (
                                <div className="bg-red-900 border border-red-600 rounded-lg p-4 flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <p className="text-red-200">{error}</p>
                                </div>
                            )}

                            <button
                                onClick={calculateProject}
                                disabled={!projectDescription || !projectType || isCalculating}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                {isCalculating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Analisando projeto...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="w-5 h-5" />
                                        Analisar o projeto
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-semibold">Estimativa Inicial</span>
                                </div>
                                <p className="text-yellow-200 text-sm">
                                    Os valores e prazos apresentados são estimativas baseadas em IA. O orçamento e cronograma final serão
                                    definidos em reunião após análise detalhada do escopo completo.
                                </p>
                            </div>

                            <div className="text-center mb-8">
                                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Análise Completa por IA</h3>
                                <p className="text-gray-400">{estimate.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-gray-800 p-4 rounded-xl text-center">
                                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold text-sm mb-1">Tempo</h4>
                                    <p className="text-lg font-bold text-blue-400">{estimate.timeEstimate}</p>
                                </div>

                                <div className="bg-gray-800 p-4 rounded-xl text-center">
                                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold text-sm mb-1">Investimento</h4>
                                    <p className="text-lg font-bold text-green-400">{estimate.costRange}</p>
                                </div>

                                <div className="bg-gray-800 p-4 rounded-xl text-center">
                                    <Target className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold text-sm mb-1">Complexidade</h4>
                                    <p className="text-lg font-bold text-orange-400">{estimate.complexity}</p>
                                </div>

                                <div className="bg-gray-800 p-4 rounded-xl text-center">
                                    <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold text-sm mb-1">Horas</h4>
                                    <p className="text-lg font-bold text-purple-400">{estimate.estimatedHours}h</p>
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    Funcionalidades Identificadas
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {estimate.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-300">
                                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                                    Desafios Técnicos
                                </h4>
                                <div className="space-y-2">
                                    {estimate.challenges.map((challenge, index) => (
                                        <div key={index} className="flex items-start gap-3 text-gray-300">
                                            <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                                !
                                            </div>
                                            {challenge}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-blue-400" />
                                    Tecnologias Recomendadas
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {estimate.technologies.map((tech) => (
                                        <span key={tech} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-green-400" />
                                    Próximos Passos
                                </h4>
                                <ul className="space-y-2">
                                    {estimate.nextSteps.map((step, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-blue-400" />
                                    Recomendações da IA
                                </h4>
                                <p className="text-gray-200 leading-relaxed">{estimate.recommendations}</p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={resetCalculator}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Nova Análise
                                </button>
                                <a
                                    href={`https://wa.me/5522999018809?text=${generateWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Enviar no WhatsApp
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
