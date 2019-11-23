import Bard from "/src/bard";
import InputHandler from "/src/input";
import Pipes from "/src/pipes";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 900;

var gameStatus = 0;

let bard = new Bard(GAME_WIDTH, GAME_HEIGHT);
let pipes = new Pipes(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(bard);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.fillText(`gameStatus: ${gameStatus}`, 400, 200);

  //INITIAL
  if (gameStatus === 0) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bard.draw(ctx);
    if (bard.start === 1) gameStatus = 1;
  } else if (gameStatus === 1) {
    //GAME
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bard.update(deltaTime);
    bard.draw(ctx);
    pipes.update(deltaTime);
    pipes.draw(ctx);
    checkCollision(bard, pipes);
  } else if (gameStatus === 2) {
    //CRASHED
    if (bard.start === 1) gameStatus = 3;
  } else if (gameStatus === 3) {
    //RESTART
    //ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bard.reset();
    bard.draw(ctx);
    pipes.reset();
    pipes.draw(ctx);
  }
  requestAnimationFrame(gameLoop);
}

function checkCollision(bard, pipes) {
  //GROUND COLLISTION
  if (bard.position.y + bard.height > bard.gameHeight) {
    gameStatus = 2;
    bard.crash();
    return;
  }
  //CHECK PIPE COLLISION
  if (
    bard.position.x + bard.width >= pipes.position.x &&
    bard.position.x <= pipes.position.x + pipes.width
  ) {
    //TOP PIPE COLLISION
    if (bard.position.y <= pipes.position.heightUp) {
      gameStatus = 2;
      bard.crash();
      return;
    }
    //BOTTOM PIPE COLLISION
    if (bard.position.y + bard.height >= 900 + pipes.position.heightDown) {
      gameStatus = 2;
      bard.crash();
      return;
    }
  }
  //NO COLLISION DETECTED
  return;
}

gameLoop();
