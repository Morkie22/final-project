export default class Player {
  RUN_ANIMATION_FRAMERATE = 200;
  runAnimationFrameCount = this.RUN_ANIMATION_FRAMERATE;
  playerRunImages = [];

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

    this.idleImage = new Image();
    this.idleImage.src = "../Images/player-idle.png";
    this.image = this.idleImage;

    const playerRunImage1 = new Image();
    playerRunImage1.src = "../Images/player-run-0.png";
    const playerRunImage2 = new Image();
    playerRunImage2.src = "../Images/player-run-1.png";

    this.playerRunImages.push(playerRunImage1);
    this.playerRunImages.push(playerRunImage2);
  }

  update(gameSpeed, timeDelta) {
    this.run(gameSpeed, timeDelta);
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

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
