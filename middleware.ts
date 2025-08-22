import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)

    const nonce = crypto.randomUUID()

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // Security headers
    const securityHeaders = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Server': '',
        'X-DNS-Prefetch-Control': 'off',
        'X-Download-Options': 'noopen',
        'Content-Security-Policy': [
            "default-src 'self'",
            `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com`,
            `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
            "img-src 'self' data: blob: https:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.anthropic.com",
            "media-src 'self' data: blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self' https://formsubmit.co",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
        ].join('; ')
    }

    // Aplica os headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    // Bloqueio de requests suspeitas
    const userAgent = request.headers.get('user-agent') || ''
    const suspiciousPatterns = [/bot/i, /crawler/i, /scraper/i, /spider/i]
    const legitimateBots = [
        /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i,
        /baiduspider/i, /yandexbot/i, /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i
    ]

    const isSuspicious = suspiciousPatterns.some(p => p.test(userAgent)) &&
        !legitimateBots.some(p => p.test(userAgent))

    if (isSuspicious) {
        console.log(`Suspicious request blocked: ${userAgent}`)
        return new NextResponse('Access Denied', { status: 403 })
    }

    // Rate limiting para APIs
    if (request.nextUrl.pathname.startsWith('/api/')) {
        response.headers.set('X-RateLimit-Limit', '100')
        response.headers.set('X-RateLimit-Remaining', '99')
        response.headers.set('X-RateLimit-Reset', String(Date.now() + 60000))
    }

    // CORS para APIs
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin')
        const allowedOrigins = [
            'https://vhs4.dev',
            'https://www.vhs4.dev',
            ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
        ]
        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin)
        } else {
            response.headers.set('Access-Control-Allow-Origin', 'https://vhs4.dev')
        }
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.set('Access-Control-Max-Age', '86400')
    }

    // Preflight
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: response.headers })
    }

    // Bloqueio de arquivos sensíveis
    const sensitiveFiles = [
        '/.env', '/.env.local', '/.env.production',
        '/package.json', '/package-lock.json', '/yarn.lock',
        '/.git', '/node_modules', '/README.md', '/next.config.js',
        '/middleware.ts'
    ]
    if (sensitiveFiles.some(f => request.nextUrl.pathname.startsWith(f))) {
        return new NextResponse('Not Found', { status: 404 })
    }

    // Request ID para rastreio
    response.headers.set('X-Request-ID', crypto.randomUUID())

    // Passa o nonce para o front via header
    response.headers.set('Content-Security-Policy-Nonce', nonce)

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
