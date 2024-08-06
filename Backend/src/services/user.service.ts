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
    async getAllUsersService(): Promise<IUSER[]> {
        const users = await User.find();
        if (users.length === 0) {
            throw new ErrorHandler(404, 'User not found', false);
        }
        return users;
    }

    async createUserService(userData: IUSER): Promise<IUSER> {
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
        const role=existingEmail.role;
        const payload={uid};
        const token=jwt.sign(payload,secretKey.SECRETKEY)
        return {
            token,
            userName,
            email,
            role
        }

    }
    async updateUserService(id:mongoose.Types.ObjectId,updateUserData:IUPDATEUSER,user:IUSER):Promise<IUSER>{
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
    async deleteUserService(id:mongoose.Types.ObjectId,user:IUSER):Promise<IUSER>{
        if(user._id?.toString()!==id.toString()){
            throw new ErrorHandler(403,'You cannot delete data of other user',false);
        }
        const deleteUser=await User.findByIdAndDelete(id);
        if(!deleteUser){
            throw new ErrorHandler(404,'User not found',false);
        }
        return deleteUser
    }
}
