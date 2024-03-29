import Bard from "/src/bard";
import InputHandler from "/src/input";
import Pipes from "/src/pipes";
import Score from "/src/score";
import Sound from "/src/sound";

var canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
//images

const GAME_WIDTH = 600;
const GAME_HEIGHT = 900;

let mobile = detectmob();

var gameStatus = 0;

let bard = new Bard(GAME_WIDTH, GAME_HEIGHT, mobile);
let pipes = new Pipes(GAME_WIDTH, GAME_HEIGHT, mobile);
let score = new Score(GAME_WIDTH, GAME_HEIGHT);
let backgroundSound = new Sound("assets/sounds/bensound-funnysong.mp3");
let flapSound = new Sound("assets/sounds/flap.flac");
let hitSound = new Sound("assets/sounds/hit.mp3");
let crySound = new Sound("assets/sounds/cry.wav");
backgroundSound.volume = 10;
let quasiScore = false;
let quasiScore2 = false;
let musicStart = false;
new InputHandler(bard, flapSound);

let lastTime = 0;
if (mobile) bard.startText = "TOUCH TO START";
else bard.startText = "PRESS UP";

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  //INITIAL
  if (gameStatus === 0) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bard.draw(ctx, gameStatus);
    if (bard.start === 1) gameStatus = 1;
  } else if (gameStatus === 1) {
    //GAME
    if (!musicStart) {
      backgroundSound.play();
      musicStart = true;
    }
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    pipes.update(deltaTime);
    pipes.draw(ctx);
    bard.update(deltaTime);
    bard.draw(ctx, gameStatus);
    checkCollision(bard, pipes, score, hitSound, crySound, function() {
      score.draw(ctx);
    });
  } else if (gameStatus === 2) {
    //CRASHED
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    pipes.draw(ctx);
    bard.draw(ctx, gameStatus);
    score.draw(ctx);
    if (bard.start === 1) gameStatus = 3;
  } else if (gameStatus === 3) {
    //RESTART
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bard.reset();
    pipes.reset();
    score.reset();
    quasiScore = false;
    quasiScore2 = false;
    gameStatus = 1;
  }
  requestAnimationFrame(gameLoop);
}

function checkCollision(bard, pipes, score, hitSound, crySound, callback) {
  //GROUND COLLISTION
  if (bard.position.y + bard.height > bard.gameHeight) {
    gameStatus = 2;
    bard.crash();
    callback();
  }
  //CHECK PIPE COLLISION
  if (
    bard.position.x + bard.width >= pipes.position.x &&
    bard.position.x <= pipes.position.x + pipes.width
  ) {
    if (!quasiScore) quasiScore = true;
    //TOP PIPE COLLISION
    if (bard.position.y <= pipes.position.heightUp) {
      gameStatus = 2;
      hitSound.play();
      crySound.play();
      bard.crash();
      callback();
    }
    //BOTTOM PIPE COLLISION
    if (bard.position.y + bard.height >= 900 + pipes.position.heightDown) {
      gameStatus = 2;
      hitSound.play();
      crySound.play();
      bard.crash();
      callback();
    }
  } else if (quasiScore) {
    score.add();
    quasiScore = false;
  }

  if (
    bard.position.x + bard.width >= pipes.position.x2 &&
    bard.position.x <= pipes.position.x2 + pipes.width
  ) {
    if (!quasiScore2) quasiScore2 = true;
    //TOP PIPE COLLISION
    if (bard.position.y <= pipes.position.heightUp2) {
      gameStatus = 2;
      hitSound.play();
      crySound.play();
      bard.crash();
      callback();
    }
    //BOTTOM PIPE COLLISION
    if (bard.position.y + bard.height >= 900 + pipes.position.heightDown2) {
      gameStatus = 2;
      hitSound.play();
      crySound.play();
      bard.crash();
      callback();
    }
  } else if (quasiScore2) {
    score.add();
    quasiScore2 = false;
  }
  //NO COLLISION DETECTED
  callback();
}

function detectmob() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

gameLoop();
