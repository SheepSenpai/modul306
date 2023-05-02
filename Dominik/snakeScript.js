
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const blockSize = 10;
    const width = canvas.width / blockSize;
    const height = canvas.height / blockSize;

    let snake = [{x: 5, y: 5}];
    let food = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
    let direction = {x: 1, y: 0};

    function drawBlock(x, y) {
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

    function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(block => drawBlock(block.x, block.y));
}

    function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
    food = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
} else {
    snake.pop();
}
}

    function drawFood() {
    ctx.fillStyle = "red";
    drawBlock(food.x, food.y);
}

    function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
    return true;
}
    for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    return true;
}
}
    return false;
}

    function update() {
    if (checkCollision()) {
    clearInterval(gameLoop);
}
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawFood();
    drawSnake();
}

    document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp" && direction.y !== 1) {
    direction = {x: 0, y: -1};
} else if (event.code === "ArrowDown" && direction.y !== -1) {
    direction = {x: 0, y: 1};
} else if (event.code === "ArrowLeft" && direction.x !== 1) {
    direction = {x: -1, y: 0};
} else if (event.code === "ArrowRight" && direction.x !== -1) {
    direction = {x: 1, y: 0};
}
});

let gameLoop = setInterval(update, 100);
