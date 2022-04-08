import { ObjectId } from "mongoose";

export interface ContractInterface {
    id?     : ObjectId;
    store   : string,
    qr      : string,
    __v?    : number
}