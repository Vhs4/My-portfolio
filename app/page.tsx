import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Sobre } from "@/components/sobre"
import { Habilidades } from "@/components/habilidades"
import { Experiencia } from "@/components/experiencia"
import { Projetos } from "@/components/projetos"
import { Contato } from "@/components/contato"
import { Footer } from "@/components/footer"
import { HackathonHero } from "@/components/hackathon-hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Habilidades />
        <HackathonHero />
        <Experiencia />
        <Projetos />
        <Contato />
      </main>
      <Footer />
    </div>
  )
}
