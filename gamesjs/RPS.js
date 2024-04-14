let playerScore = 0, computerScore = 0;

function computerPlay() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

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

function updateScores() {
    document.getElementById('score').textContent = `Player: ${playerScore}, Computer: ${computerScore}`;
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const playerSelection = button.id.charAt(0).toUpperCase() + button.id.slice(1);
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        document.getElementById('result').textContent = result;
        updateScores();
        if (playerScore === 5 || computerScore === 5) {
            const winner = playerScore === 5 ? 'Player' : 'Computer';
            document.getElementById('result').textContent = `Game over, ${winner} wins!`;
            playerScore = 0;
            computerScore = 0;
            updateScores();  // Ensure score resets are reflected in the display
        }
    });
});

