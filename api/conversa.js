// ==========================================
// ARQUIVO: api/conversa.js
// MÓDULO INVISÍVEL: Motor principal de IA (Groq) e Blindagem de Comportamento
// ==========================================

export default async function handler(req, res) {
    // Trava de segurança: Aceita apenas pedidos de envio de dados (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    try {
        // Recebe a mensagem do usuário e verifica se o modo de voz está ativado
        const { mensagemUsuario, modoVoz } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            throw new Error("Chave da Groq ausente no cofre da Vercel.");
        }

        // 🛡️ O GATILHO DE BLINDAGEM (System Prompt)
        // Define a personalidade de luxo e proíbe terminantemente palavrões
        let regraSistema = "Você é um assistente virtual de alto luxo, elegante, prestativo e estritamente educado. Em nenhuma hipótese, sob nenhuma circunstância, utilize palavrões, termos ofensivos, gírias vulgares ou linguagem chula. Mantenha um tom profissional, acolhedor e sofisticado.";

        // Trava de economia da ElevenLabs (Respostas curtas se estiver falando)
        if (modoVoz) {
            regraSistema += " O usuário está se comunicando por voz. Responda de forma muito direta, conversacional e curta (máximo de 2 frases) para otimizar o tempo de resposta e economizar caracteres gerados.";
        }

        // Chamada segura para a API da Groq (usando Llama 3)
        const respostaGroq = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Modelo ultrarrápido da Meta
                messages: [
                    { role: "system", content: regraSistema },
                    { role: "user", content: mensagemUsuario }
                ],
                temperature: 0.7, // Mantém a IA inteligente, mas sem perder a elegância e o foco
            })
        });

        const dados = await respostaGroq.json();

        // Se a Groq retornar erro, aciona a trava de segurança
        if (dados.error) {
            throw new Error(dados.error.message);
        }

        // Extrai apenas o texto limpo gerado pela inteligência artificial
        const respostaTexto = dados.choices[0].message.content;

        // Entrega a resposta processada de volta para o aplicativo
        res.status(200).json({ sucesso: true, resposta: respostaTexto });

    } catch (erro) {
        console.error("Erro no motor de conversa (Groq):", erro);
        // Em caso de falha, o app não quebra. Retorna uma mensagem educada.
        res.status(500).json({ 
            sucesso: false, 
            resposta: "Desculpe, a minha conexão foi interrompida momentaneamente. Podemos tentar novamente?" 
        });
    }
}

