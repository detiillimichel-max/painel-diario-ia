// ==========================================
// ARQUIVO: api/audio.js
// MÓDULO INVISÍVEL: Geração de Voz Premium (ElevenLabs)
// ==========================================

export default async function handler(req, res) {
    // Trava de segurança: Aceita apenas pedidos de envio de dados (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    try {
        const { texto } = req.body;
        const apiKey = process.env.ELEVENLABS_API_KEY;

        if (!apiKey) {
            throw new Error("Chave da ElevenLabs ausente no cofre da Vercel.");
        }

        if (!texto) {
            throw new Error("Nenhum texto foi enviado para ser convertido em áudio.");
        }

        // ID da voz premium que você escolheu na ElevenLabs (pode ser alterado depois)
        // Exemplo: 'pNInz6obpgDQGcFmaJgB' (Voz do Adam) ou '21m00Tcm4TlvDq8ikWAM' (Voz da Rachel)
        const vozId = '21m00Tcm4TlvDq8ikWAM'; 
        const urlElevenLabs = `https://api.elevenlabs.io/v1/text-to-speech/${vozId}`;

        // Chamada segura para a API da ElevenLabs
        const respostaAudio = await fetch(urlElevenLabs, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: texto,
                model_id: "eleven_multilingual_v2", // Modelo que fala português com perfeição
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!respostaAudio.ok) {
            const erroDetalhado = await respostaAudio.text();
            throw new Error(`Falha na ElevenLabs: ${erroDetalhado}`);
        }

        // Transforma o arquivo de áudio (Buffer) em texto Base64 para trafegar rápido na internet
        const arrayBuffer = await respostaAudio.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const audioBase64 = buffer.toString('base64');

        // Entrega o áudio pronto para o aplicativo tocar
        res.status(200).json({ 
            sucesso: true, 
            audioBase64: `data:audio/mp3;base64,${audioBase64}` 
        });

    } catch (erro) {
        console.error("Erro no módulo de áudio (ElevenLabs):", erro);
        // Em caso de falha, retorna um erro limpo para que o app continue no modo texto
        res.status(500).json({ 
            sucesso: false, 
            erro: "Não foi possível gerar a voz no momento." 
        });
    }
}
