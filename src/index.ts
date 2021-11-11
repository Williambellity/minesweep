/**
 *  dessiner l’état du jeu (bordures, position du joueur, drapeaux, cases vides, cases avec une valeur)
 *  ainsi que l’invite (règles du jeu ou game over)

 */

import {terminal as term} from "terminal-kit";
import {createGame, handleEvent, GameEvent, isGameEvent} from "./game";
import {renderGame} from "./rendering";

term.grabInput({mouse: "button"});

term.fullscreen(true);

let game = createGame();
renderGame(game);

term.on("key", function (key: string) {
  if (isGameEvent(key)) {
    game = handleEvent(game, key);
  }
  renderGame(game);
});

//

term.on("mouse", function (data: {x: number; y: number}) {
  term.moveTo(data.x, data.y);
});
