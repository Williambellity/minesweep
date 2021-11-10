/**
 *  permet de créer un jeu (positions des mines, position du joueur, positions de drapeaux, cases explorées)
 *  et de traiter les évènements (calcul d’un nouvel état du jeu lorsque le joueur se déplace,
 *  lorsqu’un drapeau est posé, lorsqu’une case est explorée)
 */

export const createGame = () => {
  const createMine = (x: number, y: number) => {
    return {type: "MINE", x: x, y: y};
  };

  return [
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
};

export const STATE = [
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

export const BOARD_SIZE = 10;
