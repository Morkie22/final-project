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

function checkGameOver() {
    if (playerScore === 5 || computerScore === 5) {
        const winner = playerScore === 5 ? 'Player' : 'Computer';
        document.getElementById('result').textContent = `Game over, ${winner} wins!`;
        toggleGameButtons(false);
        document.getElementById('reset').style.display = 'block';
    }
}

function toggleGameButtons(enable) {
    document.querySelectorAll('button').forEach(button => {
        if (button.id !== 'reset') {
            button.disabled = !enable;
        }
    });
}

document.querySelectorAll('#rock, #paper, #scissors').forEach(button => {
    button.addEventListener('click', () => {
        const playerSelection = button.textContent;
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        document.getElementById('result').textContent = result;
        updateScores();
        checkGameOver();
    });
});

document.getElementById('reset').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    document.getElementById('result').textContent = '';
    toggleGameButtons(true);
    document.getElementById('reset').style.display = 'none';
});
