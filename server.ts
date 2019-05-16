import path from 'path';
import express from 'express';
import https from 'https';
import fs from 'fs';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

import { MyRoom } from "./MyRoom";

const port = Number(process.env.PORT || 3000);
const app = express();

// Attach WebSocket Server on HTTP Server.
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app);

const gameServer = new Server({ server:server });

// Register StateHandlerRoom as "state_handler"
gameServer.register("my_room", MyRoom);

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

// process.on("uncaughtException", (e) => {
//   console.log(e.stack);
//   process.exit(1);
// });

console.log(`Listening on http://localhost:${ port }`);
