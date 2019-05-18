"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.x = Math.floor(Math.random() * 400);
        this.y = Math.floor(Math.random() * 400);
        this.z = Math.floor(Math.random() * 400);
        this.alpha = Math.floor(Math.random() * 400);
        this.beta = Math.floor(Math.random() * 400);
        this.gamma = Math.floor(Math.random() * 400);
        this.color = Math.floor(Math.random() * 400);
    }
}
__decorate([
    schema_1.type("number")
], Player.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "z", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "alpha", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "beta", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "gamma", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "color", void 0);
exports.Player = Player;
class State extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.something = "This attribute won't be sent to the client-side";
    }
    createPlayer(id) {
        this.players[id] = new Player();
    }
    removePlayer(id) {
        delete this.players[id];
    }
    movePlayer(id, movement) {
        if (movement.x)
            this.players[id].x = movement.x;
        if (movement.y)
            this.players[id].y = movement.y;
        if (movement.z)
            this.players[id].z = movement.z;
        if (movement.alpha)
            this.players[id].alpha = movement.alpha;
        if (movement.beta)
            this.players[id].beta = movement.beta;
        if (movement.gamma)
            this.players[id].gamma = movement.gamma;
    }
}
__decorate([
    schema_1.type({ map: Player })
], State.prototype, "players", void 0);
exports.State = State;
class MyRoom extends colyseus_1.Room {
    onInit(options) {
        console.log("MyRoom created!", options);
        this.setState(new State());
    }
    onJoin(client) {
        console.log("Joining MyRoom");
        this.state.createPlayer(client.sessionId);
        console.log(client.sessionId + " Joined MyRoom");
    }
    onLeave(client) {
        this.state.removePlayer(client.sessionId);
    }
    onMessage(client, data) {
        console.log("MyRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }
    onError(client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }
    onDispose() {
        console.log("Dispose MyRoom");
    }
}
exports.MyRoom = MyRoom;
