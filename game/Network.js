import ipc from '../shared/ipc.js';
import Vessel from './Vessel.js';

export default class Network {
    constructor(player, game, timeout = 10) {
        player.networkManager = this;
        this.timeout = timeout;
        this.socket = io();
        this.player = player;
        this.socket.emit(ipc.Player.clientHello.toString(), {
            name: player.name,
            transform: {
                x: Math.round(this.player.x),
                y: Math.round(this.player.y),
                rotation: Math.round(this.player.rotation < 0 ? this.player.rotation + 360 : this.player.rotation),
                force: {x: 0, y: 0}
            }
        });
        this.socket.on(ipc.Player.serverHello.toString(), data => {
            Vessel.init(data.players, game);
        });
        this.socket.on(ipc.Player.clientId.toString(), id => {
            player.id = id;
            console.log('player id is ' + id);
        });
        this.socket.on(ipc.Player.playersUpdate.toString(), playerArray => {
            for (let i = 0, len = playerArray.length; i < len; i++) {
                if (player.id === playerArray[i].id)
                    continue;
                let v = Vessel.getById(playerArray[i].id);
                if (!v)
                    return;
                //v.x = playerArray[i].transform.x;
                //v.y = playerArray[i].transform.y;

                /*if (v.x - playerArray[i].transform.x > 100 || v.x - playerArray[i].transform.x < 100)
                    v.x = playerArray[i].transform.x;
                if (v.y - playerArray[i].transform.y > 100 || v.y - playerArray[i].transform.y < 100)
                    v.y = playerArray[i].transform.y;*/
                v.rotation = playerArray[i].transform.rotation;
                v.force = playerArray[i].transform.force;
                console.log(playerArray[i].transform.force);
            }
        });
        this.socket.on(ipc.Player.delete.toString(), vessel => {
            Vessel.delete(game, Vessel.getById(vessel.id));
        });
        this.update();
    }

    update = () => {
        setTimeout(this.update, this.timeout * 10);
        this.socket.emit(ipc.Player.transform.toString(), {
            x: Math.round(this.player.x),
            y: Math.round(this.player.y),
            rotation: Math.round(this.player.rotation < 0 ? this.player.rotation + 360 : this.player.rotation),
            force: this.player.force
        });
    }
}