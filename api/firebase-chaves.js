// ==========================================
// ARQUIVO: api/firebase-chaves.js
// MÓDULO INVISÍVEL: Entrega segura das chaves públicas do Firebase
// ==========================================

export default function handler(req, res) {
    // Trava de segurança: Aceita apenas pedidos de leitura (GET)
    if (req.method !== 'GET') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    try {
        // O servidor da Vercel monta o pacote pegando os dados do cofre secreto (Variáveis de Ambiente)
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        };

        // Entrega o pacote pronto para o aplicativo (sem expor as chaves no código-fonte)
        res.status(200).json(firebaseConfig);
        
    } catch (erro) {
        console.error("Erro ao resgatar chaves do cofre da Vercel:", erro);
        // Em caso de falha, retorna um erro limpo, sem vazar a estrutura do servidor
        res.status(500).json({ erro: 'Falha interna na rota de chaves' });
    }
}
