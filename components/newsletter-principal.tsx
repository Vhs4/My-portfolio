"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { useLocale } from "next-intl"

const NewsletterPrincipal = () => {
  const locale = useLocale() as "pt" | "en"
  const isPt = locale === "pt"

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage(isPt ? "Por favor, insira um email válido." : "Please enter a valid email.")
      setStatus("error")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(isPt
          ? "Obrigado! Você se inscreveu com sucesso na minha newsletter."
          : "Thank you! You've successfully subscribed to my newsletter.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || (isPt ? "Ocorreu um erro. Tente novamente." : "An error occurred. Please try again."))
      }
    } catch {
      setStatus("error")
      setMessage(isPt ? "Erro de conexão. Verifique sua internet e tente novamente." : "Connection error. Check your internet and try again.")
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <div className="border-t border-royal-blue/20 mt-12 pt-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-heading font-bold text-2xl mb-4">
          {isPt ? "Fique por Dentro" : "Stay in the Loop"}
        </h3>
        <p className="font-body text-gray-300 mb-6">
          {isPt
            ? "Receba conteúdos exclusivos sobre desenvolvimento, dicas de carreira e novidades do mundo tech."
            : "Get exclusive content about development, career tips and the latest from the tech world."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={isPt ? "Seu melhor email" : "Your best email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="flex-1 px-4 py-3 rounded-lg bg-pure-black border border-royal-blue/30 text-white placeholder:text-gray-400 focus:border-royal-blue focus:outline-none disabled:opacity-50"
            required
          />
          <Button
            type="submit" disabled={status === "loading"}
            className="bg-royal-blue hover:bg-royal-blue-light text-white px-6 disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                {isPt ? "Inscrevendo..." : "Subscribing..."}
              </span>
            ) : (
              isPt ? "Inscrever-se" : "Subscribe"
            )}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 p-3 text-white rounded-lg text-sm ${
            status === "success"
              ? "bg-green-500 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsletterPrincipal
