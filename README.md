follow the link to the replit to see if this works and we can always add this : https://replit.com/@morkie22/MountainousGrizzledOctal
but I was trying to get a clear start and enhance the jumping and he is the js after changing it const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
let score = 0;
let isGameOver = false;
let isGameStarted = false;
let lastTime = 0;

// Settings and constants
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 62.67;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const CACTUS_IMAGE = "../Images/cactus.png";  // Ensure this path is correct!

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

class Player {
    constructor(context) {
        this.context = context;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = 50; // Increased x for better visibility
        this.y = GAME_HEIGHT - this.height - 5;
        this.gravity = 0.5;
        this.velocity = 0;
        this.jumpPower = -15; // Increased power for more noticeable jump
        this.isJumping = false;
        this.groundY = this.y;
    }

    jump() {
        if (this.y === this.groundY) { // Ensures jump only if on the ground
            this.velocity = this.jumpPower;
            this.isJumping = true;
        }
    }

    update() {
        this.y += this.velocity;
        this.velocity += this.gravity;

        if (this.y > this.groundY) {
            this.y = this.groundY;
            this.isJumping = false;
        }
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ground {
    constructor(context) {
        this.context = context;
        this.width = GROUND_WIDTH;
        this.height = GROUND_HEIGHT;
        this.x = 0;
        this.y = GAME_HEIGHT - this.height;
    }

    update() {}

    draw() {
        this.context.fillStyle = 'sandybrown';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class TrapsController {
    constructor(context, image) {
        this.context = context;
        this.traps = [];
        this.spawnRate = 2000;
        this.lastSpawn = 0;
        this.image = image;
    }

    update(deltaTime) {
        if (Date.now() - this.lastSpawn > this.spawnRate && isGameStarted) {
            this.traps.push(new Trap(this.context, this.image, GAME_WIDTH, GAME_HEIGHT - 50));
            this.lastSpawn = Date.now();
        }

        this.traps = this.traps.filter(trap => trap.x + trap.width > 0);
        this.traps.forEach(trap => trap.update());
    }

    draw() {
        this.traps.forEach(trap => trap.draw());
    }

    collideWith(player) {
        return this.traps.some(trap => trap.x < player.x + player.width &&
            trap.x + trap.width > player.x &&
            trap.y < player.y + player.height &&
            trap.y + trap.height > player.y);
    }
}

class Trap {
    constructor(context, image, x, y) {
        this.context = context;
        this.width = 20;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.image = image;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        this.context.fillStyle = 'green';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function showStartScreen() {
    context.fillStyle = 'blue';
    context.font = '24px Arial';
    context.fillText('Press Space to Start', 50, 100);
}

function displayGameOver() {
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Game Over! Press Enter to Restart", 50, 100);
}

function gameLoop(timestamp) {
    if (!isGameStarted)
