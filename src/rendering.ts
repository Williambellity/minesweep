/**
 *  dessiner l’état du jeu (bordures, position du joueur, drapeaux, cases vides, cases avec une valeur)
 *  ainsi que l’invite (règles du jeu ou game over)

 */

import {Terminal} from "terminal-kit";
import {createGame} from "./game";
import {moveTo, X_OFFSET, Y_OFFSET} from "./index";

const BOARD_SIZE = 12;

const mines = createGame();

export const renderBoard = (term: Terminal) => {
  for (let x = 0; x < BOARD_SIZE; x++) {
    moveTo(x, 0, "━");
    moveTo(x, BOARD_SIZE, "━");
  }
  for (let y = 0; y < BOARD_SIZE; y++) {
    moveTo(0, y, "┃");
    moveTo(BOARD_SIZE, y, "┃");
  }
  moveTo(0, 0, "┏");
  moveTo(BOARD_SIZE, 0, "┓");
  moveTo(0, BOARD_SIZE, "┗");
  moveTo(BOARD_SIZE, BOARD_SIZE, "┛");

  mines.forEach((val) => {
    term.moveTo(X_OFFSET + 1 + val.x, Y_OFFSET + 1 + val.y, "x");
  });
};
