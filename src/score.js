export default class Bard {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.value = 0;
    this.high = 0;
  }

  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${this.value}`, 400, 50);
    ctx.fillText(`HIGH SCORE: ${this.high}`, 400, 80);
  }

  add() {
    this.value++;
    if (this.value > this.high) this.high = this.value;
  }

  reset() {
    this.value = 0;
  }
}
