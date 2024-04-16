export default class Trap {
  constructor(context, x, y, width, height, image) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  update(speed, gameSpeed, timeDelta, scaleRatio) {
    this.x -= speed * gameSpeed * timeDelta * scaleRatio;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
