import { ErrorHandler } from "../handlers/errorHandler";
import { IROUTE } from "../interfaces";
import { Route } from "../models";
import { injectable } from "inversify";
import { IUPDATEROUTE } from "../interfaces";
import mongoose from "mongoose";
@injectable()
export class RoutesService {
    async getAllRoutesService() {
        const routes = await Route.find();
        return routes;
    }
    async createRouteService(routeData: IROUTE) {
        const existingRouteName = await Route.findOne({ routeName: routeData.routeName });
        if (!existingRouteName) {
            throw new ErrorHandler(404, 'Route not found', false);
        }
        const route = await Route.create(routeData)
        return route;
    }
    async updateRoutesService(id:mongoose.Types.ObjectId,updateData:IUPDATEROUTE){
        const updatedRoute=await Route.findByIdAndUpdate(id,updateData);
        if(!updatedRoute){
            throw new ErrorHandler(404,'Route not found',false);
        }
        return updatedRoute;
    } 
    async deleteRoutesService(id:mongoose.Types.ObjectId){
        const deletedRoute=await Route.findByIdAndDelete(id);
        if(!deletedRoute){
            throw new ErrorHandler(404,'Route not found',false);
        }
        return deletedRoute;
    }  
}