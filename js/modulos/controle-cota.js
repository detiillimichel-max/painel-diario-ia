// ==========================================
// ARQUIVO: js/modulos/controle-cota.js
// MÓDULO ISOLADO: Gerenciador de Limite Diário (Modo Claude)
// ==========================================

const CONFIG_COTA = {
    limiteDiario: 5, // Número máximo de vezes que a voz premium será usada por dia
    chaveArmazenamento: 'painel_uso_voz_premium',
    chaveData: 'painel_data_uso'
};

// Função para verificar se a cota premium ainda está disponível
export function verificarCotaPremium() {
    try {
        const hoje = new Date().toLocaleDateString('pt-BR');
        const dataSalva = localStorage.getItem(CONFIG_COTA.chaveData);
        let usoAtual = parseInt(localStorage.getItem(CONFIG_COTA.chaveArmazenamento)) || 0;

        // Se mudou o dia, reseta o contador para zero
        if (dataSalva !== hoje) {
            localStorage.setItem(CONFIG_COTA.chaveData, hoje);
            localStorage.setItem(CONFIG_COTA.chaveArmazenamento, '0');
            usoAtual = 0;
        }

        // Retorna verdadeiro se ainda tiver cota, falso se acabou
        return usoAtual < CONFIG_COTA.limiteDiario;

    } catch (erro) {
        console.error("Erro no módulo de cota. Retornando ao modo texto por segurança:", erro);
        // Em caso de erro no navegador, bloqueia a voz premium para proteger os créditos
        return false; 
    }
}

// Função para registrar o uso toda vez que a voz premium for ativada
export function registrarUsoPremium() {
    try {
        let usoAtual = parseInt(localStorage.getItem(CONFIG_COTA.chaveArmazenamento)) || 0;
        localStorage.setItem(CONFIG_COTA.chaveArmazenamento, (usoAtual + 1).toString());
    } catch (erro) {
        console.warn("Não foi possível registrar o uso no armazenamento local.");
    }
}

