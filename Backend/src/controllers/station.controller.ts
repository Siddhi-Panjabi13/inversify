import { Response, NextFunction,Request } from 'express';
import { ISTATION } from "../interfaces";
import { StationService } from "../services";
import {controller,httpGet,httpPost,httpPatch,httpDelete} from "inversify-express-utils"
import { ApiHandler } from '../handlers/apiHandler';
import { ErrorHandler } from '../handlers/errorHandler';
import { ErrorHandlerMiddleware } from '../handlers/errorResponse';
import { Auth } from '../middlewares/verifyLogin';
import { VerifyRole } from '../middlewares/verifyRole';
import {TYPES}  from '../utils/type'
import { inject } from 'inversify';
@controller('/api/stations',Auth,VerifyRole.role(['Admin']))
export class StationController{
    constructor(@inject(TYPES.StationService) private readonly _stationService:StationService){}
    @httpGet('/getAllStations')
    async getAllStations(req:Request,res:Response,next:NextFunction){
        try{
            const stations=await this._stationService.getAllStationsService()
            res.status(200).json(new ApiHandler('Stations',stations));
        }catch(err){
            ErrorHandlerMiddleware(err,req,res,next)
        }
    }
    @httpPost('/createStation')
    async createStation(req:Request,res:Response,next:NextFunction){
        try{
            const {stationName}=req.body;
            const stationData={stationName};
            const station=await this._stationService.createStationService(stationData);
            res.status(200).json(new ApiHandler('Station created successfully'))
        }catch(err){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
    @httpPatch('/updateStation/:id')
    async updateStation(req:Request,res:Response,next:NextFunction){
        try{

            const {id}:any=req.params;
            const {stationName}=req.body;
            const stationData={stationName};
            const updateStation=await this._stationService.updateStationService(id,stationData)
            res.status(200).json(new ApiHandler('Station updated successfully',updateStation));
        }
        catch(err){
            ErrorHandlerMiddleware(err,req,res,next)
        }
    }
    @httpDelete('/deleteStation/:id')
    async deleteStation(req:Request,res:Response,next:NextFunction){
        try{
            const {id}:any=req.params;
            const station=await this._stationService.deleteStationService(id);
            res.status(200).json(new ApiHandler('Station deleted successfully'));
        }catch(err){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
    @httpGet('/getStationById/:id')
    async  getStationById(req:Request,res:Response,next:NextFunction){
        try{
            const {id}:any=req.params;
            const station=await this._stationService.getStationByIdService(id);
            res.status(200).json(new ApiHandler('Station found', station));
        }catch(err){
            ErrorHandlerMiddleware(err,req,res,next);
        }
    }
}