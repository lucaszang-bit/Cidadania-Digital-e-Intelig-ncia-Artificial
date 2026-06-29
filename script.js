// Dados das cartas (Termos e as Soluções de Segurança correspondentes)
const gameItems = [
    { id: 1, text: "Robôs de Fake News", role: "perigo" },
    { id: 1, text: "Contas automatizadas que espalham boatos.", role: "solucao" },
    
    { id: 2, text: "Deepfake de Áudio", role: "perigo" },
    { id: 2, text: "Voz clonada por IA para aplicar golpes por telefone.", role: "solucao" },
    
    { id: 3, text: "Falta de Fontes", role: "perigo" },
    { id: 3, text: "Sinal clássico de que a notícia pode ser falsa.", role: "solucao" },
    
    { id: 4, text: "Canais Oficiais", role: "perigo" },
    { id: 4, text: "Locais seguros para confirmar se a mídia é real.", role: "solucao" }
];

let cardA = null;
let cardB = null;
let preventClick = false;

const board = document.getElementById('gameBoard');

// Embaralhar elementos
function mixCards(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Renderizar o tabuleiro na tela
function initGame() {
    const mixed = mixCards([...gameItems]);
    
    mixed.forEach(item => {
        const cardNode = document.createElement('div');
        cardNode.classList.add('card');
        cardNode.dataset.id = item.id;
        cardNode.textContent = "🔒"; // Ícone padrão de fechado
        cardNode.dataset.info = item.text; // Guarda o texto secreto
        
        cardNode.addEventListener('click', handleCardClick);
        board.appendChild(cardNode);
    });
}

// Ação do clique
function handleCardClick() {
    if (preventClick) return;
    if (this === cardA) return;
    if (this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.info;

    if (!cardA) {
        cardA = this;
        return;
    }

    cardB = this;
    evaluateMatch();
}

// Verifica se os IDs são iguais
function evaluateMatch() {
    const success = cardA.dataset.id === cardB.dataset.id;

    if (success) {
        lockMatched();
    } else {
        turnBack();
    }
}

// Se acertou o par
function lockMatched() {
    cardA.classList.add('matched');
    cardB.classList.add('matched');
    clearSelection();
}

// Se errou o par
function turnBack() {
    preventClick = true;
    
    setTimeout(() => {
        cardA.classList.remove('flipped');
        cardB.classList.remove('flipped');
        cardA.textContent = "🔒";
        cardB.textContent = "🔒";
        clearSelection();
    }, 1200); // 1.2 segundos para memorizar
}

// Limpa a seleção do turno
function clearSelection() {
    [cardA, cardB] = [null, null];
    preventClick = false;
}

// Executa a inicialização
initGame();
