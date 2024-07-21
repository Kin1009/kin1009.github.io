let score = 1;
let timeLeft = 120;
let timerInterval;

function startGame() {
    score = 1;
    timeLeft = 120;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
    document.getElementById('retry-button').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('home-button').style.display = 'none';
    createCheckboxes();
    startTimer();
}

function createCheckboxes() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < score; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = Math.random() < 0.5;
        checkbox.onchange = checkAllChecked;
        gameContainer.appendChild(checkbox);
    }
}

function checkAllChecked() {
    const checkboxes = document.querySelectorAll('#game-container input[type="checkbox"]');
    if (Array.from(checkboxes).every(checkbox => checkbox.checked)) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        createCheckboxes();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('game').style.display = 'none';
            document.getElementById('home-button').style.display = 'block';
            document.getElementById('retry-button').style.display = 'block';
        }
    }, 1000);
}

window.onload = () => {
    document.getElementById('rules').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('home-button').style.display = 'block';
    document.getElementById('retry-button').style.display = 'none';
};
