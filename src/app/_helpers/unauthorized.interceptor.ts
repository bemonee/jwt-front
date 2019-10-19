/**
 * Ramiro - 22/09/2019
 * It will intercept all the responses from the backend and analyze if there is an Unauthorized error.
 * In this case we are going to logout so the user is redirected to the login
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './../_services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authService.logout();
                location.href = "/login?error=401"
            }

            //const error = err.error.message || err.statusText;
            return throwError(err);
        }))
    }
}