"use client"

import { useState } from "react"
import { ArrowLeft, Code, Wrench, Sparkles, Hash } from "lucide-react"
import Link from "next/link"

// Importar os componentes das ferramentas
const CodePlayground = () => {
    const [code, setCode] = useState(`// Fibonacci Otimizado - Exemplo do Victor
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n]
  if (n <= 2) return 1
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
  return memo[n]
}

// Teste a função
console.log("Fibonacci(10):", fibonacci(10))
console.log("Fibonacci(20):", fibonacci(20))`)

    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)

    const runCode = () => {
        setIsRunning(true)
        setOutput("")

        setTimeout(() => {
            try {
                const originalLog = console.log
                const logs: string[] = []

                console.log = (...args) => {
                    logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "))
                }

                eval(code)
                console.log = originalLog

                setOutput(logs.join("\n") || "Código executado com sucesso!")
            } catch (error) {
                setOutput(`Erro: ${error}`)
            }
            setIsRunning(false)
        }, 500)
    }

    return (
        <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Playground de Código</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Editor JavaScript/TypeScript</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-64 bg-black text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Digite seu código aqui..."
                    />
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        {isRunning ? "Executando..." : "Executar Código"}
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Saída do Console</label>
                    <div className="w-full h-64 bg-black text-white font-mono text-sm p-4 rounded-lg border border-gray-700 overflow-auto">
                        {output || 'Clique em "Executar Código" para ver o resultado...'}
                    </div>
                </div>
            </div>
        </div>
    )
}

const HashGenerator = ({ copyToClipboard }: { copyToClipboard: (text: string, itemName?: string) => void }) => {
    const [input, setInput] = useState("")
    const [results, setResults] = useState<Record<string, string>>({})
    const [isGenerating, setIsGenerating] = useState(false)

    const generateUUID = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0
            const v = c == "x" ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }

    const generateRandomString = (length: number) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result = ""
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    const generateHash = async (algorithm: string, data: string) => {
        const encoder = new TextEncoder()
        const dataBuffer = encoder.encode(data)
        const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }

    const generateAll = async () => {
        setIsGenerating(true)
        const newResults: Record<string, string> = {}

        try {
            // UUIDs e IDs
            newResults["UUID v4"] = generateUUID()
            newResults["Random ID (8)"] = generateRandomString(8)
            newResults["Random ID (16)"] = generateRandomString(16)
            newResults["Random ID (32)"] = generateRandomString(32)
            newResults["Timestamp"] = Date.now().toString()
            newResults["Unix Timestamp"] = Math.floor(Date.now() / 1000).toString()

            // Se há input, gerar hashes
            if (input.trim()) {
                newResults["MD5-like"] = await generateHash("SHA-1", input).then((hash) => hash.substring(0, 32))
                newResults["SHA-1"] = await generateHash("SHA-1", input)
                newResults["SHA-256"] = await generateHash("SHA-256", input)
                newResults["Base64"] = btoa(input)
            }

            setResults(newResults)
        } catch (error) {
            console.error("Erro ao gerar hashes:", error)
        }

        setIsGenerating(false)
    }

    const examples = ["minha-senha-secreta", "user@example.com", "projeto-importante-2024", "dados-para-hash"]

    return (
        <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold text-white">Gerador de Hash & UUID</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Texto para Hash (opcional)</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-32 bg-black text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none resize-none"
                            placeholder="Digite o texto para gerar hashes (deixe vazio para apenas IDs)..."
                        />
                    </div>

                    <button
                        onClick={generateAll}
                        disabled={isGenerating}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                        {isGenerating ? "Gerando..." : "Gerar Todos"}
                    </button>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Exemplos rápidos:</label>
                        <div className="flex gap-2 flex-wrap">
                            {examples.map((example) => (
                                <button
                                    key={example}
                                    onClick={() => setInput(example)}
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs transition-colors"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resultados Gerados</label>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {Object.entries(results).map(([type, value]) => (
                            <div key={type} className="bg-black rounded-lg p-3 border border-gray-700">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-400">{type}</span>
                                    <button
                                        onClick={() => copyToClipboard(value, type)}
                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Copiar
                                    </button>
                                </div>
                                <div className="text-green-400 font-mono text-xs break-all">{value}</div>
                            </div>
                        ))}
                        {Object.keys(results).length === 0 && (
                            <div className="text-gray-500 text-center py-8">Clique em "Gerar Todos" para ver os resultados...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FerramentasPage() {
    const [activeTab, setActiveTab] = useState("playground")
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const showSuccessToast = (message: string) => {
        setToastMessage(message)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
    }

    const copyToClipboard = (text: string, itemName?: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                showSuccessToast(`${itemName || "Conteúdo"} copiado com sucesso!`)
            })
            .catch(() => {
                showSuccessToast("Erro ao copiar. Tente novamente.")
            })
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                <Wrench className="w-8 h-8 text-blue-400" />
                                Ferramentas Interativas
                            </h1>
                            <p className="text-gray-400 mt-1">Experimente ferramentas úteis criadas por Victor Hugo</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("playground")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "playground" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            <Code className="w-4 h-4 inline mr-2" />
                            Playground
                        </button>
                        <button
                            onClick={() => setActiveTab("hash")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "hash" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            <Hash className="w-4 h-4 inline mr-2" />
                            Hash & UUID
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="font-medium text-purple-400">Ferramentas Inovadoras</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Estas ferramentas demonstram a capacidade técnica do Victor Hugo de criar soluções úteis e interativas.
                        Experimente e veja como a tecnologia pode facilitar seu trabalho!
                    </p>
                </div>

                {activeTab === "playground" && <CodePlayground />}
                {activeTab === "hash" && <HashGenerator copyToClipboard={copyToClipboard} />}
            </div>

            {showToast && (
                <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                        {toastMessage}
                    </div>
                </div>
            )}
        </div>
    )
}
