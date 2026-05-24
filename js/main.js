/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal da Interface e Interações
   ========================================== */

// Nome do usuário logado no sistema
const nomeUsuario = "Michel";

// Lista com os 6 tipos de dizeres solicitados
const saudacoes = [
    "O que vamos construir hoje?",
    "O que está pensando?",
    "Como posso ajudar?",
    "Qual o foco de hoje?",
    `${nomeUsuario}, o que precisa?`,
    "Vamos construir"
];

// Função que sorteia e aplica a saudação
function iniciarPainel() {
    const elementoSaudacao = document.querySelector('.saudacao');
    
    if (elementoSaudacao) {
        // Gera um número aleatório de 0 a 5
        const indiceAleatorio = Math.floor(Math.random() * saudacoes.length);
        // Aplica o texto sorteado na tela
        elementoSaudacao.textContent = saudacoes[indiceAleatorio];
    }
}

// Executa a função assim que o aplicativo terminar de carregar a tela
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();
});
