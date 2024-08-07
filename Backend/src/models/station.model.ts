import mongoose,{Schema} from 'mongoose';
import { ISTATION } from '../interfaces';


const stationSchema:Schema<ISTATION> = new Schema({
    stationName: {
    type: String,
    required: true,
    unique: true,  
    trim: true
  }
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);

export { Station};