import { User } from "../models";
import { IUSER } from "../interfaces";
import { injectable } from "inversify";
@injectable()
export class UserService{
    async getAllUsersService(): Promise<IUSER[]> {
        const users=await User.find()
        if(users.length===0){
            throw new Error("No users found");
        }
        return users
    }
}