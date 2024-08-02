import mongoose,{Schema} from 'mongoose';
import { IUSER } from '../interfaces';
import { Role } from '../enums/enums';
const userSchema:Schema<IUSER> = new mongoose.Schema({
    userName: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, required: true, enum:Object.values(Role),default:Role.USER},
    email: { type: String, required: true, unique: true },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export {User};