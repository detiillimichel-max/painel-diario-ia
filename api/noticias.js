// ==========================================
// ARQUIVO: api/noticias.js
// MÓDULO INVISÍVEL: Busca segura de notícias do dia (GNews)
// ==========================================

export default async function handler(req, res) {
    // Trava de segurança: Aceita apenas pedidos de leitura (GET)
    if (req.method !== 'GET') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    try {
        // Resgata a chave da GNews do cofre da Vercel
        const apiKey = process.env.GNEWS_API_KEY;
        
        if (!apiKey) {
            throw new Error("Chave da GNews ausente no cofre.");
        }

        // Monta a URL da API buscando as 3 principais notícias gerais do Brasil em Português
        const urlBusca = `https://gnews.io/api/v4/top-headlines?category=general&lang=pt&country=br&max=3&apikey=${apiKey}`;

        // Faz a requisição para o servidor da GNews
        const resposta = await fetch(urlBusca);
        const dados = await resposta.json();

        // Se a API da GNews retornar algum erro interno, barramos aqui
        if (dados.errors) {
            throw new Error(dados.errors[0]);
        }

        // Filtra apenas o título e a descrição limpa para economizar o consumo da Groq/ElevenLabs
        const noticiasFiltradas = dados.articles.map(noticia => ({
            titulo: noticia.title,
            resumo: noticia.description
        }));

        // Entrega as notícias prontas e limpas para o aplicativo
        res.status(200).json({ sucesso: true, noticias: noticiasFiltradas });
        
    } catch (erro) {
        console.error("Erro no módulo de notícias:", erro);
        // Em caso de falha na GNews, o app não quebra. Apenas avisa que o jornal não chegou.
        res.status(200).json({ 
            sucesso: false, 
            mensagem: "As notícias não estão disponíveis no momento." 
        });
    }
}

