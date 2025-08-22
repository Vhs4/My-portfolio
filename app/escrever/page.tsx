"use client"

import { useState } from "react";

export default function Conversor() {
    const [markdown, setMarkdown] = useState("");
    const [id, setId] = useState("meu-post");
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [imagem, setImagem] = useState("/capa.webp");
    const [autor, setAutor] = useState("Autor Aqui");
    const [dataPublicacao, setDataPublicacao] = useState("2025-08-21");
    const [tempoLeitura, setTempoLeitura] = useState("10 min");
    const [categoria, setCategoria] = useState("");
    const [tags, setTags] = useState("");
    const [featured, setFeatured] = useState(false);
    const [output, setOutput] = useState("");

    const gerarObjetos = () => {
        // Escapa crases
        const escapedMarkdown = markdown.replace(/`/g, "\\`");

        const tagArray = tags.split(",").map((t) => t.trim());

        const heroData = `export const postHeroData = {
  id: "${id}",
  titulo: "${titulo}",
  resumo: "${resumo}",
  conteudo: "${escapedMarkdown.split("\n")[0]}...",
  imagem: "${imagem}",
  autor: "${autor}",
  dataPublicacao: "${dataPublicacao}",
  tempoLeitura: "${tempoLeitura}",
  categoria: "${categoria}",
  tags: ${JSON.stringify(tagArray)},
  featured: ${featured},
}`;

        const post = `export const postPost = {
  id: "${id}",
  titulo: "${titulo}",
  resumo: "${resumo}",
  conteudo: \`${escapedMarkdown}\`,
  imagem: "${imagem}",
  autor: "${autor}",
  dataPublicacao: "${dataPublicacao}",
  tempoLeitura: "${tempoLeitura}",
  categoria: "${categoria}",
  tags: ${JSON.stringify(tagArray)},
  featured: ${featured},
}`;

        setOutput(heroData + "\n\n" + post);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Conversor Markdown → JS Object</h1>
            <div className="grid gap-4 mb-4">
                <input
                    className="border p-2"
                    placeholder="ID do Post"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Resumo"
                    value={resumo}
                    onChange={(e) => setResumo(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Imagem (/capa.webp)"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Data de Publicação"
                    value={dataPublicacao}
                    onChange={(e) => setDataPublicacao(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Tempo de Leitura"
                    value={tempoLeitura}
                    onChange={(e) => setTempoLeitura(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="Tags (separadas por vírgula)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <span>Featured</span>
                </label>
                <textarea
                    className="border p-2 h-40"
                    placeholder="Cole seu Markdown aqui"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
            </div>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={gerarObjetos}
            >
                Gerar Objetos
            </button>
            {output && (
                <pre className="mt-6 p-4 bg-gray-100 overflow-x-auto">{output}</pre>
            )}
        </div>
    );
}
