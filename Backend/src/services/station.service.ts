import { Station } from "../models";
import { ISTATION } from "../interfaces";
import mongoose from "mongoose";
import { ErrorHandler } from "../handlers/errorHandler";
import { ErrorHandlerMiddleware } from "../handlers/errorResponse";
import { injectable } from "inversify";
@injectable()
export class StationService{
async getAllStationsService():Promise<ISTATION[]>{
    const stations:ISTATION[]=await Station.find();
    return stations
}
async createStationService(stationData:ISTATION):Promise<ISTATION>{
    const existingStation=await Station.findOne({stationName:stationData.stationName})
    if(existingStation){
        throw new ErrorHandler(400,'Station already exists',false);
    }
    const station=await Station.create(stationData)
    return station
}
async updateStationService(id:mongoose.Types.ObjectId,updateStationData:ISTATION):Promise<ISTATION>{
    const station=await Station.findByIdAndUpdate(id,updateStationData,{new:true});
    if(!station){
        throw new ErrorHandler(404,'Station not found',false);
    }
    return station
}
async deleteStationService(id:mongoose.Types.ObjectId){
    const deleteStation=await Station.findByIdAndDelete(id);
    if(!deleteStation){
        throw new ErrorHandler(404,'Station not found',false);
    }
    return deleteStation
}
async getStationByIdService(id:mongoose.Types.ObjectId){
    const station=await Station.findById(id);
    if(!station){
        throw new ErrorHandler(404,'Station not found',false);
    }
    return station
}

}