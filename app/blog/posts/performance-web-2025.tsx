export const performanceWeb2025HeroData = {
  id: "performance-web-2025",
  titulo: "Otimização de Performance Web: Técnicas Essenciais para 2025",
  resumo:
    "Guia prático com as melhores técnicas de otimização de performance para criar aplicações web ultra-rápidas.",
  conteudo: "Conteúdo completo do post...",
  imagem: "/performance-capa.webp",
  autor: "Victor Hugo",
  dataPublicacao: "2025-08-21",
  tempoLeitura: "18 min",
  categoria: "Performance",
  tags: ["Performance", "Otimização", "Web", "UX"],
  featured: false,
}

export const performanceWeb2025Post = {
  id: "performance-web-2025",
  titulo: "Otimização de Performance Web: Técnicas Essenciais para 2025",
  resumo:
    "Guia prático com as melhores técnicas de otimização de performance para criar aplicações web ultra-rápidas.",
  conteudo: `# Otimização de Performance Web: Técnicas Essenciais para 2025

A performance web não é mais um detalhe – é um fator decisivo para o sucesso de qualquer aplicação.  
Sites rápidos melhoram SEO, retenção de usuários e a experiência geral.  
Aqui estão técnicas detalhadas para manter seu site ou aplicação competitivo em 2025.

## Core Web Vitals

Os **Core Web Vitals** são métricas oficiais do Google que medem a experiência do usuário em seu site.  
Elas ajudam a entender quão rápido e estável sua página é para visitantes reais.

### Largest Contentful Paint (LCP)
O LCP mede quanto tempo leva para o maior elemento visível na tela ser carregado.  
- **Meta**: < 2.5 segundos  
- **Otimizações**:
  - Otimize imagens e vídeos, reduzindo tamanho e usando formatos modernos.
  - Use CDN para servir recursos estáticos rapidamente.
  - Implemente *lazy loading* para carregar imagens apenas quando visíveis.

### First Input Delay (FID)
O FID mede o tempo de resposta do site à primeira interação do usuário (clique, scroll ou toque).  
- **Meta**: < 100 ms  
- **Otimizações**:
  - Minimize JavaScript bloqueante, evitando scripts pesados na primeira carga.
  - Use Web Workers para processar tarefas em background.
  - Implemente *code splitting* para carregar apenas o necessário inicialmente.

### Cumulative Layout Shift (CLS)
O CLS mede a estabilidade visual da página — quanto os elementos se movem durante o carregamento.  
- **Meta**: < 0.1  
- **Otimizações**:
  - Defina dimensões fixas para imagens e vídeos.
  - Reserve espaço para anúncios ou banners dinâmicos.
  - Use \`font-display: swap\` para evitar mudanças de layout durante o carregamento das fontes.

## Otimização de Imagens

![Otimização Web](/otimizacao-blog.webp)

Imagens são responsáveis por grande parte do peso de uma página. Otimizá-las melhora velocidade e Core Web Vitals.

### Formatos Modernos
Use formatos mais leves, como WebP ou AVIF, que preservam qualidade com menor tamanho.
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`

### Imagens Responsivas
Carregue imagens adequadas ao tamanho de tela do usuário para economizar largura de banda.
\`\`\`html
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 25vw"
  src="medium.jpg" 
  alt="Description"
/>
\`\`\`

## JavaScript Performance

O JavaScript pesado pode bloquear a interação do usuário. Técnicas de otimização ajudam a reduzir atraso e tamanho do bundle.

### Code Splitting
Divida o código em pedaços menores e carregue apenas o necessário.
\`\`\`javascript
const LazyComponent = lazy(() => import('./LazyComponent'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
\`\`\`

### Tree Shaking
Remova código não utilizado ao importar apenas funções necessárias.
\`\`\`javascript
import { debounce } from 'lodash'
\`\`\`

## CSS Optimization

CSS também impacta performance e renderização. Carregar apenas o necessário melhora o LCP e FID.

### Critical CSS
Inclua o CSS essencial inline para renderização imediata.
\`\`\`html
<style>
  .header { display: flex; }
</style>
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
\`\`\`

### CSS Containment
Use \`contain\` para limitar o impacto de renderização de componentes pesados.
\`\`\`css
.component {
  contain: layout style paint;
}
\`\`\`

## Caching Strategies

O cache ajuda o navegador a reutilizar recursos, melhorando carregamento e reduzindo requests.

### Service Workers
Permitem interceptar requisições e fornecer conteúdo em cache de forma inteligente.
\`\`\`javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})
\`\`\`

### HTTP Caching
Configurações de cabeçalho que instruem o navegador a armazenar arquivos por mais tempo.
\`\`\`
Cache-Control: public, max-age=31536000, immutable
\`\`\`

## Resource Hints

Pré-carregamento e prefetch ajudam a reduzir tempo de espera do usuário.

### Preload Critical Resources
Carrega fontes e imagens essenciais primeiro.
\`\`\`html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero.jpg" as="image">
\`\`\`

### Prefetch Future Resources
Antecipe recursos de páginas que o usuário provavelmente acessará depois.
\`\`\`html
<link rel="prefetch" href="next-page.html">
<link rel="dns-prefetch" href="//external-api.com">
\`\`\`

## Database Optimization

Consultas mal otimizadas atrasam o carregamento de dados em aplicações dinâmicas.

### Query Optimization
- Use índices apropriados para acelerar buscas.
- Evite N+1 queries que geram múltiplas consultas desnecessárias.
- Implemente paginação em tabelas grandes.
- Use connection pooling para gerenciar conexões de forma eficiente.

### Caching de Dados
Armazene resultados em cache para reduzir consultas repetidas.
\`\`\`javascript
const cachedData = await redis.get(key)
if (cachedData) return JSON.parse(cachedData)

const data = await database.query()
await redis.setex(key, 3600, JSON.stringify(data))
return data
\`\`\`

## Monitoring e Métricas

Medir performance em tempo real permite ajustes contínuos e prevenção de problemas.

### Real User Monitoring (RUM)
Rastreia métricas de usuários reais, como LCP, FID e CLS.
\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
\`\`\`

### Performance API
Permite medir métricas customizadas para tarefas específicas.
\`\`\`javascript
performance.mark('start-heavy-task')
await heavyTask()
performance.mark('end-heavy-task')
performance.measure('heavy-task', 'start-heavy-task', 'end-heavy-task')
\`\`\`

## Ferramentas Essenciais

### Análise
- **Lighthouse**: Auditoria completa
- **WebPageTest**: Testes detalhados de performance
- **Chrome DevTools**: Debugging e inspeção de performance
- **Bundle Analyzer**: Identificação de código pesado

### Monitoramento
- **Core Web Vitals**: Google Search Console
- **Real User Monitoring**: Sentry, DataDog
- **Synthetic Monitoring**: Pingdom, GTmetrix

## Checklist de Performance

### ✅ Imagens
- [ ] Formatos modernos (WebP, AVIF)
- [ ] Lazy loading implementado
- [ ] Dimensões definidas
- [ ] Compressão otimizada

### ✅ JavaScript
- [ ] Code splitting ativo
- [ ] Tree shaking configurado
- [ ] Bundles < 250KB
- [ ] Service Worker implementado

### ✅ CSS
- [ ] Critical CSS inline
- [ ] CSS não-crítico carregado async
- [ ] Unused CSS removido
- [ ] CSS minificado

### ✅ Caching
- [ ] HTTP caching configurado
- [ ] CDN implementado
- [ ] Service Worker ativo
- [ ] Database caching ativo

## Conclusão

Performance web é um processo contínuo. Monitore, teste e otimize incrementalmente.  
Sites rápidos geram melhor experiência e retenção, beneficiando tanto usuários quanto SEO.`,
  imagem: "/performance-capa.webp",
  autor: "Victor Hugo",
  dataPublicacao: "2025-08-21",
  tempoLeitura: "18 min",
  categoria: "Performance",
  tags: ["Performance", "Otimização", "Web", "UX"],
  featured: false,
}
