export default
{
    "Player": {
        "clientHello": 0, // send client infos to server
        "serverHello": 1, // send game infos to client [playerlist without actual client]
        "transform": 2,   // send position from client to server
        "clientId": 3,    // send client player id
        "playersUpdate": 4,// send array of players
        "delete": 5,      // delete player
        "add": 6          // remove player
    }
}