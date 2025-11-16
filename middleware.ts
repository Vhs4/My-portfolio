import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)

    // Create the response
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // Security headers (additional layer to next.config.js)
    const securityHeaders = {
        // Prevent MIME type sniffing
        'X-Content-Type-Options': 'nosniff',

        // Prevent clickjacking
        'X-Frame-Options': 'DENY',

        // XSS Protection (legacy but still useful)
        'X-XSS-Protection': '1; mode=block',

        // Referrer Policy
        'Referrer-Policy': 'strict-origin-when-cross-origin',

        // Remove server information
        'Server': '',

        // Prevent DNS prefetching
        'X-DNS-Prefetch-Control': 'off',

        // Prevent download of executables
        'X-Download-Options': 'noopen',

        // Content Security Policy (more restrictive for sensitive pages)
        'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.clarity.ms https://c.clarity.ms https://scripts.clarity.ms https://statics.clarity.ms https://z.clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https: https://www.clarity.ms https://c.clarity.ms https://scripts.clarity.ms https://statics.clarity.ms https://z.clarity.ms",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.anthropic.com https://www.clarity.ms https://c.clarity.ms https://scripts.clarity.ms https://statics.clarity.ms https://z.clarity.ms",
            "media-src 'self' data: blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self' https://formsubmit.co",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
        ].join('; ')
    }

    // Apply security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    // Additional security checks
    const userAgent = request.headers.get('user-agent') || ''
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const host = request.headers.get('host')

    // Block suspicious requests
    const suspiciousPatterns = [
        /bot/i,
        /crawler/i,
        /scraper/i,
        /spider/i,
    ]

    // Allow legitimate bots (Google, Bing, etc.)
    const legitimateBots = [
        /googlebot/i,
        /bingbot/i,
        /slurp/i,
        /duckduckbot/i,
        /baiduspider/i,
        /yandexbot/i,
        /facebookexternalhit/i,
        /twitterbot/i,
        /linkedinbot/i,
    ]

    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent)) &&
        !legitimateBots.some(pattern => pattern.test(userAgent))

    if (isSuspicious) {
        console.log(`Suspicious request blocked: ${userAgent}`)
        return new NextResponse('Access Denied', { status: 403 })
    }

    // Rate limiting headers for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        response.headers.set('X-RateLimit-Limit', '100')
        response.headers.set('X-RateLimit-Remaining', '99')
        response.headers.set('X-RateLimit-Reset', String(Date.now() + 60000))
    }

    // CORS headers for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
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

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: response.headers })
    }

    // Block access to sensitive files
    const sensitiveFiles = [
        '/.env',
        '/.env.local',
        '/.env.production',
        '/package.json',
        '/package-lock.json',
        '/yarn.lock',
        '/.git',
        '/node_modules',
        '/README.md',
        '/next.config.js',
        '/middleware.ts'
    ]

    if (sensitiveFiles.some(file => request.nextUrl.pathname.startsWith(file))) {
        return new NextResponse('Not Found', { status: 404 })
    }

    // Add request ID for tracking
    response.headers.set('X-Request-ID', crypto.randomUUID())

    return response
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}