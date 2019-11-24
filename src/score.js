export default class Bard {
  constructor(gameWidth, gameHeight) {
  this.gameWidth = gameWidth;
  this.gameHeight = gameHeight;
  this.value = 0;
  }

  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${this.value}`, 400, 50);
  }

  add() {
    this.value++;
  }

  reset() {
    this.value = 0;
  }
}