import Bard from "/src/bard";
import InputHandler from "/src/input";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 900;

let bard = new Bard(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(bard);

bard.draw(ctx);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  bard.update(deltaTime);
  bard.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
