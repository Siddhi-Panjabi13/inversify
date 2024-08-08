import mongoose  from 'mongoose'
export interface ISTATION{
  _id?:mongoose.Types.ObjectId
  stationName:string
}
