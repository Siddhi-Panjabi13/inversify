import { Component } from '@angular/core';
import { IUSER } from './../../../core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user:IUSER|null=null
  constructor(private userService:UserService,private router:Router){}
ngOnInit(){
  this.getLoggedInUser();
}

getLoggedInUser(){
  this.userService.getLoggedInUser().subscribe((response:any)=>{
    this.user=response;
  },(error)=>{
    console.log(error);
  })
}
getProfile(){
  this.router.navigate(['/layouts/getProfile'])
}
}
