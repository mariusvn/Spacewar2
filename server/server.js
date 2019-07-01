import Socket from 'socket.io';
import express from 'express';
import httpm from 'http';
import Player from './Player.js';
import path from 'path';
import ipc from '../shared/ipc';
const app = express();
const http = httpm.createServer(app);

let io = Socket.listen(http);
app.use('/game', express.static('game'));
app.use('/libs', express.static('libs'));
app.use('/shared', express.static('shared'));
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

io.on("connection", socket => {
    socket.emit(ipc.Player.serverHello.toString(), {
        players: Player.join()
    });
    let player = undefined;
    socket.on(ipc.Player.clientHello.toString(), data => {
        player = new Player(data.transform, data.name, socket);
        socket.emit(ipc.Player.clientId.toString(), player.id);
    });
    socket.on('disconnect', () => {
        if (player)
            Player.delete(player);
    });
    console.log('Connection');
});

http.listen(process.env.PORT || 2273, () => {
    console.log(`listening on ${process.env.PORT || 2273}`)
});

Player.sendUpdates(20, io);