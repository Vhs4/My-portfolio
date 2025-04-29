"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function Projetos() {
  const projects = [
    {
      title: "Sistema de análise de fraudes",
      description: "Desenvolvimento do front-end de um sistema de análise de fraudes utilizando inteligência artificial.",
      image: "/dashboard.png?height=300&width=600",
      technologies: ["React", "AWS", "Tailwind CSS", "TypeScript", "HTML"],
      demoUrl: "",
      repoUrl: "",
    },
    {
      title: "Landing page de peixaria",
      description: "Desenvolvimento de uma landing page de alta conversão para uma peixaria local.",
      image: "/landingpagepeixaria.png?height=300&width=600",
      technologies: ["JavaScript", "Tailwind CSS", "HTML", "SEO", "Testes Marketing"],
      demoUrl: "",
      repoUrl: "",
    },
    {
      title: "Projeto acadêmico Ifood",
      description: "Liderança no desenvolvimento de um sistema de gestão de restaurantes para o Ifood.",
      image: "/erp.png?height=300&width=600",
      technologies: ["React", "Node.js", "PostgreSQL", "Express", "Docker"],
      demoUrl: "",
      repoUrl: "",
    },
  ]

  return (
    <section id="projetos" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e relevantes, demonstrando minhas habilidades e experiência.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.demoUrl || project.repoUrl && (
                    <div className="flex gap-4 mt-4">
                      {project.demoUrl && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.demoUrl.trim()} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.repoUrl && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.repoUrl.trim()} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Código
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
