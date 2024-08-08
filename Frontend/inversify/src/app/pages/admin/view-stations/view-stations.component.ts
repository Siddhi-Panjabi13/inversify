import { Component } from '@angular/core';
import { Router } from '@angular/router';
import mongoose from 'mongoose';
import { ToastrService } from 'ngx-toastr';
import { ISTATION } from 'src/app/core/interfaces/station.interface';
import { StationService } from 'src/app/core/services/station.service';

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.scss']
})
export class ViewStationsComponent {
  stations:ISTATION[]=[];
  constructor(private stationService:StationService,private toastr:ToastrService,private router:Router){

  }
  ngOnInit(){
    this.getAllStations();
  }

  getAllStations(){
    this.stationService.getAllStations().subscribe((response:any)=>{
      this.stations=response.result;
    })
  }
  editStation(id:any){
    this.router.navigate([`/layouts/admin/editStation/${id}`])
  }
  deleteStation(id:any){
    this.stationService.deleteStation(id).subscribe((response:any)=>{
      this.toastr.success('Station deleted successfully','Success');
      this.getAllStations()
    })
  }
}
