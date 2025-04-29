"use client"

import { motion } from "framer-motion"
import { Award, Globe, Rocket, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HackathonHero() {
    return (
        <section className="py-16 bg-muted/90">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4"
                        >
                            <div className="flex items-center justify-center mb-6">
                                <Rocket className="h-10 w-10 text-primary mr-3" />
                                <h2 className="text-3xl md:text-4xl font-bold">Certificado pela NASA e Premiado pela AEB</h2>
                            </div>
                        </motion.div>

                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-bold mb-6 text-primary"
                        >
                            Líder da Equipe Campeã Regional
                        </motion.h3>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-lg mb-8 text-muted-foreground"
                        >
                            Liderei uma equipe talentosa que conquistou o primeiro lugar na etapa regional do NASA Space Apps
                            Challenge, o maior hackathon internacional do mundo. Nossa solução inovadora foi reconhecida globalmente
                            pela NASA, recebemos certificados oficiais e fomos premiados com um troféu da Agência Espacial Brasileira,
                            que mantenho com orgulho como líder do projeto.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-6 mb-8"
                        >
                            <div className="flex items-center">
                                <Trophy className="h-6 w-6 text-amber-500 mr-2" />
                                <span>Campeão Regional</span>
                            </div>
                            <div className="flex items-center">
                                <Award className="h-6 w-6 text-primary mr-2" />
                                <span>Certificado pela NASA</span>
                            </div>
                            <div className="flex items-center">
                                <Globe className="h-6 w-6 text-violet-500 mr-2" />
                                <span>Reconhecimento Global</span>
                            </div>
                            <div className="flex items-center">
                                <Award className="h-6 w-6 text-rose-500 mr-2" />
                                <span>Troféu da AEB</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Link href="https://www.spaceappschallenge.org/2023/find-a-team/triplice-soldiers" target="_blank">
                                <Button>
                                    Saiba mais sobre o projeto
                                </Button>
                            </Link>
                            <Link href="https://www.linkedin.com/feed/update/urn:li:activity:7117274359827722242/" target="_blank">
                                <Button>
                                    Comemoração no Linkedin
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
