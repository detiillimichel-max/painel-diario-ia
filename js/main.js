/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal, Interações e Persistência de Dados
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

// --- 2. Lógica de Envio e Persistência ---

function salvarMensagem(texto) {
    let historico = JSON.parse(localStorage.getItem('chatHistorico')) || [];
    historico.push({ mensagem: texto, data: new Date().toISOString() });
    localStorage.setItem('chatHistorico', JSON.stringify(historico));
}

function enviarMensagem() {
    const input = document.getElementById('entradaUsuario');
    const valor = input.value.trim();
    
    if (valor !== "") {
        // Salva na memória do navegador
        salvarMensagem(valor);
        
        console.log("Mensagem salva e enviada:", valor);
        alert("Enviado e salvo: " + valor);
        
        input.value = ""; // Limpa o campo
    }
}

// --- 3. Lógica dos Botões (Descobrir e Biblioteca) ---

function abrirDescobrir() {
    console.log("Acessando painel de clima...");
    alert("Painel: Clima atual carregado.");
}

function abrirBiblioteca() {
    // Recupera o histórico salvo
    const historico = JSON.parse(localStorage.getItem('chatHistorico')) || [];
    console.log("Abrindo histórico...", historico);
    
    let lista = historico.map(h => h.mensagem).join('\n');
    alert("Seu Histórico:\n" + (lista || "Nenhuma mensagem salva."));
}

// --- 4. Execução Inicial e Eventos ---
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();

    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarMensagem);
    }

    const input = document.getElementById('entradaUsuario');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarMensagem();
        });
    }
});
