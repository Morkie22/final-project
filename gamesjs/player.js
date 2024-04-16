export default class Player {
  RUN_ANIMATION_FRAMERATE = 200;
  runAnimationFrameCount = this.RUN_ANIMATION_FRAMERATE;
  playerRunImages = [];

  isJumpPressed = false;
  isJumpInProgress = false;
  isFalling = false;
  JUMP_SPEED = 0.6;
  GRAVITY = 0.4;

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

    this.idleImage = new Image();
    this.idleImage.src = "../Images/player-idle.png";
    this.image = this.idleImage;

    const playerRunImage1 = new Image();
    playerRunImage1.src = "../Images/player-run-0.png";
    const playerRunImage2 = new Image();
    playerRunImage2.src = "../Images/player-run-1.png";

    this.playerRunImages.push(playerRunImage1);
    this.playerRunImages.push(playerRunImage2);

    // Controls
    window.removeEventListener("keydown", this.keydown);
    window.removeEventListener("keyup", this.keyup);

    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  }

  keydown = (event) => {
    if (event.code === "Space") {
      this.isJumpPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code === "Space") {
      this.isJumpPressed = false;
    }
  };

  update(gameSpeed, timeDelta) {
    this.run(gameSpeed, timeDelta);

    if (this.isJumpInProgress) {
      this.image = this.idleImage;
    }

    this.jump(timeDelta);
  }

  run(gameSpeed, timeDelta) {
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

  jump(timeDelta) {
    if (this.isJumpPressed) {
      this.isJumpInProgress = true;
    }

    if (this.isJumpInProgress && !this.isFalling) {
      if (
        this.y > this.canvas.height - this.minJumpHeight ||
        (this.y > this.canvas.height - this.maxJumpHeight && this.isJumpPressed)
      ) {
        this.y -= this.JUMP_SPEED * timeDelta * this.scaleRatio;
      } else {
        this.isFalling = true;
      }
    } else {
      if (this.y < this.playerStandingPositionY) {
        this.y += this.GRAVITY * timeDelta * this.scaleRatio;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.playerStandingPositionY;
        }
      } else {
        this.isFalling = false;
        this.isJumpInProgress = false;
      }
    }
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
