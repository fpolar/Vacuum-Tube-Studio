import path from 'path';
import express from 'express';
import fs from 'fs';
import ngrok from 'ngrok';
import { createServer } from 'http';
import { Server, RedisPresence } from 'colyseus';
//import { monitor } from '@colyseus/monitor';

import { MyRoom } from "./MyRoom";

const port = Number(process.env.PORT || 8080);
const app = express();

const gameServer = new Server({
  server: createServer(app)
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("my_room", MyRoom);

app.use(express.static('public'));

// app.get('/', function(request, response) {
//   console.log(__dirname);
//   console.log(request);
//     __dirname = __dirname.replace("\\lib", "");
//     __dirname = __dirname.replace("/lib", "");
//     //this may need to be request, look at express api to find out
//     if(__dirname.includes("player")){
// 	  response.sendFile(__dirname + '/views/player_view.html');
//     }else{
// 	  response.sendFile(__dirname + '/views/index.html');
//     }
// });

app.get('/player', function(request, response) {
	  response.sendFile(__dirname + '/views/player_view.html');
});
app.get('/', function(request, response) {
	  response.sendFile(__dirname + '/views/index.html');
});

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on https://localhost:${ port }`);
