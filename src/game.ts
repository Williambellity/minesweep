/**
 *  permet de créer un jeu (positions des mines, position du joueur, positions de drapeaux, cases explorées)
 *  et de traiter les évènements (calcul d’un nouvel état du jeu lorsque le joueur se déplace,
 *  lorsqu’un drapeau est posé, lorsqu’une case est explorée)
 */

import {count} from "console";
import {terminal} from "terminal-kit";

export interface IGameElement {
  type: string;
  x: number;
  y: number;
  info?: number;
}

export interface IGame {
  gameElements: IGameElement[];
  cursorPosition: {x: number; y: number};
  table: string[][];
}

const gameEvent = [
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "CTRL_C",
  "f",
  "ENTER",
] as const;
export type GameEvent = typeof gameEvent[number];
export const isGameEvent = (x: any): x is GameEvent => gameEvent.includes(x);

export const BOARD_SIZE = 9;

export const createGame = () => {
  // const createMine = (x: number, y: number) => {
  //   return {type: "MINE", x: x, y: y};
  // };
  const gameElements: IGameElement[] = [
    {type: "MINE", x: 0, y: 4},
    {type: "MINE", x: 0, y: 2},
    {type: "MINE", x: 7, y: 1},
    {type: "MINE", x: 0, y: 5},
    {type: "MINE", x: 8, y: 8},
    {type: "MINE", x: 2, y: 5},
    {type: "MINE", x: 0, y: 2},
    {type: "MINE", x: 5, y: 0},
    {type: "MINE", x: 0, y: 1},
    {type: "MINE", x: 4, y: 2},
  ];

  const table = createTable(gameElements);

  return {gameElements, cursorPosition: {x: 0, y: 0}, table};
};

const createTable = (gameElements: IGameElement[]) => {
  const emptyArray: string[] = new Array(BOARD_SIZE).fill("EMPTY");
  let table: string[][] = new Array(BOARD_SIZE).fill(emptyArray);

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const element = gameElements.find((val) => val.x === i && val.y === j);
      if (element !== undefined) {
        table[i][j] = element.type;
      }
    }
  }

  return table;
};

export const handleEvent = (game: IGame, event: GameEvent): IGame => {
  const {x: prevX, y: prevY} = game.cursorPosition;
  let gameElements = game.gameElements;
  let cursorPosition = {x: prevX, y: prevY};
  let table = game.table;
  switch (event) {
    case "UP":
      cursorPosition = {x: prevX, y: prevY - 1};
      break;
    case "DOWN":
      cursorPosition = {x: prevX, y: prevY + 1};
      break;
    case "LEFT":
      cursorPosition = {x: prevX - 1, y: prevY};
      break;
    case "RIGHT":
      cursorPosition = {x: prevX + 1, y: prevY};
      break;
    case "CTRL_C":
      process.exit();
      break;
    case "f":
      const newFlag: IGameElement = {type: "FLAG", x: prevX, y: prevY};
      // console.log("press");
      if (gameElements.includes(newFlag)) {
        // console.log("include");
        gameElements = gameElements.filter((val) => val !== newFlag);
      } else {
        // console.log("no include");
        gameElements = [...gameElements, newFlag];
      }
      table = createTable(gameElements);
      break;
    case "ENTER":
      const minesNear = countMinesNear(table, prevX, prevY);
      console.log(minesNear);
      const newInfo: IGameElement = {
        type: "INFO",
        x: prevX,
        y: prevY,
        info: minesNear,
      };
      gameElements = [...gameElements, newInfo];
      table = createTable(gameElements);
      break;
    default:
      // Echo anything else
      // term.noFormat(
      //   Buffer.isBuffer(data.code) ? data.code : String.fromCharCode(data.code)
      // );
      break;
  }

  return {gameElements, cursorPosition, table};
};

const countMinesNear = (table: string[][], x: number, y: number) => {
  let counter = 0;
  const isMine = (element: string) => {
    return element === "MINE";
  };
  // for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, BOARD_SIZE); x++) {
  //   for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, BOARD_SIZE); y++) {
  //     if (x !== i || y !== j) {
  //       if (isMine(table[x][y])) {
  //         counter++;
  //       }
  //     }
  //   }
  // }

  if (x - 1 > 0 && isMine(table[x - 1][y])) {
    counter++;
  }

  return counter;
};
