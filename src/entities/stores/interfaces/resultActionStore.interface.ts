import { ObjectId } from "mongoose";

export interface ResultActionStoreInterface {
    _id?: ObjectId;
    __v?: number;
    deletedCount?:number
}