/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal da Interface e Interações
   ========================================== */

// --- 1. Lógica das Saudações ---
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

// --- 2. Lógica dos Botões (Funcionalidades Locais) ---

// Função: Descobrir (Simulação de Acesso ao Clima e Notícias)
function abrirDescobrir() {
    console.log("Acessando painel de clima e notícias...");
    alert("Painel: Clima atual e Notícias do GNews carregados.");
}

// Função: Biblioteca (Histórico e Blocos Organizados)
function abrirBiblioteca() {
    console.log("Abrindo histórico e biblioteca de blocos...");
    alert("Biblioteca: Histórico de chats e seus blocos salvos organizados por etiquetas.");
}

// --- 3. Execução Inicial ---
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();
});
