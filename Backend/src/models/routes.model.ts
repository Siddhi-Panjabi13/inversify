import mongoose,{Schema} from 'mongoose';
import {IROUTE,IROUTESTATION} from '../interfaces'
const stationSchema:Schema<IROUTESTATION> = new Schema({
    stationId: { type: Schema.Types.ObjectId,ref:'Station' ,required: true },
    distanceFromPreviousStation: { type: Number, required: true },
    stoppingTime: { type: String, required: true },
    arrivalIndex:{type:Number,required:true}

  });
  
  const routeSchema: Schema<IROUTE> = new Schema({
    routeName: { type: String, required: true, unique:true },
    stations: { type: [stationSchema], required: true }
  });
  
  const Route = mongoose.model('Route', routeSchema);
  
  export  {Route};