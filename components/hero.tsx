"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Desenvolvedor Full Stack"
  const typingSpeed = 100

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section id="inicio" className="relative py-20 md:py-32">
      <div className="container flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Victor Hugo</h1>
          <h2 className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
            {typedText}
            <span className="animate-blink ml-1">|</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Transformando ideias em soluções digitais inovadoras e eficientes.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="outline" size="icon">
              <a href="https://github.com/vhs4" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a href="https://linkedin.com/in/vhs4" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a href="mailto:contatovhs4@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-12">
            <Button asChild>
              <a href="#sobre">
                Saiba mais <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
