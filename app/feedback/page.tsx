"use client"

import { useState } from "react"
import { Star, CheckCircle, Send, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const ATRIBUTOS = [
  "Entregou no prazo",
  "Código limpo e organizado",
  "Comunicação excelente",
  "Superou as expectativas",
  "Proativo e resolutivo",
  "Boa arquitetura",
  "Domínio técnico",
  "Fácil de trabalhar",
]

type Indica = "sim" | "talvez" | "nao" | null

export default function FeedbackPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [atributos, setAtributos] = useState<string[]>([])
  const [indica, setIndica] = useState<Indica>(null)
  const [autoriza, setAutoriza] = useState(false)
  const [nome, setNome] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const toggleAtributo = (a: string) =>
    setAtributos((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )

  const ratingLabel = ["", "Ruim", "Regular", "Bom", "Ótimo", "Excelente"][hoverRating || rating] ?? ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !nome) return

    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://formsubmit.co/contatovhs4@gmail.com"
    form.style.display = "none"

    const add = (name: string, value: string) => {
      const el = document.createElement("input")
      el.type = "hidden"
      el.name = name
      el.value = value
      form.appendChild(el)
    }

    add("name", nome)
    add("company", empresa || "—")
    add("rating", `${rating}/5 estrelas`)
    add("atributos", atributos.length ? atributos.join(", ") : "Nenhum selecionado")
    add("indicaria", indica === "sim" ? "Sim" : indica === "talvez" ? "Talvez" : indica === "nao" ? "Não" : "Não respondeu")
    add("autoriza_publicar", autoriza ? "SIM — autorizado para uso promocional" : "Não autorizado")
    add("mensagem", mensagem || "—")
    add("_subject", `⭐ Novo feedback de ${nome} — ${rating}/5`)
    add("_captcha", "false")
    add("_template", "box")

    document.body.appendChild(form)
    form.submit()
    setStatus("success")
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-pure-black flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
          <h1 className="font-heading font-bold text-4xl text-pure-white mb-4">Obrigado!</h1>
          <p className="font-body text-gray-400 text-lg leading-relaxed mb-8">
            Seu feedback foi enviado. Isso significa muito para mim.
          </p>
          <Link href="/">
            <Button className="bg-royal-blue hover:bg-royal-blue-light text-white font-body font-semibold px-8 py-3">
              Voltar ao site
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-pure-black text-pure-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-md bg-pure-black/80">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="font-heading font-bold text-xl hover-underline">VHS4</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/projetos" className="font-body hover-underline">Projetos</Link>
            <Link href="/sobre" className="font-body hover-underline">Sobre</Link>
            <Link href="/blog" className="font-body hover-underline">Blog</Link>
            <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site" className="font-body hover-underline">Contato</Link>
          </div>
          {isMenuOpen ? (
            <button onClick={() => setIsMenuOpen(false)} className="md:hidden"><X /></button>
          ) : (
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden"><Menu /></button>
          )}
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Link href="/projetos" onClick={() => setIsMenuOpen(false)} className="block font-body hover-underline py-2">Projetos</Link>
            <Link href="/sobre" onClick={() => setIsMenuOpen(false)} className="block font-body hover-underline py-2">Sobre</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block font-body hover-underline py-2">Blog</Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-widest uppercase text-royal-blue-light mb-3">Avaliação</p>
            <h1 className="font-heading font-bold text-5xl md:text-6xl uppercase mb-4">
              O QUE VOCÊ<br />
              <span className="text-royal-blue">ACHOU?</span>
            </h1>
            <p className="font-body text-gray-400 text-lg leading-relaxed">
              Leva menos de 2 minutos. Sua opinião me ajuda a crescer e melhorar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Nome + Empresa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="font-body font-semibold text-white">
                  Seu nome <span className="text-royal-blue">*</span>
                </Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Como você se chama?"
                  className="bg-deep-gray border-royal-blue/20 text-white placeholder:text-gray-500 focus:border-royal-blue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa" className="font-body font-semibold text-white">
                  Empresa <span className="text-gray-500 font-normal">(opcional)</span>
                </Label>
                <Input
                  id="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Onde você trabalha?"
                  className="bg-deep-gray border-royal-blue/20 text-white placeholder:text-gray-500 focus:border-royal-blue"
                />
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-3">
              <Label className="font-body font-semibold text-white">
                Avaliação geral <span className="text-royal-blue">*</span>
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform duration-100 hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 transition-colors duration-150 ${
                        n <= (hoverRating || rating)
                          ? "fill-royal-blue text-royal-blue"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                {ratingLabel && (
                  <span className="font-body font-semibold text-royal-blue-light ml-3 text-lg">
                    {ratingLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Atributos */}
            <div className="space-y-3">
              <Label className="font-body font-semibold text-white">
                O que se destacou? <span className="text-royal-blue">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {ATRIBUTOS.map((a) => {
                  const selected = atributos.includes(a)
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAtributo(a)}
                      className={`px-4 py-2 rounded-full text-sm font-body border transition-all duration-200 ${
                        selected
                          ? "bg-royal-blue border-royal-blue text-white"
                          : "bg-transparent border-royal-blue/25 text-gray-400 hover:border-royal-blue/60 hover:text-white"
                      }`}
                    >
                      {selected && <span className="mr-1">✓</span>}
                      {a}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Indicaria */}
            <div className="space-y-3">
              <Label className="font-body font-semibold text-white">
                Indicaria meu trabalho para alguém?
              </Label>
              <div className="flex gap-3">
                {(["sim", "talvez", "nao"] as const).map((op) => {
                  const label = op === "sim" ? "👍 Sim" : op === "talvez" ? "🤔 Talvez" : "👎 Não"
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setIndica(indica === op ? null : op)}
                      className={`flex-1 py-3 rounded-xl text-sm font-body font-semibold border transition-all duration-200 ${
                        indica === op
                          ? "bg-royal-blue border-royal-blue text-white"
                          : "bg-transparent border-royal-blue/25 text-gray-400 hover:border-royal-blue/50 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="mensagem" className="font-body font-semibold text-white">
                Mensagem <span className="text-gray-500 font-normal">(opcional)</span>
              </Label>
              <Textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={4}
                placeholder="Quer detalhar alguma coisa? Fique à vontade..."
                className="bg-deep-gray border-royal-blue/20 text-white placeholder:text-gray-500 focus:border-royal-blue resize-none"
              />
            </div>

            {/* Autorização */}
            <div
              onClick={() => setAutoriza(!autoriza)}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                autoriza
                  ? "border-royal-blue bg-royal-blue/10"
                  : "border-royal-blue/20 bg-deep-gray hover:border-royal-blue/40"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                autoriza ? "bg-royal-blue border-royal-blue" : "border-gray-500"
              }`}>
                {autoriza && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <div>
                <p className="font-body font-semibold text-white text-sm">
                  Autorizo o uso deste feedback para fins promocionais
                </p>
                <p className="font-body text-gray-500 text-xs mt-1 leading-relaxed">
                  Opcional. Posso usar seu nome, empresa e depoimento no meu site, redes sociais e materiais de divulgação.
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!rating || !nome || atributos.length === 0}
              className="w-full bg-royal-blue hover:bg-royal-blue-light text-white font-body font-semibold py-4 text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Enviar Avaliação
              <Send className="ml-2 h-5 w-5" />
            </Button>

            <p className="font-body text-xs text-gray-600 text-center">
              Nome, estrelas e pelo menos um atributo são obrigatórios. O resto é por sua conta.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
