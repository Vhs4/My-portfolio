"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"

export default function ContactForm() {
  const locale = useLocale() as "pt" | "en"
  const isPt = locale === "pt"

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    assunto: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formSubmitEmail = "contatovhs4@gmail.com"
      const form = document.createElement("form")
      form.method = "POST"
      form.action = `https://formsubmit.co/${formSubmitEmail}`
      form.style.display = "none"

      const addField = (name: string, value: string) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = name
        input.value = value
        form.appendChild(input)
      }

      addField("name", formData.nome)
      addField("email", formData.email)
      addField("company", formData.empresa)
      addField("subject", formData.assunto)
      addField("message", formData.mensagem)
      addField("_subject", isPt ? "Nova mensagem de contato via site" : "New contact message from website")
      addField("_captcha", "false")
      addField("_autoresponse", isPt ? "Obrigado por entrar em contato! Responderei em breve." : "Thank you for reaching out! I'll reply shortly.")
      addField("_template", "box")
      addField("_next", window.location.href)

      document.body.appendChild(form)
      form.submit()

      setSubmitStatus("success")
      setFormData({ nome: "", email: "", empresa: "", assunto: "", mensagem: "" })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Contact Info */}
      <div className="space-y-8">
        <div>
          <h3 className="font-heading font-bold text-3xl mb-6 text-royal-blue">
            {isPt ? "Vamos Conversar" : "Let's Talk"}
          </h3>
          <p className="font-body text-lg text-gray-300 leading-relaxed mb-8">
            {isPt
              ? "Estou sempre aberto a discutir novos projetos, oportunidades criativas ou parcerias. Se você tem uma ideia interessante, vamos transformá-la em realidade juntos."
              : "I'm always open to discussing new projects, creative opportunities, or partnerships. If you have an interesting idea, let's turn it into reality together."}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-royal-blue" />
            </div>
            <div>
              <p className="font-body font-semibold text-white">Email</p>
              <Link href="mailto:contato@vhs4.dev" className="font-body cursor-pointer text-gray-300">contato@vhs4.dev</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center">
              <Phone className="h-6 w-6 text-royal-blue" />
            </div>
            <div>
              <p className="font-body font-semibold text-white">{isPt ? "Telefone" : "Phone"}</p>
              <Link href="https://wa.me/+5522999018809" className="font-body cursor-pointer text-gray-300">+55 (22) 99901-8809</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-royal-blue" />
            </div>
            <div>
              <p className="font-body font-semibold text-white">{isPt ? "Localização" : "Location"}</p>
              <p className="font-body text-gray-300">
                {isPt ? "Brasil" : "Brazil"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="font-body text-sm text-gray-400 mb-4">
            {isPt ? "Tempo de resposta médio: 24 horas" : "Average response time: 24 hours"}
          </p>
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="font-body text-sm text-gray-300">
              {isPt ? "Disponível para novos projetos" : "Available for new projects"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="bg-deep-gray border-royal-blue/20">
        <CardContent className="p-8">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4 text-white">
                {isPt ? "Mensagem Enviada!" : "Message Sent!"}
              </h3>
              <p className="font-body text-gray-300 mb-6">
                {isPt
                  ? "Obrigado pelo contato! Vou responder em breve com mais detalhes sobre seu projeto."
                  : "Thanks for reaching out! I'll reply soon with more details about your project."}
              </p>
              <Button onClick={() => setSubmitStatus("idle")} className="bg-royal-blue hover:bg-royal-blue-light text-white">
                {isPt ? "Enviar Nova Mensagem" : "Send Another Message"}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-body font-semibold text-white">
                    {isPt ? "Nome *" : "Name *"}
                  </Label>
                  <Input
                    id="nome" name="nome" value={formData.nome} onChange={handleChange} required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder={isPt ? "Seu nome completo" : "Your full name"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body font-semibold text-white">Email *</Label>
                  <Input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="font-body font-semibold text-white">
                    {isPt ? "Empresa" : "Company"}
                  </Label>
                  <Input
                    id="empresa" name="empresa" value={formData.empresa} onChange={handleChange}
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder={isPt ? "Nome da empresa (opcional)" : "Company name (optional)"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto" className="font-body font-semibold text-white">
                    {isPt ? "Assunto *" : "Subject *"}
                  </Label>
                  <Input
                    id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder={isPt ? "Sobre o que você quer conversar?" : "What do you want to talk about?"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="font-body font-semibold text-white">
                  {isPt ? "Mensagem *" : "Message *"}
                </Label>
                <Textarea
                  id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} required rows={6}
                  className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue resize-none"
                  placeholder={isPt
                    ? "Conte-me mais sobre seu projeto, prazos, orçamento e qualquer detalhe importante..."
                    : "Tell me more about your project, deadlines, budget and any important details..."}
                />
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-body text-sm">
                    {isPt
                      ? "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email."
                      : "Failed to send message. Please try again or contact me directly by email."}
                  </p>
                </div>
              )}

              <Button
                type="submit" disabled={isSubmitting}
                className="w-full cursor-pointer bg-royal-blue hover:bg-royal-blue-light text-white font-body font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    {isPt ? "Enviando..." : "Sending..."}
                  </>
                ) : (
                  <>
                    {isPt ? "Enviar Mensagem" : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="font-body text-xs text-gray-400 text-center">
                {isPt
                  ? "Ao enviar esta mensagem, você concorda que eu entre em contato sobre seu projeto."
                  : "By sending this message, you agree that I may contact you about your project."}
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
