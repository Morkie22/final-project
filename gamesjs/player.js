export default class Player {
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
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
