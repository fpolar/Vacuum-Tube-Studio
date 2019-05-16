"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const colyseus_1 = require("colyseus");
const monitor_1 = require("@colyseus/monitor");
const MyRoom_1 = require("./MyRoom");
const port = Number(process.env.PORT || 2567);
const app = express_1.default();
// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus_1.Server({
    server: http_1.createServer(app)
});
// Register StateHandlerRoom as "state_handler"
gameServer.register("my_room", MyRoom_1.MyRoom);
app.use('/', express_1.default.static(path_1.default.join(__dirname, "static")));
// (optional) attach web monitoring panel
app.use('/colyseus', monitor_1.monitor(gameServer));
gameServer.onShutdown(function () {
    console.log(`game server is going down.`);
});
gameServer.listen(port);
// process.on("uncaughtException", (e) => {
//   console.log(e.stack);
//   process.exit(1);
// });
console.log(`Listening on http://localhost:${port}`);
