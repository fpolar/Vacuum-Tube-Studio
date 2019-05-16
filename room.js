const colyseus = require('colyseus');

exports.Player = class extends colyseus.Schema {
	constructor() {
    	this.x = Math.floor(Math.random() * 100);
    	this.y = Math.floor(Math.random() * 100);
    	this.z = Math.floor(Math.random() * 100);
    	this.a = Math.floor(Math.random() * 100);
    	this.b = Math.floor(Math.random() * 100);
    	this.g = Math.floor(Math.random() * 100);
  	}
}

exports.State = class extends colyseus.Schema {

    createPlayer (id) {
        this.players[ id ] = new Player();
    	this.players = new MapSchema<Player>();
    	console.log("player created");
    }

    removePlayer (id) {
        delete this.players[ id ];
    }

    movePlayer (id, movement) {
        if (movement.x) {
            this.players[ id ].x += movement.x * 10;

        } else if (movement.y) {
            this.players[ id ].y += movement.y * 10;
        }
    }
}

exports.MyRoom = class extends colyseus.Room<State> {
    onInit (options) {
        console.log("StateHandlerRoom created!", options);
        this.setState(new State());
    }

    onJoin (client) {
        console.log("joining: ", client.sessionId);
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }
}
