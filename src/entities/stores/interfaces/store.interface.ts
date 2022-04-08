import { ObjectId } from "mongoose";

export interface StoreInterface {
    id?             : ObjectId,
    location        : Object,
    description?    : string,
    note?           : string,
    phone           : string,
    email           : string,
    active?          : Boolean,
    code            : string,
    name            : string,
    address         : string,
    city            : string,
    cap             : string,
    isVirtual?      : Boolean,
    whatsapp?       : string,
    doctor?         : string,
    pro?            : Boolean,
    display_name?   : string,
    region?         : string,
    whatsapp_prefix?: string,
    __v?            : number
}