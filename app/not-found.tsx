import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-9xl md:text-[12rem] text-royal-blue opacity-20 animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            <span className="text-royal-blue">OOPS!</span> PÁGINA NÃO ENCONTRADA
          </h2>
          <p className="font-body text-xl text-gray-300 leading-relaxed">
            A página que você está procurando não existe ou foi movida. Que tal explorar outras seções do meu portfólio?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-royal-blue hover:bg-royal-blue-light text-pure-white font-semibold px-8 py-4"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-pure-white bg-transparent px-8 py-4"
            asChild
          >
            <Link href="/projetos">
              <Search className="mr-2 h-5 w-5" />
              Ver Projetos
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="border-t border-royal-blue/20 pt-8">
          <p className="font-body text-gray-400 mb-4">Ou explore estas seções:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sobre" className="font-body text-royal-blue hover:text-royal-blue-light hover-underline">
              Sobre Mim
            </Link>
            <Link href="/blog" className="font-body text-royal-blue hover:text-royal-blue-light hover-underline">
              Blog
            </Link>
            <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto" className="font-body text-royal-blue hover:text-royal-blue-light hover-underline">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
