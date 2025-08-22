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

export default function ContactForm() {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // FormSubmit endpoint
      const formSubmitEmail = "contatovhs4@gmail.com"

      // Create a hidden form and submit it (this avoids CORS issues)
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = `https://formsubmit.co/${formSubmitEmail}`
      form.style.display = 'none'

      // Add form fields
      const addField = (name: string, value: string) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      }

      // Main fields
      addField('name', formData.nome)
      addField('email', formData.email)
      addField('company', formData.empresa)
      addField('subject', formData.assunto)
      addField('message', formData.mensagem)

      // FormSubmit configuration
      addField('_subject', 'Nova mensagem de contato via site')
      addField('_captcha', 'false')
      addField('_autoresponse', 'Obrigado por entrar em contato! Responderei em breve.')
      addField('_template', 'box')

      // Add ajax field to get response in same page
      addField('_next', window.location.href)

      // Append to body and submit
      document.body.appendChild(form)
      form.submit()

      // Set success status and reset form
      setSubmitStatus("success")
      setFormData({
        nome: "",
        email: "",
        empresa: "",
        assunto: "",
        mensagem: "",
      })
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
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
          <h3 className="font-heading font-bold text-3xl mb-6 text-royal-blue">Vamos Conversar</h3>
          <p className="font-body text-lg text-gray-300 leading-relaxed mb-8">
            Estou sempre aberto a discutir novos projetos, oportunidades criativas ou parcerias. Se você tem uma ideia
            interessante, vamos transformá-la em realidade juntos.
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
              <p className="font-body font-semibold text-white">Telefone</p>
              <Link href="https://wa.me/+5522999018809" className="font-body cursor-pointer text-gray-300">+55 (22) 99901-8809</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-royal-blue" />
            </div>
            <div>
              <p className="font-body font-semibold text-white">Localização</p>
              <p className="font-body text-gray-300">Campos dos Goytacazes, Rio de Janeiro, Brasil</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="font-body text-sm text-gray-400 mb-4">Tempo de resposta médio: 24 horas</p>
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="font-body text-sm text-gray-300">Disponível para novos projetos</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="bg-deep-gray border-royal-blue/20">
        <CardContent className="p-8">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4 text-white">Mensagem Enviada!</h3>
              <p className="font-body text-gray-300 mb-6">
                Obrigado pelo contato! Vou responder em breve com mais detalhes sobre seu projeto.
              </p>
              <Button
                onClick={() => setSubmitStatus("idle")}
                className="bg-royal-blue hover:bg-royal-blue-light text-white"
              >
                Enviar Nova Mensagem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-body font-semibold text-white">
                    Nome *
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body font-semibold text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="font-body font-semibold text-white">
                    Empresa
                  </Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder="Nome da empresa (opcional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto" className="font-body font-semibold text-white">
                    Assunto *
                  </Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue"
                    placeholder="Sobre o que você quer conversar?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="font-body font-semibold text-white">
                  Mensagem *
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-pure-black border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue resize-none"
                  placeholder="Conte-me mais sobre seu projeto, prazos, orçamento e qualquer detalhe importante..."
                />
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-body text-sm">
                    Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-royal-blue hover:bg-royal-blue-light text-white font-body font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="font-body text-xs text-gray-400 text-center">
                Ao enviar esta mensagem, você concorda que eu entre em contato sobre seu projeto.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}