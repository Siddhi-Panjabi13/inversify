import { UserService } from '../services'
import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { TYPES } from '../utils/type'
import { NextFunction, Request , Response  } from 'express'
@controller('/api/users')
export class UserController {
    constructor(@inject(TYPES.UserService) private readonly _userService: UserService) { }
    @httpGet('/getAllUsers')
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this._userService.getAllUsersService();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }
}