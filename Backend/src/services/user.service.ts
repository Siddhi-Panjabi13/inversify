import { User } from "../models";
import { IUSER } from "../interfaces";
import { injectable } from "inversify";
import { ErrorHandler } from "../handlers/errorHandler";

@injectable()
export class UserService {
    async getAllUsersService(): Promise<IUSER[]|object> {
        const users = await User.find();
        if (users.length === 0) {
            return new ErrorHandler(404, 'User not found', false);
        }
        return users;
    }

    async createUserService(userData: IUSER): Promise<IUSER|object> {
        console.log("Checking if user with email already exists");
        const existingUserEmail = await User.findOne({ email: userData.email });
        if (existingUserEmail) {
            console.log("User with this email already exists, throwing error");
            return new ErrorHandler(400, 'User with this mailid already exists', false);
        }
        console.log("After if");
        const user: IUSER = await User.create(userData);
        console.log("User created successfully, returning user data");
        return user;
    }
}
