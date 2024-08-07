import mongoose from 'mongoose';
export interface IROUTESTATION {
    stationId: mongoose.Types.ObjectId;
    distanceFromPreviousStation: number;
    stoppingTime: string;
    arrivalIndex:number;
  }
  
  export interface IROUTE extends Document {
    routeName: string;
    stations: IROUTESTATION[];
  }
  