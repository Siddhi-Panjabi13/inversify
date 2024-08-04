import { injectable } from "inversify";
import { Error } from "mongoose";
@injectable()
export class ErrorHandler extends Error{
    statusCode:number;
    status:boolean;
    constructor(statusCode:number,message:string,status:boolean){
        super(message);
        this.statusCode=statusCode;
        this.status=status;
        this.message=message;
    }
}