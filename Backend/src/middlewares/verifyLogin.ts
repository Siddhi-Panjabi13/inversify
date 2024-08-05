import express from 'express';
import { IREQUEST } from '../interfaces';
import { User } from '../models';
import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { BaseMiddleware } from 'inversify-express-utils';
import { ErrorHandler } from '../handlers/errorHandler';
import { secretKey } from '../config/app.config';


export class Auth extends BaseMiddleware{
    async handler(req: Request, res: Response, next: NextFunction){
        const token=req.headers.authorization?.split(' ')[1];
        if(!token){
            const err=new ErrorHandler(401,'Token not provided',false);
            res.status(err.statusCode).json(err.message);
            return
        }
        jwt.verify(token,secretKey.SECRETKEY,async(err:any,decoded:any)=>{
            if(err){
                const err=new ErrorHandler(401,'Invalid token',false);
                res.status(err.statusCode).json(err.message);
                return
            }
            else{
                const user=await User.findOne({_id:decoded.uid});
                if(!user){
                    const err=new ErrorHandler(404,'User not found',false);
                    res.status(err.statusCode).json(err.message);
                    return
                }
                else{
                    (req as IREQUEST).user=user
                    next()
                }
            }
        })
    }
}