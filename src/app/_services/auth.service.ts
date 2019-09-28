import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User } from './../_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userObserver: BehaviorSubject<User>;
    public userObservable: Observable<User>;

    constructor(private http: HttpClient) {
        this.userObserver = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.userObservable = this.userObserver.asObservable();
    }

    public get user(): User {
        return this.userObserver.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password })
            .pipe(map(user => {
                // set user to local storage to keep logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userObserver.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userObserver.next(null);
    }
}