import PlayerSkins from './skins.js';
export {PlayerSkins as skins};

export default class Vessel {
    constructor(game, {x, y}, name = "", id = -1, skin = PlayerSkins.skins.Standard, rotation = 0, color = 0xffffff) {
        this.container = new PIXI.Container();
        this.container.position.set(x, y);
        this.subContainer = new PIXI.Container();
        this.container.addChild(this.subContainer);
        this.skin = skin;
        this.factor = 8;
        this.id = id;
        Vessel.list.push(this);

        let ptsList = [];
        for (let i = 0; i < this.skin.length; i++) {
            for (let j = 0; j < this.skin[i].length; j++) {
                ptsList.push(new PIXI.Point(this.skin[i][j].x * this.factor, this.skin[i][j].y * this.factor));
            }
        }
        this.polygon = new PIXI.Graphics();
        this.polygon.beginFill(color);
        this.polygon.drawPolygon(ptsList);
        this.polygon.endFill();
        this.subContainer.addChild(this.polygon);
        this.subContainer.rotation = PIXI.DEG_TO_RAD * rotation;
        game.app.stage.addChild(this.container);

        this.nameLabel = new PIXI.Text(name, {
            fontFamily: 'Arial',
            fill: color,
            fontSize: 2.5 * this.factor
        });
        this.nameLabel.anchor.set(0.5);
        this.nameLabel.position.y = -5 * this.factor;
        this.container.addChild(this.nameLabel);

        this.life = 0;
        this.force = {x: 0, y: 0};
        this.friction = 0.1;
    }

    update() {
        this.x += this.force.x;
        this.y += this.force.y;
        this.force.x *= 1 - this.friction;
        this.force.y *= 1 - this.friction;
    };

    get x() {
        return this.container.position.x;
    }

    get y() {
        return this.container.position.y;
    }

    set y(data) {
        this.container.position.y = data;
    }

    set x(data) {
        this.container.position.x = data;
    }

    get rotation() {
        return this.subContainer.rotation * PIXI.RAD_TO_DEG;
    }

    set rotation(data) {
        this.subContainer.rotation = data * PIXI.DEG_TO_RAD;
    }

    get name() {
        return this.nameLabel.text;
    }

    set name(data) {
        this.nameLabel.text = data;
    }
}

Vessel.list = [];

Vessel.init = (playerArray, game) => {
    for (let i = 0, len = playerArray.length; i < len; i++) {
        new Vessel(game, playerArray[i].transform, playerArray[i].name, playerArray[i].id, PlayerSkins.skins.Standard, playerArray[i].transform.rotation);
    }
};

Vessel.getById = (id) => {
    for (let i = 0, len = Vessel.list.length; i < len; i++) {
        if (Vessel.list[i].id === id)
            return Vessel.list[i];
    }
    return undefined;
};

Vessel.delete = (game, vessel) => {
    console.log(Vessel.list);
    for (let i = 0, len = Vessel.list.length; i < len; i++) {
        if (Vessel.list[i].id === vessel.id)
            Vessel.list.slice(i, 1);
    }
    console.log(Vessel.list);
    game.app.stage.removeChild(vessel.container);
};