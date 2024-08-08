import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr  :ToastrService, private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      retry(1),
      catchError((returnedError: HttpErrorResponse) => {
        console.log(returnedError)
        let errorMessage: string | null = null
        let handled = false

        if (returnedError.error instanceof ErrorEvent) {
          errorMessage = `Error: ${returnedError.error.message}`
        } else if (returnedError instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${returnedError.status === 0 ? 500 : returnedError.status}: ${returnedError.error?.error || 'Unknown Error'} - ${returnedError.error?.message || 'Internal Server Error'}`
          handled = this.handleServerSideError(returnedError)
        }

        console.error(errorMessage ? errorMessage : returnedError)

        if (returnedError.status === 0)
          this.toastr.error('Internal Server Error', 'Error')
        else this.toastr.error(returnedError.error.message, 'Error')

        if (!handled) {
          if (errorMessage) {
            return throwError(errorMessage)
          } else {
            this.toastr.error('Internal Server Error', 'Error')
            return throwError('Internal Server Error')
          }
        } else {
          return of(returnedError)
        }
      })
    )
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled = false

    switch (error.status) {
      case 401:
      case 403:
        this.router.navigate(['unauthorized'])
        handled = true
        break
    }

    return handled
  }
  }
