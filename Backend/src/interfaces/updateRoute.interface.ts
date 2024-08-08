import { IROUTESTATION } from '../interfaces';
import mongoose from 'mongoose';
export interface IUPDATEROUTE{
    routeName?: string;
    stations?: IROUTESTATION[];
}

  