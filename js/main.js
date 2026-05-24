/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal da Interface e Interações
   ========================================== */

// --- 1. Lógica das Saudações (Mantida) ---
const nomeUsuario = "Michel";
const saudacoes = [
    "O que vamos construir hoje?",
    "O que está pensando?",
    "Como posso ajudar?",
    "Qual o foco de hoje?",
    "O que precisa?",
    "Vamos construir"
];

function iniciarPainel() {
    const elementoSaudacao = document.querySelector('.saudacao');
    if (elementoSaudacao) {
        const indiceAleatorio = Math.floor(Math.random() * saudacoes.length);
        elementoSaudacao.textContent = saudacoes[indiceAleatorio];
    }
}

// --- 2. Lógica dos Novos Botões (Descobrir e Biblioteca) ---

// Função: Descobrir (Clima e GNews)
function abrirDescobrir() {
    console.log("Consultando API de Clima e Notícias...");
    alert("Carregando Painel de Notícias e Clima...");
}

// Função: Biblioteca (Histórico e Snippets/Etiquetas)
function abrirBiblioteca() {
    console.log("Abrindo histórico e biblioteca de blocos...");
    alert("Abrindo Biblioteca: Histórico de Chats e Blocos Reutilizáveis.");
}

// --- 3. Execução Inicial ---
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();
});
