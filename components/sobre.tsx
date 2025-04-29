"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Sobre() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/2">
            <Image
              src="/minhafoto.png"
              alt="Victor Hugo"
              width={400}
              height={400}
              className="rounded-full object-cover mx-auto"
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Sobre Mim</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Olá! Sou Victor Hugo, um desenvolvedor full stack apaixonado por criar soluções digitais que
              resolvem problemas reais.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Com experiência em desenvolvimento web e mobile, trabalho com tecnologias modernas como React, Next.js,
              Node.js e diversas outras ferramentas do ecossistema JavaScript.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Minha abordagem combina habilidades técnicas com uma forte compreensão de design de experiência do
              usuário, permitindo-me criar produtos digitais que são tanto funcionais quanto agradáveis de usar.
            </p>
            <p className="text-lg text-muted-foreground">
              Estou sempre em busca de novos desafios e oportunidades para expandir meus conhecimentos e contribuir para
              projetos inovadores.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
