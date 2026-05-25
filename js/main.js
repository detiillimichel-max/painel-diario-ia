/* ==========================================
   FICHEIRO: js/main.js
   MÓDULO: Controle principal, Interações e Lógica de Envio
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

// --- 2. Lógica de Envio (Acréscimo do Botão) ---

function enviarMensagem() {
    const input = document.getElementById('entradaUsuario');
    const valor = input.value.trim();
    
    if (valor !== "") {
        console.log("Mensagem enviada:", valor);
        // Aqui entra a lógica futura de processamento da IA
        alert("Enviado: " + valor);
        input.value = ""; // Limpa o campo após o envio
    }
}

// --- 3. Lógica dos Botões (Descobrir e Biblioteca) ---

function abrirDescobrir() {
    console.log("Acessando painel de clima...");
    alert("Painel: Clima atual carregado.");
}

function abrirBiblioteca() {
    console.log("Abrindo histórico...");
    alert("Biblioteca: Histórico e Snippets acessados.");
}

// --- 4. Execução Inicial e Eventos ---
document.addEventListener('DOMContentLoaded', () => {
    iniciarPainel();

    // Adiciona evento de clique ao botão de envio que acrescentamos no HTML
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarMensagem);
    }

    // Permite enviar ao apertar a tecla "Enter"
    const input = document.getElementById('entradaUsuario');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarMensagem();
        });
    }
});
