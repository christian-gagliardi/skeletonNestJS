import { ObjectId } from "mongoose";

export interface QrInterface {
    id?: ObjectId;
    shortUrl?: string,
    redirectUrl: string,
    note: string,
    isPhaRedirect: boolean,
    storeOwner: string,
    __v?: number
}