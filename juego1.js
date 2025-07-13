 const cardTypes = ['A', 'B', 'C', 'D', 'E', 'F'];
    let cards = [];
    let attempts = 6;
    let selectedCards = [];
    let matchedCards = [];

    // Crear el mazo de cartas
    function createDeck() {
        for (let type of cardTypes) {
            cards.push(type, type, type); // Tres cartas de cada tipo
        }
        cards = shuffle(cards);
        renderCards();
    }

    // Barajar las cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Renderizar las cartas
    function renderCards() {
        const gameContainer = document.getElementById('game');
        gameContainer.innerHTML = '';
        for (let i = 0; i < cards.length; i++) {
            gameContainer.innerHTML += `<div class="card" data-index="${i}" onclick="revealCard(${i})">?</div>`;
        }
    }

    // Revelar la carta
    function revealCard(index) {
        if (selectedCards.length < 3 && !matchedCards.includes(index)) {
            const card = document.querySelector(`.card[data-index="${index}"]`);
            card.innerText = cards[index];
            selectedCards.push(index);
            if (selectedCards.length === 3) {
                checkMatch();
            }
        }
    }

    // Comprobar si hay coincidencias
    function checkMatch() {
        const firstCard = cards[selectedCards[0]];
        const isMatch = selectedCards.every(index => cards[index] === firstCard);
        if (isMatch) {
            matchedCards.push(...selectedCards);
            document.getElementById('message').innerText = '¡Ganaste!';
        } else {
            attempts--;
            if (attempts === 0) {
                document.getElementById('message').innerText = '¡Perdiste! Intenta de nuevo.';
                setTimeout(() => {
                    resetGame();
                }, 2000);
            } else {
                document.getElementById('message').innerText = `No coincide. Te quedan ${attempts} intentos.`;
                setTimeout(() => {
                    hideCards();
                }, 1000);
            }
        }
        selectedCards = [];
    }

    // Ocultar cartas
    function hideCards() {
        const cardsToHide = document.querySelectorAll('.card');
        cardsToHide.forEach((card, index) => {
            if (!matchedCards.includes(index)) {
                card.innerText = '?';
            }
        });
    }

    // Reiniciar el juego
    function resetGame() {
        cards = [];
        attempts = 6;
        selectedCards = [];
        matchedCards = [];
        createDeck();
        document.getElementById('message').innerText = '';
    }

    createDeck();