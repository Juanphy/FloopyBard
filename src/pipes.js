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
    this.multiPipeSpace = gameWidth / 2;

    this.position = {
      x: this.gameWidth,
      heightUp: this.gameHeight - (this.initialHeight + this.interPipeSpace),
      heightDown: -this.initialHeight,
      yDown: this.gameHeight - 1,
      yUp: 0,
      x2: this.gameWidth + this.multiPipeSpace,
      heightUp2: this.gameHeight - (this.initialHeight + this.interPipeSpace),
      heightDown2: -this.initialHeight,
      yDown2: this.gameHeight - 1,
      yUp2: 0
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
    ctx.fillRect(
      this.position.x2,
      this.position.yDown2,
      this.width,
      this.position.heightDown2
    );
    ctx.fillRect(
      this.position.x2,
      this.position.yUp2,
      this.width,
      this.position.heightUp2
    );
  }

  reset() {
    this.position.x = this.gameWidth;
    this.position.heightUp =
      this.gameHeight - (this.initialHeight + this.interPipeSpace);
    this.position.heightDown = -this.initialHeight;
    this.position.yDown = this.gameHeight - 1;
    this.position.yUp = 0;
    this.position.x2 = this.gameWidth + this.multiPipeSpace;
    this.position.heightUp2 =
      this.gameHeight - (this.initialHeight + this.interPipeSpace);
    this.position.heightDown2 = -this.initialHeight;
    this.position.yDown2 = this.gameHeight - 1;
    this.position.yUp2 = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    this.position.x -= this.scrollSpeed;
    this.position.x2 -= this.scrollSpeed;

    if (this.position.x + this.width <= 0) {
      this.position.x = this.gameWidth;
      let min = this.minPipeHeight;
      let max = this.gameHeight - (this.minPipeHeight + this.interPipeSpace);
      let newHeight = Math.random() * (max - min) + min;
      this.position.heightUp =
        this.gameHeight - (newHeight + this.interPipeSpace);
      this.position.heightDown = -newHeight;
    }
    if (this.position.x2 + this.width <= 0) {
      this.position.x2 = this.gameWidth;
      let min = this.minPipeHeight;
      let max = this.gameHeight - (this.minPipeHeight + this.interPipeSpace);
      let newHeight = Math.random() * (max - min) + min;
      this.position.heightUp2 =
        this.gameHeight - (newHeight + this.interPipeSpace);
      this.position.heightDown2 = -newHeight;
    }
  }
}
