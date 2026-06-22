// Definição das cartas: cada par possui o mesmo 'id'
const cardsData = [
    { id: 1, text: "Deepfake", type: "termo" },
    { id: 1, text: "Vídeo ou áudio manipulado por IA realista.", type: "def" },
    
    { id: 2, text: "Fake News", type: "termo" },
    { id: 2, text: "Notícias falsas geradas em massa para enganar.", type: "def" },
    
    { id: 3, text: "Checagem de Fatos", type: "termo" },
    { id: 3, text: "Verificar fontes em sites especializados antes de compartilhar.", type: "def" },
    
    { id: 4, text: "Cidadania Digital", type: "termo" },
    { id: 4, text: "Uso consciente, ético e seguro da tecnologia.", type: "def" }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');

// 1. Função para embaralhar as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 2. Inicializar o tabuleiro
function createBoard() {
    const shuffledCards = shuffle([...cardsData]);
    
    shuffledCards.forEach(data => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = data.id;
        // Inicialmente mostra um ponto de interrogação
        cardElement.textContent = "🔍"; 
        cardElement.dataset.textContent = data.text; // Guarda o texto real escondido
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// 3. Lógica de virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.textContent; // Mostra o texto informativo

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

// 4. Verificação de Pares
function checkMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Se acertou
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    resetTurn();
}

// Se errou (as cartas viram de volta após 1.5 segundos)
function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = "🔍";
        secondCard.textContent = "🔍";
        
        resetTurn();
    }, 1500);
}

// Reseta as variáveis do turno atual
function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Inicia o jogo ao carregar a página
createBoard();
