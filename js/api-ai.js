// ==========================================
// ARQUIVO: js/api-ai.js
// MÓDULO ISOLADO: Inteligência Artificial (Groq / Llama)
// ==========================================

const CONFIG_IA = {
    // COLE SUA CHAVE DA GROQ ENTRE AS ASPAS ABAIXO:
    apiKey: 'COLE_SUA_CHAVE_AQUI',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    modelo: 'llama3-8b-8192' // Modelo super rápido e leve da Meta
};

// Função principal e isolada para pedir o resumo à IA
async function gerarResumoIA(dadosClima, dadosNoticias) {
    // Trava de segurança: Se a chave não estiver configurada, o app não quebra
    if (CONFIG_IA.apiKey === 'COLE_SUA_CHAVE_AQUI' || !CONFIG_IA.apiKey) {
        console.warn("Módulo de IA em espera: Chave da Groq não configurada.");
        return "Resumo inteligente indisponível no momento. Configure a chave.";
    }

    const prompt = `Você é um assistente pessoal de luxo, direto e amigável.
    Baseado nestes dados:
    Clima: ${dadosClima}
    Notícias principais: ${dadosNoticias}
    Escreva apenas 1 parágrafo curto de bom dia, unindo o clima e as notícias de forma útil para o usuário. Não use formatações complexas.`;

    try {
        const resposta = await fetch(CONFIG_IA.url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG_IA.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: CONFIG_IA.modelo,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            })
        });

        if (!resposta.ok) {
            throw new Error(`Erro na API Groq: ${resposta.status}`);
        }

        const dados = await resposta.json();
        return dados.choices[0].message.content;

    } catch (erro) {
        // O erro fica isolado aqui, protegendo o restante do projeto
        console.error("Falha contida no módulo de IA:", erro);
        return "Não foi possível conectar ao assistente inteligente agora, mas os dados seguem abaixo.";
    }
}

