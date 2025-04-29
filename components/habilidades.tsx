"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, Globe, Layers, GitBranch, ShoppingCart } from "lucide-react"

export function Habilidades() {
  const skills = [
    {
      icon: <ShoppingCart className="h-8 w-8 mb-4 text-primary" />,
      title: "E-commerce",
      description: "Criação de lojas online utilizando Shopify, NuvemShop, WordPress ou personalizado.",
    },
    {
      icon: <Code className="h-8 w-8 mb-4 text-primary" />,
      title: "Front-end",
      description: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS",
    },
    {
      icon: <Server className="h-8 w-8 mb-4 text-primary" />,
      title: "Back-end",
      description: "Node.js, Express, NestJS, Python, Django, API RESTful",
    },
    {
      icon: <Database className="h-8 w-8 mb-4 text-primary" />,
      title: "Banco de Dados",
      description: "MongoDB, PostgreSQL, MySQL, Redis, Firebase",
    },
    {
      icon: <Globe className="h-8 w-8 mb-4 text-primary" />,
      title: "DevOps",
      description: "Docker, AWS, Vercel, Netlify, CI/CD",
    },
    {
      icon: <Layers className="h-8 w-8 mb-4 text-primary" />,
      title: "Arquitetura",
      description: "Microsserviços, Serverless, Clean Code, Design Patterns",
    },
    {
      icon: <GitBranch className="h-8 w-8 mb-4 text-primary" />,
      title: "Ferramentas",
      description: "Git, GitHub, VS Code, Jira, Trello, Slack",
    },
  ]

  return (
    <section id="habilidades" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Minhas Habilidades</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um conjunto diversificado de habilidades técnicas e ferramentas que utilizo para desenvolver soluções
            completas e eficientes.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.slice(0, 4).map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    {skill.icon}
                    <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-6 max-w-3xl mx-auto">
            {skills.slice(4).map((skill, index) => (
              <motion.div
                key={index + 4}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    {skill.icon}
                    <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
