import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddStationComponent } from './add-station/add-station.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewStationsComponent } from './view-stations/view-stations.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { ViewRoutesComponent } from './view-routes/view-routes.component';


@NgModule({
  declarations: [
    AddStationComponent,
    ViewStationsComponent,
    AddRouteComponent,
    ViewRoutesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
