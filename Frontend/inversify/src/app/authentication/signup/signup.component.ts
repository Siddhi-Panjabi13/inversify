import { Component } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
registrationForm!:FormGroup;
constructor(private fb:FormBuilder,private userService:UserService, private toastr:ToastrService){
  this.registrationForm=this.fb.group({
    userName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/)]),
    confirmPassword:new FormControl('',[Validators.required])
  },{ validators: this.passwordMatchValidator })
}

get data(){
  return this.registrationForm.controls;
}
passwordMatchValidator(control: AbstractControl): ValidationErrors | null{

  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

 if(password.value=== confirmPassword.value) {
  return null;
 }
 else{
  confirmPassword.setErrors({ passwordMismatch: true });
  return { passwordMismatch: true };
 }

}
registerUser(){
  if(this.registrationForm.valid){
    this.userService.registerUser(this.registrationForm.value).subscribe((response:any)=>{
      // console.log(response);
      this.toastr.success(`${response.message}`,'Success')
      this.registrationForm.reset();
    },(error)=>{
      console.log(error);
    });
  }
}
}
