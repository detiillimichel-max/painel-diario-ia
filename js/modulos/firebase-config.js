// ==========================================
// FICHEIRO: js/modulos/firebase-config.js
// MÓDULO ISOLADO: Ligação Blindada com o Banco de Dados (Via Vercel)
// ==========================================

// Importação modular direta do Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

let appFirebase;

// Função assíncrona para buscar as configurações no nosso servidor invisível
async function inicializarFirebaseSeguro() {
    try {
        // Pede os dados de ligação à nossa rota segura na Vercel
        const resposta = await fetch('/api/firebase-chaves');
        
        if (!resposta.ok) {
            throw new Error('Falha ao comunicar com o servidor invisível na Vercel.');
        }

        const firebaseConfig = await resposta.json();

        // Inicializa o Firebase com os dados recebidos em segurança
        appFirebase = initializeApp(firebaseConfig);
        console.log("Módulo Firebase: Ligado com sucesso via Vercel.");

    } catch (erro) {
        // A falha fica isolada aqui. O painel não encrava.
        console.error("Falha isolada no Firebase. A operar apenas no modo local:", erro);
    }
}

// Executa a blindagem
inicializarFirebaseSeguro();

export { appFirebase };

