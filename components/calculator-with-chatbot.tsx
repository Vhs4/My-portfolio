"use client"

import React, { useState, useEffect, useRef } from "react"
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
    Send,
    User,
    Bot,
} from "lucide-react"
import { useLocale } from "next-intl"

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

interface ChatMessage {
    id: string
    type: 'user' | 'ai'
    content: string
    timestamp: Date
}

interface ProjectData {
    description: string
    type: string
    budget: string
    timeline: string
    additionalInfo: string[]
}

function getQuestions(isPt: boolean) {
    return [
        {
            id: 'greeting',
            message: isPt
                ? "Olá! Sou o Tom! Assistente do Victor Hugo. Vou te ajudar a analisar seu projeto e criar uma estimativa personalizada. Para começar, me conte: qual é a ideia do seu projeto? 🚀"
                : "Hi! I'm Tom! Victor Hugo's assistant. I'll help you analyze your project and create a personalized estimate. To start, tell me: what's your project idea? 🚀",
            field: 'description'
        },
        {
            id: 'type',
            message: isPt
                ? "Interessante! Agora me ajude a classificar melhor: que tipo de projeto seria esse?"
                : "Interesting! Now help me classify it better: what type of project would this be?",
            options: isPt
                ? ["Site simples/Website/Landing Page", "E-commerce", "App Mobile", "Sistema Web", "Dashboard/Analytics", "API/Backend", "WordPress/Blog", "Automação", "Outro"]
                : ["Simple Website/Landing Page", "E-commerce", "Mobile App", "Web System", "Dashboard/Analytics", "API/Backend", "WordPress/Blog", "Automation", "Other"],
            field: 'type'
        },
        {
            id: 'budget',
            message: isPt
                ? "E qual seria o orçamento que você tem em mente para este projeto?"
                : "What budget do you have in mind for this project?",
            options: isPt
                ? ["R$ 1.000 - R$ 5.000", "R$ 5.000 - R$ 15.000", "R$ 15.000 - R$ 50.000", "R$ 50.000+", "Não sei ainda"]
                : ["$200 - $900", "$900 - $2,600", "$2,600 - $9,000", "$9,000+", "Not sure yet"],
            field: 'budget'
        },
        {
            id: 'timeline',
            message: isPt
                ? "Entendi! E quanto ao prazo, quando você gostaria de ter o projeto pronto?"
                : "Got it! And regarding the timeline, when would you like the project to be ready?",
            options: isPt
                ? ["1-2 semanas", "1 mês", "2-3 meses", "6+ meses", "Flexível"]
                : ["1-2 weeks", "1 month", "2-3 months", "6+ months", "Flexible"],
            field: 'timeline'
        },
        {
            id: 'additional',
            message: isPt
                ? "Ótimo! Tem mais alguma informação importante que você gostaria de compartilhar sobre o projeto? Funcionalidades específicas, integrações necessárias, público-alvo, etc."
                : "Great! Is there any other important information you'd like to share about the project? Specific features, required integrations, target audience, etc.",
            field: 'additionalInfo'
        }
    ]
}

