import { ErrorHandler } from "../handlers/errorHandler";
import { IROUTE } from "../interfaces";
import { Route } from "../models";
import { injectable } from "inversify";

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
}