const functions = require('firebase-functions');
const express = require('express');

const http = require("http");
const colyseus = require("colyseus");
const MyRoom = require("./MyRoom");

const port = Number(process.env.PORT || 5001 );
const app = express();

const gameServer = new colyseus.Server({
    express: app,
});

gameServer.register("my_room", MyRoom.MyRoom);

// app.get('/timestamp', (request, response) => {
// 	response.send(`${Date.now()}`);
// });

// // app.get('/game', (request, response) => {
// // 	response.send(`${Date.now()}`);
// // });

// app.get('/', (request, response) => {
//     response.sendFile('./index.html');
// });

exports.app = functions.https.onRequest	(app);
gameServer.listen(port);
console.log(`Listening on https://localhost:${ port }`);
console.log(`Server options:${ gameServer.ServerOptions }`);