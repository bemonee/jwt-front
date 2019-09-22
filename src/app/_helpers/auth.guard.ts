/**
 * Ramiro - 22/09/2019
 * Guard for routing, it checks if there is any available user and let the routing process the route.
 * Otherwhise it will redirect to the login
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggedIn = this.authenticationService.user;
        if (isLoggedIn) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}