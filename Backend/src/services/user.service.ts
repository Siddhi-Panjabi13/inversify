import { User } from "../models";
import { IUSER } from "../interfaces";
import { injectable } from "inversify";
import { ErrorHandler } from "../handlers/errorHandler";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretKey } from "../config/app.config";
import { IUPDATEUSER } from "../interfaces";
import mongoose from 'mongoose'
@injectable()
export class UserService {
    async getAllUsersService(): Promise<IUSER[] | object> {
        const users = await User.find();
        if (users.length === 0) {
            throw new ErrorHandler(404, 'User not found', false);
        }
        return users;
    }

    async createUserService(userData: IUSER): Promise<IUSER | object> {
        const existingUserEmail = await User.findOne({ email: userData.email });
        if (existingUserEmail) {
            throw new ErrorHandler(400, 'User with this mailid already exists', false);
        } else {
            const user: IUSER = await User.create(userData);
            return user;
        }
    }
    async loginUserService(loginData:{email:string, password:string}){
        const existingEmail:IUSER|null=await User.findOne({email:loginData.email});
        if(!existingEmail){
            throw new ErrorHandler(404,'User not found',false)
        }
        const isPasswordValid=await bcrypt.compare(loginData.password,existingEmail.password);
        if(!isPasswordValid){
            throw new ErrorHandler(401,'Invalid password',false);
        }
        const userName=existingEmail.userName;
        const uid=existingEmail._id;
        const email=existingEmail.email;
        const payload={uid};
        const token=jwt.sign(payload,secretKey.SECRETKEY)
        return {
            token,
            userName,
            email
        }

    }
    async updateUserService(id:mongoose.Types.ObjectId,updateUserData:IUPDATEUSER,user:IUSER){
        const userExist=await User.findById(id);
        if(!userExist){
            throw new ErrorHandler(404,'User not found',false);
        }
        if(user._id?.toString()!==id.toString()){
            throw new ErrorHandler(403,'You cannot update the data of other user',false)
        }
        const updateUser=await User.findByIdAndUpdate(id,updateUserData);
        if(!updateUser){
            throw new ErrorHandler(404,'User not found',false);
        }
        return updateUser;
    }
    
}
