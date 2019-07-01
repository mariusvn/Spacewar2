import Vessel from './Vessel.js';
import keyboard from "./Keyboard.js";

export default class Player extends Vessel {
    constructor(game, name) {
        super(game, {x: 500, y: 500}, name);
        this.nameLabel.visible = false;
        this.game = game;
        this.activateInput();
        this.enginePower = 10;
        this.networkManager = null;
    }

    update = () => {
        super.update();
        let dist_Y = this.game.app.renderer.plugins.interaction.mouse.global.y - this.y;
        let dist_X = this.game.app.renderer.plugins.interaction.mouse.global.x - this.x;
        let angle = Math.atan2(dist_Y,dist_X);
        this.rotation = angle * PIXI.RAD_TO_DEG - 90;
    };

    activateInput = () => {
        let left = keyboard("ArrowLeft"),
            right = keyboard("ArrowRight"),
            top = keyboard("ArrowUp"),
            down = keyboard("ArrowDown");

        left.press = () => {
            this.force.x -= this.enginePower / 30;
        };

        right.press = () => {
            this.force.x += this.enginePower / 30;
        };

        top.press = () => {
            this.force.y -= this.enginePower / 30;
        };

        down.press = () => {
            this.force.y += this.enginePower / 30;
        };
    };
}