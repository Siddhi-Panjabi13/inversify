import { UserService } from '../services';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TYPES } from '../utils/type';
import { NextFunction, Request, Response } from 'express';
import { IUSER } from '../interfaces';
import { ApiHandler } from '../handlers/apiHandler';
import { ErrorHandler } from '../handlers/errorHandler';

@controller('/api/users')
export class UserController {
    constructor(@inject(TYPES.UserService) private readonly _userService: UserService) {}

    @httpGet('/getAllUsers')
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this._userService.getAllUsersService();
            if(users instanceof ErrorHandler){
                next(users);
                
            }
            else
            res.status(200).json(new ApiHandler('Users fetched successfully', users));
        } catch (err) {
            next(err);
        }
    }

    @httpPost('/createUser')
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userName, password, role, email } = req.body;
            const userData: IUSER = { userName, password, role, email };
            const user: IUSER|object = await this._userService.createUserService(userData);
            if(user instanceof ErrorHandler){
                next(user)
            }
            else
            res.status(200).json(new ApiHandler('User created successfully', user));
        } catch (err) {
            next(err);
        }
    }
}
