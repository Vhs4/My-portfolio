import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import ProjectCalculatorChatbot from "@/components/calculator-with-chatbot"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Victor Hugo - Desenvolvedor Full Stack | Portfólio & Blog",
  description:
    "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do NASA Space Apps Challenge. Transformo ideias em experiências digitais que impactam milhares de pessoas.",
  keywords:
    "victor hugo, desenvolvedor full stack, react, nextjs, nodejs, portfolio, blog, javascript, typescript, nasa space apps, aws certified, fully app",
  icons: {
    icon: "/fotoperfil.webp",
    shortcut: "/fotoperfil.webp",
  },
  authors: [{ name: "Victor Hugo" }],
  creator: "Victor Hugo",
  publisher: "Victor Hugo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vhs4.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vhs4.dev",
    title: "Victor Hugo - Desenvolvedor Full Stack",
    description: "liderei o time campeão regional do NASA Space Apps Challenge aos 18 anos. Código que transforma o futuro.",
    siteName: "Victor Hugo Portfolio",
    images: [
      {
        url: "/fotoperfil.webp",
        width: 1200,
        height: 630,
        alt: "Victor Hugo - Desenvolvedor Full Stack",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  generator: 'v0.app',
  // Additional security metadata
  other: {
    'referrer': 'strict-origin-when-cross-origin',
    'format-detection': 'telephone=no',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
        {/* Security Meta Tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Prevent DNS prefetching for security */}
        <meta httpEquiv="x-dns-prefetch-control" content="off" />

        {/* Permissions Policy */}
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()"
        />

        {/* Preload critical resources securely */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          as="style"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          as="style"
          crossOrigin="anonymous"
        />

        {/* Structured Data with Security Context */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Victor Hugo",
              jobTitle: "Desenvolvedor Full Stack",
              description:
                "Desenvolvedor Full Stack de 20 anos, liderei o time campeão regional do NASA Space Apps Challenge e especialista em transformar ideias em soluções tecnológicas de impacto global.",
              url: "https://vhs4.dev",
              sameAs: [
                "https://github.com/victorhugo",
                "https://linkedin.com/in/victorhugo",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressCountry: "BR",
              },
              email: "contato@vhs4.dev",
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "AWS",
                "React Native",
                "Full Stack Development",
                "Machine Learning",
                "Space Technology",
                "Web Security",
                "Performance Optimization",
              ],
              securityContact: "security@vhs4.dev",
            }),
          }}
        />

        <link rel="canonical" href="https://vhs4.dev" />
      </head>

      <body className="font-sans">
        {/* Security notice for developers */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '5px 10px',
            fontSize: '12px',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}>
            DEV MODE - Security headers active
          </div>
        )}

        {children}
        <ProjectCalculatorChatbot />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic security monitoring
              (function() {
                // Monitor for console access attempts
                let consoleWarning = false;
                Object.defineProperty(console, '_commandLineAPI', {
                  get: function() {
                    if (!consoleWarning) {
                      console.warn('🚨 Console access detected. This site is protected.');
                      consoleWarning = true;
                    }
                    return undefined;
                  }
                });

                // Monitor for DevTools
                let devtools = false;
                setInterval(function() {
                  if (window.outerHeight - window.innerHeight > 200 || 
                      window.outerWidth - window.innerWidth > 200) {
                    if (!devtools) {
                      console.warn('🔧 Developer tools detected.');
                      devtools = true;
                    }
                  } else {
                    devtools = false;
                  }
                }, 500);

                // Disable common key combinations
                document.addEventListener('keydown', function(e) {
                  // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
                  if (e.key === 'F12' || 
                      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                      (e.ctrlKey && e.key === 'u') ||
                      (e.ctrlKey && e.key === 's')) {
                    e.preventDefault();
                    return false;
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}