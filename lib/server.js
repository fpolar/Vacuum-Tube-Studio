"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ngrok_1 = __importDefault(require("ngrok"));
const http_1 = require("http");
const colyseus_1 = require("colyseus");
const monitor_1 = require("@colyseus/monitor");
const MyRoom_1 = require("./MyRoom");
const port = Number(process.env.PORT || 8080);
const app = express_1.default();
// const gameServer = new Server({ server:server });
const gameServer = new colyseus_1.Server({
    server: http_1.createServer(app)
});
// Register StateHandlerRoom as "state_handler"
gameServer.register("my_room", MyRoom_1.MyRoom);
app.use(express_1.default.static('public'));
app.get('/', function (request, response) {
    __dirname = __dirname.replace("\\lib", "");
    __dirname = __dirname.replace("/lib", "");
    response.sendFile(__dirname + '/views/index.html');
});
// (optional) attach web monitoring panel
app.use('/colyseus', monitor_1.monitor(gameServer));
gameServer.onShutdown(function () {
    console.log(`game server is going down.`);
});
gameServer.listen(port);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield ngrok_1.default.connect(port);
        console.log(`Listening on ${url}`);
    });
})();
console.log(`Listening on https://localhost:${port}`);