export default function ProjectCalculatorChatbot() {
    const locale = useLocale() as "pt" | "en"
    const isPt = locale === "pt"
    const questions = getQuestions(isPt)

    const [isOpen, setIsOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [projectData, setProjectData] = useState<ProjectData>({
        description: "",
        type: "",
        budget: "",
        timeline: "",
        additionalInfo: []
    })
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    const [estimate, setEstimate] = useState<ProjectEstimate | null>(null)
    const [isCalculating, setIsCalculating] = useState(false)
    const [error, setError] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages, isTyping])

    const addAIMessage = (message: string, questionIndex?: number) => {
        setIsTyping(true)
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'ai',
                content: message,
                timestamp: new Date()
            }])
            setIsTyping(false)
            if (questionIndex !== undefined) {
                setTimeout(() => setCurrentQuestion(questionIndex), 500)
            }
        }, 1500)
    }

    const resetConversation = () => {
        setChatMessages([])
        setProjectData({ description: "", type: "", budget: "", timeline: "", additionalInfo: [] })
        setCurrentQuestion(-1)
        setTimeout(() => addAIMessage(questions[0].message, 0), 500)
    }

    const addUserMessage = (message: string) => {
        setChatMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'user',
            content: message,
            timestamp: new Date()
        }])
    }

    const handleSendMessage = () => {
        if (!currentMessage.trim()) return
        addUserMessage(currentMessage)
        processUserResponse(currentMessage)
        setCurrentMessage("")
    }

    const handleOptionClick = (option: string) => {
        addUserMessage(option)
        processUserResponse(option)
    }

    const calculateProject = async (data: ProjectData) => {
        setIsCalculating(true)
        setError("")

        try {
            const response = await fetch("/api/calculate-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectDescription: data.description,
                    projectType: data.type,
                    budget: data.budget,
                    timeline: data.timeline,
                    additionalInfo: data.additionalInfo.join('. '),
                    locale,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || `${isPt ? "Erro na análise" : "Analysis error"}: ${response.status}`)
            }

            const result = await response.json()
            setEstimate(result)
            addAIMessage(isPt
                ? "Análise completa! Aqui está sua estimativa detalhada baseada em toda nossa conversa. 🎯"
                : "Analysis complete! Here is your detailed estimate based on our entire conversation. 🎯")

        } catch (err) {
            console.error("Error calculating project:", err)
            setError(err instanceof Error ? err.message : (isPt ? "Erro desconhecido" : "Unknown error"))
            addAIMessage(isPt
                ? `Ops! Houve um problema na análise. Que tal tentarmos novamente?`
                : `Oops! There was a problem with the analysis. Shall we try again?`)
        } finally {
            setIsCalculating(false)
        }
    }

    const processUserResponse = (response: string) => {
        const question = questions[currentQuestion]
        const updatedData = { ...projectData }
        if (question.field === 'additionalInfo') {
            updatedData.additionalInfo.push(response)
        } else {
            (updatedData[question.field as keyof Omit<ProjectData, 'additionalInfo'>] as string) = response
        }
        setProjectData(updatedData)

        if (currentQuestion < questions.length - 1) {
            const nextIndex = currentQuestion + 1
            setTimeout(() => addAIMessage(questions[nextIndex].message, nextIndex), 1000)
        } else {
            setTimeout(() => {
                addAIMessage(isPt
                    ? "Ótimo! Agora vou analisar todas essas informações e criar uma estimativa detalhada. Aguarde um momento..."
                    : "Great! Now I'll analyze all that information and create a detailed estimate. Just a moment...")
            }, 1000)
            setTimeout(() => calculateProject(updatedData), 3000)
        }
    }

    useEffect(() => {
        if (isOpen && chatMessages.length === 0) {
            addAIMessage(questions[0].message, 0)
        }
    }, [isOpen])

    const resetCalculator = () => {
        setChatMessages([])
        setProjectData({ description: "", type: "", budget: "", timeline: "", additionalInfo: [] })
        setCurrentQuestion(0)
        setEstimate(null)
        setError("")
        addAIMessage(questions[0].message)
    }

    const generateWhatsAppMessage = () => {
        if (!estimate) return ""
        const message = isPt
            ? `*SOLICITACAO DE PROJETO*\n\n*DESCRICAO:*\n${projectData.description}\n\n*DETALHES:*\n- Tipo: ${projectData.type}\n- Orcamento: ${projectData.budget || "A definir"}\n- Prazo: ${projectData.timeline || "Flexivel"}\n\n*ANALISE IA:*\n- Tempo: ${estimate.timeEstimate}\n- Investimento: ${estimate.costRange}\n- Complexidade: ${estimate.complexity}\n\nGostaria de agendar uma reuniao para discutir o projeto.`
            : `*PROJECT REQUEST*\n\n*DESCRIPTION:*\n${projectData.description}\n\n*DETAILS:*\n- Type: ${projectData.type}\n- Budget: ${projectData.budget || "TBD"}\n- Timeline: ${projectData.timeline || "Flexible"}\n\n*AI ANALYSIS:*\n- Time: ${estimate.timeEstimate}\n- Investment: ${estimate.costRange}\n- Complexity: ${estimate.complexity}\n\nI'd like to schedule a meeting to discuss the project.`
        return encodeURIComponent(message)
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) setIsOpen(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="cursor-pointer fixed bottom-14 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
            >
                <Bot className="w-6 h-6" />
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity">
                    {isPt ? "Precisando de um projeto? Calcule aqui!" : "Need a project? Estimate it here!"}
                </div>
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPt ? "Conversar com assistente 24h" : "Chat with 24h assistant"}
                </div>
            </button>
        )
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Bot className="w-8 h-8 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">
                            {isPt ? "Conversa com assistente - Análise de Projeto" : "Assistant Chat — Project Analysis"}
                        </h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {!estimate ? (
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="bg-yellow-900/30 border-b border-yellow-600/50 p-4 flex-shrink-0">
                            <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-semibold text-sm">{isPt ? "Importante" : "Important"}</span>
                            </div>
                            <p className="text-yellow-200 text-xs">
                                {isPt
                                    ? "Esta é uma estimativa inicial baseada em IA. O preço e prazo final podem sofrer alterações após reunião detalhada."
                                    : "This is an initial AI-based estimate. Final price and timeline may change after a detailed meeting."}
                            </p>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {chatMessages.map((message) => (
                                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {message.type === 'ai' && (
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-4 rounded-2xl ${message.type === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-800 text-white'}`}>
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                    {message.type === 'user' && (
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-gray-800 text-white p-4 rounded-2xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isCalculating && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-800 to-blue-800 text-white p-4 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-sm">{isPt ? "Analisando projeto..." : "Analyzing project..."}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-red-900 border border-red-600 text-white p-4 rounded-2xl max-w-[80%]">
                                        <p className="text-sm">{error}</p>
                                        <button onClick={() => setError("")} className="text-red-200 hover:text-white text-xs mt-2 underline">
                                            {isPt ? "Limpar erro" : "Clear error"}
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <button
                            onClick={() => {
                                const btn = document.activeElement as HTMLButtonElement
                                btn.disabled = true
                                btn.style.display = "none"
                                setTimeout(() => { btn.disabled = false; resetConversation() }, 1000)
                            }}
                            className="bg-blue-600 text-white px-2 py-1 rounded-full font-medium w-fit m-auto text-sm hover:text-white cursor-pointer mt-2 mb-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {isPt ? "Reiniciar conversa" : "Restart conversation"}
                        </button>

                        <div className="border-t border-gray-700 p-4 flex-shrink-0">
                            {currentQuestion >= 0 && questions[currentQuestion]?.options && !isCalculating && !isTyping ? (
                                <div className="space-y-2">
                                    <p className="text-gray-400 text-sm mb-3">
                                        {isPt ? "Escolha uma opção ou digite sua resposta:" : "Choose an option or type your answer:"}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                        {questions[currentQuestion].options!.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleOptionClick(option)}
                                                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg text-sm transition-colors text-left"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={isPt ? "Digite sua resposta..." : "Type your answer..."}
                                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                                    disabled={isCalculating || isTyping}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!currentMessage.trim() || isCalculating || isTyping}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-3 rounded-lg transition-colors disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-semibold">{isPt ? "Estimativa Inicial" : "Initial Estimate"}</span>
                            </div>
                            <p className="text-yellow-200 text-sm">
                                {isPt
                                    ? "Os valores e prazos apresentados são estimativas baseadas em IA. O orçamento e cronograma final serão definidos em reunião após análise detalhada do escopo completo."
                                    : "The values and timelines presented are AI-based estimates. The final budget and schedule will be defined in a meeting after a detailed scope analysis."}
                            </p>
                        </div>

                        <div className="text-center mb-8">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {isPt ? "Análise Completa por IA" : "Complete AI Analysis"}
                            </h3>
                            <p className="text-gray-400">{estimate.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-xl text-center">
                                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                <h4 className="text-white font-semibold text-sm mb-1">{isPt ? "Tempo" : "Timeline"}</h4>
                                <p className="text-lg font-bold text-blue-400">{estimate.timeEstimate}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-xl text-center">
                                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <h4 className="text-white font-semibold text-sm mb-1">{isPt ? "Investimento" : "Investment"}</h4>
                                <p className="text-lg font-bold text-green-400">{estimate.costRange}</p>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                {isPt ? "Funcionalidades Identificadas" : "Identified Features"}
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
                                {isPt ? "Desafios Técnicos" : "Technical Challenges"}
                            </h4>
                            <div className="space-y-2">
                                {estimate.challenges.map((challenge, index) => (
                                    <div key={index} className="flex items-start gap-3 text-gray-300">
                                        <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">!</div>
                                        {challenge}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5 text-blue-400" />
                                {isPt ? "Tecnologias Recomendadas" : "Recommended Technologies"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {estimate.technologies.map((tech) => (
                                    <span key={tech} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <ArrowRight className="w-5 h-5 text-green-400" />
                                {isPt ? "Próximos Passos" : "Next Steps"}
                            </h4>
                            <ul className="space-y-2">
                                {estimate.nextSteps.map((step, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</div>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl">
                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-blue-400" />
                                {isPt ? "Recomendações da IA" : "AI Recommendations"}
                            </h4>
                            <p className="text-gray-200 leading-relaxed">{estimate.recommendations}</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={resetCalculator}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                            >
                                {isPt ? "Nova Análise" : "New Analysis"}
                            </button>
                            <a
                                href={`https://wa.me/5522999018809?text=${generateWhatsAppMessage()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                {isPt ? "Enviar no WhatsApp" : "Send via WhatsApp"}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
