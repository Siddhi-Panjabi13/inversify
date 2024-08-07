import { UserService } from '../services';
import { inject } from 'inversify';
import { controller, httpGet, httpPatch, httpPost,httpDelete } from 'inversify-express-utils';
import { TYPES } from '../utils/type';
import { NextFunction, Request, Response } from 'express';
import { IREQUEST, IUSER } from '../interfaces';
import { ApiHandler } from '../handlers/apiHandler';
import { ErrorHandler } from '../handlers/errorHandler';
import { ErrorHandlerMiddleware } from '../handlers/errorResponse';
import { Auth } from '../middlewares/verifyLogin';
import { VerifyRole } from '../middlewares/verifyRole';
@controller('/api/users')
export class UserController {
    constructor(@inject(TYPES.UserService) private readonly _userService: UserService) { }

    @httpGet('/getAllUsers')
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this._userService.getAllUsersService();
            return res.status(200).json(new ApiHandler('Users fetched successfully', users));
        } catch (err) {
            ErrorHandlerMiddleware(err, req, res, next);
        }
    }

    @httpPost('/createUser')
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userName, password, role, email } = req.body;
            const userData: IUSER = { userName, password, role, email };
            const user: IUSER | object = await this._userService.createUserService(userData);

            return res.status(200).json(new ApiHandler('User created successfully', user));

        } catch (err) {
            ErrorHandlerMiddleware(err, req, res, next)
            // next(err)

        }
    }
    @httpPost('/loginUser')
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, password } = req.body;
            const userData = { email, password };
            const userLogged = await this._userService.loginUserService(userData);
            return res.status(200).json(new ApiHandler('Login successful',userLogged))
        }
        catch (err: any) {
            ErrorHandlerMiddleware(err, req, res, next)
            // next(err);
        }
    }
    @httpGet('/getLoggedInUser',Auth)
    async getLoggedInUser(req:Request,res:Response,next:NextFunction){
        try{
            const user=(req as IREQUEST).user
            if(!user){
                throw new ErrorHandler(404,'User not found',false);
            }
            return user
        }catch(err:any){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
    @httpPatch('/updateUser/:id',Auth)
    async updateUser(req:Request,res:Response,next:NextFunction){
        try{
            const user=(req as IREQUEST).user
            const {id}:any=req.params
            const {email, userName}=req.body;
            const updateUserData={email,userName}
            const updateUser=await this._userService.updateUserService(id,updateUserData,user);
            return res.status(200).json(new ApiHandler('User updated successfully'))
        }
        catch(err:any){
            ErrorHandlerMiddleware(err,req,res,next)
        }
    }
    @httpDelete('/deleteUser/:id',Auth)
    async deleteUser(req:Request,res:Response,next:NextFunction){
        try{
        const user=(req as IREQUEST).user;
        const {id}:any=req.params;
        const deleteUser=await this._userService.deleteUserService(id,user);
        res.status(200).json(new ApiHandler('User deleted successfully'));
        }catch(err:any){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
}
