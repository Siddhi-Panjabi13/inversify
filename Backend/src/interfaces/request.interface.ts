import { Request } from "express";

export interface IREQUEST extends Request {
    user?:any
}