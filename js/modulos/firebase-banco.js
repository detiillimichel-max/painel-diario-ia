// ==========================================
// FICHEIRO: js/modulos/firebase-banco.js
// MÓDULO ISOLADO: Gestão de Saldo e Créditos (Firestore)
// ==========================================

import { appFirebase } from "./firebase-config.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Inicializa o banco de dados de forma segura
let db;
try {
    if (appFirebase) {
        db = getFirestore(appFirebase);
    }
} catch (erro) {
    console.error("Não foi possível inicializar o Firestore isoladamente:", erro);
}

/**
 * Escuta o saldo do usuário em tempo real.
 * Se o saldo mudar no banco (após um PIX), a interface atualiza instantaneamente.
 * @param {string} usuarioId - Identificador único do usuário
 * @param {function} callbackSucesso - Função que atualiza a tela com o novo saldo
 */
export function monitorarSaldoUsuario(usuarioId, callbackSucesso) {
    // Trava de segurança: se o Firebase não estiver pronto, assume saldo 0 e não trava o app
    if (!db || !usuarioId) {
        console.warn("Firebase offline ou ID ausente. Operando em modo de cota local.");
        callbackSucesso(0);
        return;
    }

    try {
        // Aponta para o documento do usuário dentro da coleção 'usuarios_creditos'
        const docRef = doc(db, "usuarios_creditos", usuarioId);

        // O 'onSnapshot' vigia o banco. Mudou lá, ele executa aqui na hora!
        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const dados = docSnap.data();
                // Se encontrar o campo 'creditos', passa o valor, senão passa 0
                callbackSucesso(dados.creditos || 0);
            } else {
                // Usuário novo ou sem registro ainda
                callbackSucesso(0);
            }
        }, (erro) => {
            console.error("Erro ao escutar saldo em tempo real:", erro);
            callbackSucesso(0);
        });

    } catch (erro) {
        console.error("Falha crítica no monitor de saldo:", erro);
        callbackSucesso(0);
    }
}

