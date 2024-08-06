import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) {}
  setToken(token:string){
    localStorage.setItem('loginToken',JSON.stringify(token));
  }
  getToken():string|null{
    const token=localStorage.getItem('loginToken');
    return token? JSON.parse(token) : null;
  }
  setRole(role:string){
    localStorage.setItem('role',role);
  }
  getRole():string|null{
    const role=localStorage.getItem('role');
    return role?JSON.parse(role):null
  }
  registerUser(userData:IUSER){
    return this.httpClient.post('users/createUser',userData);
  }
  loginUser(userData:any){
    return this.httpClient.post('users/loginUser',userData);
  }
  getLoggedInUser(){
    return this.httpClient.get('users/getLoggedInUser')
  }
}
