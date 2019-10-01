import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from './../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }

  getAdmin() {
    return this.http.get(`${environment.apiUrl}/admin`, {responseType: 'text'});
  }

  getGreeting() {
    return this.http.get(`${environment.apiUrl}/user/greeting`, {responseType: 'text'});
  }
}
