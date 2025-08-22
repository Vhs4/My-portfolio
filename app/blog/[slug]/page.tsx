"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Twitter,
  Linkedin,
  Facebook,
  LinkIcon,
  Menu,
  X,
  Github,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { carreiraDesenvolvedorPost } from "../posts/carreira-desenvolvedor"
import { performanceWeb2025Post } from "../posts/performance-web-2025"
import { reactServerComponentsPost } from "../posts/react-server-components"
import NewsletterBlog from "@/components/newsletter-blog"
import { aprenderInglesHeroData } from "../posts/aprender-ingles-2025";

const postsDetalhados = {
  "carreira-desenvolvedor-2025": carreiraDesenvolvedorPost,
  "performance-web-2025": performanceWeb2025Post,
  "react-server-components": reactServerComponentsPost,
  "aprender-ingles-2025": aprenderInglesHeroData
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const post = postsDetalhados[params.slug as keyof typeof postsDetalhados]
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!post) {
    notFound()
  }

  const shareUrl = `https://vhs4.dev/blog/${post.id}`
  const shareText = `${post.titulo} - ${post.resumo}`

  return (
    <main className="min-h-screen bg-pure-white text-pure-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div className="h-full bg-royal-blue transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-1 z-40 p-6 bg-pure-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/blog" className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Blog
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/projetos" className="font-body hover-underline">
              Projetos
            </Link>
            <Link href="/sobre" className="font-body hover-underline">
              Sobre
            </Link>
            <Link href="/blog" className="font-body hover-underline text-royal-blue">
              Blog
            </Link>
            <Link href="/#contato" className="font-body hover-underline">
              Contato
            </Link>
          </div>
          {isMenuOpen ? (
            <button
              onClick={toggleMenu}
              className="md:hidden"
            >
              <X />
            </button>
          ) : (

            <button
              onClick={toggleMenu}
              className="md:hidden"
            >
              <Menu />
            </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a
              href="/projetos"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Projetos
            </a>
            <a
              href="/sobre"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Sobre
            </a>
            <a
              href="/blog"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Blog
            </a>
            <a
              href="/#contato"
              onClick={closeMenu}
              className="block font-body hover-underline py-2"
            >
              Contato
            </a>
          </div>
        )}
      </nav>

      {/* Breadcrumbs */}
      <div className="py-4 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 font-body text-sm text-gray-600">
            <Link href="/" className="hover:text-royal-blue">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-royal-blue">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-royal-blue line-clamp-1">{post.titulo}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-royal-blue text-white mb-6">{post.categoria}</Badge>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">{post.titulo}</h1>

          <p className="font-body text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">{post.resumo}</p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-body font-semibold">{post.autor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="font-body">{new Date(new Date(post.dataPublicacao).getTime() + 86400000).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="font-body">{post.tempoLeitura} de leitura</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="hover:bg-royal-blue hover:text-white transition-colors">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="font-body font-semibold text-gray-700">Compartilhar:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-blue-500 hover:text-white hover:border-blue-500 bg-transparent cursor-pointer"
                onClick={() =>
                  window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank")
                }
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-blue-600 hover:text-white hover:border-blue-600 bg-transparent cursor-pointer"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-blue-700 hover:text-white hover:border-blue-700 bg-transparent cursor-pointer"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-gray-600 hover:text-white hover:border-gray-600 bg-transparent cursor-pointer"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={post.imagem || "/placeholder.svg"} alt={post.titulo} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <MarkdownRenderer content={post.conteudo} />
        </div>
      </article>

      {/* Author Bio */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-start gap-6">
              <Image
                src="/professional-developer-avatar-blue-lighting.webp"
                alt="Victor Hugo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="font-heading font-bold text-2xl mb-2">Victor Hugo Campos</h3>
                <p className="font-body text-royal-blue mb-4">Desenvolvedor Full Stack, AWS Certified & NASA Space Apps Regional Champion</p>
                <p className="font-body text-gray-600 leading-relaxed mb-4">
                  Desenvolvedor Full Stack de 20 anos, campeão regional do NASA Space Apps Challenge aos 18 anos e
                  Domain Leader of Technology no Aspire Leaders Program. Apaixonado por compartilhar conhecimento e ajudar
                  outros desenvolvedores a evoluir em suas carreiras.
                </p>
                <div className="flex gap-4">
                  <Button size="sm" variant="outline" className="hover:bg-royal-blue hover:text-white bg-transparent" asChild>
                    <Link href="https://linkedin.com/in/vhs4">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Conectar
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-royal-blue hover:text-white bg-transparent" asChild>
                    <Link href="https://github.com/vhs4">
                      <Github className="h-4 w-4 mr-2" />
                      Seguir
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder para posts relacionados */}
            {Object.values(postsDetalhados)
              .filter((p) => p.id !== post.id) // exclui o post atual
              .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()) // mais recentes primeiro
              .slice(0, 3) // pega só 3
              .map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48">
                    <Link
                      href={`/blog/${relatedPost.id}`}
                    >
                      <Image
                        src={relatedPost.imagem || "/placeholder.svg"}
                        alt={relatedPost.titulo}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </Link>
                  </div>
                  <div className="p-6">
                    <Link
                      href={`/blog/${relatedPost.id}`}
                    >
                      <h3 className="font-heading font-bold text-lg mb-3">{relatedPost.titulo}</h3>
                    </Link>
                    <p className="font-body text-gray-600 text-sm mb-4">
                      {relatedPost.resumo}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="inline-flex items-center font-body font-semibold text-royal-blue hover:text-royal-blue-light transition-colors duration-300 text-sm"
                    >
                      Ler mais
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterBlog text="Gostou do artigo?" subtext="Receba conteúdos como este diretamente no seu email. Sem spam, apenas valor." />
    </main>
  )
}

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none font-body leading-relaxed">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-heading font-bold text-4xl mt-12 mb-8 text-royal-blue">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-heading font-bold text-3xl mt-10 mb-6 text-royal-blue">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-heading font-bold text-2xl mt-8 mb-4 text-royal-blue">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-royal-blue">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          code: ({ children, className }) => {
            const isCodeBlock = className?.includes('language-');

            if (isCodeBlock) {
              return <code className="text-sm font-mono">{children}</code>;
            }

            return (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-royal-blue">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 border-l-4 border-royal-blue">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-royal-blue hover:text-royal-blue-light underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-royal-blue bg-gray-50 p-4 my-6 italic">
              {children}
            </blockquote>
          ),
          // Componente para imagens
          img: ({ src, alt, title }) => (
            <div className="my-8">
              <div className="relative w-full h-auto">
                <Image
                  src={src ? src.toString() : '/placeholder.svg'}
                  alt={alt || 'Imagem do artigo'}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  priority={false}
                  quality={100}
                />
              </div>
              {(alt || title) && (
                <p className="text-center text-sm text-gray-600 mt-3 italic">
                  {title || alt}
                </p>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}