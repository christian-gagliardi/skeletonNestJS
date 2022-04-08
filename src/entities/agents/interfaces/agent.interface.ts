import { ObjectId } from "mongoose";

export interface AgentInterface {
    id?             : ObjectId,
    note?           : string,
    phone           : string,
    email           : string,
    active?         : Boolean,
    surname         : string,
    name            : string,
    __v?            : number
}