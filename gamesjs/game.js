import Player from "./player.js";
import Ground from "./ground.js";

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
const GROUND_AND_CACTUS_SPEED = 0.5;

let player = null;
let ground = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

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
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  );
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

function update(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(update);
    return;
  }

  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearCanvas();

  ground.update(gameSpeed, timeDelta);

  ground.draw();
  player.draw();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
