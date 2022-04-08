import { ObjectId } from "mongoose";

export interface ResultActionQrInterface {
    _id?: ObjectId;
    __v?: number;
    deletedCount?:number
}