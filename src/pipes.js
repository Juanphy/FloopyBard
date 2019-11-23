export default class Bard {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 80;
    this.interPipeSpace = 200;
    this.initialHeight = this.gameHeight / 2 - this.interPipeSpace / 2;
    this.scrollSpeed = 10;
    this.isAlive = 1;
    this.minPipeHeight = 100;

    this.position = {
      x: this.gameWidth,
      heightUp: this.gameHeight - (this.initialHeight + this.interPipeSpace),
      heightDown: -this.initialHeight,
      yDown: this.gameHeight - 1,
      yUp: 0
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(
      this.position.x,
      this.position.yDown,
      this.width,
      this.position.heightDown
    );
    ctx.fillRect(
      this.position.x,
      this.position.yUp,
      this.width,
      this.position.heightUp
    );
  }

  update(deltaTime) {
    if (!deltaTime) return;

    this.position.x -= this.scrollSpeed;

    if (this.position.x + this.width <= 0) this.position.x = this.gameWidth;
  }
}