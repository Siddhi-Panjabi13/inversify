import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StationService } from 'src/app/core/services/station.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent {
  addStation!: FormGroup;
  isSubmit = true;
  isUpdate = false;
  id=this.route.snapshot.paramMap.get('id');
  ngOnInit(){
    if(this.id){
      this.isUpdate=true;
      this.isSubmit=false;
      this.getParticularStation();
    }
  }
  constructor(private fb: FormBuilder, private stationService: StationService, private toastr: ToastrService, private router: Router,private route:ActivatedRoute) {
    this.addStation = this.fb.group({
      stationName: new FormControl('', [Validators.required])
    })
  }



  add() {
    if(this.isSubmit){

      this.stationService.createStation(this.addStation.value).subscribe((response: any) => {
        this.toastr.success('Station added successfully', 'Success');
        this.addStation.reset();
        this.router.navigate(['layouts/admin/viewStations'])
      })
    }
    else{
      this.stationService.updateStation(this.id,this.addStation.value).subscribe((response:any)=>{
        this.toastr.success('Station updated successfully','Success');
        this.getParticularStation();
        this.router.navigate(['layouts/admin/viewStations'])
      })
    }
  }
  get data() {
    return this.addStation.controls;
  }
  getParticularStation(){
    this.stationService.getStationById(this.id).subscribe((response:any)=>{
      this.addStation.patchValue(response.result);
    })
  }
}
