import Game from './Game.js';
import Player from './Player.js';
import Vessel from './Vessel.js';

let player;
let game;

function main() {
    game = new Game();
    player = new Player(game);
    new Vessel(game, {x: 300,y: 350}, "Other player");
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    player.update();
}
//PIXI.loader.load(main);
main();