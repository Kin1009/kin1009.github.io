const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = canvas.width;
const totalCells = canvasSize / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells)};
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;
let isPaused = false;

function drawCell(x, y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function updateSnake() {
    if (isPaused) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").textContent = score;
        food = {x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells)};
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (head.x < 0 || head.x >= totalCells || head.y < 0 || head.y >= totalCells || collisionCheck(head)) {
        clearInterval(gameLoop);
        alert("Game Over");
        resetGame();
    }
}

function collisionCheck(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function draw() {
    clearCanvas();
    drawFood(food.x, food.y);
    for (let i = 0; i < snake.length; i++) {
        drawCell(snake[i].x, snake[i].y);
    }
}

function gameTick() {
    updateSnake();
    draw();
}

function startGame() {
    dx = 1;
    dy = 0;
    if (!gameLoop) {
        gameLoop = setInterval(gameTick, 100);
    }
}

function pauseGame() {
    isPaused = !isPaused;
}

function resetGame() {
    clearInterval(gameLoop);
    gameLoop = null;
    score = 0;
    document.getElementById("score").textContent = score;
    snake = [{x: 10, y: 10}];
    food = {x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells)};
    dx = 0;
    dy = 0;
    isPaused = false;
    draw();
}

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowUp":
            if (dy === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy === 0) {
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx === 0) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

resetGame();
