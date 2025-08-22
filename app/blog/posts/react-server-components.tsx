export const reactServerComponentsHeroData = {
    id: "react-server-components",
    titulo: "React Server Components: Revolucionando o Desenvolvimento React",
    resumo:
        "Descubra como os React Server Components podem transformar a performance, arquitetura e experiência de desenvolvimento em suas aplicações React.",
    conteudo: "Conteúdo completo do post...",
    imagem: "/react-post.webp",
    autor: "Victor Hugo",
    dataPublicacao: "2025-08-20",
    tempoLeitura: "14 min",
    categoria: "Frontend",
    tags: ["React", "Server Components", "SSR", "Performance"],
    featured: false,
}

export const reactServerComponentsPost = {
    id: "react-server-components",
    titulo: "React Server Components: Revolucionando o Desenvolvimento React",
    resumo:
        "Descubra como os React Server Components podem transformar a performance, arquitetura e experiência de desenvolvimento em suas aplicações React.",
    conteudo: `# React Server Components: Revolucionando o Desenvolvimento React

Os **React Server Components (RSC)** representam uma mudança estratégica na forma como construímos aplicações React. Com eles, podemos renderizar componentes no servidor, melhorar performance, reduzir o bundle do cliente e otimizar SEO sem esforço extra.

---

## O que são Server Components?

Server Components são componentes React que **executam e renderizam no servidor**. Diferente dos Client Components tradicionais, eles não enviam JavaScript desnecessário para o cliente, permitindo:

- **Zero bundle size** no cliente
- **Acesso direto ao backend** (banco de dados, filesystem, APIs)
- **Renderização inicial mais rápida**
- **SEO otimizado automaticamente**

### Exemplo: Client vs Server Component

#### Client Component (tradicional)
\`\`\`jsx
'use client'

import { useState, useEffect } from 'react'

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser)
  }, [userId])

  return <div>{user?.name}</div>
}
\`\`\`

#### Server Component (novo)
\`\`\`jsx
import { db } from './db'

export default async function UserProfile({ userId }) {
  const user = await db.user.findById(userId)

  return <div>{user.name}</div>
}
\`\`\`

---

## Vantagens Principais

### 1. Performance Superior
- Menos JavaScript enviado ao cliente
- Renderização mais rápida no servidor
- Menor tempo de hidratação

### 2. Acesso Direto ao Backend
\`\`\`jsx
import { readFile } from 'fs/promises'
import { db } from './database'

export default async function BlogPost({ slug }) {
  const content = await readFile(\`./posts/\${slug}.md\`, 'utf8')
  const post = await db.posts.findBySlug(slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
\`\`\`

### 3. Melhor Experiência do Desenvolvedor
- Menos boilerplate para data fetching
- Colocação de dados e UI juntos
- TypeScript end-to-end

---

## Combinação de Server e Client Components
É comum usar ambos no mesmo projeto:

\`\`\`jsx
// ServerComponent.jsx
import ClientComponent from './ClientComponent'

export default async function ServerComponent() {
  const data = await fetchData()

  return (
    <div>
      <h1>Server Rendered</h1>
      <ClientComponent data={data} />
    </div>
  )
}

// ClientComponent.jsx
'use client'

import { useState } from 'react'

export default function ClientComponent({ data }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Data: {data}</p>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  )
}
\`\`\`

---

## Streaming e Suspense
Permite carregar partes da UI à medida que os dados chegam:

\`\`\`jsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Minha Página</h1>
      <Suspense fallback={<div>Carregando posts...</div>}>
        <Posts />
      </Suspense>
      <Suspense fallback={<div>Carregando comentários...</div>}>
        <Comments />
      </Suspense>
    </div>
  )
}

async function Posts() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}

async function Comments() {
  const comments = await fetchComments()
  return <CommentList comments={comments} />
}
\`\`\`

---

## Limitações

### O que NÃO funciona
- Hooks do cliente (useState, useEffect)
- Event handlers (onClick, onChange)
- APIs do navegador (localStorage, window)
- Bibliotecas client-side sem adaptação

### Quando usar Client Components
- Para interatividade (botões, formulários)
- Estado local ou efeitos
- APIs do navegador

---

## Estrutura no Next.js 13+

\`\`\`
app/
├── layout.js          # Server Component
├── page.js            # Server Component
├── loading.js         # Server Component
├── error.js           # Client Component
└── components/
    ├── ServerComp.js  # Server Component
    └── ClientComp.js  # Client Component ('use client')
\`\`\`

---

## Migração Gradual
1. Comece com páginas estáticas
2. Migre data fetching para Server Components
3. Identifique componentes interativos para Client Components
4. Otimize bundle size progressivamente

---

## Conclusão
React Server Components oferecem **performance superior**, **melhor experiência de desenvolvimento** e uma **arquitetura mais simples**.  
A adoção gradual é a melhor estratégia: comece simples e evolua para aplicações complexas conforme ganha confiança.
`,
    imagem: "/react-post.webp",
    autor: "Victor Hugo",
    dataPublicacao: "2025-08-20",
    tempoLeitura: "14 min",
    categoria: "Frontend",
    tags: ["React", "Server Components", "SSR", "Performance"],
    featured: false,
}
