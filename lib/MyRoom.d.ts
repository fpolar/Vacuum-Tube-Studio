import { Room } from "colyseus";
import { Schema, MapSchema } from "@colyseus/schema";
export declare class Player extends Schema {
    sessionId: string;
    state: string;
    score: number;
    canvas_pos_x: number;
    canvas_pos_y: number;
    device_width: number;
    device_height: number;
    x: number;
    y: number;
    z: number;
    alpha: number;
    beta: number;
    gamma: number;
    accel_x: number;
    accel_y: number;
    accel_z: number;
    color: string;
    emoji: string;
}
export declare class State extends Schema {
    players: MapSchema<Player>;
    host_canvas_width: number;
    host_canvas_height: number;
    canvas_state: MapSchema<"number">;
    createPlayer(id: string): void;
    removePlayer(id: string): void;
    setPlayerState(id: string, state: string): void;
    setPlayerEmoji(id: string, data: any): void;
    setPlayerColor(id: string, data: any): void;
    setPlayerDeviceDim(id: string, data: any): void;
    movePlayer(id: string, movement: any): void;
    setCanvasStates(): void;
}
export declare class MyRoom extends Room<State> {
    onInit(options: any): void;
    onJoin(client: any): void;
    onLeave(client: any): void;
    onMessage(client: any, data: any): void;
    onError(client: any, data: any): void;
    onDispose(): void;
}
