import Bard from "./bard";

export default class InputHandler {
  constructor(bard) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          bard.leftPressed = true;
          bard.movePaddle();
          break;
        case 38:
          bard.upPressed = true;
          bard.movePaddle();
          break;
        case 39:
          bard.rightPressed = true;
          bard.movePaddle();
          break;
        case 40:
          bard.downPressed = true;
          bard.movePaddle();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          bard.leftPressed = false;
          //if (bard.speed < 0) bard.stop();
          bard.stop();
          break;
        case 38:
          bard.upPressed = false;
          //if (bard.upSpeed < 0) bard.stop();
          bard.stop();
          break;
        case 39:
          bard.rightPressed = false;
          //if (bard.speed > 0) bard.stop();
          bard.stop();
          break;
        case 40:
          bard.downPressed = false;
          //if (bard.upSpeed > 0) bard.stop();
          bard.stop();
          break;
        default:
          break;
      }
    });
  }
}
