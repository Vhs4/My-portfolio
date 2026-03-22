"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Calendar, Clock, TrendingUp, BookOpen, Filter, ChevronRight, X, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NewsletterBlog from "@/components/newsletter-blog"
import { carreiraDesenvolvedorHeroData } from "@/app/blog/posts/carreira-desenvolvedor"
import { performanceWeb2025HeroData } from "@/app/blog/posts/performance-web-2025"
import { reactServerComponentsHeroData } from "@/app/blog/posts/react-server-components"
import { aprenderInglesHeroData } from "@/app/blog/posts/aprender-ingles-2025"
import { liderancaNaTecnologiaHeroData } from "@/app/blog/posts/lideranca-na-tecnologia"
import { useLocale, useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/language-switcher"

const posts = [
  carreiraDesenvolvedorHeroData,
  performanceWeb2025HeroData,
  reactServerComponentsHeroData,
  aprenderInglesHeroData,
  liderancaNaTecnologiaHeroData,
]

const categorias = ["Todos", ...Array.from(new Set(posts.map((post) => post.categoria.trim())))]

export default function BlogPage() {
  const locale = useLocale() as "pt" | "en"
  const t = useTranslations("blog")
  const nav = useTranslations("nav")
  const prefix = locale === "en" ? "/en" : ""

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(t("all_categories"))
  const [showFilters, setShowFilters] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const allLabel = t("all_categories")

  useEffect(() => {
    const newFilteredPosts = posts.filter((post) => {
      if (selectedCategory !== allLabel && post.categoria.trim().toLowerCase() !== selectedCategory.trim().toLowerCase()) return false
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim()
        const matches =
          post.titulo.toLowerCase().includes(searchLower) ||
          post.resumo.toLowerCase().includes(searchLower) ||
          post.conteudo.toLowerCase().includes(searchLower) ||
          post.categoria.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          post.autor.toLowerCase().includes(searchLower)
        if (!matches) return false
      }
      return true
    })
    setFilteredPosts(newFilteredPosts)
  }, [searchTerm, selectedCategory, allLabel])

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(allLabel)
    setShowFilters(false)
  }

  const categoriasWithAll = [allLabel, ...Array.from(new Set(posts.map((post) => post.categoria.trim())))]

  return (
    <main className="min-h-screen bg-pure-white text-pure-black">
      <nav className="sticky top-0 z-50 p-6 bg-pure-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href={prefix + "/"} className="font-heading font-bold text-xl hover-underline flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            VHS4
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href={prefix + "/projetos"} className="font-body hover-underline">{nav("projects")}</Link>
            <Link href={prefix + "/sobre"} className="font-body hover-underline">{nav("about")}</Link>
            <Link href={prefix + "/blog"} className="font-body hover-underline text-royal-blue">{nav("blog")}</Link>
            <Link href={locale === "en" ? "https://wa.me/+5522999018809?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} className="font-body hover-underline">{nav("contact")}</Link>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            {isMenuOpen ? <button onClick={toggleMenu}><X /></button> : <button onClick={toggleMenu}><Menu /></button>}
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a href={prefix + "/projetos"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("projects")}</a>
            <a href={prefix + "/sobre"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("about")}</a>
            <a href={prefix + "/blog"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("blog")}</a>
            <a href={locale === "en" ? "https://wa.me/+5522999018809?text=Hi%2C+I+found+your+website+and+would+like+to+discuss+a+project" : "https://wa.me/+5522999018809?text=Ol%C3%A1%2C+vim+pelo+seu+site+e+gostaria+de+conversar+sobre+um+projeto"} onClick={closeMenu} className="block font-body hover-underline py-2">{nav("contact")}</a>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className="py-4 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-body text-sm text-gray-600">
            <Link href={prefix + "/"} className="hover:text-royal-blue">{t("home")}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-royal-blue">{nav("blog")}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6">
            <span className="text-pure-black">{t("title")}</span> <span className="text-royal-blue">{t("title_accent")}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t("subtitle")}
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t("search_placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-royal-blue"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 px-6 border-gray-300 hover:border-royal-blue hover:text-royal-blue bg-transparent ${showFilters ? "border-royal-blue text-royal-blue" : ""}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t("filters")}
              </Button>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg">{t("filter_by")}</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
                    {t("clear_filters")}
                  </Button>
                </div>
                <div>
                  <h4 className="font-body font-medium mb-3 text-gray-700">{t("categories")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoriasWithAll.map((categoria) => (
                      <Button
                        key={categoria}
                        variant={selectedCategory === categoria ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(categoria)}
                        className={selectedCategory === categoria ? "bg-royal-blue hover:bg-royal-blue-light text-white" : "border-gray-300 hover:border-royal-blue hover:text-royal-blue"}
                      >
                        {categoria}
                      </Button>
                    ))}
                  </div>
                </div>
                {(searchTerm || selectedCategory !== allLabel) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-body font-medium mb-2 text-gray-700">{t("active_filters")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {t("search_label")} &quot;{searchTerm}&quot;
                          <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-red-500"><X className="h-3 w-3" /></button>
                        </Badge>
                      )}
                      {selectedCategory !== allLabel && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {t("category_label")} {selectedCategory}
                          <button onClick={() => setSelectedCategory(allLabel)} className="ml-1 hover:text-red-500"><X className="h-3 w-3" /></button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showFilters && (
              <div className="flex flex-wrap justify-center gap-2">
                {categoriasWithAll.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={selectedCategory === categoria ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(categoria)}
                    className={selectedCategory === categoria ? "bg-royal-blue hover:bg-royal-blue-light text-white" : "border-gray-300 hover:border-royal-blue hover:text-royal-blue"}
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
      {featuredPosts.length > 0 && selectedCategory === allLabel && !searchTerm && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="h-8 w-8 text-royal-blue" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl">{t("featured_title")}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <Link href={`${prefix}/blog/${post.id}`}>
                      <Image src={post.imagem || "/placeholder.svg"} alt={post.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </Link>
                    <Badge className="absolute top-4 left-4 bg-royal-blue text-white">{post.categoria}</Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link href={`${prefix}/blog/${post.id}`}>
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
                          <span>{new Date(new Date(post.dataPublicacao).getTime() + 86400000).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.tempoLeitura}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <Link href={`${prefix}/blog/${post.id}`} className="inline-flex items-center font-body font-semibold text-royal-blue hover:text-royal-blue-light transition-colors duration-300">
                      {t("read_full")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              {searchTerm || selectedCategory !== allLabel ? t("search_results") : t("all_articles")}
            </h2>
            <span className="font-body text-gray-600">
              {filteredPosts.length} {filteredPosts.length !== 1 ? t("articles_found_plural") : t("articles_found_singular")}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">{t("no_articles")}</h3>
              <p className="font-body text-gray-600 mb-4">
                {searchTerm ? `${t("no_articles_search")} "${searchTerm}"` : `${t("no_articles_category")} "${selectedCategory}"`}
              </p>
              <Button onClick={clearFilters} variant="outline">{t("clear_filters")}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm || selectedCategory !== allLabel ? filteredPosts : regularPosts).map((post) => (
                <article key={post.id} className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <Link href={`${prefix}/blog/${post.id}`}>
                      <Image src={post.imagem || "/placeholder.svg"} alt={post.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                    <Badge className="absolute top-3 left-3 bg-royal-blue text-white text-xs">{post.categoria}</Badge>
                  </div>
                  <div className="p-6">
                    <Link href={`${prefix}/blog/${post.id}`}>
                      <h3 className="font-heading font-bold text-lg mb-3 line-clamp-2 group-hover:text-royal-blue transition-colors duration-300">{post.titulo}</h3>
                    </Link>
                    <p className="font-body text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.resumo}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(new Date(post.dataPublicacao).getTime() + 86400000).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.tempoLeitura}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <Link href={`${prefix}/blog/${post.id}`} className="inline-flex items-center font-body font-semibold text-royal-blue hover:text-royal-blue-light transition-colors duration-300 text-sm">
                      {t("read_more")}
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterBlog />
    </main>
  )
}
