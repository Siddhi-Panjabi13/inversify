import { mongodbURL } from "../app.config";
import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        await mongoose.connect(mongodbURL.mongoURL)
        console.log('Connected to database');
     }
    catch(error:any){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;