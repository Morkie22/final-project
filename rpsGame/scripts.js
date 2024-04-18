let playerScore = 0;
let computerScore = 0;

// Function to randomly select computer's choice
function computerPlay() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to play a round of the game
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') ||
               (playerSelection === 'Paper' && computerSelection === 'Rock') ||
               (playerSelection === 'Scissors' && computerSelection === 'Paper')) {
        playerScore++;
        return `You win! ${playerSelection} beats ${computerSelection}`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
}

// Function to update scores on the UI
function updateScores() {
    document.getElementById('score').textContent = `Player: ${playerScore}, Computer: ${computerScore}`;
}

// Function to check if the game is over
function checkGameOver() {
    if (playerScore === 5 || computerScore === 5) {
        const winner = playerScore === 5 ? 'Player' : 'Computer';
        document.getElementById('result').textContent = `Game over, ${winner} wins!`;
        toggleGameButtons(false);
        document.getElementById('reset').style.display = 'block';
    }
}

// Function to toggle game buttons' availability
function toggleGameButtons(enable) {
    document.querySelectorAll('button.choice').forEach(button => {
        button.disabled = !enable;
    });
}

// Event listeners for player's choices
document.querySelectorAll('button.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerSelection = button.textContent;
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        document.getElementById('result').textContent = result;
        updateScores();
        checkGameOver();
    });
});

// Event listener for game reset
document.getElementById('reset').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    document.getElementById('result').textContent = '';
    toggleGameButtons(true);
    document.getElementById('reset').style.display = 'none';
});
