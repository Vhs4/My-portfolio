"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Calendar, Clock, TrendingUp, BookOpen, Filter, ChevronRight, X, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NewsletterBlog from "@/components/newsletter-blog"
import { carreiraDesenvolvedorHeroData } from "./posts/carreira-desenvolvedor"
import { performanceWeb2025HeroData } from "./posts/performance-web-2025"
import { reactServerComponentsHeroData } from "./posts/react-server-components"
import { aprenderInglesHeroData } from "./posts/aprender-ingles-2025"
import { liderancaNaTecnologiaHeroData } from "./posts/lideranca-na-tecnologia"

const posts = [
  carreiraDesenvolvedorHeroData,
  performanceWeb2025HeroData,
  reactServerComponentsHeroData,
  aprenderInglesHeroData,
  liderancaNaTecnologiaHeroData
]

const categorias = [
  "Todos",
  ...Array.from(new Set(posts.map(post => post.categoria.trim())))
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showFilters, setShowFilters] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const newFilteredPosts = posts.filter((post) => {
      // Filtro por categoria
      if (
        selectedCategory !== "Todos" &&
        post.categoria.trim().toLowerCase() !== selectedCategory.trim().toLowerCase()
      ) return false;


      // Filtro por busca
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        const matches =
          post.titulo.toLowerCase().includes(searchLower) ||
          post.resumo.toLowerCase().includes(searchLower) ||
          post.conteudo.toLowerCase().includes(searchLower) ||
          post.categoria.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          post.autor.toLowerCase().includes(searchLower);
        if (!matches) return false;
      }

      return true;
    });

    setFilteredPosts(newFilteredPosts);
  }, [searchTerm, selectedCategory]);

  // Separando featured e regular posts com base no filteredPosts atualizado
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Todos")
    setShowFilters(false)
  }

  return (
    <main className="min-h-screen bg-pure-white text-pure-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 p-6 bg-pure-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
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
            <Link href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto" className="font-body hover-underline">
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
              href="https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"
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
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-body text-sm text-gray-600">
            <Link href="/" className="hover:text-royal-blue">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-royal-blue">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6">
            <span className="text-pure-black">MEU</span> <span className="text-royal-blue">BLOG</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Compartilhando conhecimento sobre desenvolvimento, tecnologia e carreira. Artigos práticos para
            desenvolvedores que querem evoluir constantemente.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar artigos... (ex: next, react, typescript)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-royal-blue"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 px-6 border-gray-300 hover:border-royal-blue hover:text-royal-blue bg-transparent ${showFilters ? "border-royal-blue text-royal-blue" : ""
                  }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg">Filtrar por:</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Limpar filtros
                  </Button>
                </div>

                <div>
                  <h4 className="font-body font-medium mb-3 text-gray-700">Categorias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((categoria) => (
                      <Button
                        key={categoria}
                        variant={selectedCategory === categoria ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(categoria)}
                        className={
                          selectedCategory === categoria
                            ? "bg-royal-blue hover:bg-royal-blue-light text-white"
                            : "border-gray-300 hover:border-royal-blue hover:text-royal-blue"
                        }
                      >
                        {categoria}
                      </Button>
                    ))}
                  </div>
                </div>

                {(searchTerm || selectedCategory !== "Todos") && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-body font-medium mb-2 text-gray-700">Filtros ativos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Busca: "{searchTerm}"
                          <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedCategory !== "Todos" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Categoria: {selectedCategory}
                          <button onClick={() => setSelectedCategory("Todos")} className="ml-1 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showFilters && (
              <div className="flex flex-wrap justify-center gap-2">
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={selectedCategory === categoria ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(categoria)}
                    className={
                      selectedCategory === categoria
                        ? "bg-royal-blue hover:bg-royal-blue-light text-white"
                        : "border-gray-300 hover:border-royal-blue hover:text-royal-blue"
                    }
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === "Todos" && !searchTerm && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="h-8 w-8 text-royal-blue" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl">Artigos em Destaque</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Link
                      href={`/blog/${post.id}`}>
                      <Image
                        src={post.imagem || "/placeholder.svg"}
                        alt={post.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </Link>
                    <Badge className="absolute top-4 left-4 bg-royal-blue text-white">{post.categoria}</Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link
                        href={`/blog/${post.id}`}>
                        <h3 className="font-heading font-bold text-xl text-white mb-2 line-clamp-2">{post.titulo}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-body text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.resumo}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(new Date(post.dataPublicacao).getTime() + 86400000).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.tempoLeitura}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center font-body font-semibold text-royal-blue hover:text-royal-blue-light transition-colors duration-300"
                    >
                      Ler artigo completo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {/* Regular / Todos os Posts */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              {searchTerm || selectedCategory !== "Todos" ? "Resultados da Busca" : "Todos os Artigos"}
            </h2>
            <span className="font-body text-gray-600">
              {filteredPosts.length} artigo{filteredPosts.length !== 1 ? "s" : ""} encontrado{filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Nenhum artigo encontrado</h3>
              <p className="font-body text-gray-600 mb-4">
                {searchTerm
                  ? `Não encontramos artigos para "${searchTerm}"`
                  : `Não há artigos na categoria "${selectedCategory}"`}
              </p>
              <Button onClick={clearFilters} variant="outline">
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm || selectedCategory !== "Todos" ? filteredPosts : regularPosts).map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Link href={`/blog/${post.id}`}>
                      <Image
                        src={post.imagem || "/placeholder.svg"}
                        alt={post.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Badge className="absolute top-3 left-3 bg-royal-blue text-white text-xs">{post.categoria}</Badge>
                  </div>

                  <div className="p-6">
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="font-heading font-bold text-lg mb-3 line-clamp-2 group-hover:text-royal-blue transition-colors duration-300">
                        {post.titulo}
                      </h3>
                    </Link>
                    <p className="font-body text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.resumo}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(new Date(post.dataPublicacao).getTime() + 86400000).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.tempoLeitura}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center font-body font-semibold text-royal-blue hover:text-royal-blue-light transition-colors duration-300 text-sm"
                    >
                      Ler mais
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Newsletter CTA */}
      <NewsletterBlog />
    </main>
  )
}
