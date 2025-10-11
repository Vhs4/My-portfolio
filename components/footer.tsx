"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp, Heart, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import NewsletterPrincipal from "./newsletter-principal"

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-deep-gray text-pure-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading font-bold text-3xl mb-4 block hover-underline w-fit">
              Victor Hugo Campos
            </Link>
            <p className="font-body text-gray-300 leading-relaxed mb-6 max-w-md">
              Desenvolvedor Full Stack apaixonado por criar experiências digitais extraordinárias. Transformando ideias
              em código há mais de 3 anos.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/vhs4"
                className="p-3 rounded-full bg-royal-blue/20 text-royal-blue hover:bg-royal-blue hover:text-white transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/vhs4"
                className="p-3 rounded-full bg-royal-blue/20 text-royal-blue hover:bg-royal-blue hover:text-white transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contato@vhs4.dev"
                className="p-3 rounded-full bg-royal-blue/20 text-royal-blue hover:bg-royal-blue hover:text-white transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-6">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="font-body text-gray-300 hover:text-royal-blue transition-colors">
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="font-body text-gray-300 hover:text-royal-blue transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-body text-gray-300 hover:text-royal-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto" className="font-body text-gray-300 hover:text-royal-blue transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-body text-gray-300">Desenvolvimento Web</span>
              </li>
              <li>
                <span className="font-body text-gray-300">Aplicações Mobile</span>
              </li>
              <li>
                <span className="font-body text-gray-300">Consultoria Técnica</span>
              </li>
              <li>
                <span className="font-body text-gray-300">Mentoria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterPrincipal />
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-royal-blue/20 bg-pure-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-body text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} Victor Hugo Campos. Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>e muito</span>
              <Coffee className="h-4 w-4 text-yellow-600" />
            </div>

            <div className="flex items-center gap-6">
              <Button
                onClick={scrollToTop}
                size="sm"
                variant="outline"
                className="border-royal-blue/30 text-royal-blue hover:bg-royal-blue hover:text-white bg-transparent cursor-pointer"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
