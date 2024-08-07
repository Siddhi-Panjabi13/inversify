import { Request, Response, NextFunction } from "express";
import { IUSER, IREQUEST } from "../interfaces";
import { ErrorHandler } from "../handlers/errorHandler";
import { BaseMiddleware } from "inversify-express-utils";
import { injectable } from "inversify";

@injectable()
class VerifyRole extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction): void {
    next();
  }

  public static role(requiredRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as IREQUEST).user;
      const userRole = user.role;
      const isAuthorized = requiredRoles.some(role => role === userRole);

      if (!isAuthorized) {
        const err=new ErrorHandler(403, 'Forbidden Access', false)
       res.status(err.statusCode).json(err.message);      
      } else {
        next();
      }
    };
  }
}

export { VerifyRole };