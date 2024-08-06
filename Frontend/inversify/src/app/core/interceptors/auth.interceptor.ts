import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.userService.getToken();
    const authRequest=request.clone({
      setHeaders:token? {
        'Authorization': `Bearer ${token}`,
      }:{},
      url:`${environment.baseUrl}/${request.url}`
    })
    return next.handle(authRequest);
  }
}
