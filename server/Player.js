import ipc from '../shared/ipc';

let PlayerMaxIds = -1;

export default class Player {
    /**
     * Create a player
     * @param {Transform} transform
     * @param {String} name
     * @param {Object} socket
     */
    constructor(transform, name, socket) {
        this.transform = transform;
        this.name = name;
        this.socket = socket;
        this.id = ++PlayerMaxIds;
        Player.list.push(this);
        socket.on(ipc.Player.transform.toString(), this.updateData);
    }

    /**
     * update transform player data
     * @param {Transform} transform
     */
    updateData = (transform) => {
        this.transform = transform;
    };

    toSimpleNetworkObject = () => {
        return {
            transform: this.transform,
            name: this.name,
            id: this.id
        }
    }
}

/**
 * Array of all players
 * @type {Array<Player>}
 */
Player.list = [];

Player.join = () => {
    let ret = [];
    for (let i = 0, len = Player.list.length; i < len; i++) {
        ret.push(Player.list[i].toSimpleNetworkObject());
    }
    return ret;
};

Player.delete = (ply, io) => {
    io.sockets.binary(true).emit(ipc.Player.delete, ply.toSimpleNetworkObject());
    for (let i = 0, len = Player.list.length; i < len; i++) {
        if (ply.id === Player.list[i].id) {
            Player.list.splice(i, 1);
            return;
        }
    }
};

Player.sendUpdates = (timesPerSeconds, socket) => {
    setTimeout(Player.sendUpdates, 1000 / timesPerSeconds, timesPerSeconds, socket);
    socket.sockets.binary(true).emit(ipc.Player.playersUpdate.toString(), Player.join());
};

/**
 @typedef Transform

 @member {Number} x
 @member {Number} y
 @member {Number} rotation
 */