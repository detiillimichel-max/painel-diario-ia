/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal, Chat Dinâmico e Persistência
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
    const elementoSaudacao = document.getElementById('saudacao');
    if (elementoSaudacao) {
        const indiceAleatorio = Math.floor(Math.random() * saudacoes.length);
        elementoSaudacao.textContent = saudacoes[indiceAleatorio];
    }
}

// --- 2. Lógica de Chat e Persistência ---

function adicionarBalaoNaTela(texto, classe) {
    const container = document.getElementById('mensagensHistorico');
    const balao = document.createElement('div');
    balao.className = `balao-mensagem ${classe}`;
    balao.textContent = texto;
    container.appendChild(balao);
    
    // Rola para a mensagem mais recente
    const areaChat = document.getElementById('areaChat');
    areaChat.scrollTop = areaChat.scrollHeight;
}

function salvarMensagem(texto) {
    let historico = JSON.parse(localStorage.getItem('chatHistorico')) || [];
    historico.push({ mensagem: texto, data: new Date().toISOString() });
    localStorage.setItem('chatHistorico', JSON.stringify(historico));
}

function enviarMensagem() {
    const input = document.getElementById('entradaUsuario');
    const valor = input.value.trim();
    
    if (valor !== "") {
        // 1. Esconde a saudação inicial se for a primeira mensagem
        const saudacao = document.getElementById('saudacao');
        if (saudacao) saudacao.style.display = 'none';

        // 2. Adiciona na tela e salva
        adicionarBalaoNaTela(valor, 'mensagem-usuario');
        salvarMensagem(valor);
        
        input.value = ""; // Limpa o campo
    }
}

// --- 3. Lógica dos Botões ---

function abrirDescobrir() {
    alert("Painel: Clima atual carregado.");
}

function abrirBiblioteca() {
    const historico = JSON.parse(localStorage.getItem('chatHistorico')) || [];
    const container = document.getElementById('mensagensHistorico');
    
    // Limpa a tela e recarrega do histórico
    container.innerHTML = '';
    const saudacao = document.getElementById('saudacao');
    if (saudacao) saudacao.style.display = 'none';
    
    historico.forEach(item => {
        adicionarBalaoNaTela(item.mensagem, 'mensagem-usuario');
    });
}

// --- 4. Execução Inicial ---
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();

    document.getElementById('btnEnviar')?.addEventListener('click', enviarMensagem);
    
    const input = document.getElementById('entradaUsuario');
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
});
