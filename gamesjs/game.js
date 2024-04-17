import Player from "./player.js";
import Ground from "./ground.js";
import TrapsController from "./trapsController.js";
import Score from "./score.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_TRAPS_SPEED = 0.5;

const TRAPS_CONGIF = [
  { width: 62 / 1.5, height: 63 / 1.5, image: "../Images/traps/trap01.png" },
  { width: 95 / 1.5, height: 95 / 1.5, image: "../Images/traps/trap02.png" },
];

// Game Objects
let player = null;
let ground = null;
let trapsController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let isGameOver = false;
let hasEventListenersForRestart = false;
let isWaitingToStart = true;

function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(
    context,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  ground = new Ground(
    context,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_TRAPS_SPEED,
    scaleRatio
  );

  const trapsImages = TRAPS_CONGIF.map((trap) => {
    const image = new Image();
    image.src = trap.image;
    return {
      image: image,
      width: trap.width * scaleRatio,
      height: trap.height * scaleRatio,
    };
  });

  trapsController = new TrapsController(
    context,
    trapsImages,
    scaleRatio,
    GROUND_AND_TRAPS_SPEED
  );

  score = new Score(context, scaleRatio);
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();

window.addEventListener("resize", setScreen);

function getScaleRatio() {
  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

function clearCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function showStartScreen() {
  const fontSize = 70 * scaleRatio;
  context.font = `${fontSize}px Verdana`;
  context.fillStyle = "grey";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  context.fillText("Press Space to start", x, y);
}

function showGameOver() {
  const fontSize = 70 * scaleRatio;
  context.font = `${fontSize}px Verdana`;
  context.fillStyle = "grey";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  context.fillText("Game Over", x, y);
}

function setupGameReset() {
  if (!hasEventListenersForRestart) {
    hasEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
    }, 1000);
  }
}

function reset() {
  hasEventListenersForRestart = false;
  isGameOver = false;
  isWaitingToStart = false;
  ground.reset();
  trapsController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
}

function increaseGameSpeed(timeDelta) {
  gameSpeed += timeDelta * GAME_SPEED_INCREMENT;
}

function update(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(update);
    return;
  }

  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearCanvas();

  if (!isGameOver && !isWaitingToStart) {
    ground.update(gameSpeed, timeDelta);
    trapsController.update(gameSpeed, timeDelta);
    player.update(gameSpeed, timeDelta);
    score.update(timeDelta);
    increaseGameSpeed(timeDelta);
  }

  if (!isGameOver && trapsController.collideWith(player)) {
    isGameOver = true;
    setupGameReset();
    score.setHighScore();
  }

  ground.draw();
  trapsController.draw();
  player.draw();
  score.draw();

  if (isGameOver) {
    showGameOver();
  }

  if (isWaitingToStart) {
    showStartScreen();
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

window.addEventListener("keyup", reset, { once: true });
