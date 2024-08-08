import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStationComponent } from './add-station/add-station.component';
import { ViewStationsComponent } from './view-stations/view-stations.component';

const routes: Routes = [
  {path:'addStation',component:AddStationComponent},
  {path:'viewStations',component:ViewStationsComponent},
  {path:'editStation/:id',component:AddStationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
