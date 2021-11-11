/**
 *  dessiner l’état du jeu (bordures, position du joueur, drapeaux, cases vides, cases avec une valeur)
 *  ainsi que l’invite (règles du jeu ou game over)

 */

import {terminal as term} from "terminal-kit";
import {createGame, IGame} from "./game";

export const X_OFFSET = 20;
export const Y_OFFSET = 10;

export const moveTo = (x: number, y: number, text: string) =>
  term.moveTo(X_OFFSET + x, Y_OFFSET + y, text);
const BOARD_SIZE = 12;

const mines = createGame();

const renderBoard = (game: IGame) => {
  for (let x = 0; x < BOARD_SIZE; x++) {
    moveTo(x, -1, "━");
    moveTo(x, BOARD_SIZE, "━");
  }
  for (let y = 0; y < BOARD_SIZE; y++) {
    moveTo(-1, y, "┃");
    moveTo(BOARD_SIZE, y, "┃");
  }
  moveTo(-1, -1, "┏");
  moveTo(BOARD_SIZE, -1, "┓");
  moveTo(-1, BOARD_SIZE, "┗");
  moveTo(BOARD_SIZE, BOARD_SIZE, "┛");

  game.gameElements.forEach((val) => {
    term.moveTo(X_OFFSET + val.x, Y_OFFSET + val.y, "x");
  });
  term.moveTo(
    X_OFFSET + game.cursorPosition.x,
    Y_OFFSET + game.cursorPosition.y
  );
};

export const renderGame = (game: IGame) => {
  renderBoard(game);
};
