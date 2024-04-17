export default class Player {
  RUN_ANIMATION_FRAMERATE = 200;
  runAnimationFrameCount = this.RUN_ANIMATION_FRAMERATE;
  playerRunImages = [];

  JUMP_SPEED = 0.55;
  GRAVITY = 0.0015;
  yVelocity = 0;

  constructor(
    context,
    width,
    height,
    minJumpHeight,
    maxJumpHeight,
    scaleRatio
  ) {
    this.context = context;
    this.canvas = context.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.playerStandingPositionY = this.y;

    this.isJumping = false;

    this.idleImage = new Image();
    this.idleImage.src = "./img/player-idle.png";
    this.image = this.idleImage;

    const playerRunImage1 = new Image();
    playerRunImage1.src = "./img/player-run-0.png";
    const playerRunImage2 = new Image();
    playerRunImage2.src = "./img/player-run-1.png";

    this.playerRunImages.push(playerRunImage1);
    this.playerRunImages.push(playerRunImage2);

    window.removeEventListener("keydown", this.onJumpKeyDown);
    window.removeEventListener("keyup", this.onJumpKeyUp);

    window.addEventListener("keydown", this.onJumpKeyDown);
    window.addEventListener("keyup", this.onJumpKeyUp);
  }

  onJumpKeyDown = (event) => {
    if (event.code !== "Space" || this.isJumping) return;

    this.yVelocity = this.JUMP_SPEED;
    this.isJumping = true;
    const audio = new Audio();
    audio.src = "./snd/jump.mp3";
    audio.play();
  };

  onJumpKeyUp = (event) => {
    if (event.code === "Space") {
      if (this.yVelocity > 0) {
        this.yVelocity = 0;
      }
    }
  };

  update(gameSpeed, timeDelta) {
    this.handleRun(gameSpeed, timeDelta);

    if (this.isJumping) {
      this.image = this.idleImage;
    }
    this.handleJump(timeDelta);
  }

  handleRun(gameSpeed, timeDelta) {
    if (this.runAnimationFrameCount <= 0) {
      if (this.image === this.playerRunImages[0]) {
        this.image = this.playerRunImages[1];
      } else {
        this.image = this.playerRunImages[0];
      }
      this.runAnimationFrameCount = this.RUN_ANIMATION_FRAMERATE;
    }
    this.runAnimationFrameCount -= timeDelta * gameSpeed;
  }

  handleJump(timeDelta) {
    if (!this.isJumping) return;
    if (this.y + this.height > this.canvas.height) {
      this.y = this.playerStandingPositionY;
      this.isJumping = false;
      this.yVelocity = 0;
    } else {
      this.y -= this.yVelocity * timeDelta * this.scaleRatio;
      this.yVelocity -= this.GRAVITY * timeDelta;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
