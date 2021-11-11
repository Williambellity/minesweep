/**
 *  permet de créer un jeu (positions des mines, position du joueur, positions de drapeaux, cases explorées)
 *  et de traiter les évènements (calcul d’un nouvel état du jeu lorsque le joueur se déplace,
 *  lorsqu’un drapeau est posé, lorsqu’une case est explorée)
 */

export interface IGameElement {
  type: string;
  x: number;
  y: number;
}

export interface IGame {
  gameElements: IGameElement[];
  cursorPosition: {x: number; y: number};
}

const gameEvent = ["UP", "DOWN", "LEFT", "RIGHT", "CTRL_C", "f"] as const;
export type GameEvent = typeof gameEvent[number];
export const isGameEvent = (x: any): x is GameEvent => gameEvent.includes(x);

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

  return {gameElements, cursorPosition: {x: 0, y: 0}};
};

export const handleEvent = (game: IGame, event: GameEvent): IGame => {
  const {x: prevX, y: prevY} = game.cursorPosition;
  let cursorPosition = {x: prevX, y: prevY};
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
      // term.getCursorLocation()

      break;
    default:
      // Echo anything else
      // term.noFormat(
      //   Buffer.isBuffer(data.code) ? data.code : String.fromCharCode(data.code)
      // );
      break;
  }
  return {...game, cursorPosition: cursorPosition};
};
