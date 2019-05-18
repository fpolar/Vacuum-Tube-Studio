import { Room } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("number")
    x = Math.floor(Math.random() * 400);
    @type("number")
    y = Math.floor(Math.random() * 400);
    @type("number")
    z = Math.floor(Math.random() * 400);
    @type("number")
    alpha = Math.floor(Math.random() * 400);
    @type("number")
    beta = Math.floor(Math.random() * 400);
    @type("number")
    gamma = Math.floor(Math.random() * 400);
    @type("number")
    color = Math.floor(Math.random() * 400);
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    movePlayer (id: string, movement: any) {
        if(movement.x)
            this.players[ id ].x = movement.x
        if(movement.y)
            this.players[ id ].y = movement.y
        if(movement.z)
            this.players[ id ].z = movement.z
        if(movement.alpha)
            this.players[ id ].alpha = movement.alpha;
        if(movement.beta)
            this.players[ id ].beta = movement.beta;
        if(movement.gamma)
            this.players[ id ].gamma = movement.gamma;
    }
}

export class MyRoom extends Room<State> {
    onInit (options) {
        console.log("MyRoom created!", options);

        this.setState(new State());
    }

    onJoin (client) {
        console.log("Joining MyRoom");
        this.state.createPlayer(client.sessionId);
        console.log(client.sessionId + " Joined MyRoom");
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("MyRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }

    onError (client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose MyRoom");
    }

}