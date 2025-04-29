"use client"

import type React from "react"

import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contato() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isToastSuccess, setIsToastSuccess] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const showToast = (message: string, isSuccess = true) => {
    setToastMessage(message)
    setIsToastSuccess(isSuccess)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showToast("Enviando sua mensagem...", true)

    try {
      const response = await fetch(e.currentTarget.action, {
        method: "POST",
        body: new FormData(e.currentTarget),
      })

      if (response.ok) {
        showToast("Mensagem enviada com sucesso!", true)
        e.currentTarget.reset()
      } else {
        showToast("Houve um erro ao enviar sua mensagem. Tente novamente.", false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      showToast("Mensagem enviada com sucesso!", true)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email",
      value: "contatovhs4@gmail.com",
      link: "mailto:contatovhs4@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Telefone",
      value: "+55 (22) 99901-8809",
      link: "https://wa.me/+5522999018809",
      target: "_blank",
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Localização",
      value: "Campos dos Goytacazes, RJ - Brasil",
      link: null,
    },
  ]

  return (
    <section id="contato" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Entre em Contato</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente ou quer conversar sobre oportunidades de trabalho? Entre em contato comigo!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-0.5">{info.icon}</div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors" target={info.target || "_self"}>
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {toastMessage && (
            <div
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full ${isToastSuccess ? "bg-emerald-500" : "bg-red-500"
                } text-white z-50 shadow-lg transition-opacity duration-300 ease-in-out`}
            >
              {toastMessage}
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Envie uma Mensagem</h3>
                <form
                  id="contactForm"
                  action="https://formsubmit.co/contatovhs4@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Assunto da mensagem"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Sua mensagem"
                      rows={5}
                      required
                    />
                  </div>
                  <input type="hidden" name="_next" value="#" />
                  <input type="hidden" name="_subject" value="Nova mensagem de contato" />
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_captcha" value="false" />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
