import { IROUTE } from "../interfaces";
import { Request,Response,NextFunction } from "express";
import { inject } from "inversify";
import {RoutesService} from "../services"
import { controller,httpPost,httpGet,httpPatch,httpDelete } from "inversify-express-utils";
import { TYPES } from "../utils/type";
import {ApiHandler} from "../handlers/apiHandler"
import {ErrorHandlerMiddleware} from "../handlers/errorResponse"
@controller('/api/routes')
export class RouteController{
    constructor(@inject(TYPES.RoutesService) private readonly _routeService:RoutesService){}
    @httpPost('/createRoute')
    async createRoute(req:Request,res:Response,next:NextFunction){
        try{

            const {routeName,stations}:any=req.body;
            const routeData:any={routeName,stations};
            const route=await this._routeService.createRouteService(routeData)
            res.status(200).json(new ApiHandler('Route created successfully'));
        }
        catch(err){
            ErrorHandlerMiddleware(err,req,res,next)
        }
    }
    @httpGet('/getRoutes')
    async getAllRoutes(req:Request,res:Response,next:NextFunction){
        try{

            const routes=this._routeService.getAllRoutesService();
            res.status(200).json(new ApiHandler('Routes',routes));
        }catch(err){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
}