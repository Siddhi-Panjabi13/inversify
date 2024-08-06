import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder,private userService:UserService,private toastr:ToastrService,private router:Router) {
    this.loginForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }
  get data(){
    return this.loginForm.controls;
  }
  loginUser(){
    this.userService.loginUser(this.loginForm.value).subscribe((response:any)=>{
      this.userService.setToken(response.result.token);
      this.userService.setRole(response.result.role);
      this.loginForm.reset();
      this.toastr.success(`${response.message}`,'Success');
      this.router.navigate(['/layouts'])
    },(error)=>{
      console.log(error)
    })
  }
}
