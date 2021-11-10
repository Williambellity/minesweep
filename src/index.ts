/**
 *  dessiner l’état du jeu (bordures, position du joueur, drapeaux, cases vides, cases avec une valeur)
 *  ainsi que l’invite (règles du jeu ou game over)

 */

import {terminal} from "terminal-kit";
import {createGame} from "./game";
import {renderBoard} from "./rendering";

export const X_OFFSET = 5;
export const Y_OFFSET = 5;

export const moveTo = (x: number, y: number, text: string) =>
  terminal.moveTo(X_OFFSET + x, Y_OFFSET + y, text);

terminal.grabInput({mouse: "button"});

terminal.fullscreen(true);

renderBoard(terminal);

terminal.on("key", function (key: string) {
  switch (key) {
    case "UP":
      terminal.up(1);
      break;
    case "DOWN":
      terminal.down(1);
      break;
    case "LEFT":
      terminal.left(1);
      break;
    case "RIGHT":
      terminal.right(1);
      break;
    case "CTRL_C":
      process.exit();
      break;
    case "f":
      // terminal.getCursorLocation()

      break;
    default:
      // Echo anything else
      // terminal.noFormat(
      //   Buffer.isBuffer(data.code) ? data.code : String.fromCharCode(data.code)
      // );
      break;
  }
});

//

terminal.on("mouse", function (data: {x: number; y: number}) {
  terminal.moveTo(data.x, data.y);
});
