import { Room } from "colyseus";
import { Schema, MapSchema } from "@colyseus/schema";
export declare class Player extends Schema {
    x: number;
    y: number;
    z: number;
    alpha: number;
    beta: number;
    gamma: number;
    color: number;
}
export declare class State extends Schema {
    players: MapSchema<Player>;
    something: string;
    createPlayer(id: string): void;
    removePlayer(id: string): void;
    movePlayer(id: string, movement: any): void;
}
export declare class MyRoom extends Room<State> {
    onInit(options: any): void;
    onJoin(client: any): void;
    onLeave(client: any): void;
    onMessage(client: any, data: any): void;
    onError(client: any, data: any): void;
    onDispose(): void;
}
