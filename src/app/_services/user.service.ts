import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<any>(`${environment.apiUrl}/admin`, {observe : "response"});
  }

  getGreeting() {
    return this.http.get<any>(`${environment.apiUrl}/user/greeting`, {observe : "response"});
  }
}
