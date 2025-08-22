"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const NewsletterBlog = ({ text, subtext }: { text?: string, subtext?: string }) => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setMessage('Por favor, insira um email válido.')
            setStatus('error')
            return
        }

        setStatus('loading')

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage('Obrigado! Você se inscreveu com sucesso na minha newsletter.')
                setEmail('')
            } else {
                setStatus('error')
                setMessage(data.error || 'Ocorreu um erro. Tente novamente.')
            }
        } catch (error) {
            setStatus('error')
            setMessage('Erro de conexão. Verifique sua internet e tente novamente.')
        }

        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            setStatus('idle')
            setMessage('')
        }, 5000)
    }

    return (
        <section className="py-16 px-6 bg-royal-blue text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">{text || "Não Perca Nenhum Artigo"}</h2>
                <p className="font-body text-xl mb-8 opacity-90">
                    {subtext || "Receba os melhores conteúdos sobre desenvolvimento diretamente no seu email."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                    <Input
                        type="email"
                        placeholder="Seu melhor email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                        className="bg-white text-black border-0 h-12 disabled:opacity-50"
                        required
                    />
                    <Button
                        type="submit"
                        size="lg"
                        disabled={status === 'loading'}
                        className="bg-white text-royal-blue hover:bg-gray-100 h-12 px-8 disabled:opacity-50 cursor-pointer"
                    >
                        {status === 'loading' ? (
                            <span className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal-blue" />
                                Inscrevendo...
                            </span>
                        ) : (
                            'Inscrever-se'
                        )}
                    </Button>
                </form>

                {message && (
                    <div className={`inline-block px-4 py-2 rounded-lg text-sm ${status === 'success'
                        ? 'bg-green-500 text-green-100 border border-green-500/30'
                        : 'bg-red-500/20 text-red-100 border border-red-500/30'
                        }`}>
                        {message}
                    </div>
                )}
            </div>
        </section>
    )
}

export default NewsletterBlog