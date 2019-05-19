import path from 'path';
import express from 'express';
import fs from 'fs';
import ngrok from 'ngrok';
import { createServer } from 'http';
import { Server, RedisPresence } from 'colyseus';
import { monitor } from '@colyseus/monitor';

import { MyRoom } from "./MyRoom";

const port = Number(process.env.PORT || 8080);
const app = express();

// const gameServer = new Server({ server:server });
const gameServer = new Server({
  server: createServer(app)
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("my_room", MyRoom);

app.use(express.static('public'));

app.get('/', function(request, response) {
    __dirname = __dirname.replace("\\lib", "");
    __dirname = __dirname.replace("/lib", "");
  response.sendFile(__dirname + '/views/index.html');
});


// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

(async function() {
	const url = await ngrok.connect(port);
	console.log(`Listening on ${ url }`);
})();

console.log(`Listening on https://localhost:${ port }`);
