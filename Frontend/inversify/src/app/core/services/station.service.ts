import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISTATION } from '../interfaces/station.interface';
import mongoose from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private httpClient:HttpClient) { }
  createStation(stationData:ISTATION){
    return this.httpClient.post('stations/createStation',stationData);
  }
  getAllStations(){
    return this.httpClient.get('stations/getAllStations');
  }
  deleteStation(id:mongoose.Types.ObjectId){
    return this.httpClient.delete(`stations/deleteStation/${id}`);
  }
  getStationById(id:any){
    return this.httpClient.get(`stations/getStationById/${id}`);

  }
  updateStation(id:any,stationData:ISTATION){
    return this.httpClient.patch(`stations/updateStation/${id}`,stationData);
  }
}
