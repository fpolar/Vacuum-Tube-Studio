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
var colorNames = ['tomato', 'orange', 'gold', 'slateBlue', 'aquamarine', 'forestgreen', 'hotpink', 'purple'];
var colors = ['255,99,71', '255,165,0', '255,215,0', '106,90,205', '127,255,212', '34,139,34', '255,105,180 ', '128,0,128'];
//Not all emojis are included in the list because some icons can imply functionality that isnt there
var emojis = [
    '😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '✌', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '☝', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '👬', '👭', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '❤', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '👥', '👣', '💭', '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐋', '🐄', '🐏', '🐀', '🐃', '🐅', '🐇', '🐉', '🐎', '🐐', '🐓', '🐕', '🐖', '🐁', '🐂', '🐲', '🐡', '🐊', '🐫', '🐪', '🐆', '🐈', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌲', '🌳', '🌰', '🌱', '🌼', '🌐', '🌞', '🌝', '🌚', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌙', '🌍', '🌎', '🌏', '🌋', '🌌', '🌠', '⭐', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '☎', '📞', '📟', '📠', '📡', '📺', '📻', '🔓', '🔒', '🔏', '🔐', '🔑', '💡', '🔦', '🔆', '🔅', '🔌', '🔍', '🛁', '🛀', '🚿', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🏉', '🎳', '⛳', '🚵', '🚴', '🏁', '🏇', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '☕', '🍵', '🍶', '🍼', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍋', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍐', '🍍', '🍠', '🍆', '🍅', '🌽', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚣', '⚓', '🚀', '✈', '💺', '🚁', '🚂', '🚊', '🚉', '🚞', '🚆', '🚄', '🚅', '🚈', '🚇', '🚝', '🚋', '🚃', '🚎', '🚌', '🚍', '🚙', '🚘', '🚗', '🚕', '🚖', '🚛', '🚚', '🚨', '🚓', '🚔', '🚒', '🚑', '🚐', '🚲', '🚡', '🚟', '🚠', '🚜', '💈', '🚏', '🎰', '♨', '🗿', '🎪', '🎭', '📍', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚰', '🚮', '🅿', '♿', '🚭', '🈷', '🈸', '🈂', '🛂', '🛄', '🛅', '🛃', '🉑', '㊙', '㊗', '🆑', '🆘', '🆔', '🚫', '🔞', '📵', '🚯', '🚱', '🚳', '🚷', '🚸', '⛔', '✳', '❇', '❎', '✅', '✴', '💟', '🆚', '📳', '📴', '🅰', '🅱', '🆎', '🅾', '💠', '➿', '♻', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔯', '🏧', '💹', '💲', '💱', '©', '®', '™', '♠', '♥', '♣', '♦', , '💯', '✔', '☑', '🔘', '🔗', '➰', '🔱'
];
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.sessionId = "";
        this.state = 'draw'; //draw, tilt, stop
        this.score = 0;
        this.canvas_pos_x = Math.random();
        this.canvas_pos_y = Math.random();
        this.device_width = 0;
        this.device_height = 0;
        this.x = -100;
        this.y = -100;
        this.z = -100;
        this.alpha = Math.floor(Math.random() * 400);
        this.beta = Math.floor(Math.random() * 400);
        this.gamma = Math.floor(Math.random() * 400);
        this.accel_x = Math.floor(Math.random() * 400);
        this.accel_y = Math.floor(Math.random() * 400);
        this.accel_z = Math.floor(Math.random() * 400);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
    }
}
__decorate([
    schema_1.type("string")
], Player.prototype, "sessionId", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "state", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "score", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "canvas_pos_x", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "canvas_pos_y", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "device_width", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "device_height", void 0);
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
], Player.prototype, "accel_x", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "accel_y", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "accel_z", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "color", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "emoji", void 0);
exports.Player = Player;
class State extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.host_canvas_width = -1;
        this.host_canvas_height = -1;
        //possible values are path, dots, stop, and clear
        this.canvas_state = new schema_1.MapSchema();
    }
    createPlayer(id) {
        this.players[id] = new Player();
        this.players[id].sessionId = id;
        var emoji_index = emojis.indexOf(this.players[id].emoji);
        var color_index = colors.indexOf(this.players[id].color);
        if (emoji_index > -1) {
            emojis.splice(emoji_index, 1);
        }
        if (color_index > -1) {
            colors.splice(color_index, 1);
        }
    }
    removePlayer(id) {
        colors.push(this.players[id].color);
        emojis.push(this.players[id].emoji);
        delete this.players[id];
    }
    setPlayerState(id, state) {
        this.players[id].state = state;
    }
    setPlayerEmoji(id, data) {
        if (data.emoji)
            this.players[id].emoji = data.emoji;
    }
    setPlayerColor(id, data) {
        if (data.color)
            this.players[id].color = data.color;
    }
    setPlayerDeviceDim(id, data) {
        if (data.device_width)
            this.players[id].device_width = data.device_width;
        if (data.device_height)
            this.players[id].device_height = data.device_height;
    }
    movePlayer(id, movement) {
        if (movement.x)
            this.players[id].x = movement.x;
        if (movement.y)
            this.players[id].y = movement.y;
        if (movement.z)
            this.players[id].z = movement.z;
        if (movement.canvas_pos_x)
            this.players[id].canvas_pos_x = movement.canvas_pos_x;
        if (movement.canvas_pos_x)
            this.players[id].canvas_pos_y = movement.canvas_pos_y;
    }
    setCanvasStates() {
        this.canvas_state['path'] = 1;
        this.canvas_state['clear'] = 0;
    }
}
__decorate([
    schema_1.type({ map: Player })
], State.prototype, "players", void 0);
__decorate([
    schema_1.type("number")
], State.prototype, "host_canvas_width", void 0);
__decorate([
    schema_1.type("number")
], State.prototype, "host_canvas_height", void 0);
__decorate([
    schema_1.type({ map: 'number' })
], State.prototype, "canvas_state", void 0);
exports.State = State;
class MyRoom extends colyseus_1.Room {
    onInit(options) {
        console.log("MyRoom created!", options);
        this.setState(new State());
        this.state.setCanvasStates();
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
        if (data.emoji) {
            this.state.setPlayerEmoji(client.sessionId, data);
        }
        if (data.color) {
            this.state.setPlayerColor(client.sessionId, data);
        }
        if (data.device_width) {
            this.state.setPlayerDeviceDim(client.sessionId, data);
        }
        if (data.x || data.canvas_pos_x) {
            this.state.movePlayer(client.sessionId, data);
        }
        if (data.state) {
            this.state.setPlayerState(client.sessionId, data.state);
        }
        if (data.canvas_state) {
            if (data.canvas_state == 'dots') {
                this.state.canvas_state['path'] = 0;
            }
            else if (data.canvas_state == 'path') {
                this.state.canvas_state['path'] = 1;
            }
            else if (data.canvas_state == 'clear') {
                this.state.canvas_state['clear'] = 1;
            }
        }
    }
    onError(client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }
    onDispose() {
        console.log("Dispose MyRoom");
    }
}
exports.MyRoom = MyRoom;
