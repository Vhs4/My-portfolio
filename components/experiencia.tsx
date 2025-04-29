"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"

export function Experiencia() {
  const experiences = [
    {
      title: "Desenvolvedor de Software | Full Stack",
      company: "SysMap Solutions",
      period: "abr de 2025 - o momento",
      description:
        "Atuando no cliente Fully Ecosystem, uma healthtech com investimento de R$ 200 milhões da Prudential. Participo do desenvolvimento de soluções digitais focadas em saúde física, mental e financeira, promovendo qualidade de vida por meio da tecnologia. Utilizo um stack moderno composto por NestJS, Kotlin e PHP para construir experiências digitais completas, acessíveis e voltadas à adoção de hábitos saudáveis. A Fully chegou ao mercado com o propósito de transformar a relação das pessoas com o autocuidado, com o respaldo de uma das maiores seguradoras do mundo.",
      technologies: ["NestJS", "Kotlin", "PHP", "MongoDB", "PostgreSQL", "Node.js", "AWS", "REST"],
    },
    {
      title: "Software Engineer",
      company: "Freelancer",
      period: "jun de 2024 - dez de 2024",
      description:
        "Atuação como engenheiro de software em diversos projetos como freelancer, com foco em manutenção e atualização de sistemas.",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Docker",
        "WordPress",
        "MongoDB",
        "TypeScript",
        "Jest",
        "NextUI",
        "TailwindCSS",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "Elastic Code",
      period: "jan de 2024 - jun de 2024",
      description:
        "Responsável pelo front-end de um projeto de gestão de frota de caminhões. Atividades: Desenvolvimento de aplicações web responsivas, Integração com APIs RESTful, Aplicação de testes unitários com Jest, Uso de metodologia ágil Scrum, Implementação de regras de negócio e documentação técnica.",
      technologies: ["React.js", "TypeScript", "Jest", "NextUI", "TailwindCSS", "Styled Components"],
    },
    {
      title: "Desenvolvedor Web",
      company: "Freelancer",
      period: "mai de 2023 - jan de 2024",
      description: "Atuei no desenvolvimento e manutenção de lojas utilizando a plataforma Shopify.",
      technologies: ["Shopify", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Estágio de Desenvolvimento Front-end",
      company: "Campos Developers",
      period: "abr de 2023 - mai de 2023",
      description:
        "Atividades: Desenvolvimento de aplicações web responsivas, Integração com APIs RESTful, Documentação de código com Swagger e Redoc, Metodologia ágil Scrum.",
      technologies: ["Vue.js", "Nuxt.js", "Bootstrap", "Buefy", "JavaScript", "HTML", "CSS"],
    },
  ]

  return (
    <section id="experiencia" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experiência Profissional</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minha trajetória profissional e as empresas com as quais tive a oportunidade de colaborar ao longo dos anos.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
