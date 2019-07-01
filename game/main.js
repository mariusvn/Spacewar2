import Game from './Game.js';
import Player from './Player.js';
import Vessel from './Vessel.js';
import Network from "./Network.js";

let player;
let game;
let socket;

function main() {
    game = new Game();
    player = new Player(game, "Player");
    let net = new Network(player, game);
    //new Vessel(game, {x: 400, y: 400}, "Autre joueur");
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    for (let i = 0, len = Vessel.list.length; i < len; i++) {
        Vessel.list[i].update();
    }
}
//PIXI.loader.load(main);
main();