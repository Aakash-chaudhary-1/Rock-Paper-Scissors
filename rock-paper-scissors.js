// Retrieve score from localStorage or create a new score object
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// Initial score display on page load
updateScoreElement();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose.';
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else if (computerMove === 'Scissors') {
            result = 'Tie.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'Rock') {
            result = 'You win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else if (computerMove === 'Scissors') {
            result = 'You lose.';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else if (computerMove === 'Scissors') {
            result = 'You win.';
        }
    }

    // Update score based on the result
    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    // Save the updated score to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update the UI
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}

// A new function to properly reset the score
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score'); // Clear from storage
    updateScoreElement(); // Update the display
    // Optionally clear the result and moves text
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}
