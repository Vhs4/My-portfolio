"use client"

import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { useEffect, useState } from "react";

export function isMenuOpenFunction() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return { isMenuOpen, toggleMenu, closeMenu };
}

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

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

    return { scrollProgress }
}

export default function MarkdownRenderer({ content }: { content: string }) {
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