import { InteractionType } from "./InteractionType";

export interface IInteractionMessage {
    type: InteractionType,
    payload: string,
    eventCoordinates?: { x: number, y: number }
}