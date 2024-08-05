import mongoose from "mongoose"

export interface IUSER{
    _id?:mongoose.Types.ObjectId,
    userName:string,
    password:string,
    role:string,
    email:string
}