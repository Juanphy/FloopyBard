export default class Bard {
  constructor(gameWidth, gameHeight, mobile) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 50;
    this.height = 50;
    this.start = 0;
    this.image = document.getElementById("imageBard");

    if (mobile) {
      this.maxSpeed = 15; //mobile
      this.gravity = 1; //mobile
    } else {
      this.maxSpeed = 35; //web browser
      this.gravity = 2; //web browser
    }

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
      if (this.start !== 1) this.start = 1;
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
    if (this.upPressed) this.upSpeed = -this.maxSpeed;
    else this.upSpeed = 0;
    if (this.downPressed) this.upSpeed = this.maxSpeed;
  }

  draw(ctx, gameStatus) {
    if (gameStatus === 0) {
      //BEGINING
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(`PRESS UP`, this.gameWidth / 2, this.gameHeight / 2);
    } else if (gameStatus === 1 || gameStatus === 3) {
      //GAME
      //ctx.fillStyle = "#0ff";
      //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.drawImage(this.image, this.position.x - 20, this.position.y, 80, 50);
    } else if (gameStatus === 2) {
      //END
      //ctx.fillStyle = "#0ff";
      //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.drawImage(this.image, this.position.x - 20, this.position.y, 80, 50);
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText(`GAME OVER`, this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  update(deltaTime) {
    if (!deltaTime) return;

    if (this.velocity < this.maxSpeedY && !this.upPressed)
      this.velocity += this.gravity;

    this.position.x += this.speed;
    this.position.y += this.upSpeed + this.velocity;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
    if (this.position.y < 0) this.position.y = 0;
  }

  crash() {
    this.start = 0;
  }

  reset() {
    this.position.x = this.gameWidth / 4 - this.width / 2;
    this.position.y = this.gameHeight / 2 - this.height;
    this.velocity = 0;
  }
}
