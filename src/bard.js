export default class Bard {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 50;
    this.height = 50;
    this.start = 0;

    this.maxSpeed = 35;
    this.maxSpeedY = 50;
    this.speed = 0;
    this.upSpeed = 0;

    this.velocity = 0;
    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;

    this.position = {
      x: gameWidth / 4 - this.width / 2,
      y: gameHeight / 2 - this.height
    };
  }

  movePaddle() {
    if (this.leftPressed) this.speed = -this.maxSpeed;
    if (this.rightPressed) this.speed = this.maxSpeed;
    if (this.upPressed) {
      if (this.start !== 1) {
        this.position.x = this.gameWidth / 4 - this.width / 2;
        this.position.y = this.gameHeight / 2 - this.height;
        this.start = 1;
      }
      this.upSpeed = -this.maxSpeed;
      this.velocity = 0;
    }
    if (this.downPressed) this.upSpeed = this.maxSpeed;
  }

  stop() {
    if (this.leftPressed) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.rightPressed) this.speed = this.maxSpeed;
    else this.speed = 0;
    if (this.upPressed) {
      if (this.start !== 1) {
        this.position.x = this.gameWidth / 4 - this.width / 2;
        this.position.y = this.gameHeight / 2 - this.height;
        this.start = 1;
      }
      this.upSpeed = -this.maxSpeed;
    } else this.upSpeed = 0;
    if (this.downPressed) this.upSpeed = this.maxSpeed;
  }

  draw(ctx) {
    if (this.start === 0) {
      //BEGINING
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(`PRESS UP`, this.gameWidth / 2, this.gameHeight / 2);
    } else if (this.start === 1) {
      //GAME
      ctx.font = "30px Arial";
      ctx.fillStyle = "#0ff";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.fillText(`Velocity: ${this.velocity}`, 400, 50);
      ctx.fillText(`UpSpeed: ${this.upSpeed}`, 400, 100);
      ctx.font = "15px Arial";
      ctx.fillText(
        `Up:${this.upPressed},Down:${this.downPressed},Left:${
          this.leftPressed
        },Right:${this.rightPressed},Other:${this.other}`,
        10,
        200
      );
    } else if (this.start === 2) {
      //END
      ctx.font = "30px Arial";
      ctx.fillStyle = "#0ff";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.fillText(`Velocity: ${this.velocity}`, 400, 50);
      ctx.fillText(`UpSpeed: ${this.upSpeed}`, 400, 100);
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText(`GAME OVER`, this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  update(deltaTime) {
    if (!deltaTime) return;

    if (this.start === 1) {
      if (this.velocity < this.maxSpeedY && !this.upPressed) this.velocity += 2;

      this.position.x += this.speed;
      this.position.y += this.upSpeed + this.velocity;

      if (this.position.x < 0) this.position.x = 0;
      if (this.position.x + this.width > this.gameWidth)
        this.position.x = this.gameWidth - this.width;
      if (this.position.y < 0) this.position.y = 0;
      if (this.position.y + this.height > this.gameHeight) {
        this.position.y = this.gameHeight - this.height - 1;
        this.velocity = 0;
        this.start = 2;
      }
    }
  }
}
